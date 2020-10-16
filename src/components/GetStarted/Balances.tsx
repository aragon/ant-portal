import React from 'react'
// @ts-ignore
import { useLayout, GU } from '@aragon/ui'
import LayoutLimiter from '../Layout/LayoutLimiter'
import BalanceCard from './BalanceCard'
import { useAccountBalances } from '../../providers/AccountBalances'

function Balances(): JSX.Element {
  const { layoutName } = useLayout()
  const { antTokenPriceUsd } = useAccountBalances()
  const stackedCards = layoutName === 'small' || layoutName === 'medium'

  return (
    <LayoutLimiter size="medium">
      <div
        css={`
          display: grid;
          grid-gap: ${4 * GU}px;
          grid-template-columns: ${stackedCards ? '1fr' : '1fr 1fr'};
          padding-top: ${15 * GU}px;
          padding-bottom: ${15 * GU}px;
        `}
      >
        <BalanceCard
          tokenVersion="v1"
          price={antTokenPriceUsd}
          balance="78,924,954.82"
        />
        <BalanceCard
          tokenVersion="v2"
          price={antTokenPriceUsd}
          balance="78,924,954.82"
        />
      </div>
    </LayoutLimiter>
  )
}
export default Balances
