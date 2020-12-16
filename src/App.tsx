import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
// @ts-ignore
import { LayoutProvider } from '@aragon/ui'
// @ts-ignore
import { UseTokenProvider } from 'use-token'
import MainView from './components/MainView'
import Routes from './Routes'
import { breakpoints } from './style/breakpoints'
import { WalletProvider } from './providers/Wallet'
import { AccountBalancesProvider } from './providers/AccountBalances'
import { AccountModuleProvider } from './components/Account/AccountModuleProvider'
import { ActivityProvider } from './components/Activity/ActivityProvider'
import CustomToast from './providers/CustomToast'

function App(): JSX.Element {
  return (
    <WalletProvider>
      <CustomToast>
        <UseTokenProvider>
          <AccountBalancesProvider>
            <AccountModuleProvider>
              <ActivityProvider>
                <LayoutProvider breakpoints={breakpoints}>
                  <Router>
                    <MainView>
                      <Routes />
                    </MainView>
                  </Router>
                </LayoutProvider>
              </ActivityProvider>
            </AccountModuleProvider>
          </AccountBalancesProvider>
        </UseTokenProvider>
      </CustomToast>
    </WalletProvider>
  )
}

export default App
