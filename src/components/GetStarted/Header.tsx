import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
// @ts-ignore
import { GU, IconArrowRight, useTheme, useLayout } from '@aragon/ui'
import { BigNumber } from 'ethers'
import { fontWeight } from '../../style/font'
import BrandButton from '../BrandButton/BrandButton'
import LayoutLimiter from '../Layout/LayoutLimiter'
import { CONVERTER_PATH } from '../../Routes'
import { useAccountBalances } from '../../providers/AccountBalances'
import { useWallet } from '../../providers/Wallet'

type BalanceStatus = 'default' | 'success' | 'noMigrationsAvailable'

const MESSAGES: Record<BalanceStatus, string> = {
  default:
    'Use Aragon Migrate system to upgrade your ANT balance to the newest version of the token&nbsp;contract.',
  success:
    'Success! You have migrated all your ANT balance to ANT v2. This account doesn’t hold any more ANT v1 balance. Try a different account.',
  noMigrationsAvailable:
    'There are no migrations available for this account. Enable a different wallet to check if you have any ANT v1 tokens to migrate.',
}

function Header({ ...props }: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const history = useHistory()
  const theme = useTheme()
  const { account } = useWallet()
  const { antV1, antV2 } = useAccountBalances()
  const { layoutName } = useLayout()
  const [balanceStatus, setBalanceStatus] = useState<BalanceStatus>('default')

  const compactMode = layoutName === 'small'

  const handleNavigateToConverter = useCallback(() => {
    history.push(CONVERTER_PATH)
  }, [history])

  const accountConnected = Boolean(account)
  if (
    accountConnected &&
    (antV1.balance === null || antV1.balance.eq(BigNumber.from(0))) &&
    antV2.balance !== null &&
    antV2.balance.gt(BigNumber.from(0))
  ) {
    setBalanceStatus('success')
  }

  if (
    accountConnected &&
    (antV1.balance === null || antV1.balance.eq(BigNumber.from(0))) &&
    (antV2.balance === null || antV2.balance.eq(BigNumber.from(0)))
  ) {
    setBalanceStatus('noMigrationsAvailable')
  }

  return (
    <LayoutLimiter {...props}>
      <div
        css={`
          width: 100%;
          text-align: center;
        `}
      >
        <h3
          css={`
            font-weight: ${fontWeight.medium};
            font-size: 26px;
            background: linear-gradient(
              88.01deg,
              ${theme.accentStart} 0%,
              ${theme.accentEnd} 75%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: ${1.5 * GU}px;
          `}
        >
          Aragon Migrate
        </h3>
        <h1
          css={`
            font-weight: ${fontWeight.bold};
            line-height: 1.2;
            margin-bottom: ${2.5 * GU}px;
            font-size: ${compactMode ? `44` : `54`}px;
          `}
        >
          Migrate to ANT&nbsp;v2
        </h1>
        <p
          css={`
            font-weight: ${fontWeight.medium};
            font-size: ${compactMode ? `22` : `26`}px;
            color: ${theme.contentSecondary};
            margin: auto;
            margin-bottom: ${4 * GU}px;
            max-width: ${110 * GU}px;
          `}
        >
          {MESSAGES[balanceStatus]}
        </p>
        <BrandButton
          mode="strong"
          size="large"
          onClick={handleNavigateToConverter}
        >
          Migrate ANT v1{' '}
          <IconArrowRight
            css={`
              opacity: 0.75;
              margin-left: ${1 * GU}px;
              margin-right: ${1 * GU}px;
            `}
          />{' '}
          ANT v2
        </BrandButton>
      </div>
    </LayoutLimiter>
  )
}

export default Header
