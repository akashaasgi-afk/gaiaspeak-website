import { useState, useEffect, useCallback } from 'react';
import { createPublicClient, http, formatUnits } from 'viem';
import { mainnet } from 'viem/chains';
import { CHAINLINK_AGGREGATOR_ABI, CHAINLINK_FEEDS } from '../config/contracts';

// Create a public client for Ethereum mainnet (read-only for price feeds)
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http('https://eth.llamarpc.com'),
});

// Convert troy ounce price to per gram (1 troy oz = 31.1035 grams)
const GRAMS_PER_TROY_OUNCE = 31.1035;

export function useChainlinkPrice(feedType = 'XAU_USD') {
  const [price, setPrice] = useState(null);
  const [pricePerGram, setPricePerGram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchPrice = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const feedAddress = CHAINLINK_FEEDS[feedType];
      if (!feedAddress) {
        throw new Error(`Unknown feed type: ${feedType}`);
      }

      // Get latest price data
      const [roundData, decimals] = await Promise.all([
        publicClient.readContract({
          address: feedAddress,
          abi: CHAINLINK_AGGREGATOR_ABI,
          functionName: 'latestRoundData',
        }),
        publicClient.readContract({
          address: feedAddress,
          abi: CHAINLINK_AGGREGATOR_ABI,
          functionName: 'decimals',
        }),
      ]);

      const [, answer, , updatedAt] = roundData;
      const priceInUSD = parseFloat(formatUnits(answer, decimals));
      const gramPrice = priceInUSD / GRAMS_PER_TROY_OUNCE;

      setPrice(priceInUSD);
      setPricePerGram(gramPrice);
      setLastUpdated(new Date(Number(updatedAt) * 1000));
    } catch (err) {
      console.error(`Error fetching ${feedType} price:`, err);
      setError(err.message);
      
      // Fallback prices (approximate values)
      if (feedType === 'XAU_USD') {
        setPrice(2800); // ~$2800/oz gold
        setPricePerGram(90.02);
      } else if (feedType === 'XAG_USD') {
        setPrice(32); // ~$32/oz silver
        setPricePerGram(1.03);
      }
    } finally {
      setLoading(false);
    }
  }, [feedType]);

  useEffect(() => {
    fetchPrice();
    
    // Refresh price every 30 seconds
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, [fetchPrice]);

  return {
    price,
    pricePerGram,
    loading,
    error,
    lastUpdated,
    refetch: fetchPrice,
  };
}

// Hook to get both gold and silver prices
export function useGaiaSpeakPrices() {
  const gold = useChainlinkPrice('XAU_USD');
  const silver = useChainlinkPrice('XAG_USD');

  return {
    gold: {
      pricePerOz: gold.price,
      pricePerGram: gold.pricePerGram,
      loading: gold.loading,
      error: gold.error,
      lastUpdated: gold.lastUpdated,
    },
    silver: {
      pricePerOz: silver.price,
      pricePerGram: silver.pricePerGram,
      loading: silver.loading,
      error: silver.error,
      lastUpdated: silver.lastUpdated,
    },
    isLoading: gold.loading || silver.loading,
    refetch: () => {
      gold.refetch();
      silver.refetch();
    },
  };
}

