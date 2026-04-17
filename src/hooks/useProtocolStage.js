import { useReadContract } from 'wagmi';
import { GAIASPEAK_TOKEN_ABI, GAIASPEAK_TOKENS, PROTOCOL_STAGES } from '../config/contracts';

export function useProtocolStage() {
  const { data: stageData, isLoading, error, refetch } = useReadContract({
    address: GAIASPEAK_TOKENS.GSG,
    abi: GAIASPEAK_TOKEN_ABI,
    functionName: 'currentStage',
    query: {
      enabled: GAIASPEAK_TOKENS.GSG !== '0x0000000000000000000000000000000000000000',
    },
  });

  // Since contract isn't deployed yet, default to GREEN stage
  const isContractDeployed = 
    GAIASPEAK_TOKENS.GSG !== '0x0000000000000000000000000000000000000000';

  const currentStage = isContractDeployed && stageData !== undefined
    ? Number(stageData)
    : 0; // Default to GREEN

  const stageInfo = PROTOCOL_STAGES[currentStage] || PROTOCOL_STAGES[0];

  return {
    stage: currentStage,
    stageName: stageInfo.name,
    stageColor: stageInfo.color,
    stageDescription: stageInfo.description,
    isLoading,
    error,
    isContractDeployed,
    refetch,
  };
}

