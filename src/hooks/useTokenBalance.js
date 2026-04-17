import { useReadContract, useAccount } from 'wagmi';
import { formatUnits } from 'viem';
import { ERC20_ABI, GAIASPEAK_TOKENS } from '../config/contracts';

export function useTokenBalance(tokenAddress) {
  const { address: userAddress, isConnected } = useAccount();

  const { data: balance, isLoading, error, refetch } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: isConnected && !!userAddress && tokenAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: {
      enabled: tokenAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  const formattedBalance = balance && decimals
    ? parseFloat(formatUnits(balance, decimals))
    : 0;

  return {
    balance: formattedBalance,
    rawBalance: balance,
    isLoading,
    error,
    refetch,
    isConnected,
  };
}

// Hook to get both GSG and GSS balances
export function useGaiaSpeakBalances() {
  const gsg = useTokenBalance(GAIASPEAK_TOKENS.GSG);
  const gss = useTokenBalance(GAIASPEAK_TOKENS.GSS);

  // Since contracts aren't deployed yet, return placeholder data
  const isContractDeployed = 
    GAIASPEAK_TOKENS.GSG !== '0x0000000000000000000000000000000000000000';

  return {
    gsg: {
      balance: isContractDeployed ? gsg.balance : 0,
      isLoading: gsg.isLoading,
      error: gsg.error,
    },
    gss: {
      balance: isContractDeployed ? gss.balance : 0,
      isLoading: gss.isLoading,
      error: gss.error,
    },
    isConnected: gsg.isConnected,
    isContractDeployed,
    refetch: () => {
      gsg.refetch();
      gss.refetch();
    },
  };
}

