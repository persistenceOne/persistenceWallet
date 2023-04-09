import { ChainInfo } from "@keplr-wallet/types";
import { GasPrice } from "@cosmjs/stargate";
import { Bech32Address } from "@keplr-wallet/cosmos";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

export interface IBCChainInfo {
  counterpartyChainId: string;
  chainName: string;
  sourceChannelId: string;
  portID: string;
  coinMinimalDenom: string;
  prefix: string;
}

export interface Options {
  prefix: string;
  broadcastPollIntervalMs: number;
  broadcastTimeoutMs: number;
  gasPrice: GasPrice;
}

export interface WalletProviderProps {
  cosmosChainInfo: ChainInfo;
  persistenceChainInfo: ChainInfo;
  children: JSX.Element;
}

export type walletType = "keplr" | "cosmosStation";

interface ExternalChainData {
  [index: string]: ChainInfo[];
}

export type IBCChainData = {
  [index: string]: IBCChainInfo[];
};

export const DefaultChainInfo = {
  counterpartyChainId: "core-1",
  chainName: "Persistence",
  prefix: "persistence",
  ledgerAppName: "Persistence",
  currency: {
    coinDenom: "XPRT",
    coinMinimalDenom: "uxprt",
    coinDecimals: 6,
    coinGeckoId: "persistence",
  },
  deprecatedCoinType: 750,
  coinType: 118,
  uTokenValue: 1000000,
};

export const AccountInfo = {
  maxAccountIndex: 2147483647,
  maxAccountNumber: 2147483647,
};

export const PstakeInfo = {
  coinDenom: "PSTAKE",
  coinMinimalDenom:
    "ibc/A6E3AF63B3C906416A9AF7A556C59EA4BD50E617EFFE6299B99700CCB780E444",
  baseDenom: "gravity0xfB5c6815cA3AC72Ce9F5006869AE67f18bF77006",
  coinDecimals: 18,
};

export const stkATOMInfo = {
  coinDenom: "STKATOM",
  coinMinimalDenom: "stk/uatom",
  coinDecimals: 6,
  coinGeckoId: "persistence",
};

export const GasInfo = {
  gas: 250000,
  minGas: 80000,
  maxGas: 2000000,
};

export const FeeInfo = {
  lowFee: 0,
  averageFee: 0.025,
  highFee: 0.04,
  defaultFee: "5000",
  vestingAccountFee: "0",
};

export const IBCConfiguration = {
  timeoutTimestamp: 1000,
  ibcRevisionHeightIncrement: 1000,
  ibcRemoteHeightIncrement: 150,
  ibcDefaultPort: "transfer",
};

export const CHAIN_ID: any = {
  Devnet: {
    cosmosChainID: "gaiad-1",
    persistenceChainID: "pstaked-1",
  },
  Testnet: {
    cosmosChainID: "theta-testnet-001",
    persistenceChainID: "test-core-1",
  },
  Mainnet: {
    cosmosChainID: "cosmoshub-4",
    persistenceChainID: "core-1",
  },
};

export const IBCChainInfos: IBCChainData = {
  Testnet: [
    {
      counterpartyChainId: "osmosis-1",
      chainName: "Osmosis",
      sourceChannelId: "channel-6",
      portID: "transfer",
      coinMinimalDenom: "uatom",
      prefix: "osmo",
    },
    {
      counterpartyChainId: "cosmoshub-4",
      chainName: "Cosmos",
      sourceChannelId: "channel-24",
      portID: "transfer",
      coinMinimalDenom: "uatom",
      prefix: "cosmos",
    },
    {
      counterpartyChainId: "juno-1",
      chainName: "Juno",
      sourceChannelId: "channel-37",
      portID: "transfer",
      coinMinimalDenom: "ujuno",
      prefix: "juno",
    },
    {
      counterpartyChainId: "gravity-bridge-3",
      chainName: "Gravity",
      sourceChannelId: "channel-38",
      portID: "transfer",
      coinMinimalDenom: "ugraviton",
      prefix: "gravity",
    },
  ],
  Mainnet: [
    {
      counterpartyChainId: "osmosis-1",
      chainName: "Osmosis",
      sourceChannelId: "channel-6",
      portID: "transfer",
      coinMinimalDenom: "uatom",
      prefix: "osmo",
    },
    {
      counterpartyChainId: "cosmoshub-4",
      chainName: "Cosmos",
      sourceChannelId: "channel-24",
      portID: "transfer",
      coinMinimalDenom: "uatom",
      prefix: "cosmos",
    },
    {
      counterpartyChainId: "juno-1",
      chainName: "Juno",
      sourceChannelId: "channel-37",
      portID: "transfer",
      coinMinimalDenom: "ujuno",
      prefix: "juno",
    },
    {
      counterpartyChainId: "gravity-bridge-3",
      chainName: "Gravity",
      sourceChannelId: "channel-38",
      portID: "transfer",
      coinMinimalDenom: "ugraviton",
      prefix: "gravity",
    },
  ],
};

export const ExternalChains: ExternalChainData = {
  Testnet: [
    {
      rpc: "https://rpc.testnet.persistence.one",
      rest: "https://rest.testnet.persistence.one/",
      chainId: "test-core-1",
      chainName: "Persistence test-net",
      stakeCurrency: {
        coinDenom: "XPRT",
        coinMinimalDenom: "uxprt",
        coinDecimals: 6,
        coinGeckoId: "persistence",
      },
      bip44: {
        coinType: 118,
      },
      currencies: [
        {
          coinDenom: "XPRT",
          coinMinimalDenom: "uxprt",
          coinDecimals: 6,
          coinGeckoId: "persistence",
        },
        {
          coinDenom: "STKATOM",
          coinMinimalDenom: "stk/uatom",
          coinDecimals: 6,
          coinGeckoId: "persistence",
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "XPRT",
          coinMinimalDenom: "uxprt",
          coinDecimals: 6,
          coinGeckoId: "persistence",
        },
      ],
      bech32Config: {
        bech32PrefixAccAddr: "persistence",
        bech32PrefixAccPub: "persistencepub",
        bech32PrefixValAddr: "persistencevaloper",
        bech32PrefixValPub: "persistencevaloperpub",
        bech32PrefixConsAddr: "persistencevalcons",
        bech32PrefixConsPub: "persistencevalconspub",
      },
      gasPriceStep: {
        low: 0.0,
        average: 0.01,
        high: 0.025,
      },
    },
    {
      rpc: "https://rpc.testnet-cosmos.audit.one",
      rest: "https://rest.testnet-cosmos.audit.one",
      chainId: "theta-testnet-001",
      chainName: "pStake Cosmos Testnet",
      stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
      },
      bip44: {
        coinType: 118,
      },
      currencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos",
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos",
        },
      ],
      bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmospub",
        bech32PrefixValAddr: "cosmosvaloper",
        bech32PrefixValPub: "cosmosvaloperpub",
        bech32PrefixConsAddr: "cosmosvalcons",
        bech32PrefixConsPub: "persistencevalconspub",
      },
    },
    {
      rpc: "https://rpc.osmosis-1.audit.one",
      rest: "https://rest.osmosis-1.audit.one",
      chainId: "osmosis-1",
      chainName: "Osmosis",
      bip44: {
        coinType: 118,
      },
      bech32Config: {
        bech32PrefixAccAddr: "persistence",
        bech32PrefixAccPub: "persistencepub",
        bech32PrefixValAddr: "persistencevaloper",
        bech32PrefixValPub: "persistencevaloperpub",
        bech32PrefixConsAddr: "persistencevalcons",
        bech32PrefixConsPub: "persistencevalconspub",
      },
      currencies: [
        {
          coinDenom: "OSMO",
          coinMinimalDenom: "uosmo",
          coinDecimals: 6,
          // coinGeckoId: "osmosis",
          coinGeckoId: "pool:uosmo",
          coinImageUrl: "/tokens/osmo.svg",
        },
        {
          coinDenom: "ION",
          coinMinimalDenom: "uion",
          coinDecimals: 6,
          // coinGeckoId: "ion",
          coinGeckoId: "pool:uion",
          coinImageUrl: "/tokens/ion.png",
        },
      ],
      gasPriceStep: {
        low: 0.0,
        average: 0.0,
        high: 0.0,
      },
      feeCurrencies: [
        {
          coinDenom: "OSMO",
          coinMinimalDenom: "uosmo",
          coinDecimals: 6,
          // coinGeckoId: "osmosis",
          coinGeckoId: "pool:uosmo",
        },
      ],
      stakeCurrency: {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
        // coinGeckoId: "osmosis",
        coinGeckoId: "pool:uosmo",
      },
    },
  ],
  Mainnet: [
    {
      rpc: "https://rpc.cosmos.audit.one/",
      rest: "https://rest.cosmos.audit.one/",
      chainId: "cosmoshub-4",
      chainName: "Cosmos Hub",
      stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
      },
      bip44: {
        coinType: 118,
      },
      currencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos",
          coinImageUrl: "/tokens/atom.png",
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos",
        },
      ],
      bech32Config: Bech32Address.defaultBech32Config("cosmos"),
    },
    {
      rpc: "https://rpc.core.persistence.one/",
      rest: "https://rest.core.persistence.one/",
      chainId: "core-1",
      chainName: "Persistence",
      stakeCurrency: {
        coinDenom: "XPRT",
        coinMinimalDenom: "uxprt",
        coinDecimals: 6,
        coinGeckoId: "persistence",
      },
      bip44: {
        coinType: 118,
      },
      currencies: [
        {
          coinDenom: "XPRT",
          coinMinimalDenom: "uxprt",
          coinDecimals: 6,
          coinImageUrl: "/tokens/xprt.png",
          coinGeckoId: "persistence",
        },
        {
          coinDenom: "PSTAKE",
          coinMinimalDenom:
            "ibc/A6E3AF63B3C906416A9AF7A556C59EA4BD50E617EFFE6299B99700CCB780E444",
          coinDecimals: 18,
          coinImageUrl: "/tokens/pstake.png",
          coinGeckoId: "pstake-finance",
        },
        {
          coinDenom: "STKATOM",
          coinMinimalDenom: "stk/uatom",
          coinDecimals: 6,
          coinImageUrl: "/tokens/stkatom.svg",
          coinGeckoId: "persistence",
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "XPRT",
          coinMinimalDenom: "uxprt",
          coinDecimals: 6,
          coinGeckoId: "persistence",
        },
      ],
      bech32Config: Bech32Address.defaultBech32Config("persistence"),
      gasPriceStep: {
        low: 0.0,
        average: 0.0,
        high: 0.0,
      },
    },
    {
      rpc: "https://rpc.osmosis-1.audit.one",
      rest: "https://rest.osmosis-1.audit.one",
      chainId: "osmosis-1",
      chainName: "Osmosis",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("osmo"),
      currencies: [
        {
          coinDenom: "OSMO",
          coinMinimalDenom: "uosmo",
          coinDecimals: 6,
          // coinGeckoId: "osmosis",
          coinGeckoId: "pool:uosmo",
          coinImageUrl: "/tokens/osmo.svg",
        },
      ],
      gasPriceStep: {
        low: 0.0,
        average: 0.0,
        high: 0.0,
      },
      feeCurrencies: [
        {
          coinDenom: "OSMO",
          coinMinimalDenom: "uosmo",
          coinDecimals: 6,
          // coinGeckoId: "osmosis",
          coinGeckoId: "pool:uosmo",
        },
      ],
      stakeCurrency: {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
        // coinGeckoId: "osmosis",
        coinGeckoId: "pool:uosmo",
      },
    },
    {
      rpc: "https://gravitychain.io:26657",
      rest: "https://gravitychain.io:1317",
      chainId: "gravity-bridge-3",
      chainName: "Gravity Bridge",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("gravity"),
      currencies: [
        {
          coinDenom: "GRAV",
          coinMinimalDenom: "ugraviton",
          coinDecimals: 6,
          // coinGeckoId: "graviton",
          coinGeckoId: "pool:ugraviton",
          coinImageUrl: "/tokens/grav.svg",
        },
        {
          coinDenom: "PSTAKE",
          coinMinimalDenom: "gravity0xfB5c6815cA3AC72Ce9F5006869AE67f18bF77006",
          coinDecimals: 18,
          // coinGeckoId: "pstake-finance",
          coinGeckoId: "pool:pstake",
          coinImageUrl: "/tokens/pstake.png",
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "GRAV",
          coinMinimalDenom: "ugraviton",
          coinDecimals: 6,
          coinGeckoId: "",
        },
      ],
      stakeCurrency: {
        coinDenom: "GRAV",
        coinMinimalDenom: "ugraviton",
        coinDecimals: 6,
        coinGeckoId: "",
      },
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0.035,
      },
      features: ["ibc-transfer", "ibc-go"],
    },
    {
      rpc: "https://rpc.comdex.one",
      rest: "https://rest.comdex.one",
      chainId: "comdex-1",
      chainName: "Comdex",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("comdex"),
      currencies: [
        {
          coinDenom: "CMDX",
          coinMinimalDenom: "ucmdx",
          coinDecimals: 6,
          //coinGeckoId: "comdex",
          coinGeckoId: "pool:ucmdx",
          coinImageUrl: "/tokens/cmdx.png",
        },
        {
          coinDenom: "CMST",
          coinMinimalDenom: "ucmst",
          coinDecimals: 6,
          coinGeckoId: "pool:ucmst",
          coinImageUrl: "/tokens/cmst.png",
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "CMDX",
          coinMinimalDenom: "ucmdx",
          coinDecimals: 6,
          //coinGeckoId: "comdex",
          coinGeckoId: "pool:ucmdx",
          coinImageUrl: "/tokens/cmdx.png",
        },
      ],
      stakeCurrency: {
        coinDenom: "CMDX",
        coinMinimalDenom: "ucmdx",
        coinDecimals: 6,
        //coinGeckoId: "comdex",
        coinGeckoId: "pool:ucmdx",
        coinImageUrl: "/tokens/cmdx.png",
      },
    },
    {
      rpc: "https://rpc-evmos.keplr.app/",
      rest: "https://lcd-evmos.keplr.app/",
      chainId: "evmos_9001-2",
      chainName: "Evmos",
      bip44: {
        coinType: 60,
      },
      bech32Config: Bech32Address.defaultBech32Config("evmos"),
      currencies: [
        {
          coinDenom: "EVMOS",
          coinMinimalDenom: "aevmos",
          coinDecimals: 18,
          // coinGeckoId: "evmos",
          coinGeckoId: "pool:aevmos",
          coinImageUrl: "/tokens/evmos.svg",
        },
      ],
      gasPriceStep: {
        low: 10000000000,
        average: 25000000000,
        high: 40000000000,
      },
      features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
      feeCurrencies: [
        {
          coinDenom: "EVMOS",
          coinMinimalDenom: "aevmos",
          coinDecimals: 18,
          // coinGeckoId: "evmos",
          coinGeckoId: "pool:aevmos",
          coinImageUrl: "/tokens/evmos.svg",
        },
      ],
      stakeCurrency: {
        coinDenom: "EVMOS",
        coinMinimalDenom: "aevmos",
        coinDecimals: 18,
        // coinGeckoId: "evmos",
        coinGeckoId: "pool:aevmos",
        coinImageUrl: "/tokens/evmos.svg",
      },
    },
    {
      rpc: "https://api.mainnet.rebus.money:26657",
      rest: "https://api.mainnet.rebus.money:1317",
      chainId: "reb_1111-1",
      chainName: "Rebus",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("rebus"),
      currencies: [
        {
          coinDenom: "REBUS",
          coinMinimalDenom: "arebus",
          coinDecimals: 18,
          // coinGeckoId: "rebus",
          coinGeckoId: "pool:arebus",
          coinImageUrl: "/tokens/rebus.png",
        },
      ],
      features: ["ibc-transfer", "ibc-go"],
      feeCurrencies: [
        {
          coinDenom: "REBUS",
          coinMinimalDenom: "arebus",
          coinDecimals: 18,
          // coinGeckoId: "rebus",
          coinGeckoId: "pool:arebus",
          coinImageUrl: "/tokens/rebus.png",
        },
      ],
      stakeCurrency: {
        coinDenom: "REBUS",
        coinMinimalDenom: "arebus",
        coinDecimals: 18,
        // coinGeckoId: "rebus",
        coinGeckoId: "pool:arebus",
        coinImageUrl: "/tokens/rebus.png",
      },
    },
  ],
};

export const PollingConfig = {
  initialTxHashQueryDelay: 5000,
  scheduledTxHashQueryDelay: 5000,
  numberOfRetries: 60,
};

export const TestNetFoundationNodes = [
  "persistencevaloper1xepyv8lf99pa4x0w2ptr3vx3rr7wfs6msh2m76",
];

export const MainNetFoundationNodes = [
  "persistencevaloper19ehhcj0fqw22vwqgll9g70njsv7eq9068pprfu",
  "persistencevaloper1hndk2s0dx9p0pxd9pxwmls3eywpdu5ha76kpqs",
  "persistencevaloper1ve9ls5wnczj72mxldewze8u46sarlatmgmp3nd",
  "persistencevaloper1emrvay43wy7f4ylwen3yxhm9qxddy8zc9zdk5y",
  "persistencevaloper13dv6h3wtmhmt0jprhaw9pv343qanttkty4685v",
];
