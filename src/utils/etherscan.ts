import {
  blockExplorerUrl,
  // @ts-ignore
} from '@aragon/ui'
import { networkEnvironment } from '../environment'

const { legacyNetworkType } = networkEnvironment

export function getEtherscanUrl(
  address: string,
  type: 'address' | 'transaction' | 'token' = 'address'
): string {
  return blockExplorerUrl(type, address, {
    networkType: legacyNetworkType,
  })
}
