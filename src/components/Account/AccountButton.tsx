import React from 'react'
import {
  EthIdenticon,
  GU,
  RADIUS,
  useTheme,
  useLayout,
  // @ts-ignore
} from '@aragon/ui'
import { useWallet } from '../../providers/Wallet'
import { shortenAddress } from '../../lib/web3-utils'
import BrandButton from '../BrandButton/BrandButton'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { useActivity } from '../Activity/ActivityProvider'

type AccountButtonProps = {
  onClick: () => void
}

function AccountButton({ onClick }: AccountButtonProps): JSX.Element {
  const { layoutName } = useLayout()
  const { hasPending } = useActivity()
  const compactMode = layoutName === 'small'

  return (
    <BrandButton
      onClick={onClick}
      css={`
        padding-right: ${compactMode ? 1 * GU : 1.75 * GU}px;
        padding-left: ${compactMode ? 1 * GU : 1.75 * GU}px;
      `}
    >
      {hasPending ? (
        <TransactionsPending />
      ) : (
        <AccountIdentity compactMode={compactMode} />
      )}
    </BrandButton>
  )
}

function TransactionsPending(): JSX.Element {
  const { pendingCount } = useActivity()

  const theme = useTheme()
  return (
    <>
      <LoadingSpinner
        css={`
          flex-shrink: 0;
          margin-right: ${1 * GU}px;
          color: ${theme.accent};
        `}
      />
      {pendingCount} Tx Pending
    </>
  )
}

function AccountIdentity({
  compactMode,
}: {
  compactMode: boolean
}): JSX.Element {
  const { account } = useWallet()
  const theme = useTheme()

  return (
    <>
      <div
        css={`
          ${!compactMode ? `margin-right: ${1.4 * GU}px;` : ``}
          ${!compactMode ? `margin-left: -${0.5 * GU}px;` : ``}
        `}
      >
        <div
          css={`
            position: relative;
          `}
        >
          <EthIdenticon
            address={account || ''}
            radius={RADIUS}
            css={`
              display: block;
            `}
          />
          <div
            css={`
              position: absolute;
              bottom: -3px;
              right: -3px;
              width: 10px;
              height: 10px;
              background: ${theme.positive};
              border: 2px solid ${theme.surface};
              border-radius: 50%;
            `}
          />
        </div>
      </div>
      {!compactMode && shortenAddress(account)}
    </>
  )
}

export default AccountButton
