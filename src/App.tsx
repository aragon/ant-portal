import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
// @ts-ignore
import { LayoutProvider } from '@aragon/ui'
import MainView from './components/MainView'
import Routes from './Routes'
import { breakpoints } from './style/breakpoints'
import { WalletProvider } from './providers/Wallet'

function App(): JSX.Element {
  return (
    <WalletProvider>
      <LayoutProvider breakpoints={breakpoints}>
        <Router>
          <MainView>
            <Routes />
          </MainView>
        </Router>
      </LayoutProvider>
    </WalletProvider>
  )
}

export default App
