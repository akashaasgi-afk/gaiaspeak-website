import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReservationCount } from '../config/supabase';

const features = [
  {
    icon: '📱',
    title: 'App Integration',
    desc: 'Full GaiaSpeak ecosystem in your wrist',
  },
  {
    icon: '💳',
    title: 'Payment Function',
    desc: 'Tap to pay with your tokens',
  },
  {
    icon: '🔐',
    title: 'Identity Verification',
    desc: 'Secure biometric authentication',
  },
  {
    icon: '❤️',
    title: 'Health Monitoring',
    desc: 'Track vitals in real-time',
  },
  {
    icon: '🌍',
    title: 'Environmental Sensing',
    desc: 'Air quality & UV detection',
  },
  {
    icon: '📡',
    title: 'Offline Capability',
    desc: 'Works without connectivity',
  },
];

export function WhiteSection() {
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      const result = await getReservationCount();
      if (result.success) {
        setOrderCount(result.count);
      }
    }
    fetchCount();
  }, []);

  return (
    <section id="white" className="py-16 sm:py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-950">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-medium tracking-widest text-white/80 uppercase">
              Hardware · {orderCount} Pre-Orders
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-100 mb-4">
            <span className="text-white font-semibold">WHITE</span> is not a crisis.
            <br className="hidden sm:block" />
            <span className="text-slate-400 italic"> WHITE is a celebration.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The moment GaiaSpeak crosses from the digital into the physical world.
            A wearable device containing the full GaiaSpeak ecosystem.
          </p>
        </div>

        {/* Product Visual */}
        <div className="relative mb-10 sm:mb-16">
          {/* <div className="aspect-[16/9] sm:aspect-[21/9] rounded-lg sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 overflow-hidden flex items-center justify-center"> */}
            {/* Placeholder for bracelet image/3D */}
            {/* <div className="text-center">
              <div className="text-5xl sm:text-7xl mb-4">⌚</div>
              <p className="text-xs sm:text-sm text-slate-500">GaiaSpeak Bracelet · WHITE Collection</p>
            </div> */}
            {/* Glow effects */}
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-white/5 rounded-full blur-[80px] sm:blur-[120px]" /> */}
          {/* </div> */}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10 sm:mb-16">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3 sm:p-4 text-center hover:border-white/20 transition-colors"
            >
              <div className="text-xl sm:text-2xl mb-2">{f.icon}</div>
              <h4 className="text-xs sm:text-sm font-medium text-slate-200 mb-1">{f.title}</h4>
              <p className="text-[10px] sm:text-xs text-slate-500 leading-tight">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-slate-800/50 via-slate-800/30 to-slate-800/50 border border-slate-700/30">
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100 mb-1">
                Reserve Your Bracelet
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Hardware revenue independent of token market. Pay with GSG or GSS tokens.
              </p>
            </div>
            <Link
              to="/preorder"
              className="px-6 sm:px-8 py-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 whitespace-nowrap text-sm sm:text-base"
            >
              Pre-Order Now
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-600">
            Tokens transferred to Operations Wallet · Reservation NFT minted to your wallet
          </p>
        </div>
      </div>
    </section>
  );
}

