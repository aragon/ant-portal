import { EnvNetworkConfig, EnvNetworkName } from './types'

const networks = new Map<EnvNetworkName, EnvNetworkConfig>([
  [
    'ethereum',
    {
      chainId: 1,
      legacyNetworkType: 'main',
      endpoints: {
        ethereum: 'https://mainnet.eth.aragon.network/',
      },
      ipfsGateway: 'https://ipfs.eth.aragon.network/ipfs',
      contracts: {
        tokenAntV1: '0x960b236A07cf122663c4303350609A66A7B288C0',
        tokenAntV2: '0xa117000000f279D81A1D3cc75430fAA017FA5A2e',
        migrator: '0x078BEbC744B819657e1927bF41aB8C74cBBF912D',
      },
    },
  ],
  [
    'rinkeby',
    {
      chainId: 4,
      legacyNetworkType: 'rinkeby',
      endpoints: {
        ethereum: 'https://rinkeby.eth.aragon.network/',
      },
      ipfsGateway: 'https://ipfs.eth.aragon.network/ipfs',
      contracts: {
        tokenAntV1: '0x7278e85BfFCE26A1C9f21b879595BD63F6289297',
        tokenAntV2: '0xa117000000f279D81A1D3cc75430fAA017FA5A2e',
        migrator: '0x078BEbC744B819657e1927bF41aB8C74cBBF912D',
      },
    },
  ],
])

export function getNetworkConfig(name: EnvNetworkName): EnvNetworkConfig {
  return networks.get(name) as EnvNetworkConfig
}
