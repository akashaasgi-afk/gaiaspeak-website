// Chainlink AggregatorV3Interface ABI (minimal for reading prices)
export const CHAINLINK_AGGREGATOR_ABI = [
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
];

// Chainlink Price Feed Addresses on Ethereum Mainnet
// (Used for reading live gold/silver prices - read-only)
export const CHAINLINK_FEEDS = {
  XAU_USD: '0x214eD9Da11D2fbe465a6fc601a91E62EbEc1a0D6', // Gold/USD
  XAG_USD: '0x379589227b15F1336D27dDEC916B4688E9b9ad47', // Silver/USD (if available, otherwise mock)
};

// ERC20 Token ABI (minimal for balance checking)
export const ERC20_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
];

// GaiaSpeak Token Addresses on Polygon Amoy (PLACEHOLDER - update when deployed)
export const GAIASPEAK_TOKENS = {
  GSG: '0x0000000000000000000000000000000000000000', // GaiaSpeak Gold - TO BE DEPLOYED
  GSS: '0x0000000000000000000000000000000000000000', // GaiaSpeak Silver - TO BE DEPLOYED
};

// GaiaSpeak Protocol Contract ABI (purchaseTokens function - for reference)
export const GAIASPEAK_TOKEN_ABI = [
  {
    inputs: [],
    name: 'purchaseTokens',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentStage',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
];

// Protocol stages
export const PROTOCOL_STAGES = {
  0: { name: 'GREEN', color: '#22c55e', description: 'Active - Pioneer rewards live' },
  1: { name: 'YELLOW', color: '#eab308', description: 'Transition phase' },
  2: { name: 'GOLD', color: '#f59e0b', description: 'Premium tier active' },
  3: { name: 'BLUE', color: '#3b82f6', description: 'Mature protocol' },
};

// Token distribution percentages
export const TOKEN_DISTRIBUTION = {
  reserve: 87.11,
  operations: 11.88,
  founder: 1.0,
  pioneers: 0.01,
};

