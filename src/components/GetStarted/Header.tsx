import React, { ReactNode, useState, useEffect, useMemo } from 'react'

import {
  GU,
  IconConnect,
  useLayout,
  Link,
  // @ts-ignore
} from '@aragon/ui'
import { fontWeight } from '../../style/font'
import BrandButton from '../BrandButton/BrandButton'
import LayoutLimiter from '../Layout/LayoutLimiter'
import { useAccountBalances } from '../../providers/AccountBalances'
import { useAccountModule } from '../Account/AccountModuleProvider'
import { useWallet } from '../../providers/Wallet'
import { TERMS_URL_PATH } from '../../lib/terms'
import { theme as localTheme } from '../../style/theme'

type BalanceStatus =
  | 'default'
  | 'success'
  | 'noMigrationsAvailable'
  | 'accountEnabled'
  | 'redemptionAvailable'
  | 'noRedemptionAvailable'

const MESSAGES: Record<BalanceStatus, ReactNode> = {
  default: (
    <>
      Use the ANT Redemption Portal to redeem your ANT for ETH. You can redeem
      your ANT at a fixed rate of 0.0025376 ETH until November 2nd 2024 at 23h59
      UTC.
    </>
  ),
  redemptionAvailable: (
    <>
      You are now connected and can redeem your ANT for ETH.
      <br />
      <div>
        <span
          css={`
            font-weight: 700;
            }
          `}
        >
          Important:
        </span>{' '}
        When you redeem your ANT for ETH, you agree to the{' '}
        <Link
          href={TERMS_URL_PATH}
          css={`
            text-decoration: none;
            &:focus:after {
              border: none;
            }
          `}
        >
          terms of service
        </Link>
        .
      </div>
    </>
  ),
  noRedemptionAvailable: (
    <>
      There are no redemptions or upgrades available for this account. Connect a
      different wallet to check if you have any token balances to redeem or
      upgrade.
    </>
  ),
  accountEnabled: (
    <>
      Use the ANT Redemption Portal to redeem your ANT for ETH. You can redeem
      your ANT at a fixed rate of 0.0025376 ETH until November 2nd 2024 at 23h59
      UTC.
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
      You can continue to upgrade ANTv1 held or redeem your ANJ in a different
      account.
    </>
  ),
  noMigrationsAvailable: (
    <>
      There are no upgrades available for this account. Connect a different
      wallet to check if you have any ANTv1 balance to&nbsp;upgrade.
    </>
  ),
}

function Header({ ...props }: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const { showAccount } = useAccountModule()
  const { antV1, antV2, anj } = useAccountBalances()
  const { layoutName } = useLayout()
  const [balanceStatus, setBalanceStatus] = useState<BalanceStatus>('default')
  const { account } = useWallet()
  const accountConnected = Boolean(account)
  const noAccountBalance = Boolean(
    !antV2.balance || antV2.balance.toString() === '0'
  )
  const compactMode = layoutName === 'small'

  const primaryButton = useMemo(() => {
    if (
      balanceStatus === 'accountEnabled' ||
      balanceStatus === 'redemptionAvailable'
    ) {
      return null
    }

    if (balanceStatus === 'default' && !accountConnected) {
      return ()
    }

    return (
      <BrandButton
        mode="strong"
        size="large"
        onClick={showAccount}
        icon={<IconConnect />}
        label="Connect a different wallet"
      />
    )
  }, [balanceStatus, showAccount, accountConnected])

  useEffect(() => {
    if (antV1.balance && antV2.balance && anj.balance) {
      if (
        antV1.balance.isZero() &&
        anj.balance.isZero() &&
        antV2.balance.gt('0')
      ) {
        setBalanceStatus('success')
        return
      }
      if (antV1.balance.isZero() && antV2.balance.isZero()) {
        setBalanceStatus('noMigrationsAvailable')
        return
      }

      setBalanceStatus('accountEnabled')

      return
    }

    if (accountConnected) {
      if (noAccountBalance) setBalanceStatus('noRedemptionAvailable')
      else setBalanceStatus('redemptionAvailable')
      return
    }

    setBalanceStatus('default')
  }, [
    antV1.balance,
    antV2.balance,
    anj.balance,
    accountConnected,
    noAccountBalance,
  ])

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
            color: ${localTheme.primary};
            margin-bottom: ${1 * GU}px;
          `}
        >
          ANT Redemption Portal
        </h3>
        <div
          css={`
            font-weight: ${fontWeight.medium};
            font-size: ${compactMode || balanceStatus === 'accountEnabled'
              ? `20`
              : `22`}px;
            color: ${localTheme.secondary};
            margin: auto;
            margin-bottom: ${4 * GU}px;
            max-width: ${110 * GU}px;
          `}
        >
          {MESSAGES[balanceStatus]}
        </div>
        {primaryButton}
      </div>
    </LayoutLimiter>
  )
}

export default Header
