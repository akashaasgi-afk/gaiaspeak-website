import { useGaiaSpeakPrices } from '../hooks/useChainlinkPrice';

export function PriceTicker() {
  const { gold, silver, isLoading } = useGaiaSpeakPrices();

  const formatPrice = (price, decimals = 2) => {
    if (price === null || price === undefined) return '---';
    return `$${price.toFixed(decimals)}`;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
      {/* Gold Price */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-amber-400/70 uppercase">
            GSG · Gold
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        </div>
        <div className={`text-3xl sm:text-4xl lg:text-5xl font-light text-amber-400 transition-opacity ${isLoading ? 'opacity-50' : ''}`}>
          {formatPrice(gold.pricePerGram)}
        </div>
        <div className="text-[10px] sm:text-xs text-slate-500 mt-1">
          per gram · Chainlink XAU/USD
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-12 sm:h-16 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
      <div className="sm:hidden w-16 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

      {/* Silver Price */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-slate-400/70 uppercase">
            GSS · Silver
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        </div>
        <div className={`text-3xl sm:text-4xl lg:text-5xl font-light text-slate-300 transition-opacity ${isLoading ? 'opacity-50' : ''}`}>
          {formatPrice(silver.pricePerGram, 4)}
        </div>
        <div className="text-[10px] sm:text-xs text-slate-500 mt-1">
          per gram · Chainlink XAG/USD
        </div>
      </div>
    </div>
  );
}

