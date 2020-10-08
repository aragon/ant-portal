import React, { useState, useEffect, useRef, ReactNode } from 'react'
// @ts-ignore
import { GU, Popover, springs, textStyle, useTheme } from '@aragon/ui'
import { Spring, Transition, animated } from 'react-spring/renderprops'
import { ScreenId, WalletError, WalletConnector } from './types'

const AnimatedDiv = animated.div

interface ScreenData {
  account: string | null
  activating: WalletConnector | null
  activationError: WalletError
  status: string
  screenId: ScreenId
}

type AccountPopoverProps = {
  children: (arg0: ScreenData) => ReactNode
  direction: -1 | 1
  heading: ReactNode
  onClose: () => void
  opener: any
  screenData: ScreenData
  screenId: string
  visible: boolean
}

function AccountPopover({
  children,
  direction,
  heading,
  onClose,
  opener,
  screenData,
  screenId,
  visible,
}: AccountPopoverProps): JSX.Element {
  const theme = useTheme()

  const [animate, setAnimate] = useState(false)
  const [height, setHeight] = useState(30 * GU)
  const [measuredHeight, setMeasuredHeight] = useState(true)

  // Prevents to lose the focus on the popover when a screen leaves while an
  // element inside is focused (e.g. when clicking on the “disconnect” button).
  const popoverFocusElement = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (popoverFocusElement.current) {
      popoverFocusElement.current.focus()
    }
  }, [screenId])

  // Don’t animate the slider until the popover has opened
  useEffect(() => {
    let timer: number

    setAnimate(false)

    if (visible) {
      timer = setTimeout(() => {
        setAnimate(true)
      }, 0)
    }

    return () => clearTimeout(timer)
  }, [visible])

  return (
    <Popover
      closeOnOpenerFocus
      onClose={onClose}
      opener={opener}
      placement="bottom-end"
      visible={visible}
      css={`
        width: ${51 * GU}px;
      `}
    >
      <section
        css={`
          display: flex;
          flex-direction: column;
          overflow: hidden;
        `}
      >
        <h1
          css={`
            display: flex;
            flex-grow: 0;
            flex-shrink: 0;
            align-items: center;
            height: ${4 * GU}px;
            padding-left: ${2 * GU}px;
            border-bottom: 1px solid ${theme.border};
            color: ${theme.contentSecondary};
            ${textStyle('label2')};
          `}
        >
          {heading}
        </h1>
        <Spring
          config={springs.smooth}
          from={{ height: 32 * GU }}
          to={{ height }}
          immediate={!animate}
          native
        >
          {({ height }) => (
            <AnimatedDiv
              ref={popoverFocusElement}
              tabIndex={0}
              style={{ height: measuredHeight ? height : 'auto' }}
              css={`
                position: relative;
                flex-grow: 1;
                width: 100%;
                overflow: hidden;
                outline: 0;
              `}
            >
              <Transition
                native
                config={springs.smooth}
                items={screenData}
                keys={({ account, activating, activationError, screenId }) =>
                  (activationError ? activationError.name : '') +
                  account +
                  activating +
                  screenId
                }
                from={{
                  opacity: 0,
                  transform: `translate3d(${3 * GU * direction}px, 0, 0)`,
                }}
                enter={{ opacity: 1, transform: `translate3d(0, 0, 0)` }}
                leave={{
                  opacity: 0,
                  transform: `translate3d(${3 * GU * -direction}px, 0, 0)`,
                }}
                immediate={!animate}
                onStart={() => {
                  setMeasuredHeight(true)
                }}
              >
                {(screenData) => ({ opacity, transform }) => (
                  <AnimatedDiv
                    ref={(elt) => {
                      if (elt) {
                        setHeight(elt.clientHeight)
                      }
                    }}
                    style={{ opacity, transform }}
                    css={`
                      position: ${measuredHeight ? 'absolute' : 'static'};
                      top: 0;
                      left: 0;
                      right: 0;
                    `}
                  >
                    {children(screenData)}
                  </AnimatedDiv>
                )}
              </Transition>
            </AnimatedDiv>
          )}
        </Spring>
      </section>
    </Popover>
  )
}

export default AccountPopover
