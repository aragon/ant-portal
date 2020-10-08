import { EnvNetworkName, EnvVariables } from './types'

const DEFAULT_NETWORK_ENVIRONMENT: EnvNetworkName = 'rinkeby'

export const ENV_VARS: EnvVariables = {
  BUILD() {
    return process.env.BUILD || 'undefined'
  },
  NETWORK_ENVIRONMENT() {
    return process.env.NETWORK_ENVIRONMENT || DEFAULT_NETWORK_ENVIRONMENT
  },
  IPFS_GATEWAY() {
    return process.env.IPFS_GATEWAY || ''
  },
  FORTMATIC_API_KEY() {
    return process.env.FORTMATIC_API_KEY || ''
  },
  PORTIS_DAPP_ID() {
    return process.env.PORTIS_DAPP_ID || ''
  },
  SENTRY_DSN() {
    const dsn = process.env.SENTRY_DSN || ''
    return dsn.trim()
  },
}
