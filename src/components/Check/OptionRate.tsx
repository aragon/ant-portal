import React from 'react'
// @ts-ignore
import { GU, useTheme, useLayout } from '@aragon/ui'
import { fontWeight } from '../../style/font'
import { radius } from '../../style/radius'
import { shadowDepth } from '../../style/shadow'
import TokenGraphic from '../TokenGraphic/TokenGraphic'
import styled from 'styled-components'

type OptionRateProps = {
  compactMode: boolean
  tokenSymbol: string
}

type RateProps = {
  value: number
}

function Rate({ value }: RateProps): JSX.Element {
  const valueAsString = value.toString()
  if (valueAsString.indexOf('.') >= 0) {
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

function OptionRate({ tokenSymbol }: OptionRateProps): JSX.Element {
  const theme = useTheme()
  const { layoutName } = useLayout()
  const compactMode = layoutName === 'small' || layoutName === 'medium'
  const conversionRate = 0.05
  const isANJConversion = true

  return (
    <div>
      <div
        css={`
          display: flex;
          padding: ${2 * GU}px;
          background-color: ${theme.surface};

          // Create pill corners
          border-radius: ${radius.pill};
          box-shadow: ${shadowDepth.high};
          margin-bottom: ${3.5 * GU}px;
        `}
      >
        <TokenGraphic tokenName={'antV1'} size={compactMode ? 80 : 100} />
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

            background: linear-gradient(
              160deg,
              ${theme.accentStart} -20%,
              ${theme.accentEnd} 60%
            );
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
            Current conversion rate
          </h3>
        </div>
        <p
          css={`
            color: ${theme.surfaceContentSecondary};
            letter-spacing: 0.04em;
          `}
        >
          <NumberSpan color={theme.surfaceContent}>1</NumberSpan> {tokenSymbol}{' '}
          <span
            css={`
              margin-left: ${1 * GU}px;
              margin-right: ${1 * GU}px;
              color: ${theme.contentSecondary};
            `}
          >
            :
          </span>{' '}
          <NumberSpan color={theme.surfaceContent}>{conversionRate}</NumberSpan>{' '}
          ANTv2
        </p>
        <p
          css={`
            color: ${theme.surfaceContentSecondary};
            letter-spacing: 0.04em;
          `}
        >
          Expiry Date: September 30th 2021
        </p>
      </div>
    </div>
  )
}

const NumberSpan = styled.span<{ color: any }>`
  color: ${(props) => props.color};
`

export default OptionRate
