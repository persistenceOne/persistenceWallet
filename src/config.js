export const DefaultChainInfo = {
  counterpartyChainId: "core-1",
  chainName: "Persistence",
  prefix: "persistence",
  ledgerAppName: "Persistence",
  currency: {
    coinDenom: "XPRT",
    coinMinimalDenom: "uxprt",
    coinDecimals: 6,
    coinGeckoId: "persistence"
  },
  deprecatedCoinType: 750,
  coinType: 118,
  uTokenValue: 1000000
};

export const AccountInfo = {
  maxAccountIndex: 2147483647,
  maxAccountNumber: 2147483647
};

export const BaseGas = 750000;

export const PstakeInfo = {
  coinDenom: "PSTAKE",
  coinMinimalDenom:
    "ibc/A6E3AF63B3C906416A9AF7A556C59EA4BD50E617EFFE6299B99700CCB780E444",
  baseDenom: "gravity0xfB5c6815cA3AC72Ce9F5006869AE67f18bF77006",
  coinDecimals: 18
};

export const PollingConfig = {
  initialTxHashQueryDelay: 5000,
  scheduledTxHashQueryDelay: 5000,
  numberOfRetries: 60
};

export const stkATOMInfo = {
  coinDenom: "STKATOM",
  coinMinimalDenom: "stk/uatom",
  coinDecimals: 6,
  coinGeckoId: "persistence"
};

export const GasInfo = {
  gas: BaseGas,
  minGas: 80000,
  maxGas: 2000000000000000000
};

export const FeeInfo = {
  lowFee: 0,
  averageFee: 0.025,
  highFee: 0.04,
  defaultFee: "5000",
  vestingAccountFee: "0"
};

export const IBCConfiguration = {
  timeoutTimestamp: 1000,
  ibcRevisionHeightIncrement: 1000,
  ibcRemoteHeightIncrement: 150,
  ibcDefaultPort: "transfer"
};

export const TestIBCChainInfos = [
  {
    counterpartyChainId: "",
    chainName: "Persistence",
    sourceChannelId: "channel-30",
    portID: "transfer",
    prefix: "persistence"
  }
];

export const IBCChainInfos = [
  {
    counterpartyChainId: "osmosis-1",
    chainName: "Osmosis",
    sourceChannelId: "channel-6",
    portID: "transfer",
    coinMinimalDenom: "uatom",
    prefix: "osmo"
  },
  {
    counterpartyChainId: "cosmoshub-4",
    chainName: "Cosmos",
    sourceChannelId: "channel-24",
    portID: "transfer",
    coinMinimalDenom: "uatom",
    prefix: "cosmos"
  },
  {
    counterpartyChainId: "juno-1",
    chainName: "Juno",
    sourceChannelId: "channel-37",
    portID: "transfer",
    coinMinimalDenom: "ujuno",
    prefix: "juno"
  },
  {
    counterpartyChainId: "gravity-bridge-3",
    chainName: "Gravity",
    sourceChannelId: "channel-38",
    portID: "transfer",
    coinMinimalDenom: "ugraviton",
    prefix: "gravity"
  }
];

export const ExternalChains = [
  {
    rpc: "https://rpc.core.persistence.one/",
    rest: "https://rest.core.persistence.one/",
    chainId: "core-1",
    chainName: "Persistence",
    portID: "transfer",
    currency: {
      coinDenom: "XPRT",
      coinMinimalDenom: "uxprt",
      coinDecimals: 6,
      coinGeckoId: "persistence"
    },
    coinType: 118
  },
  {
    rpc: "https://rpc.osmosis.zone",
    rest: "https://lsc.osmosis.zone",
    chainId: "osmosis-1",
    chainName: "Osmosis",
    portID: "transfer",
    currency: {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis"
    },
    coinType: 118
  },
  {
    rpc: "https://cosmos-rpc.polkachu.com/",
    rest: "https://cosmos-rest.staketab.org/",
    chainId: "cosmoshub-4",
    chainName: "Cosmos",
    currency: {
      coinDenom: "COSMOS",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: "cosmos"
    },
    coinType: 118,
    ledgerAppName: "Cosmos"
  },
  {
    rpc: "https://gravitychain.io:26657",
    rest: "https://gravitychain.io:1317",
    chainId: "gravity-bridge-3",
    chainName: "Gravity",
    currency: {
      coinDenom: "GRAV",
      coinMinimalDenom: "ugraviton",
      coinDecimals: 6,
      coinGeckoId: ""
    },
    coinType: 118
  },
  {
    rpc: "https://rpc-juno.itastakers.com/",
    rest: "https://lcd-juno.itastakers.com/",
    chainId: "juno-1",
    chainName: "Juno",
    currency: {
      coinDenom: "Juno",
      coinMinimalDenom: "ujuno",
      coinDecimals: 6,
      coinGeckoId: ""
    },
    coinType: 118
  }
];

export const TestNetFoundationNodes = [
  "persistencevaloper1xepyv8lf99pa4x0w2ptr3vx3rr7wfs6msh2m76"
];

export const MainNetFoundationNodes = [
  "persistencevaloper19ehhcj0fqw22vwqgll9g70njsv7eq9068pprfu",
  "persistencevaloper1hndk2s0dx9p0pxd9pxwmls3eywpdu5ha76kpqs",
  "persistencevaloper1ve9ls5wnczj72mxldewze8u46sarlatmgmp3nd",
  "persistencevaloper1emrvay43wy7f4ylwen3yxhm9qxddy8zc9zdk5y",
  "persistencevaloper13dv6h3wtmhmt0jprhaw9pv343qanttkty4685v"
];
