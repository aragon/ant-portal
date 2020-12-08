import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Spring, Transition, animated } from 'react-spring/renderprops'
import {
  textStyle,
  springs,
  GU,
  // @ts-ignore
} from '@aragon/ui'
import { ScreenId, WalletError, WalletConnector } from './types'
import { fontWeight } from '../../style/font'
import BrandModal from '../BrandModal/BrandModal'

interface ScreenData {
  account: string | null
  activating: WalletConnector | null
  activationError: WalletError
  status: string
  screenId: ScreenId
}

type AccountModalProps = {
  visible: boolean
  children: (screenData: ScreenData) => ReactNode
  onClose: () => void
  screenData: ScreenData
  heading: ReactNode
  screenId: string
  direction: -1 | 1
}

const AnimatedDiv = animated.div

function AccountModal({
  visible,
  children,
  onClose,
  screenData,
  heading,
  screenId,
  direction,
}: AccountModalProps): JSX.Element {
  const [animate, setAnimate] = useState(false)
  const [contentHeight, setHeight] = useState(30 * GU)

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
    <BrandModal visible={visible} onClose={onClose}>
      <>
        <h1
          css={`
            display: flex;
            flex-grow: 0;
            flex-shrink: 0;
            align-items: center;
            margin-bottom: ${3 * GU}px;

            ${textStyle('body2')};
            font-weight: ${fontWeight.medium};
            line-height: 1;
          `}
        >
          {heading}
        </h1>
        <Spring
          native
          config={springs.smooth}
          from={{ height: 32 * GU }}
          to={{ height: contentHeight }}
          immediate={!animate}
        >
          {({ height }) => (
            <AnimatedDiv
              ref={popoverFocusElement}
              tabIndex={0}
              style={{
                // Current spring version has misaligned typings on 'interpolate'
                // @ts-ignore
                height: height.interpolate((h) =>
                  h !== contentHeight ? `${h}px` : 'auto'
                ),
              }}
              css={`
                position: relative;
                flex-grow: 1;
                width: 100%;
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
                  position: 'absolute' as const,
                  transform: `translate3d(${3 * GU * -direction}px, 0, 0)`,
                }}
                immediate={!animate}
              >
                {(screenData) => ({ opacity, transform, position }) => (
                  <AnimatedDiv
                    ref={(elt) => {
                      if (elt) {
                        setHeight(elt.clientHeight)
                      }
                    }}
                    style={{ opacity, transform, position }}
                    css={`
                      top: 0;
                      left: 0;
                      right: 0;
                      width: 100%;
                    `}
                  >
                    {children(screenData)}
                  </AnimatedDiv>
                )}
              </Transition>
            </AnimatedDiv>
          )}
        </Spring>
      </>
    </BrandModal>
  )
}

export default AccountModal
