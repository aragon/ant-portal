import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
// @ts-ignore
import { LayoutProvider } from '@aragon/ui'
import MainView from './components/MainView'
import Routes from './Routes'
import { breakpoints } from './style/breakpoints'

function App(): JSX.Element {
  return (
    <LayoutProvider breakpoints={breakpoints}>
      <Router>
        <MainView>
          <Routes />
        </MainView>
      </Router>
    </LayoutProvider>
  )
}

export default App
