import frame from './icons/frame.png'
import cipher from './icons/cipher.png'
import metamask from './icons/metamask.png'
import status from './icons/status.png'
import wallet from './icons/wallet.svg'
import fortmatic from './icons/fortmatic.svg'
import portis from './icons/portis.svg'
import { envVar } from '../../../environment'
import {
  KnownProviderId,
  ProviderConfig,
  Providers,
  WalletConfig,
  WalletConnector,
} from '../types'

const PROVIDERS: Providers = {
  frame: {
    id: 'frame',
    name: 'Frame',
    type: 'Desktop',
    image: frame,
    strings: {
      'your Ethereum wallet': 'Frame',
    },
  },
  metamask: {
    id: 'metamask',
    name: 'Metamask',
    type: 'Desktop',
    image: metamask,
    strings: {
      'your Ethereum wallet': 'Metamask',
    },
  },
  status: {
    id: 'status',
    name: 'Status',
    type: 'Mobile',
    image: status,
    strings: {
      'your Ethereum wallet': 'Status',
    },
  },
  cipher: {
    id: 'cipher',
    name: 'Cipher',
    type: 'Mobile',
    image: cipher,
    strings: {
      'your Ethereum wallet': 'Cipher',
    },
  },
  fortmatic: {
    id: 'fortmatic',
    name: 'Fortmatic',
    type: 'Any',
    image: fortmatic,
    strings: {
      'your Ethereum wallet': 'Fortmatic',
    },
  },
  portis: {
    id: 'portis',
    name: 'Portis',
    type: 'Any',
    image: portis,
    strings: {
      'your Ethereum wallet': 'Portis',
    },
  },
  unknown: {
    id: 'unknown',
    name: 'Unknown',
    type: 'Desktop',
    image: wallet,
    strings: {
      'your Ethereum wallet': 'your wallet',
    },
  },
}

// Get a providers object for a given ID.
function getProvider(providerId: KnownProviderId): ProviderConfig {
  return PROVIDERS[providerId]
}

// Get a string that depends on the current Ethereum provider.
// The default string is used as an identifier (à la gettext).
function getProviderString(
  string: string,
  providerId: KnownProviderId = 'unknown'
): string {
  const provider = getProvider(providerId)
  return (provider && provider.strings[string]) || string
}

// Get an identifier for the provider, if it can be detected.
function identifyProvider(
  provider: typeof window.ethereum
): 'metamask' | 'unknown' {
  if (provider && provider.isMetaMask) {
    return 'metamask'
  }
  return 'unknown'
}

// Get a provider from its useWallet() identifier.
function getProviderFromUseWalletId(id: WalletConnector): ProviderConfig {
  if (id === 'injected') {
    return (
      getProvider(identifyProvider(window.ethereum)) || getProvider('unknown')
    )
  }
  return id in PROVIDERS
    ? getProvider(id as KnownProviderId)
    : getProvider('unknown')
}

export function getUseWalletProviders(): WalletConfig[] {
  const providers: WalletConfig[] = [{ id: 'injected' }, { id: 'frame' }]

  if (envVar('FORTMATIC_API_KEY')) {
    providers.push({
      id: 'fortmatic',
      useWalletConf: { apiKey: envVar('FORTMATIC_API_KEY') },
    })
  }

  if (envVar('PORTIS_DAPP_ID')) {
    providers.push({
      id: 'portis',
      useWalletConf: { dAppId: envVar('PORTIS_DAPP_ID') },
    })
  }

  return providers
}

export function getUseWalletConnectors(): Record<
  string,
  WalletConfig['useWalletConf'] | unknown
> {
  return getUseWalletProviders().reduce(
    (connectors: Record<string, unknown>, provider) => {
      if (provider.useWalletConf) {
        connectors[provider.id] = provider.useWalletConf
      }

      return connectors
    },
    {}
  )
}

export {
  getProvider,
  identifyProvider,
  getProviderString,
  getProviderFromUseWalletId,
}
export default PROVIDERS
