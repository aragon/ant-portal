export type EnvNetworkName = 'ethereum' | 'rinkeby'

export interface EnvVariables {
  NETWORK_ENVIRONMENT(): string
  IPFS_GATEWAY(): string
  FORTMATIC_API_KEY(): string
  PORTIS_DAPP_ID(): string
  SENTRY_DSN(): string
}

export interface EnvNetworkConfig {
  chainId: number
  legacyNetworkType: string
  endpoints: {
    ethereum: string
  }
  ipfsGateway: string
  contracts: {
    tokenAntV1: string
    tokenAntV2: string
    migrator: string
    antEthUniswapPool?: string
    antUniIncentivePool?: string
    antEthBalancerPool?: string
  }
}
