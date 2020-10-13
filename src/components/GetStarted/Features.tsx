import React from 'react'
// @ts-ignore
import { GU, Link, useTheme, useViewport } from '@aragon/ui'
import featuresSvg from '../../assets/antv2-features.svg'

function Features(): JSX.Element {
  const theme = useTheme()
  const { below } = useViewport()
  const belowLarge = below('large')
  const compactMode = below('medium')

  return (
    <div
      css={`
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: ${compactMode ? `column` : `row`};
        padding: ${10 * GU}px ${2 * GU}px;
        width: 100%;
      `}
    >
      <div
        css={`
          max-width: ${64 * GU}px;
        `}
      >
        <h1
          css={`
            font-weight: bold;
            line-height: 1.2;
            font-size: ${belowLarge ? `40` : `50`}px;
            margin-bottom: ${2.5 * GU}px;
          `}
        >
          Why are we modernizing ANT?
        </h1>
        <p
          css={`
            font-weight: 500;
            font-size: ${belowLarge ? `20` : `26`}px;
            color: ${theme.surfaceIcon};
            margin-bottom: ${3 * GU}px;
          `}
        >
          Switching to a new, simpler token will make ANT transactions 3x
          cheaper — lowering the barrier to entry and making it a better token
          to use.
        </p>
        <Link
          css={`
            font-weight: 500;
            font-size: ${belowLarge ? `17` : `20`}px;
          `}
        >
          Read the blog post
        </Link>
      </div>
      <img
        alt="ANTv2"
        src={featuresSvg}
        css={`
          margin-top: ${compactMode ? 6 * GU : 0}px;
        `}
        width={compactMode ? 35 * GU : 65 * GU}
      />
    </div>
  )
}

export default Features
