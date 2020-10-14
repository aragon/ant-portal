import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
// @ts-ignore
import { LayoutProvider } from '@aragon/ui'
import MainView from './components/MainView'
import Routes from './Routes'
import { breakpoints } from './style/breakpoints'
import { WalletProvider } from './providers/Wallet'
import { AccountBalancesProvider } from './providers/AccountBalances'
import { AccountModuleProvider } from './components/Account/AccountModuleProvider'

function App(): JSX.Element {
  return (
    <WalletProvider>
      <AccountBalancesProvider>
        <AccountModuleProvider>
          <LayoutProvider breakpoints={breakpoints}>
            <Router>
              <MainView>
                <Routes />
              </MainView>
            </Router>
          </LayoutProvider>
        </AccountModuleProvider>
      </AccountBalancesProvider>
    </WalletProvider>
  )
}

export default App
