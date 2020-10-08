import React, { useCallback } from 'react'
// @ts-ignore
import { ButtonBase, GU, Link, RADIUS, useTheme, textStyle } from '@aragon/ui'
import {
  getProviderFromUseWalletId,
  getUseWalletProviders,
} from './ethereum-providers'
import { ProviderConfig, WalletConnector } from './types'

const PROVIDERS_INFO: [
  WalletConnector,
  ProviderConfig
][] = getUseWalletProviders().map((provider) => [
  provider.id,
  getProviderFromUseWalletId(provider.id),
])

type ScreenProvidersProps = {
  onActivate: (providerId: WalletConnector) => Promise<void>
}

function ScreenProviders({ onActivate }: ScreenProvidersProps): JSX.Element {
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        padding: ${2 * GU}px ${2 * GU}px 0;
      `}
    >
      <div
        css={`
          display: grid;
          grid-gap: ${1.5 * GU}px;
          grid-auto-flow: row;
          grid-template-columns: repeat(2, 1fr);
        `}
      >
        {PROVIDERS_INFO.map(([id, provider]) => (
          <ProviderButton
            key={id}
            id={id}
            provider={provider}
            onActivate={onActivate}
          />
        ))}
      </div>
      <div
        css={`
          display: flex;
          justify-content: center;
          margin-top: ${2 * GU}px;
          padding-bottom: ${2 * GU}px;
        `}
      >
        <Link
          href="https://ethereum.org/wallets/"
          css={`
            text-decoration: none;
          `}
        >
          Don’t have an Ethereum account?
        </Link>
      </div>
    </div>
  )
}

type ProviderButtonProps = {
  id: WalletConnector
  provider: ProviderConfig
  onActivate: ScreenProvidersProps['onActivate']
}

function ProviderButton({ id, provider, onActivate }: ProviderButtonProps) {
  const theme = useTheme()

  const handleClick = useCallback(() => {
    onActivate(id)
  }, [onActivate, id])

  return (
    <ButtonBase
      key={id}
      onClick={handleClick}
      css={`
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: ${12 * GU}px;
        background: ${theme.surface};
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
        border-radius: ${RADIUS}px;
        &:active {
          top: 1px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}
    >
      <img src={provider.image} alt="" height={5.25 * GU} />
      <div
        css={`
          margin-top: ${1 * GU}px;
          ${textStyle('body1')};
        `}
      >
        {provider.name}
      </div>
    </ButtonBase>
  )
}

export default ScreenProviders
