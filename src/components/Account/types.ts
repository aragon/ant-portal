import { ExternalProvider } from '@ethersproject/providers'
import {
  useWallet,
  ChainUnsupportedError,
  ConnectionRejectedError,
  ConnectorUnsupportedError,
} from 'use-wallet'

// Providers
export type KnownProviderId =
  | 'frame'
  | 'metamask'
  | 'walletconnect'
  | 'walletconnectV2'
  | 'status'
  | 'cipher'
  | 'fortmatic'
  | 'portis'
  | 'unknown'

export type ProviderConfig = {
  id: KnownProviderId
  name: string
  type: string
  image: string
  strings: Record<string, string>
}

export type Providers = {
  [key in KnownProviderId]: ProviderConfig
}

// Wallet
export type WalletProvider = ExternalProvider
export type WalletWithProvider = ReturnType<typeof useWallet>
export type WalletConnector = WalletWithProvider['connector']
export type WalletError =
  | ChainUnsupportedError
  | ConnectorUnsupportedError
  | ConnectionRejectedError
  | Error
  | null

export type UseWalletConfig = {
  apiKey?: string
  dAppId?: string
  rpcUrl?: string
  projectId?: string
  rpc?: { [key: string]: string }
}

export type WalletConfig = {
  id: WalletConnector
  useWalletConf?: UseWalletConfig | undefined
}

// Account module screens
export type ScreenId = 'providers' | 'connecting' | 'connected' | 'error'
export type ScreenConfig = {
  id: ScreenId
  title: string
}
