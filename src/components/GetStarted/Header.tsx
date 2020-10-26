import React, { ReactNode, useCallback, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// @ts-ignore
import { GU, IconArrowRight, useTheme, useLayout } from '@aragon/ui'
import { fontWeight } from '../../style/font'
import BrandButton from '../BrandButton/BrandButton'
import LayoutLimiter from '../Layout/LayoutLimiter'
import { CONVERTER_PATH } from '../../Routes'
import { useAccountBalances } from '../../providers/AccountBalances'
import { useAccountModule } from '../Account/AccountModuleProvider'

type BalanceStatus = 'default' | 'success' | 'noMigrationsAvailable'

const MESSAGES: Record<BalanceStatus, ReactNode> = {
  default: (
    <>
      Use the Aragon Migrate system to upgrade your ANT balance to the newest
      version of the token&nbsp;contract.
    </>
  ),
  success: (
    <>
      Success!{' '}
      <span role="img" aria-label="raised-hands">
        🙌🏼
      </span>{' '}
      <span role="img" aria-label="party">
        🎊
      </span>{' '}
      You have migrated all your ANT balance to ANT v2. This account doesn’t
      hold any more ANT v1 balance. Try a different account.
    </>
  ),
  noMigrationsAvailable: (
    <>
      There are no migrations available for this account. Enable a different
      wallet to check if you have any ANT v1 tokens to migrate.
    </>
  ),
}

function Header({ ...props }: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const history = useHistory()
  const theme = useTheme()
  const { showAccount } = useAccountModule()
  const { antV1, antV2 } = useAccountBalances()
  const { layoutName } = useLayout()
  const [balanceStatus, setBalanceStatus] = useState<BalanceStatus>('default')

  const compactMode = layoutName === 'small'

  const handleButtonClick = useCallback(() => {
    if (balanceStatus !== 'default') {
      showAccount()
    } else {
      history.push(CONVERTER_PATH)
    }
  }, [history, balanceStatus, showAccount])

  useEffect(() => {
    if (antV1.balance && antV2.balance) {
      if (antV1.balance.isZero() && antV2.balance.gt('0')) {
        setBalanceStatus('success')
        return
      }
      if (antV1.balance.isZero() && antV2.balance.isZero()) {
        setBalanceStatus('noMigrationsAvailable')
        return
      }
    }
    setBalanceStatus('default')
  }, [antV1.balance, antV2.balance])

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
            margin-bottom: ${1 * GU}px;
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
        <BrandButton mode="strong" size="large" onClick={handleButtonClick}>
          {balanceStatus === 'default' ? (
            <>
              Migrate ANT v1{' '}
              <IconArrowRight
                css={`
                  opacity: 0.75;
                  margin-left: ${1 * GU}px;
                  margin-right: ${1 * GU}px;
                `}
              />{' '}
              ANT v2
            </>
          ) : (
            'Enable a different account'
          )}
        </BrandButton>
      </div>
    </LayoutLimiter>
  )
}

export default Header
