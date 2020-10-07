import React, { ReactNode } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'

type Props = {
  children: ReactNode
}

const MainView = React.memo(function MainView({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
})

export default MainView
