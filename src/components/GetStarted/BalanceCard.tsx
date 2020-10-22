import React, { ReactNode, useMemo } from 'react'
import {
  useTheme,
  IconExternal,
  ButtonIcon,
  ButtonBase,
  GU,
  useLayout,
  // @ts-ignore
} from '@aragon/ui'
import TokenAntGraphic from '../TokenAntGraphic/TokenAntGraphic'
import { shadowDepth } from '../../style/shadow'
import { radius } from '../../style/radius'
import { fontWeight } from '../../style/font'
import { networkEnvironment } from '../../environment'
import { css, keyframes } from 'styled-components'
import { getEtherscanUrl } from '../../utils/etherscan'
import AntAmount from '../AntAmount/AntAmount'
import UsdAmount from '../UsdAmount/UsdAmount'

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
  const { layoutName } = useLayout()

  const compactMode = layoutName === 'small'

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
        padding: ${compactMode ? 4 * GU : 5 * GU}px;
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
            flex: 1;
          `}
        >
          <TokenAntGraphic
            shadow
            type={tokenType}
            size={compactMode ? '75' : '100'}
            css={`
              flex-shrink: 0;
            `}
          />
          <div
            css={`
              flex: 1;
              padding-left: ${3 * GU}px;
            `}
          >
            <h3
              css={`
                font-size: ${compactMode ? 24 : 28}px;
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
            <BalanceItem
              title="Wallet balance"
              amount={balance}
              compactMode={compactMode}
            />

            {showLpBalance &&
              (lpInfoAvailable ? (
                <BalanceItem
                  title={lpModalButton}
                  amount={lpTotalBalance}
                  skeletonWidth={18 * GU}
                  compactMode={compactMode}
                />
              ) : (
                <span
                  css={`
                    color: ${theme.contentSecondary};
                  `}
                >
                  {/* TODO: Potentially remove this, though I can't imagine we'd have any external visitors to our staging deploy */}
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

type BalanceItemType = {
  title: ReactNode
  amount?: string | null
  skeletonWidth?: number
  compactMode: boolean
}

function BalanceItem({
  title,
  amount,
  skeletonWidth = 14 * GU,
  compactMode,
}: BalanceItemType) {
  return (
    <li
      css={`
        display: flex;
        justify-content: space-between;

        flex-direction: ${compactMode ? 'column' : 'row'};

        &:not(:last-child) {
          margin-bottom: ${compactMode ? 3 * GU : 2 * GU}px;
        }
      `}
    >
      <h4
        css={`
          margin-bottom: ${compactMode ? 1.25 * GU : 0}px;
        `}
      >
        {title}
      </h4>
      {amount ? (
        <AntAmount amount={amount} />
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
        line-height: 1;
        color: ${theme.surfaceContentSecondary};
      `}
    >
      {price ? (
        <>
          ANT Price
          <UsdAmount
            amount={price}
            css={`
              margin-left: ${0.75 * GU}px;
              color: ${theme.positive};
            `}
          />
        </>
      ) : (
        <span
          css={`
            display: block;
            max-width: ${15 * GU}px;
          `}
        >
          <Skeleton />
        </span>
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
