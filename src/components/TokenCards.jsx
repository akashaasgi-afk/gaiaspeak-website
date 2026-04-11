import { useGaiaSpeakPrices } from '../hooks/useChainlinkPrice';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function TokenCards() {
  const { gold, silver, isLoading } = useGaiaSpeakPrices();
  const { isConnected } = useAccount();

  const formatPrice = (price, decimals = 2) => {
    if (price === null || price === undefined) return '---';
    return `$${price.toFixed(decimals)}`;
  };

  // Note: purchaseTokens() function calls are disabled for now
  const handleBuyGSG = () => {
    console.log('Buy GSG clicked - purchaseTokens() would be called here');
    alert('Purchase functionality coming soon! The purchaseTokens() function will be enabled after contract deployment.');
  };

  const handleBuyGSS = () => {
    console.log('Buy GSS clicked - purchaseTokens() would be called here');
    alert('Purchase functionality coming soon! The purchaseTokens() function will be enabled after contract deployment.');
  };

  return (
    <section id="trade" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* GSG Card - Gold */}
          <div className="relative bg-slate-800/40 border border-amber-500/20 rounded-lg overflow-hidden group hover:border-amber-500/40 transition-all hover:-translate-y-1">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            
            <div className="p-6">
              <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-1">
                GSG · Gold Token
              </div>
              <h3 className="text-2xl font-light text-slate-100 mb-1">GaiaSpeak Gold</h3>
              <p className="text-sm text-slate-500 mb-4">1 token = 1 gram of physical gold</p>

              {/* Price Box */}
              <div className="bg-slate-900/50 rounded p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Price per gram</span>
                  <span className={`text-xl font-light text-amber-400 ${isLoading ? 'animate-pulse' : ''}`}>
                    {formatPrice(gold.pricePerGram)}
                  </span>
                </div>
              </div>

              {/* Min Purchase Info */}
              <div className="text-xs text-slate-500 bg-amber-500/5 border-l-2 border-amber-500/30 px-3 py-2 mb-4">
                Minimum purchase: $1.00 · Buy any fractional gram amount
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {isConnected ? (
                  <button
                    onClick={handleBuyGSG}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded transition-colors"
                  >
                    Buy GSG
                  </button>
                ) : (
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <button
                        onClick={openConnectModal}
                        className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded transition-colors"
                      >
                        Connect to Buy
                      </button>
                    )}
                  </ConnectButton.Custom>
                )}
              </div>
            </div>
          </div>

          {/* GSS Card - Silver */}
          <div className="relative bg-slate-800/40 border border-slate-500/20 rounded-lg overflow-hidden group hover:border-slate-400/40 transition-all hover:-translate-y-1">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
            
            <div className="p-6">
              <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-1">
                GSS · Silver Token
              </div>
              <h3 className="text-2xl font-light text-slate-100 mb-1">GaiaSpeak Silver</h3>
              <p className="text-sm text-slate-500 mb-4">1 token = 1 gram of physical silver</p>

              {/* Price Box */}
              <div className="bg-slate-900/50 rounded p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Price per gram</span>
                  <span className={`text-xl font-light text-slate-300 ${isLoading ? 'animate-pulse' : ''}`}>
                    {formatPrice(silver.pricePerGram, 4)}
                  </span>
                </div>
              </div>

              {/* Min Purchase Info */}
              <div className="text-xs text-slate-500 bg-slate-500/5 border-l-2 border-slate-500/30 px-3 py-2 mb-4">
                Most accessible entry point · No maximum limit
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {isConnected ? (
                  <button
                    onClick={handleBuyGSS}
                    className="flex-1 py-3 bg-slate-400 hover:bg-slate-300 text-slate-900 font-semibold rounded transition-colors"
                  >
                    Buy GSS
                  </button>
                ) : (
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <button
                        onClick={openConnectModal}
                        className="flex-1 py-3 bg-slate-400 hover:bg-slate-300 text-slate-900 font-semibold rounded transition-colors"
                      >
                        Connect to Buy
                      </button>
                    )}
                  </ConnectButton.Custom>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

