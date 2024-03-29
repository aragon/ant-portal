import React from 'react'
// @ts-ignore
import { useTheme, GU, Help } from '@aragon/ui'
import { fontWeight } from '../../../style/font'
import { radius } from '../../../style/radius'
import { useMigrateState } from '../MigrateStateProvider'
import TokenGraphic from '../../TokenGraphic/TokenGraphic'
import { CONVERSION_RATE } from '../conversionUtils'
import { theme as localTheme } from '../../../style/theme'

type ConversionRateProps = {
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

function ConversionRate({
  compactMode,
  tokenSymbol,
}: ConversionRateProps): JSX.Element {
  const theme = useTheme()
  const { conversionType } = useMigrateState()

  const isANJConversion = conversionType === 'ANJ'
  const conversionRate = CONVERSION_RATE[conversionType]

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
        <TokenGraphic
          tokenName={isANJConversion ? 'anj' : 'antV1'}
          size={compactMode ? 80 : 100}
        />
        <TokenGraphic
          tokenName="antV2"
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
              ${isANJConversion ? `margin-right: ${1 * GU}px;` : ``}
            `}
          >
            Conversion rate
          </h3>
          {conversionType === 'ANJ' && (
            <Help hint="Why this rate?">
              The proposal consists of locking ANJ’s price at rate (
              {conversionRate} ANT for 1 ANJ) and minting 549,862 ANT (1.37%
              inflation) to redeem all ANJ in circulation at that rate.
            </Help>
          )}
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
          ANTv2
        </p>
      </div>
    </div>
  )
}

export default ConversionRate
