import React, { MutableRefObject, ReactNode, useCallback } from 'react'
import { Transition, animated } from 'react-spring/renderprops'

import {
  RootPortal,
  useTheme,
  useViewport,
  noop,
  springs,
  ButtonIcon,
  IconCross,
  GU,
  // @ts-ignore
} from '@aragon/ui'
import { shadowDepth } from '../../style/shadow'
import { radius } from '../../style/radius'
import { rgba } from 'polished'

const SPACE_AROUND = 4 * GU

const AnimatedDiv = animated.div

type BrandModalProps = {
  children: ReactNode
  onClose: () => void
  onClosed?: () => void
  visible: boolean
  width?: number
  padding?: number
}

function BrandModal({
  children,
  onClose,
  onClosed = noop,
  visible,
  width = 600,
  padding = 4 * GU,
  ...props
}: BrandModalProps): JSX.Element {
  const theme = useTheme()
  const { width: viewportWidth } = useViewport()
  const innerModalContainer = React.useRef() as MutableRefObject<HTMLDivElement>

  const modalWidth = Math.min(viewportWidth - SPACE_AROUND * 2, width)
  const scrimColor = rgba(`#${theme.disabledContent.hexColor}`, 0.3)

  const handleClickOutside = useCallback(
    (e) => {
      if (e.target && !innerModalContainer.current.contains(e.target)) {
        onClose()
      }
    },
    [innerModalContainer, onClose]
  )

  return (
    <RootPortal>
      <Transition
        native
        items={visible}
        from={{ opacity: 0, scale: 0.98 }}
        enter={{ opacity: 1, scale: 1 }}
        leave={{ opacity: 0, scale: 0.98 }}
        config={{ ...springs.smooth, precision: 0.001 }}
        onDestroyed={(destroyed: boolean) => {
          destroyed && onClosed()
        }}
      >
        {(show) =>
          show &&
          /* eslint-disable react/prop-types */
          (({ opacity, scale }) => (
            <AnimatedDiv
              css={`
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow: auto;
                background-color: ${scrimColor};
              `}
              style={{ opacity }}
              onClick={handleClickOutside}
              {...props}
            >
              <AnimatedDiv
                css={`
                  position: relative;
                  display: flex;
                  flex-direction: column;

                  height: 100%;
                `}
                style={{
                  pointerEvents: visible ? 'auto' : 'none',
                  // Current spring version has misaligned typings on 'interpolate'
                  // @ts-ignore
                  transform: scale.interpolate(
                    (v: number) => `scale3d(${v}, ${v}, 1)`
                  ),
                }}
              >
                <div
                  css={`
                    padding: ${SPACE_AROUND}px 0;
                    margin: auto;
                  `}
                >
                  <div
                    role="alertdialog"
                    ref={innerModalContainer}
                    css={`
                      position: relative;
                      overflow: hidden;
                      min-width: ${360 - SPACE_AROUND * 2}px;
                      background-color: ${theme.surface};
                      box-shadow: ${shadowDepth.overlay};
                      border-radius: ${radius.high};
                    `}
                    style={{
                      padding: padding,
                      width: modalWidth,
                    }}
                  >
                    <div
                      css={`
                        position: relative;
                      `}
                    >
                      <ButtonIcon
                        label=""
                        css={`
                          position: absolute;
                          top: -${1 * GU}px;
                          right: -${1 * GU}px;
                          z-index: 2;
                        `}
                        onClick={onClose}
                      >
                        <IconCross
                          css={`
                            color: ${theme.surfaceContent};
                          `}
                        />
                      </ButtonIcon>
                      {children}
                    </div>
                  </div>
                </div>
              </AnimatedDiv>
            </AnimatedDiv>
          ))
        }
      </Transition>
    </RootPortal>
  )
}

export default BrandModal
