import React, { ReactNode, useState, useCallback } from 'react'
// @ts-ignore
import { ButtonIcon, GU, RADIUS, useLayout, useTheme } from '@aragon/ui'
import { Transition, animated } from 'react-spring/renderprops'
import { fontWeight } from '../../style/font'
import arrow from '../../assets/arrow.svg'

const AnimatedDiv = animated.div

type FaqProps = {
  content: ReactNode
  expansion: ReactNode
}

type ToggleButtonProps = {
  onClick: () => void
  opened: boolean
}

function Faq({ content, expansion }: FaqProps): JSX.Element {
  const [opened, setOpened] = useState(false)
  const theme = useTheme()
  const { layoutName } = useLayout()

  const compactMode = layoutName === 'small'

  const toggleButton = useCallback(() => {
    setOpened((opened) => !opened)
  }, [])

  return (
    <div
      css={`
        position: relative;
        margin-bottom: ${RADIUS}px;
      `}
    >
      <div
        css={`
          width: 100%;
          z-index: 2;
          height: auto;
          padding: ${3 * GU}px ${8.5 * GU}px ${3 * GU}px ${3 * GU}px;
          background: ${theme.surface};
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          font-weight: ${fontWeight.medium};
          font-size: ${compactMode ? `19` : `24`}px;
          color: ${theme.content};
        `}
      >
        <ToggleButton onClick={toggleButton} opened={opened} />
        {content}
      </div>

      <Transition
        native
        items={opened}
        from={{ height: 0 }}
        enter={{ height: 'auto' }}
        leave={{ height: 0 }}
      >
        {(show) =>
          show &&
          ((props) => (
            <AnimatedDiv
              css={`
                background-color: ${theme.surfaceSelected};
                overflow: hidden;
                z-index: 1;
                margin-top: 10px;
                margin-bottom: 20px;
              `}
              style={props}
            >
              <div
                css={`
                  width: 100%;
                  overflow: hidden;
                  color: ${theme.tagIdentifier};

                  padding: 30px 36px 25px;
                  border-radius: 12px;
                `}
              >
                {expansion}
              </div>
            </AnimatedDiv>
          ))
        }
      </Transition>
    </div>
  )
}

function ToggleButton({ onClick, opened }: ToggleButtonProps) {
  const theme = useTheme()
  const { layoutName } = useLayout()

  const compactMode = layoutName === 'small'

  return (
    <ButtonIcon
      label={opened ? 'Close' : 'Open'}
      focusRingRadius={RADIUS}
      onClick={onClick}
      css={`
        position: absolute;
        top: ${3.5 * GU}px;
        right: ${3.5 * GU}px;
        display: flex;
        flex-direction: column;
        color: ${theme.surfaceContentSecondary};
        & > div {
          display: flex;
          transform-origin: 50% 50%;
          transition: transform 250ms ease-in-out;
        }
      `}
    >
      <div
        css={`
          transform: rotate3d(${opened ? 1 : 0}, 0, 0, 90deg);
          transform: rotate3d(0, 0, ${opened ? 1 : 0}, 90deg);
        `}
      >
        <img alt="" src={arrow} width={compactMode ? `36` : `51`} />
      </div>
    </ButtonIcon>
  )
}

export default Faq
