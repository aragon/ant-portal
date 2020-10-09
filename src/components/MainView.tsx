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
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <Header />
      <main
        css={`
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
