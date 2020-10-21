import React, { useState, useCallback } from 'react'
// @ts-ignore
import { ButtonBase, IconRight, GU, useLayout, useTheme } from '@aragon/ui'
import { Transition, animated } from 'react-spring/renderprops'
import { fontWeight } from '../../style/font'
import { shadowDepth } from '../../style/shadow'
import { radius } from '../../style/radius'

const AnimatedDiv = animated.div

type FaqProps = {
  items: [string, string][]
}

type ItemProps = {
  title: string
  description: string
}

type ToggleButtonProps = {
  opened: boolean
}

function Faq({ items }: FaqProps): JSX.Element {
  return (
    <>
      {items.map(([title, description], index) => (
        <Item key={index} title={title} description={description} />
      ))}
    </>
  )
}

function Item({ title, description }: ItemProps): JSX.Element {
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
        margin-bottom: ${GU}px;
      `}
    >
      <ButtonBase
        onClick={toggleButton}
        css={`
          width: 100%;
          z-index: 2;
          height: auto;
          padding: ${3 * GU}px ${8.5 * GU}px ${3 * GU}px ${3 * GU}px;
          background: ${theme.surface};
          box-shadow: ${shadowDepth.medium};
          border-radius: ${radius.medium};
          font-weight: ${fontWeight.medium};
          font-size: ${compactMode ? `19` : `24`}px;
          text-align: left;
          color: ${theme.content};
          white-space: break-spaces;
        `}
      >
        <ToggleButton opened={opened} />
        <p>{title}</p>
      </ButtonBase>

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
                border-radius: ${radius.high};
              `}
              style={props}
            >
              <div
                css={`
                  width: 100%;
                  overflow: hidden;
                  color: ${theme.tagIdentifier};
                  padding: ${3.75 * GU}px ${4.5 * GU}px ${3.2 * GU}px;
                `}
              >
                {description}
              </div>
            </AnimatedDiv>
          ))
        }
      </Transition>
    </div>
  )
}

function ToggleButton({ opened }: ToggleButtonProps) {
  const theme = useTheme()
  const { layoutName } = useLayout()

  const compactMode = layoutName === 'small'

  return (
    <div
      css={`
        position: absolute;
        top: ${compactMode ? 2.75 * GU : 1.87 * GU}px;
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
          transform: rotate3d(0, 0, ${opened ? 1 : 0}, 90deg);
        `}
      >
        <div
          css={`
            background: #dfebf766;
            border-radius: ${compactMode ? 4 * GU : 6.25 * GU}px;
            width: ${compactMode ? 4 * GU : 6.25 * GU}px;
            height: ${compactMode ? 4 * GU : 6.25 * GU}px;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <IconRight
            size={compactMode ? 'small' : 'medium'}
            css={`
              stroke: currentColor;
              stroke-width: 1px;
              color: black;
            `}
          />
        </div>
      </div>
    </div>
  )
}

export default Faq
