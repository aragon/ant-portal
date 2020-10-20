import React, { ReactNode, useMemo } from 'react'
import {
  useTheme,
  IconExternal,
  ButtonIcon,
  ButtonBase,
  GU,
  // @ts-ignore
} from '@aragon/ui'
import TokenAntGraphic from '../TokenAntGraphic/TokenAntGraphic'
import { shadowDepth } from '../../style/shadow'
import { radius } from '../../style/radius'
import { fontWeight } from '../../style/font'
import { networkEnvironment } from '../../environment'
import { css, keyframes } from 'styled-components'
import { getEtherscanUrl } from '../../utils/etherscan'

const { contracts } = networkEnvironment

type TokenType = 'v1' | 'v2'

type BalanceCardProps = {
  tokenVersion: TokenType
  price: string | null
  balance: string | null
  accountConnected: boolean
  lpTotalBalance?: string | null
  showLpBalance?: boolean
  lpInfoAvailable?: boolean
  onLpClick?: (() => void) | null
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
  accountConnected,
  lpTotalBalance,
  lpInfoAvailable,
  showLpBalance,
  onLpClick,
}: BalanceCardProps): JSX.Element {
  const theme = useTheme()

  const { tokenType, suffix, contractAddress } = TOKEN_PRESENTATION[
    tokenVersion
  ]

  const etherscanUrl = getEtherscanUrl(contractAddress)

  const lpModalButton = useMemo(() => {
    const title = 'Liquidity pool distribution'
    return onLpClick ? (
      <div
        css={`
          margin: -${1 * GU}px;
        `}
      >
        <ButtonBase
          onClick={onLpClick}
          css={`
            font-size: 18px;
            line-height: 1;
            padding: ${1 * GU}px;
            color: ${theme.link};
          `}
        >
          {title}
        </ButtonBase>
      </div>
    ) : (
      <div
        css={`
          color: ${theme.contentSecondary};
        `}
      >
        {title}
      </div>
    )
  }, [onLpClick, theme])

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
          justify-content: space-between;
          padding-bottom: ${5 * GU}px;
          margin-bottom: ${4.5 * GU}px;
          border-bottom: 1px solid ${theme.border};
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
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

        <ButtonIcon
          label=""
          href={etherscanUrl}
          css={`
            color: ${theme.contentSecondary};
          `}
        >
          <IconExternal size="large" />
        </ButtonIcon>
      </div>
      <div
        css={`
          font-size: 18px;
          line-height: 1;
        `}
      >
        {accountConnected ? (
          <ul>
            <BalanceItem title="Wallet balance" amount={balance} />

            {showLpBalance &&
              (lpInfoAvailable ? (
                <BalanceItem
                  title={lpModalButton}
                  amount={
                    lpTotalBalance && (
                      <span
                        css={`
                          color: ${lpTotalBalance === '0'
                            ? theme.contentSecondary
                            : theme.surfaceContent};
                        `}
                      >
                        {lpTotalBalance}
                      </span>
                    )
                  }
                  skeletonWidth={18 * GU}
                />
              ) : (
                <span
                  css={`
                    color: ${theme.contentSecondary};
                  `}
                >
                  Distribution unavailable on Rinkeby
                </span>
              ))}
          </ul>
        ) : (
          <p
            css={`
              color: ${theme.contentSecondary};
            `}
          >
            Enable account to see your balance
          </p>
        )}
      </div>
    </div>
  )
}

function BalanceItem({
  title,
  amount,
  skeletonWidth = 14 * GU,
}: {
  title: ReactNode
  amount: ReactNode
  skeletonWidth?: number
}) {
  const theme = useTheme()

  return (
    <li
      css={`
        display: flex;
        justify-content: space-between;

        &:not(:last-child) {
          margin-bottom: ${2 * GU}px;
        }
      `}
    >
      <h4>{title}</h4>
      {amount ? (
        <span
          css={`
            letter-spacing: -0.02em;
            font-variant-numeric: tabular-nums;
          `}
        >
          {amount}
          <span
            css={`
              color: ${theme.contentSecondary};
              margin-left: ${0.75 * GU}px;
            `}
          >
            ANT
          </span>
        </span>
      ) : (
        <span
          css={`
            width: 100%;
            max-width: ${skeletonWidth}px;
          `}
        >
          <Skeleton />
        </span>
      )}
    </li>
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
