import React, { ReactNode, useEffect } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { useLocation } from 'react-router-dom'

type Props = {
  children: ReactNode
}

const MainView = React.memo(function MainView({ children }: Props) {
  const { pathname } = useLocation()

  // Reset scroll position on route change
  useEffect(() => {
    document.getElementsByTagName('body')[0].scrollTo(0, 0)
  }, [pathname])

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
