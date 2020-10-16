import React from 'react'
// @ts-ignore
import { useTheme, GU } from '@aragon/ui'
import TokenAntGraphic from '../TokenAntGraphic/TokenAntGraphic'
import { shadowDepth } from '../../style/shadow'
import { radius } from '../../style/radius'
import { fontWeight } from '../../style/font'

function BalanceCard(): JSX.Element {
  const theme = useTheme()

  return (
    <div
      css={`
        background-color: ${theme.surface};
        box-shadow: ${shadowDepth.high};
        border-radius: ${radius.high};
        padding: ${5 * GU}px;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          padding-bottom: ${5 * GU}px;
          margin-bottom: ${5 * GU}px;
          border-bottom: 1px solid ${theme.border};
        `}
      >
        <TokenAntGraphic
          shadow
          type="v1"
          css={`
            flex-shrink: 0;
          `}
        />
        <div
          css={`
            padding-left: ${3 * GU}px;
          `}
        >
          <h3
            css={`
              font-size: 28px;
              font-weight: ${fontWeight.medium};
              line-height: 1.3;
              margin-bottom: ${0.5 * GU}px;
            `}
          >
            ANT v1
          </h3>
          <p>
            ANT Price
            <span
              css={`
                margin-left: ${0.75 * GU}px;
                font-variant-numeric: tabular-nums;
              `}
            >
              $3.506
            </span>
          </p>
        </div>
      </div>
      <ul>
        <li
          css={`
            display: flex;
            justify-content: space-between;
            font-size: 18px;
          `}
        >
          <h4>Wallet balance</h4>
          <span
            css={`
              letter-spacing: -0.02em;
              font-variant-numeric: tabular-nums;
            `}
          >
            78,924,954.82
            <span
              css={`
                color: ${theme.contentSecondary};
                margin-left: ${0.75 * GU}px;
              `}
            >
              ANT
            </span>
          </span>
        </li>
      </ul>
    </div>
  )
}

export default BalanceCard
