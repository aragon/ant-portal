import React, { useMemo } from 'react'
// @ts-ignore
import { GU, useLayout } from '@aragon/ui'
import LayoutLimiter from '../Layout/LayoutLimiter'
import StatCard from '../StatCard/StatCard'
import totalSupplySvg from '../../assets/stat-total-supply.svg'
import antTokenSvg from '../../assets/stat-ant-token.svg'
import marketCapSvg from '../../assets/stat-market-cap.svg'
import { MOCK_SHORT_SUBTEXT } from '../../mock'

function Stats({ ...props }: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const { layoutName } = useLayout()

  const stackColumns = layoutName === 'small' || layoutName === 'medium'

  const cardPresentation = useMemo(
    () => [
      {
        title: 'Total Supply',
        graphic: totalSupplySvg,
        value: '342.23',
        desc: MOCK_SHORT_SUBTEXT,
      },
      {
        title: 'ANT Price',
        graphic: antTokenSvg,
        value: '342.23',
        desc: MOCK_SHORT_SUBTEXT,
      },
      {
        title: 'Market Cap',
        graphic: marketCapSvg,
        value: '342.23',
        desc: MOCK_SHORT_SUBTEXT,
      },
    ],
    []
  )

  return (
    <LayoutLimiter size="medium" {...props}>
      <div
        css={`
          display: grid;
          grid-template-columns: ${stackColumns ? '1fr' : '1fr 1fr 1fr'};
          align-items: center;
          grid-gap: ${2 * GU}px;
        `}
      >
        {cardPresentation.map((card, i) => {
          const { graphic, title, value, desc } = card

          return (
            <StatCard
              title={title}
              value={value}
              graphic={graphic}
              desc={desc}
              key={i}
            />
          )
        })}
      </div>
    </LayoutLimiter>
  )
}

export default Stats
