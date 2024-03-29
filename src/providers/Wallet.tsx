import React, { ReactNode, useContext, useMemo } from 'react'
import { providers as EthersProviders } from 'ethers'
import { UseWalletProvider, useWallet } from 'use-wallet'
import { getUseWalletConnectors } from '../components/Account/ethereum-providers'
import { WalletWithProvider } from '../components/Account/types'

export type Web3Provider = EthersProviders.Web3Provider

type WalletContext = {
  ethers: Web3Provider | null
} & WalletWithProvider

const WalletAugmentedContext = React.createContext<WalletContext | null>(null)

// Adds Ethers.js to the useWallet() object
function WalletAugmented({ children }: { children: ReactNode }) {
  const wallet = useWallet()
  const { ethereum } = wallet

  const ethers = useMemo(
    () => (ethereum ? new EthersProviders.Web3Provider(ethereum) : null),
    [ethereum]
  )

  const contextValue = useMemo((): WalletContext => ({ ...wallet, ethers }), [
    wallet,
    ethers,
  ])

  return (
    <WalletAugmentedContext.Provider value={contextValue}>
      {children}
    </WalletAugmentedContext.Provider>
  )
}

function WalletProvider({ children }: { children: ReactNode }): JSX.Element {
  return (
    <UseWalletProvider connectors={getUseWalletConnectors()}>
      <WalletAugmented>{children}</WalletAugmented>
    </UseWalletProvider>
  )
}

function useWalletAugmented(): WalletContext {
  return useContext(WalletAugmentedContext) as WalletContext
}

export { useWalletAugmented as useWallet, WalletProvider }
