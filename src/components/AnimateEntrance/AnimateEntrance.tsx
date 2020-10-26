import React from 'react'
// @ts-ignore
import { GU } from '@aragon/ui'
import { springs } from '../../style/springs'
import { animated, Spring } from 'react-spring/renderprops'
import { ReactNode } from 'react'

const AnimatedDiv = animated.div

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
      native
      config={springs.subtle}
      delay={100}
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

export default AnimateEntrance
