import React, { useEffect, useState } from 'react'
import { animated, Transition } from 'react-spring/renderprops'
import {
  GU,
  // @ts-ignore
} from '@aragon/ui'
import { useDisableAnimation } from '../../hooks/useDisableAnimation'
import { springs } from '../../style/springs'
import CheckerForm from './CheckerForm'

const AnimatedDiv = animated.div

type CheckState = 'init' | 'other'

function Checker(): JSX.Element {
  const [direction, setDirection] = useState<1 | -1>(-1)
  const [animationDisabled, enableAnimation] = useDisableAnimation()
  const [checkState, setCheckState] = useState<CheckState>('init')

  useEffect(() => {
    if (checkState === 'init') {
      setDirection(-1)
    }

    if (checkState === 'init') {
      setDirection(1)
    }
  }, [checkState])

  return (
    <Transition
      items={checkState}
      config={springs.tight}
      onStart={enableAnimation}
      immediate={animationDisabled}
      from={{
        opacity: 0,
        transform: `translate3d(${15 * GU * -direction}px, 0, 0)`,
      }}
      enter={{
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
      }}
      leave={{
        opacity: 0,
        position: 'absolute' as const,
        transform: `translate3d(${15 * GU * direction}px, 0, 0)`,
      }}
      native
    >
      {(currentStage) =>
        currentStage === 'init'
          ? (animationProps) => (
              <AnimatedDiv
                style={animationProps}
                css={`
                  width: 100%;
                  max-width: ${120 * GU}px;
                `}
              >
                <CheckerForm />
              </AnimatedDiv>
            )
          : (animationProps) => (
              <AnimatedDiv
                style={animationProps}
                css={`
                  width: 100%;
                `}
              >
                <CheckerForm />
              </AnimatedDiv>
            )
      }
    </Transition>
  )
}

export default Checker
