import {
  init as initSentry,
  captureMessage,
  captureException,
} from '@sentry/browser'
import { envVar, networkEnvironment } from './environment'
import { getNetworkName } from './lib/web3-utils'

const dsn = envVar('SENTRY_DSN')
const { chainId } = networkEnvironment
const environment = getNetworkName(chainId)

export const sentryEnabled = Boolean(dsn)

export default function initializeSentry(): void {
  if (sentryEnabled) {
    initSentry({
      dsn,
      environment,
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
