import { env, envNetwork } from './environment'
import { getNetworkConfig } from './networks'
import { EnvNetworkName } from './types'

function getNetworkEnvironment(environment: EnvNetworkName) {
  const preset = getNetworkConfig(environment)

  return {
    ...preset,
    ipfsGateway: env('IPFS_GATEWAY') || preset.ipfsGateway,
  }
}

export const networkEnvironment = getNetworkEnvironment(envNetwork())
