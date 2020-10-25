import React, { ReactNode, useContext, useMemo } from 'react'
import { BigNumber } from 'ethers'
import { usePollTokenPriceUsd } from '../hooks/usePollTokenPriceUsd'
import {
  useBalancerStakedBalance,
  useIncentiveStakedBalance,
  useAntTokenBalance,
  useUniswapStakedBalance,
  useAntTotalSupply,
} from '../hooks/usePolledBalance'

const ANT_TOKEN_DECIMALS = 18

type PolledValue = BigNumber | null

type BalancesContext = {
  antV1Balance: PolledValue
  antV2Balance: PolledValue
  antV1TotalSupply: PolledValue
  uniswapPoolBalance: PolledValue
  balancerPoolBalance: PolledValue
  incentivePoolBalance: PolledValue
  antTokenPriceUsd: string | null
}

const AccountBalancesContext = React.createContext<BalancesContext>({
  antV1Balance: null,
  antV2Balance: null,
  antV1TotalSupply: null,
  uniswapPoolBalance: null,
  balancerPoolBalance: null,
  incentivePoolBalance: null,
  antTokenPriceUsd: null,
})

function AccountBalancesProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const antV1BalanceBn = useAntTokenBalance('v1')
  const antV2BalanceBn = useAntTokenBalance('v2')
  const antV1TotalSupplyBn = useAntTotalSupply('v1')
  const antTokenPriceUsd = usePollTokenPriceUsd()

  const antInUniswapPoolBn = useUniswapStakedBalance()
  const antInBalancerPoolBn = useBalancerStakedBalance()
  const antInIncentivePoolBn = useIncentiveStakedBalance()

  const contextValue = useMemo(
    (): BalancesContext => ({
      antV1Balance: antV1BalanceBn,
      antV2Balance: antV2BalanceBn,
      antV1TotalSupply: antV1TotalSupplyBn,
      uniswapPoolBalance: antInUniswapPoolBn,
      balancerPoolBalance: antInBalancerPoolBn,
      incentivePoolBalance: antInIncentivePoolBn,
      antTokenPriceUsd,
    }),
    [
      antV1BalanceBn,
      antV2BalanceBn,
      antV1TotalSupplyBn,
      antTokenPriceUsd,
      antInUniswapPoolBn,
      antInBalancerPoolBn,
      antInIncentivePoolBn,
    ]
  )

  return (
    <AccountBalancesContext.Provider value={contextValue}>
      {children}
    </AccountBalancesContext.Provider>
  )
}

type BalanceWithDecimals = {
  balance: PolledValue
  decimals: number
}

type LpPool = 'balancer' | 'uniswap' | 'incentive'
type LpBalances = [LpPool, BigNumber][]

type AccountBalances = {
  antV1: BalanceWithDecimals
  antV2: BalanceWithDecimals
  lpBalances: {
    all: LpBalances | null
    available: LpBalances | null
    hasBalances: boolean | null
  }
  antTokenPriceUsd: string | null
  antV1TotalSupply: PolledValue
}

function useAccountBalances(): AccountBalances {
  const {
    antV1Balance,
    antV2Balance,
    antV1TotalSupply,
    antTokenPriceUsd,
    uniswapPoolBalance,
    balancerPoolBalance,
    incentivePoolBalance,
  } = useContext(AccountBalancesContext)

  const lpAllBalances = useMemo((): LpBalances | null => {
    const balances: [LpPool, PolledValue][] = [
      ['balancer', balancerPoolBalance],
      ['uniswap', uniswapPoolBalance],
      ['incentive', incentivePoolBalance],
    ]

    // To prevent value jumps within the UI we only want to
    // return the values after they have all been fetched
    const allBalancesFetched = balances.every((item) => Boolean(item[1]))

    return allBalancesFetched ? (balances as LpBalances) : null
  }, [balancerPoolBalance, uniswapPoolBalance, incentivePoolBalance])

  const lpAvailableBalances = useMemo((): LpBalances | null => {
    return (
      lpAllBalances &&
      lpAllBalances.filter(([, balance]) => balance && !balance.isZero())
    )
  }, [lpAllBalances])

  return {
    antV1: {
      balance: antV1Balance,
      // At the moment it doesn't make sense to request decimals via the contract
      // as we already know the value
      decimals: ANT_TOKEN_DECIMALS,
    },
    antV2: {
      balance: antV2Balance,
      decimals: ANT_TOKEN_DECIMALS,
    },
    lpBalances: {
      all: lpAllBalances,
      available: lpAvailableBalances,
      hasBalances: lpAvailableBalances && lpAvailableBalances.length > 0,
    },
    antTokenPriceUsd,
    antV1TotalSupply,
  }
}

export { useAccountBalances, AccountBalancesProvider }
