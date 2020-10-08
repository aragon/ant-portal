import { ExternalProvider } from '@ethersproject/providers'
import {
  Wallet,
  ChainUnsupportedError,
  ConnectionRejectedError,
  ConnectorConfigError,
  ConnectorUnsupportedError,
} from 'use-wallet'

export type KnownProviderId =
  | 'frame'
  | 'metamask'
  | 'status'
  | 'cipher'
  | 'fortmatic'
  | 'portis'
  | 'unknown'

export interface ProviderConfig {
  id: KnownProviderId
  name: string
  type: string
  image: string
  strings: Record<string, string>
}

export type Providers = {
  [key in KnownProviderId]: ProviderConfig
}

export type WalletProvider = ExternalProvider
export type WalletWithProvider = Wallet<WalletProvider>
export type WalletConnector = WalletWithProvider['connector']
export type WalletError =
  | ChainUnsupportedError
  | ConnectorUnsupportedError
  | ConnectionRejectedError
  | ConnectorConfigError

export type ScreenId = 'providers' | 'connecting' | 'connected' | 'error'

export interface ScreenConfig {
  id: ScreenId
  title: string
}

export type WalletConfig = {
  id: WalletConnector
  useWalletConf?: { apiKey?: string; dAppId?: string }
}
