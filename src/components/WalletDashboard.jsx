import { useAccount } from 'wagmi';
import { useGaiaSpeakBalances } from '../hooks/useTokenBalance';
import { useProtocolStage } from '../hooks/useProtocolStage';

export function WalletDashboard() {
  const { isConnected, address } = useAccount();
  const { gsg, gss, isContractDeployed } = useGaiaSpeakBalances();
  const { stageName, stageColor, stageDescription } = useProtocolStage();

  if (!isConnected) {
    return (
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 text-center">
        <div className="text-slate-400 mb-2">Connect your wallet to view balances</div>
        <p className="text-xs text-slate-500">
          Supports MetaMask, WalletConnect, and more
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
      {/* Connected Address */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Connected Wallet</div>
          <div className="text-slate-300 font-mono text-sm">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Protocol Stage</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: stageColor }} />
            <span className="font-semibold" style={{ color: stageColor }}>{stageName}</span>
          </div>
        </div>
      </div>

      {/* Token Balances */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* GSG Balance */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-amber-500/10">
          <div className="text-xs text-amber-400/70 uppercase tracking-wider mb-1">GSG Balance</div>
          <div className="text-2xl font-light text-amber-400">
            {isContractDeployed ? gsg.balance.toFixed(4) : '0.0000'}
          </div>
          <div className="text-xs text-slate-500 mt-1">Gold grams</div>
        </div>

        {/* GSS Balance */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-400/10">
          <div className="text-xs text-slate-400/70 uppercase tracking-wider mb-1">GSS Balance</div>
          <div className="text-2xl font-light text-slate-300">
            {isContractDeployed ? gss.balance.toFixed(4) : '0.0000'}
          </div>
          <div className="text-xs text-slate-500 mt-1">Silver grams</div>
        </div>
      </div>

      {/* Stage Description */}
      <div className="text-xs text-slate-500 text-center">
        {stageDescription}
      </div>

      {!isContractDeployed && (
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded text-xs text-amber-400/80 text-center">
          Contracts not yet deployed on Polygon Amoy. Balances will appear after deployment.
        </div>
      )}
    </div>
  );
}

