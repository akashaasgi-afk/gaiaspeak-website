// Supabase Edge Function to send order notification emails
// Uses Resend for email delivery (free tier: 3,000 emails/month)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

interface Reservation {
  id: string;
  wallet_address: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  street_address: string;
  postal_code: string;
  quantity: number;
  size?: string;
  color?: string;
  notes?: string;
  tx_hash?: string;
  created_at: string;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const { reservation, adminEmail } = await req.json() as {
      reservation: Reservation;
      adminEmail: string;
    };

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Format the email body
    const emailHtml = `
      <h2>🎉 New WHITE Bracelet Pre-Order!</h2>
      <p>A new reservation has been placed on GaiaSpeak.</p>
      
      <h3>Order Details</h3>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Order ID</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${reservation.id}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Date</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date(reservation.created_at).toLocaleString()}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Quantity</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${reservation.quantity}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Size</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${reservation.size || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Color</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${reservation.color || 'Not specified'}</td></tr>
        ${reservation.tx_hash ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>TX Hash</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><a href="https://amoy.polygonscan.com/tx/${reservation.tx_hash}">${reservation.tx_hash.slice(0, 10)}...</a></td></tr>` : ''}
      </table>

      <h3>Customer Information</h3>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${reservation.full_name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${reservation.email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${reservation.phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Wallet</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${reservation.wallet_address}</td></tr>
      </table>

      <h3>Shipping Address</h3>
      <p>
        ${reservation.street_address}<br>
        ${reservation.city}, ${reservation.postal_code}<br>
        ${reservation.country}
      </p>

      ${reservation.notes ? `<h3>Notes</h3><p>${reservation.notes}</p>` : ''}

      <hr style="margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        This is an automated notification from GaiaSpeak Protocol.<br>
        View all orders in your <a href="https://supabase.com/dashboard">Supabase Dashboard</a>.
      </p>
    `;

    // Send email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'GaiaSpeak <orders@gaiaspeak.io>', // Change to your verified domain
        to: [adminEmail],
        subject: `🎉 New WHITE Bracelet Order - ${reservation.full_name}`,
        html: emailHtml,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', data);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: data }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, emailId: data.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

