import { EnvNetworkConfig, EnvNetworkName } from './types'

const networks = new Map<EnvNetworkName, EnvNetworkConfig>()

networks.set('ethereum', {
  chainId: 1,
  legacyNetworkType: 'main',
  endpoints: {
    ethereum: 'https://mainnet.infura.io/v3/481a4cdc7c774286b8627f21c6827f48',
  },
  ipfsGateway: 'https://ipfs.eth.aragon.network/ipfs',
  contracts: {
    tokenAntV1: '0x960b236A07cf122663c4303350609A66A7B288C0',
    tokenAntV2: '0xa117000000f279D81A1D3cc75430fAA017FA5A2e',
    tokenAnj: '0xcD62b1C403fa761BAadFC74C525ce2B51780b184',
    anjNoLockMinterMigrator: '0xf6271c8eBF1C1C0384CBBD6Df8b84380623555Ef',
    antV2Migrator: '0x078BEbC744B819657e1927bF41aB8C74cBBF912D',
    antEthUniswapPool: '0xfa19de406e8f5b9100e4dd5cad8a503a6d686efe',
    antUniIncentivePool: '0xea4d68cf86bce59bf2bfa039b97794ce2c43debc',
    antEthBalancerPool: '0x2cf9106faf2c5c8713035d40df655fb1b9b0f9b9',
    court: '0xFb072baA713B01cE944A0515c3e1e98170977dAF',
    antV2Redemption: '0x80fBB6122b8E023988e640dB1ae348a10A7933E8',
    blockList: '0xd650D03A93f23e4E92C4a8E4fef5d6953E5be01d',
  },
})

networks.set('goerli', {
  chainId: 5,
  legacyNetworkType: 'goerli',
  endpoints: {
    ethereum: 'https://goerli.infura.io/v3/481a4cdc7c774286b8627f21c6827f48',
  },
  ipfsGateway: 'https://ipfs.eth.aragon.network/ipfs',
  contracts: {
    tokenAntV2: '0x218bE53496Be20CCb724818cd1A33bE044596c0c',
    antV2Redemption: '0x4034Dbf58Ad3aF6136AEe0C6C918A02cFC7b79A5',
    blockList: '0x3b23b15c43f833123653443c26425a2eedab5fa9',
  },
})

export function getNetworkConfig(name: EnvNetworkName): EnvNetworkConfig {
  return networks.get(name) as EnvNetworkConfig
}
