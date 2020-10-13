import React, { ReactNode, useContext, useMemo } from 'react'
import {
  useAntTokenV1Contract,
  useAntTokenV2Contract,
} from '../hooks/useContract'
import { useWallet } from './Wallet'
import { usePollTokenBalanceOf } from '../hooks/usePollTokenBalanceOf'
import { BigNumber } from 'ethers'

const ANT_TOKEN_DECIMALS = 18

type Balance = BigNumber | null

type BalancesContext = {
  antV1Balance: Balance
  antV2Balance: Balance
}

const AccountBalancesContext = React.createContext<BalancesContext>({
  antV1Balance: null,
  antV2Balance: null,
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

  const contextValue = useMemo(
    () => ({
      antV1Balance: antV1BalanceBn,
      antV2Balance: antV2BalanceBn,
    }),

    [antV1BalanceBn, antV2BalanceBn]
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
} | null

type AccountBalances = {
  antV1: BalanceWithDecimals
  antV2: BalanceWithDecimals
}

function useAccountBalances(): AccountBalances {
  const { antV1Balance, antV2Balance } = useContext(AccountBalancesContext)

  return {
    antV1: antV1Balance
      ? {
          balance: antV1Balance,
          // At the moment it doesn't make sense to request decimals via the contract
          // as we already know the value
          decimals: ANT_TOKEN_DECIMALS,
        }
      : null,
    antV2: antV2Balance
      ? {
          balance: antV2Balance,
          decimals: ANT_TOKEN_DECIMALS,
        }
      : null,
  }
}

export { useAccountBalances, AccountBalancesProvider }
