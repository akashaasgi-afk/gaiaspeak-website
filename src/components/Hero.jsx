import { PriceTicker } from './PriceTicker';
import { useProtocolStage } from '../hooks/useProtocolStage';

export function Hero() {
  const { stageName, stageColor } = useProtocolStage();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-slate-400/5 rounded-full blur-[100px]" />
      </div>

      {/* Live Badge */}
      <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-xs font-medium text-slate-400">
          Live on Polygon Amoy · Chainlink Oracle Verified · Stage:{' '}
          <span style={{ color: stageColor }}>{stageName}</span>
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-4">
        <span className="text-slate-100">Gold & Silver.</span>
        <br />
        <span className="text-amber-400 italic">On the Blockchain.</span>
      </h1>

      {/* Tagline */}
      <p className="text-xl sm:text-2xl text-slate-400 font-light mb-12 max-w-xl">
        1 token = 1 gram. Fractional from $1.00. Yours forever.
      </p>

      {/* Live Price Ticker */}
      <div className="mb-12">
        <PriceTicker />
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <a 
          href="#trade"
          className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/25"
        >
          Buy Gold Token
        </a>
        <a 
          href="#how"
          className="px-8 py-3 border border-slate-600 hover:border-amber-500 text-slate-300 hover:text-amber-400 font-semibold rounded-sm transition-all hover:-translate-y-0.5"
        >
          How It Works
        </a>
      </div>

      {/* Trust Badge */}
      <p className="text-xs text-slate-500">
        All contracts verified on-chain ·{' '}
        <a 
          href="https://amoy.polygonscan.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-amber-500/70 hover:text-amber-400 underline underline-offset-2"
        >
          View on Polygonscan →
        </a>
      </p>
    </section>
  );
}

