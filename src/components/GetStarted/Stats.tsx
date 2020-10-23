import React, { useMemo } from 'react'
// @ts-ignore
import { GU, useLayout } from '@aragon/ui'
// @ts-ignore
import TokenAmount from 'token-amount'
import LayoutLimiter from '../Layout/LayoutLimiter'
import StatCard from '../StatCard/StatCard'
import totalSupplySvg from '../../assets/stat-total-supply.svg'
import antTokenSvg from '../../assets/stat-ant-token.svg'
import marketCapSvg from '../../assets/stat-market-cap.svg'
import { MOCK_SHORT_SUBTEXT } from '../../mock'
import { useAccountBalances } from '../../providers/AccountBalances'
import { formatAmountToUsd, parseUnits } from '../../utils/math-utils'

function Stats({ ...props }: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const { layoutName } = useLayout()
  const { antV1TotalSupply, antV1, antTokenPriceUsd } = useAccountBalances()

  const { decimals } = antV1

  const stackColumns = layoutName === 'small' || layoutName === 'medium'

  // TODO: Look at a dynamic solution?
  const staticCirculatingSupply = useMemo(
    () => parseUnits('34611262.420382165605096', decimals),
    [decimals]
  )

  const formattedTotalSupply = useMemo(
    (): string | null =>
      antV1TotalSupply &&
      new TokenAmount(antV1TotalSupply, decimals).format({
        digits: 2,
      }),
    [antV1TotalSupply, decimals]
  )

  const formattedMarketCap = useMemo(() => {
    return antTokenPriceUsd && antV1TotalSupply
      ? `$${formatAmountToUsd(
          staticCirculatingSupply,
          decimals,
          antTokenPriceUsd
        )}`
      : null
  }, [antTokenPriceUsd, antV1TotalSupply, decimals, staticCirculatingSupply])

  const formattedPrice = useMemo(
    () => antTokenPriceUsd && `$${Number(antTokenPriceUsd).toFixed(2)}`,
    [antTokenPriceUsd]
  )

  const cardPresentation = useMemo(
    () => [
      {
        title: 'Total Supply',
        graphic: totalSupplySvg,
        value: formattedTotalSupply,
        desc: MOCK_SHORT_SUBTEXT,
      },
      {
        title: 'ANT Price',
        graphic: antTokenSvg,
        value: formattedPrice,
        desc: MOCK_SHORT_SUBTEXT,
      },
      {
        title: 'Market Cap',
        graphic: marketCapSvg,
        value: formattedMarketCap,
        desc: MOCK_SHORT_SUBTEXT,
      },
    ],
    [formattedTotalSupply, formattedPrice, formattedMarketCap]
  )

  return (
    <LayoutLimiter size="medium" {...props}>
      <div
        css={`
          display: grid;
          grid-template-columns: ${stackColumns ? '1fr' : '1fr 1fr 1fr'};
          justify-items: center;
          grid-gap: ${3 * GU}px;
        `}
      >
        {cardPresentation.map((card, i) => {
          const { graphic, title, value, desc } = card

          return (
            <StatCard
              key={i}
              title={title}
              value={value}
              graphic={graphic}
              desc={desc}
            />
          )
        })}
      </div>
    </LayoutLimiter>
  )
}

export default Stats
