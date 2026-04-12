import { useProtocolStage } from '../hooks/useProtocolStage';
import { WalletDashboard } from './WalletDashboard';
import { PROTOCOL_STAGES } from '../config/contracts';

export function StageIndicator() {
  const { stage, stageName, stageColor, stageDescription } = useProtocolStage();

  return (
    <section className="py-12 sm:py-20 px-4 bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-[10px] sm:text-xs font-semibold tracking-widest text-amber-400 uppercase mb-2">
            Protocol Status
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-100 mb-3 sm:mb-4">
            Current Stage: <span style={{ color: stageColor }} className="font-semibold">{stageName}</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
            {stageDescription}
          </p>
        </div>

        {/* Stage Timeline */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-4 px-2">
          {Object.entries(PROTOCOL_STAGES).map(([key, info]) => {
            const isActive = parseInt(key) === stage;
            const isPast = parseInt(key) < stage;

            return (
              <div
                key={key}
                className={`flex flex-col items-center min-w-[60px] sm:min-w-[80px] ${
                  isActive ? 'opacity-100' : isPast ? 'opacity-50' : 'opacity-30'
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isActive ? 'scale-110' : ''
                  }`}
                  style={{
                    borderColor: info.color,
                    backgroundColor: isActive ? info.color + '20' : 'transparent'
                  }}
                >
                  {isPast ? (
                    <span className="text-green-500 text-sm">✓</span>
                  ) : isActive ? (
                    <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse" style={{ backgroundColor: info.color }} />
                  ) : (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-600" />
                  )}
                </div>
                <span
                  className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-semibold tracking-wider"
                  style={{ color: isActive ? info.color : '#64748b' }}
                >
                  {info.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Wallet Dashboard */}
        <div className="max-w-sm sm:max-w-md mx-auto">
          <WalletDashboard />
        </div>
      </div>
    </section>
  );
}

