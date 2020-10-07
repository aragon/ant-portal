import { EnvNetworkType, EnvNetworkName } from './types'

const networks = new Map<EnvNetworkName, EnvNetworkType>([
  [
    'ethereum',
    {
      chainId: 1,
      legacyNetworkType: 'main',
      endpoints: {
        ethereum: 'https://mainnet.eth.aragon.network/',
      },
      ipfsGateway: 'https://ipfs.eth.aragon.network/ipfs',
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
    },
  ],
])

export function getNetworkConfig(name: EnvNetworkName): EnvNetworkType {
  return networks.get(name) as EnvNetworkType
}
