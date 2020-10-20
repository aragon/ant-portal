import React, { useMemo, useState } from 'react'
// @ts-ignore
import { useLayout, GU } from '@aragon/ui'
// @ts-ignore
import TokenAmount from 'token-amount'
import LayoutLimiter from '../Layout/LayoutLimiter'
import BalanceCard from './BalanceCard'
import { useAccountBalances } from '../../providers/AccountBalances'
import LpInfoModal from './LpInfoModal'
import { bigNum } from '../../utils/math-utils'
import { useWallet } from '../../providers/Wallet'
import { networkEnvironment } from '../../environment'

const { legacyNetworkType } = networkEnvironment

const LP_INFO_AVAILABLE_ON_NETWORK = legacyNetworkType === 'main'
const FORMATTED_DIGITS = 2

function Balances({
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const { account } = useWallet()
  const [modalVisible, setModalVisible] = useState(false)
  const { layoutName } = useLayout()
  const { antTokenPriceUsd, antV1, antV2, lpBalances } = useAccountBalances()
  const stackedCards = layoutName === 'small' || layoutName === 'medium'

  const formattedAntV1Balance = useMemo(
    (): string | null =>
      antV1.balance &&
      new TokenAmount(antV1.balance, antV1.decimals).format({
        digits: FORMATTED_DIGITS,
      }),
    [antV1.balance, antV1.decimals]
  )

  const formattedAntV2Balance = useMemo(
    (): string | null =>
      antV2.balance &&
      new TokenAmount(antV2.balance, antV2.decimals).format({
        digits: FORMATTED_DIGITS,
      }),
    [antV2.balance, antV2.decimals]
  )

  const formattedLpBalanceTotal = useMemo((): string | null => {
    const totalStakedBalance = lpBalances
      ? lpBalances.reduce((a, b) => {
          const [, balance] = b
          return a.add(balance)
        }, bigNum('0'))
      : null

    return (
      totalStakedBalance &&
      new TokenAmount(totalStakedBalance, antV1.decimals).format({
        digits: FORMATTED_DIGITS,
      })
    )
  }, [lpBalances, antV1.decimals])

  const accountConnected = Boolean(account)

  const handleLpClick = useMemo(() => {
    const openModalHandler = () => setModalVisible(true)

    return lpBalances ? openModalHandler : null
  }, [lpBalances])

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
          accountConnected={accountConnected}
          showLpBalance
          lpInfoAvailable={LP_INFO_AVAILABLE_ON_NETWORK}
          lpTotalBalance={formattedLpBalanceTotal}
          onLpClick={handleLpClick}
        />
        <BalanceCard
          tokenVersion="v2"
          price={antTokenPriceUsd}
          balance={formattedAntV2Balance}
          accountConnected={accountConnected}
        />
      </div>
      <LpInfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </LayoutLimiter>
  )
}
export default Balances
