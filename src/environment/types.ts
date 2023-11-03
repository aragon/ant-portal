export type EnvNetworkName = 'ethereum' | 'rinkeby' | 'goerli'

type LegacyNetworkType = 'main' | 'rinkeby' | 'goerli'
type ChainId = 1 | 4 | 5

export interface EnvVariables {
  NETWORK_ENVIRONMENT(): string
  IPFS_GATEWAY(): string
  FORTMATIC_API_KEY(): string
  PORTIS_DAPP_ID(): string
  SENTRY_DSN(): string
  ANALYTICS_ENABLED(): string
  WALLETCONNECTV2_PROJECTID(): string
}

export interface EnvNetworkConfig {
  chainId: ChainId
  legacyNetworkType: LegacyNetworkType
  endpoints: {
    ethereum: string
  }
  ipfsGateway: string
  contracts: {
    court?: string
    tokenAntV1?: string
    tokenAntV2: string
    tokenAnj?: string
    anjNoLockMinterMigrator?: string
    antV2Migrator?: string
    antEthUniswapPool?: string
    antUniIncentivePool?: string
    antEthBalancerPool?: string
    antV2Redemption?: string
    blockList?: string
  }
}
