import React, { ReactNode, useContext, useMemo } from 'react'
import {
  useAntTokenV1Contract,
  useAntTokenV2Contract,
} from '../hooks/useContract'
import { useWallet } from './Wallet'
import { usePollTokenBalanceOf } from '../hooks/usePollTokenBalanceOf'
import { BigNumber } from 'ethers'
import { usePollTokenPriceUsd } from '../hooks/usePollTokenPriceUsd'

const ANT_TOKEN_DECIMALS = 18

type Balance = BigNumber | null

type BalancesContext = {
  antV1Balance: Balance
  antV2Balance: Balance
  antTokenPriceUsd: string | null
}

const AccountBalancesContext = React.createContext<BalancesContext>({
  antV1Balance: null,
  antV2Balance: null,
  antTokenPriceUsd: null,
})

function AccountBalancesProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const { account } = useWallet()

  const antTokenV1Contract = useAntTokenV1Contract()
  const antTokenV2Contract = useAntTokenV2Contract()

  const antV1BalanceBn = usePollTokenBalanceOf(account, antTokenV1Contract)
  const antV2BalanceBn = usePollTokenBalanceOf(account, antTokenV2Contract)
  const antTokenPriceUsd = usePollTokenPriceUsd('ANT')

  const contextValue = useMemo(
    () => ({
      antV1Balance: antV1BalanceBn,
      antV2Balance: antV2BalanceBn,
      antTokenPriceUsd,
    }),

    [antV1BalanceBn, antV2BalanceBn, antTokenPriceUsd]
  )

  return (
    <AccountBalancesContext.Provider value={contextValue}>
      {children}
    </AccountBalancesContext.Provider>
  )
}

type BalanceWithDecimals = {
  balance: Balance
  decimals: number
}

type AccountBalances = {
  antV1: BalanceWithDecimals
  antV2: BalanceWithDecimals
  antTokenPriceUsd: string | null
}

function useAccountBalances(): AccountBalances {
  const { antV1Balance, antV2Balance, antTokenPriceUsd } = useContext(
    AccountBalancesContext
  )

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
    antTokenPriceUsd,
  }
}

export { useAccountBalances, AccountBalancesProvider }
