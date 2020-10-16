import React, { useMemo } from 'react'
// @ts-ignore
import { useLayout, GU } from '@aragon/ui'
// @ts-ignore
import TokenAmount from 'token-amount'
import LayoutLimiter from '../Layout/LayoutLimiter'
import BalanceCard from './BalanceCard'
import { useAccountBalances } from '../../providers/AccountBalances'

const FORMATTED_DIGITS = 2

function Balances({
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const { layoutName } = useLayout()
  const { antTokenPriceUsd, antV1, antV2 } = useAccountBalances()
  const stackedCards = layoutName === 'small' || layoutName === 'medium'

  const formattedAntV1Balance = useMemo(
    () =>
      antV1.balance &&
      new TokenAmount(antV1.balance, antV1.decimals).format({
        digits: FORMATTED_DIGITS,
      }),
    [antV1.balance, antV1.decimals]
  )

  const formattedAntV2Balance = useMemo(
    () =>
      antV2.balance &&
      new TokenAmount(antV2.balance, antV2.decimals).format({
        digits: FORMATTED_DIGITS,
      }),
    [antV2.balance, antV2.decimals]
  )

  return (
    <LayoutLimiter size="medium" {...props}>
      <div
        css={`
          display: grid;
          grid-gap: ${4 * GU}px;
          grid-template-columns: ${stackedCards ? '1fr' : '1fr 1fr'};
        `}
      >
        <BalanceCard
          tokenVersion="v1"
          price={antTokenPriceUsd}
          balance={formattedAntV1Balance}
          accountConnected={formattedAntV1Balance}
        />
        <BalanceCard
          tokenVersion="v2"
          price={antTokenPriceUsd}
          balance={formattedAntV2Balance}
          accountConnected={formattedAntV2Balance}
        />
      </div>
    </LayoutLimiter>
  )
}
export default Balances
