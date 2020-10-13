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
        tokenAntV2: '0xa117000000e374afd3689c684010fb13418a6b25',
        migrator: '0xb2dbeb75051ff6eaadc485d1ff10ff788c0d567c',
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
        tokenAntV1: '0xbB5D1487E74Feb5791Df39C0b52BA43A29794Ef2',
        tokenAntV2: '0xa117000000e374afd3689c684010fb13418a6b25',
        migrator: '0xb2dbeb75051ff6eaadc485d1ff10ff788c0d567c',
      },
    },
  ],
])

export function getNetworkConfig(name: EnvNetworkName): EnvNetworkConfig {
  return networks.get(name) as EnvNetworkConfig
}
