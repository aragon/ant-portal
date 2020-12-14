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
  ...props
}: AnimateEntranceProps): JSX.Element {
  return (
    <Spring
      native
      config={springs.subtle}
      delay={100}
      from={{
        opacity: 0,
        y: 5 * GU * direction,
      }}
      to={{ opacity: 1, y: 0 }}
    >
      {({ opacity, y }) => (
        <div
          css={`
            position: relative;
            overflow: hidden;
          `}
          {...props}
        >
          <AnimatedDiv
            style={{
              opacity,
              // Prevent rasterization artifacts by removing transform once animation has completed
              // Current spring version has misaligned typings on 'interpolate'
              // @ts-ignore
              transform: y.interpolate((y: number) =>
                y !== 0 ? `translate3d(0, ${y}px, 0)` : 'none'
              ),
            }}
            css={`
              width: 100%;
            `}
          >
            {children}
          </AnimatedDiv>
        </div>
      )}
    </Spring>
  )
}

export default AnimateEntrance
