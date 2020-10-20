import React, { ReactNode, useContext, useMemo } from 'react'
import { BigNumber } from 'ethers'
import { usePollTokenPriceUsd } from '../hooks/usePollTokenPriceUsd'
import {
  useBalancerStakedBalance,
  useIncentiveStakedBalance,
  useTokenBalance,
  useUniswapStakedBalance,
} from '../hooks/usePolledBalance'
import {
  MOCK_BALANCER_POOL_ACCOUNT,
  MOCK_INCENTIVE_POOL_ACCOUNT,
  MOCK_UNISWAP_POOL_ACCOUNT,
} from '../mock'
import { useWallet } from 'use-wallet'

const ANT_TOKEN_DECIMALS = 18

type PolledValue = BigNumber | null

type BalancesContext = {
  antV1Balance: PolledValue
  antV2Balance: PolledValue
  uniswapPoolBalance: PolledValue
  balancerPoolBalance: PolledValue
  incentivePoolBalance: PolledValue
  antTokenPriceUsd: string | null
}

const AccountBalancesContext = React.createContext<BalancesContext>({
  antV1Balance: null,
  antV2Balance: null,
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
  const { account } = useWallet()

  const antV1BalanceBn = useTokenBalance(account, 'antV1')
  const antV2BalanceBn = useTokenBalance(account, 'antV2')
  const antTokenPriceUsd = usePollTokenPriceUsd()

  // TODO: Remove mockAccount flag
  const antInUniswapPoolBn = useUniswapStakedBalance(MOCK_UNISWAP_POOL_ACCOUNT)
  const antInBalancerPoolBn = useBalancerStakedBalance(
    MOCK_BALANCER_POOL_ACCOUNT
  )
  const antInIncentivePoolBn = useIncentiveStakedBalance(
    MOCK_INCENTIVE_POOL_ACCOUNT
  )

  const contextValue = useMemo(
    (): BalancesContext => ({
      antV1Balance: antV1BalanceBn,
      antV2Balance: antV2BalanceBn,
      uniswapPoolBalance: antInUniswapPoolBn,
      balancerPoolBalance: antInBalancerPoolBn,
      incentivePoolBalance: antInIncentivePoolBn,
      antTokenPriceUsd,
    }),

    [
      antV1BalanceBn,
      antV2BalanceBn,
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

type AccountBalances = {
  antV1: BalanceWithDecimals
  antV2: BalanceWithDecimals
  uniswapPoolBalance: PolledValue
  balancerPoolBalance: PolledValue
  incentivePoolBalance: PolledValue
  antTokenPriceUsd: string | null
}

function useAccountBalances(): AccountBalances {
  const {
    antV1Balance,
    antV2Balance,
    antTokenPriceUsd,
    uniswapPoolBalance,
    balancerPoolBalance,
    incentivePoolBalance,
  } = useContext(AccountBalancesContext)

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
    uniswapPoolBalance,
    balancerPoolBalance,
    incentivePoolBalance,
    antTokenPriceUsd,
  }
}

export { useAccountBalances, AccountBalancesProvider }
