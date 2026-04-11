import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useProtocolStage } from '../hooks/useProtocolStage';

export function Navbar() {
  const { stageName, stageColor } = useProtocolStage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-semibold">
              <span className="text-amber-400">Gaia</span>
              <span className="text-slate-400">Speak</span>
            </span>
          </div>

          {/* Center - Stage Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: stageColor }}
            />
            <span className="text-xs font-medium text-slate-400">
              Stage: <span style={{ color: stageColor }}>{stageName}</span>
            </span>
          </div>

          {/* Right - Navigation & Connect */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <a href="#trade" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                Trade
              </a>
              <a href="#how" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                How It Works
              </a>
              <a href="#ecosystem" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                Ecosystem
              </a>
            </div>
            <ConnectButton 
              chainStatus="icon"
              showBalance={false}
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

