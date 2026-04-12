import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllReservations } from '../config/supabase';

// Hardcoded credentials (for development only)
const ADMIN_USERNAME = 'gaiaspeak';
const ADMIN_PASSWORD = 'gaiaspeak';

export function AdminPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Authentication on mount
  useEffect(() => {
    const storedAuth = sessionStorage.getItem('gaiaspeak_admin_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      return;
    }

    const username = window.prompt('Admin Login\n\nUsername:');
    if (!username) {
      navigate('/');
      return;
    }

    const password = window.prompt('Password:');
    if (!password) {
      navigate('/');
      return;
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('gaiaspeak_admin_auth', 'true');
    } else {
      window.alert('Invalid credentials');
      navigate('/');
    }
  }, [navigate]);

  // Fetch reservations
  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchReservations() {
      setIsLoading(true);
      const result = await getAllReservations();
      if (result.success) {
        setReservations(result.reservations);
      }
      setIsLoading(false);
    }
    fetchReservations();
  }, [isAuthenticated]);

  const handleLogout = () => {
    sessionStorage.removeItem('gaiaspeak_admin_auth');
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Authenticating...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-semibold">
              <span className="text-amber-400">Gaia</span>
              <span className="text-slate-400">Speak</span>
            </Link>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">ADMIN</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-light">Pre-Order Management</h1>
            <div className="text-sm text-slate-400">
              Total Orders: <span className="text-amber-400 font-semibold">{reservations.length}</span>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-slate-400">Loading reservations...</div>
          ) : reservations.length === 0 ? (
            <div className="text-center py-12 text-slate-400">No pre-orders yet</div>
          ) : (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Country</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Qty</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {reservations.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-800/30">
                      <td className="px-4 py-3 text-sm text-slate-300">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-100">{order.full_name}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{order.email}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{order.country}</td>
                      <td className="px-4 py-3 text-sm text-amber-400">{order.quantity}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded ${
                          order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          order.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                          'bg-slate-500/20 text-slate-400'
                        }`}>
                          {order.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-xs text-amber-400 hover:text-amber-300"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-100">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Order ID</div>
                    <div className="text-sm text-slate-300 font-mono">{selectedOrder.id?.slice(0, 8)}...</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Date</div>
                    <div className="text-sm text-slate-300">{new Date(selectedOrder.created_at).toLocaleString()}</div>
                  </div>
                </div>

                <hr className="border-slate-700" />

                <div>
                  <div className="text-xs text-slate-500 uppercase mb-1">Customer</div>
                  <div className="text-slate-100">{selectedOrder.full_name}</div>
                  <div className="text-sm text-slate-400">{selectedOrder.email}</div>
                  <div className="text-sm text-slate-400">{selectedOrder.phone}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 uppercase mb-1">Wallet</div>
                  <div className="text-sm text-amber-400 font-mono break-all">{selectedOrder.wallet_address}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 uppercase mb-1">Shipping Address</div>
                  <div className="text-sm text-slate-300">
                    {selectedOrder.street_address}<br />
                    {selectedOrder.city}, {selectedOrder.postal_code}<br />
                    {selectedOrder.country}
                  </div>
                </div>

                <hr className="border-slate-700" />

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Quantity</div>
                    <div className="text-lg text-amber-400">{selectedOrder.quantity}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Size</div>
                    <div className="text-sm text-slate-300">{selectedOrder.size || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Color</div>
                    <div className="text-sm text-slate-300">{selectedOrder.color || 'N/A'}</div>
                  </div>
                </div>

                {selectedOrder.tx_hash && (
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Transaction</div>
                    <a
                      href={`https://amoy.polygonscan.com/tx/${selectedOrder.tx_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-amber-400 hover:underline font-mono"
                    >
                      {selectedOrder.tx_hash.slice(0, 20)}...
                    </a>
                  </div>
                )}

                {selectedOrder.notes && (
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Notes</div>
                    <div className="text-sm text-slate-400 bg-slate-800/50 p-3 rounded">{selectedOrder.notes}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

