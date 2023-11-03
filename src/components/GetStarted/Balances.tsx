import React, { useMemo, useState } from 'react'
// @ts-ignore
import { useLayout, GU } from '@aragon/ui'
import TokenAmount from 'token-amount'
import LayoutLimiter from '../Layout/LayoutLimiter'
import TokenConversionCard from './TokenConversionCard'
import AntV2EthConversionCard from './AntV2EthConversionCard'
import { useAccountBalances } from '../../providers/AccountBalances'
import LpInfoModal from './LpInfoModal/LpInfoModal'
import { bigNum } from '../../utils/math-utils'
import { useWallet } from '../../providers/Wallet'
import { networkEnvironment } from '../../environment'
import { CONVERSION_RATE } from '../Migrate/conversionUtils'
import useRedemptionEthBalance from '../../hooks/useRedemptionEthBalance'

const { chainId } = networkEnvironment

const LP_INFO_AVAILABLE_ON_NETWORK = chainId === 1
const FORMATTED_DIGITS = 2

function Balances({
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const { account } = useWallet()
  const [modalVisible, setModalVisible] = useState(false)
  const { layoutName } = useLayout()
  const { antV2, antV1, anj, lpBalances } = useAccountBalances()
  const stackedCards = layoutName === 'small' || layoutName === 'medium'
  const antV2RedeemContractBalance = useRedemptionEthBalance()
  const antV2RedeemContractHasBalance = Boolean(
    antV2RedeemContractBalance && antV2RedeemContractBalance > 0
  )

  const formattedAntV2Balance = useMemo(
    (): string | null =>
      antV2.balance &&
      new TokenAmount(antV2.balance, antV2.decimals).format({
        digits: FORMATTED_DIGITS,
      }),
    [antV2.balance, antV2.decimals]
  )

  const formattedAntV1Balance = useMemo(
    (): string | null =>
      antV1.balance &&
      new TokenAmount(antV1.balance, antV1.decimals).format({
        digits: FORMATTED_DIGITS,
      }),
    [antV1.balance, antV1.decimals]
  )

  const formattedAnjBalance = useMemo(
    (): string | null =>
      anj.balance &&
      new TokenAmount(anj.balance, anj.decimals).format({
        digits: FORMATTED_DIGITS,
      }),
    [anj.balance, anj.decimals]
  )

  const formattedLpBalanceTotal = useMemo((): string | null => {
    const totalStakedBalance =
      lpBalances.all &&
      lpBalances.all.reduce((total, item) => {
        const [, balance] = item
        return total.add(balance)
      }, bigNum('0'))

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

    return lpBalances.hasBalances ? openModalHandler : null
  }, [lpBalances])

  return accountConnected ? (
    <LayoutLimiter size="medium" {...props}>
      <div
        css={`
          display: grid;
          grid-gap: ${4 * GU}px;
          grid-template-columns: ${stackedCards ? '1fr' : '1fr 1fr'};

          ${!stackedCards &&
          `& > *:nth-child(1) {
              grid-column: 1 / 3;
              max-width: 100%;
            }`}
        `}
      >
        <AntV2EthConversionCard
          balance={formattedAntV2Balance}
          accountConnected={accountConnected}
          available={antV2RedeemContractHasBalance}
        />
        <TokenConversionCard
          tokenName="anj"
          balance={formattedAnjBalance}
          accountConnected={accountConnected}
          showLpBalance={false}
          rate={CONVERSION_RATE['ANJ']}
          lockupPeriod={0}
        />
        <TokenConversionCard
          tokenName="antV1"
          balance={formattedAntV1Balance}
          accountConnected={accountConnected}
          showLpBalance
          lpInfoAvailable={LP_INFO_AVAILABLE_ON_NETWORK}
          lpTotalBalance={formattedLpBalanceTotal}
          onLpClick={handleLpClick}
        />
      </div>
      <LpInfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </LayoutLimiter>
  ) : (
    <div
      css={`
        padding-bottom: ${24 * GU}px;
      `}
    ></div>
  )
}
export default Balances
