import React from 'react'
// @ts-ignore
import { useTheme, GU } from '@aragon/ui'
import TokenAntGraphic from '../TokenAntGraphic/TokenAntGraphic'
import { shadowDepth } from '../../style/shadow'
import { radius } from '../../style/radius'
import { fontWeight } from '../../style/font'
import { networkEnvironment } from '../../environment'
import { css, keyframes } from 'styled-components'
const { contracts } = networkEnvironment

type TokenType = 'v1' | 'v2'

type BalanceCardProps = {
  tokenVersion: TokenType
  price: string | null
  balance: string | null
}

type TokenPresentation = Record<
  TokenType,
  {
    tokenType: TokenType
    suffix: string
    contractAddress: string
  }
>

const TOKEN_PRESENTATION: TokenPresentation = {
  v1: {
    tokenType: 'v1',
    suffix: 'v1',
    contractAddress: contracts.tokenAntV1,
  },
  v2: {
    tokenType: 'v2',
    suffix: 'v2',
    contractAddress: contracts.tokenAntV2,
  },
}

function BalanceCard({
  tokenVersion = 'v1',
  price,
  balance,
}: BalanceCardProps): JSX.Element {
  const theme = useTheme()

  const { tokenType, suffix } = TOKEN_PRESENTATION[tokenVersion]

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
          type={tokenType}
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
              margin-bottom: ${1 * GU}px;
            `}
          >
            ANT {suffix}
          </h3>
          <PriceWithSkeleton price={price} />
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
            {balance}
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

function PriceWithSkeleton({ price }: { price: string | null }) {
  const theme = useTheme()

  return (
    <p
      css={`
        min-width: ${18 * GU}px;
        line-height: 1;
        color: ${theme.surfaceContentSecondary};
      `}
    >
      {price ? (
        <>
          ANT Price
          <span
            css={`
              margin-left: ${0.75 * GU}px;
              font-variant-numeric: tabular-nums;
              color: ${theme.positive};
            `}
          >
            ${price}
          </span>
        </>
      ) : (
        <Skeleton />
      )}
    </p>
  )
}

const shimmerAnimation = css`
  background-size: 400% 400%;
  animation: ${keyframes`
  from {
    background-position: 100% 50%;
  }
  to {
    background-position: 0% 50%;
  }
  `} 1s linear infinite;
`

function Skeleton() {
  const theme = useTheme()

  return (
    <span
      css={`
        display: block;
        background-color: ${theme.surfaceUnder};
        border-radius: ${radius.medium};
        background: linear-gradient(
          -45deg,
          ${theme.surfaceUnder},
          ${theme.border},
          ${theme.surfaceUnder},
          ${theme.border}
        );
        ${shimmerAnimation}
      `}
    >
      &nbsp;
    </span>
  )
}

export default BalanceCard