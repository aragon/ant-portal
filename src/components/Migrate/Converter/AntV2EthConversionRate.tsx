import React from 'react'
// @ts-ignore
import { useTheme, GU } from '@aragon/ui'
import { fontWeight } from '../../../style/font'
import { radius } from '../../../style/radius'
import TokenGraphic from '../../TokenGraphic/TokenGraphic'
import useAntV2ToEthRate from '../../../hooks/useAntV2ToEthRate'
import { theme as localTheme } from '../../../style/theme'

type AntV2EthConversionRateProps = {
  compactMode: boolean
  tokenSymbol: string
}

type RateProps = {
  value: number
}

export function Rate({ value }: RateProps): JSX.Element {
  const valueAsString = value.toString()
  const hasDecimals = valueAsString.indexOf('.') >= 0

  if (hasDecimals) {
    const ints = valueAsString.split('.')[0]
    const fractions = valueAsString.split('.')[1]

    return (
      <span>
        <span>{ints}</span>
        <span
          css={`
            font-size: 0.5em;
            letter-spacing: -0.05em;
          `}
        >
          .{fractions}
        </span>
      </span>
    )
  }

  return <span>{value}</span>
}

function AntV2EthConversionRate({
  compactMode,
  tokenSymbol,
}: AntV2EthConversionRateProps): JSX.Element {
  const theme = useTheme()
  const antV2ToEthRate = useAntV2ToEthRate()
  const conversionRate = Number(antV2ToEthRate)

  return (
    <div>
      <div
        css={`
          display: flex;
          padding: ${2 * GU}px;
          background-color: ${localTheme.whiteCard};

          // Create pill corners
          border-radius: ${radius.pill};
          margin-bottom: ${3.5 * GU}px;
        `}
      >
        <TokenGraphic tokenName={'antV2'} size={compactMode ? 80 : 100} />
        <TokenGraphic
          tokenName="eth"
          size={compactMode ? 80 : 100}
          shadow
          css={`
            margin-left: -${1 * GU}px;
          `}
        />
      </div>
      <div
        css={`
          display: flex;
          flex-direction: column;
          align-items: center;
          ${!conversionRate && 'display: none;'}
        `}
      >
        <h4
          css={`
            font-size: ${compactMode ? 52 : 60}px;
            font-weight: ${fontWeight.semiBold};

            // Optically offset left edge of number 1 for centering
            margin-left: -0.15em;
            letter-spacing: -0.075em;

            line-height: 1;
            margin-bottom: ${1.75 * GU}px;

            background: ${localTheme.primary};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          1 : <Rate value={conversionRate} />
        </h4>
        <div
          css={`
            display: flex;
            align-items: center;
            margin-bottom: ${0.5 * GU}px;
          `}
        >
          <h3
            css={`
              font-weight: ${fontWeight.medium};
              font-size: 18px;
              ${`margin-right: ${1 * GU}px;`}
            `}
          >
            Redemption rate
          </h3>
        </div>
        <p
          css={`
            color: ${localTheme.secondary};
            letter-spacing: 0.04em;
          `}
        >
          <span
            css={`
              color: ${theme.surfaceContent};
            `}
          >
            1
          </span>{' '}
          {tokenSymbol}{' '}
          <span
            css={`
              margin-left: ${1 * GU}px;
              margin-right: ${1 * GU}px;
              color: ${localTheme.secondary};
            `}
          >
            :
          </span>{' '}
          <span
            css={`
              color: ${theme.surfaceContent};
            `}
          >
            {conversionRate}
          </span>{' '}
          ETH
        </p>
      </div>
    </div>
  )
}

export default AntV2EthConversionRate
