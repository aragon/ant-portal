import React, { ReactNode } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'

type Props = {
  children: ReactNode
}

const MainView = React.memo(function MainView({ children }: Props) {
  return (
    <div
      css={`
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 100vh;

        // Lock stacking context below modal
        z-index: 0;
      `}
    >
      <Header />
      <main
        css={`
          display: flex;
          flex-direction: column;
          flex: 1;
        `}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
})

export default MainView
