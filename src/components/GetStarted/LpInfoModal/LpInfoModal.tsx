import React, { useMemo } from 'react'
import {
  GU,
  Link,
  useTheme,
  // @ts-ignore
} from '@aragon/ui'
// @ts-ignore
import TokenAmount from 'token-amount'
import { fontWeight } from '../../../style/font'
import BrandModal from '../../BrandModal/BrandModal'
import { useAccountBalances } from '../../../providers/AccountBalances'
import { formatTokenAmountToUsd } from '../../../utils/math-utils'
import AntAmount from '../../AntAmount/AntAmount'
import UsdAmount from '../../UsdAmount/UsdAmount'
import TokenIcon from './TokenIcon'
import { radius } from '../../../style/radius'
import { shadowDepth } from '../../../style/shadow'

type KnownTokenSymbol = 'ANT' | 'ETH' | 'UNI'

const KNOWN_TOKENS = new Map<KnownTokenSymbol, string>([
  ['ANT', '0x960b236A07cf122663c4303350609A66A7B288C0'],
  ['ETH', '0x0000000000000000000000000000000000000000'],
  ['UNI', '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'],
])

const POOL_INFO = {
  uniswap: {
    title: 'Uniswap ANT / UNI',
    url:
      'https://app.uniswap.org/#/remove/0x960b236a07cf122663c4303350609a66a7b288c0/ETH',
    tokenPair: getTokenPair('ANT', 'UNI'),
  },
  balancer: {
    title: 'Balancer ANT / ETH',
    url:
      'https://pools.balancer.exchange/#/pool/0x2cf9106faf2c5c8713035d40df655fb1b9b0f9b9',
    tokenPair: getTokenPair('ANT', 'ETH'),
  },
  incentive: {
    title: 'Aragon Rewards ANT / ETH',
    url: 'https://liquidity.aragon.org/',
    tokenPair: getTokenPair('ANT', 'ETH'),
  },
}

type TokenPair = [[KnownTokenSymbol, string], [KnownTokenSymbol, string]]

type PoolItem = {
  title: string
  url: string
  tokenPair: TokenPair
  amount: string
  value: string | null
}

function getTokenPair(
  firstSymbol: KnownTokenSymbol,
  secondSymbol: KnownTokenSymbol
): TokenPair {
  return [
    [firstSymbol, KNOWN_TOKENS.get(firstSymbol) ?? ''],
    [secondSymbol, KNOWN_TOKENS.get(secondSymbol) ?? ''],
  ]
}

type LpInfoModaProps = {
  visible: boolean
  onClose: () => void
}

function LpInfoModal({ visible, onClose }: LpInfoModaProps): JSX.Element {
  const { antV1, antTokenPriceUsd, lpBalances } = useAccountBalances()

  const theme = useTheme()

  const poolItems = useMemo((): PoolItem[] | null => {
    const decimals = antV1.decimals

    return lpBalances
      ? lpBalances.map((balance) => {
          const [key, antBalance] = balance
          const { title, url, tokenPair } = POOL_INFO[key]

          return {
            title,
            url,
            tokenPair,
            amount: new TokenAmount(antBalance, decimals).format({
              digits: 2,
            }),
            value:
              antTokenPriceUsd &&
              formatTokenAmountToUsd(antBalance, decimals, antTokenPriceUsd),
          }
        })
      : null
  }, [lpBalances, antV1, antTokenPriceUsd])

  return (
    <BrandModal visible={visible} onClose={onClose} width={750}>
      <>
        <h1
          css={`
            display: flex;
            flex-grow: 0;
            flex-shrink: 0;
            align-items: center;
            margin-bottom: ${2 * GU}px;

            font-size: 24px;
            font-weight: ${fontWeight.medium};
            line-height: 1.2;
          `}
        >
          Liquidity pools distribution
        </h1>
        <p
          css={`
            color: ${theme.surfaceContentSecondary};
            margin-bottom: ${4 * GU}px;
          `}
        >
          You hold ANT v1 locked in the following liquidity pools. In order to
          migrate those tokens, you must remove liquidity from those
          decentralized exchanges first.
        </p>
        {poolItems && <PoolTable items={poolItems} />}
      </>
    </BrandModal>
  )
}

function PoolTable({ items }: { items: PoolItem[] }) {
  const theme = useTheme()

  return (
    <table
      css={`
        width: 100%;

        th,
        td {
          text-align: right;
          padding: 0;

          &:first-child {
            text-align: left;
          }
        }

        th {
          font-weight: ${fontWeight.regular};
          color: ${theme.contentSecondary};

          padding-bottom: ${0.75 * GU}px;
        }

        tr {
          td {
            padding-top: ${0.25 * GU}px;
            padding-bottom: ${0.25 * GU}px;
          }
        }
      `}
    >
      <thead>
        <tr>
          <th>Assets</th>
          <th>Amount</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {items &&
          items.map((item, i) => {
            const { amount, value, tokenPair, title, url } = item

            return (
              <tr key={i}>
                <td>
                  <TokenPairGraphic
                    tokenPair={tokenPair}
                    title={title}
                    url={url}
                  />
                </td>
                <td>
                  <AntAmount amount={amount} />
                </td>
                <td>{value && <UsdAmount amount={value} />}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

function TokenPairGraphic({
  tokenPair,
  title,
  url,
}: {
  tokenPair: TokenPair
  title: string
  url: string
}): JSX.Element {
  const theme = useTheme()
  const [[, firstTokenAddress], [, secondTokenAddress]] = tokenPair

  return (
    <div
      css={`
        display: flex;
        align-items: center;
      `}
    >
      <Link
        href={url}
        css={`
          display: flex;
          align-items: center;
          text-decoration: none;
        `}
      >
        <div
          css={`
            display: flex;
            flex-shrink: 0;
            padding: ${0.5 * GU}px;
            background-color: ${theme.surface};
            border-radius: ${radius.pill};
            box-shadow: ${shadowDepth.low};
          `}
        >
          <TokenIcon
            address={firstTokenAddress}
            css={`
              z-index: 1;
            `}
          />
          <TokenIcon
            address={secondTokenAddress}
            css={`
              margin-left: -${1 * GU}px;
            `}
          />
        </div>
        <span
          css={`
            margin-left: ${2 * GU}px;
          `}
        >
          {title} Pool
        </span>
      </Link>
    </div>
  )
}

export default LpInfoModal
