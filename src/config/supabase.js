import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// These should be set in environment variables for production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client (will be null if not configured)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null;
};

// Admin email for order notifications
const ADMIN_EMAIL = 'spancial@gmail.com';
// gaialilith60@gmail.com

// Save reservation data to Supabase and send admin notification
export async function saveReservation(data) {
  if (!supabase) {
    console.warn('Supabase not configured. Reservation data not saved off-chain.');
    // Return a mock response for development
    return {
      success: true,
      mock: true,
      id: `mock-${Date.now()}`,
      message: 'Reservation recorded (Supabase not configured - development mode)'
    };
  }

  try {
    const { data: result, error } = await supabase
      .from('bracelet_reservations')
      .insert([{
        wallet_address: data.walletAddress,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        city: data.city,
        street_address: data.streetAddress,
        postal_code: data.postalCode,
        quantity: data.quantity,
        size: data.size || null,
        color: data.color || null,
        notes: data.notes || null,
        tx_hash: data.txHash || null,
        nft_id: data.nftId || null,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;

    // Send admin notification email via Edge Function
    try {
      await supabase.functions.invoke('send-order-notification', {
        body: {
          reservation: result,
          adminEmail: ADMIN_EMAIL
        }
      });
    } catch (emailError) {
      // Don't fail the reservation if email fails - just log it
      console.error('Failed to send admin notification:', emailError);
    }

    return { success: true, id: result.id };
  } catch (error) {
    console.error('Error saving reservation:', error);
    return { success: false, error: error.message };
  }
}

// Get user's reservations
export async function getUserReservations(walletAddress) {
  if (!supabase) {
    return { success: true, reservations: [], mock: true };
  }

  try {
    const { data, error } = await supabase
      .from('bracelet_reservations')
      .select('*')
      .eq('wallet_address', walletAddress.toLowerCase())
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, reservations: data };
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return { success: false, error: error.message, reservations: [] };
  }
}

// Get total reservation count (for public display)
export async function getReservationCount() {
  if (!supabase) {
    return { success: true, count: 0, mock: true };
  }

  try {
    const { count, error } = await supabase
      .from('bracelet_reservations')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return { success: true, count: count || 0 };
  } catch (error) {
    console.error('Error fetching count:', error);
    return { success: false, count: 0, error: error.message };
  }
}

// Get all reservations (for admin)
export async function getAllReservations() {
  if (!supabase) {
    return { success: true, reservations: [], mock: true };
  }

  try {
    const { data, error } = await supabase
      .from('bracelet_reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, reservations: data || [] };
  } catch (error) {
    console.error('Error fetching all reservations:', error);
    return { success: false, error: error.message, reservations: [] };
  }
}

/*
Supabase Table Schema (run this in Supabase SQL Editor):

CREATE TABLE bracelet_reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  nft_id TEXT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  street_address TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  color TEXT,
  notes TEXT,
  tx_hash TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE bracelet_reservations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own reservations
CREATE POLICY "Users can insert reservations" ON bracelet_reservations
  FOR INSERT WITH CHECK (true);

-- Policy: Users can view their own reservations
CREATE POLICY "Users can view own reservations" ON bracelet_reservations
  FOR SELECT USING (wallet_address = current_setting('request.jwt.claims')::json->>'wallet_address');
*/

