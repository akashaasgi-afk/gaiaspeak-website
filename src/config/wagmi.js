import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, polygonAmoy } from 'wagmi/chains';

// Polygon Amoy is the testnet for wallet interactions
// Ethereum mainnet is used for reading Chainlink price feeds (XAU/USD, XAG/USD)

export const config = getDefaultConfig({
  appName: 'GaiaSpeak Protocol',
  projectId: 'gaiaspeak-protocol-demo', // Replace with your WalletConnect Cloud project ID
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http('https://rpc-amoy.polygon.technology'),
  },
});

// Separate config for reading Chainlink price feeds from Ethereum mainnet
export const mainnetConfig = {
  chainId: mainnet.id,
  rpcUrl: 'https://eth.llamarpc.com', // Public RPC for reading prices
};

// Chain info for display
export const SUPPORTED_CHAIN = {
  id: polygonAmoy.id,
  name: 'Polygon Amoy',
  network: 'amoy',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc-amoy.polygon.technology'] },
  },
  blockExplorers: {
    default: { name: 'PolygonScan', url: 'https://amoy.polygonscan.com' },
  },
  testnet: true,
};

