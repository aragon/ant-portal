import React, { ReactNode, useEffect } from 'react'
// @ts-ignore
import { GU } from '@aragon/ui'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { useLocation } from 'react-router-dom'
import { animated, Spring } from 'react-spring/renderprops'
import { springs } from '../style/springs'

type Props = {
  children: ReactNode
}

const AnimatedDiv = animated.div

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
      <AnimateEntrance direction={-1}>
        <Header />
      </AnimateEntrance>

      <AnimateEntrance>
        <main
          css={`
            display: flex;
            flex-direction: column;
            flex: 1;
          `}
        >
          {children}
        </main>
      </AnimateEntrance>
      <AnimateEntrance>
        <Footer />
      </AnimateEntrance>
    </div>
  )
})

type AnimateEntranceProps = {
  children: ReactNode
  direction?: 1 | -1
}

function AnimateEntrance({
  children,
  direction = 1,
}: AnimateEntranceProps): JSX.Element {
  return (
    <Spring
      config={springs.subtle}
      delay={400}
      from={{
        opacity: 0,
        transform: `translate3d(0, ${5 * GU * direction}px, 0)`,
      }}
      to={{ opacity: 1, transform: `translate3d(0, 0, 0)` }}
    >
      {(animationProps) => (
        <div
          css={`
            position: relative;
            overflow: hidden;
          `}
        >
          <AnimatedDiv style={animationProps}>{children}</AnimatedDiv>
        </div>
      )}
    </Spring>
  )
}

export default MainView
