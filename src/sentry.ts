import {
  init as initSentry,
  captureMessage,
  captureException,
} from '@sentry/browser'
import { env } from './environment/environment'
import { getNetworkName } from './lib/web3-utils'
import { networkEnvironment } from './environment/current-environment'

const dsn = env('SENTRY_DSN')
const { chainId } = networkEnvironment
const environment = getNetworkName(chainId)

export const sentryEnabled = Boolean(dsn)

export default function initializeSentry(): void {
  if (sentryEnabled) {
    initSentry({
      dsn,
      environment,
      release: 'network-dashboard@' + env('BUILD'),
    })
  }
}

export function logWithSentry(message: string): void {
  if (sentryEnabled) {
    captureMessage(message)
  }
}

export function captureErrorWithSentry(err: Error): void {
  if (sentryEnabled) {
    captureException(err)
  }
}
