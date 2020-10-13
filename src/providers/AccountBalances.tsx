import React, { ReactNode, useContext } from 'react'
import { BigNumber } from 'ethers'
import { useAntTokenV1Contract } from '../hooks/useContract'
import { useWallet } from './Wallet'
import { useTokenBalanceOf } from '../hooks/useTokenBalanceOf'

type BalancesContext = {
  antV1Balance: BigNumber | null
}

const AccountBalancesContext = React.createContext<BalancesContext | null>(null)

function AccountBalancesProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const { account } = useWallet()
  const antTokenV1Contract = useAntTokenV1Contract()
  const antV1Balance = useTokenBalanceOf(account, antTokenV1Contract)

  return (
    <AccountBalancesContext.Provider value={{ antV1Balance }}>
      {children}
    </AccountBalancesContext.Provider>
  )
}

function useAccountBalances(): BalancesContext {
  return useContext(AccountBalancesContext) as BalancesContext
}

export { useAccountBalances, AccountBalancesProvider }
