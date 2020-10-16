import React from 'react'
// @ts-ignore
import { useTheme, GU } from '@aragon/ui'
import { shadowDepth } from '../../../style/shadow'
import { fontWeight } from '../../../style/font'
import TokenAntGraphic from '../../TokenAntGraphic/TokenAntGraphic'

function ConversionRate(): JSX.Element {
  const theme = useTheme()

  return (
    <div>
      <div
        css={`
          display: flex;
          padding: ${2 * GU}px;
          background-color: ${theme.surface};

          // Create pill corners
          border-radius: ${100 * GU}px;
          box-shadow: ${shadowDepth.high};
          margin-bottom: ${3.5 * GU}px;
        `}
      >
        <TokenAntGraphic type="v1" />
        <TokenAntGraphic
          type="v2"
          shadow
          css={`
            margin-left: -${1 * GU}px;
          `}
        />
      </div>
      <div
        css={`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <h4
          css={`
            font-size: 60px;
            font-weight: ${fontWeight.semiBold};

            // Optically offset left edge of number 1 for centering
            margin-left: -0.15em;
            letter-spacing: -0.075em;

            line-height: 1;
            margin-bottom: ${1.75 * GU}px;

            background: linear-gradient(
              160deg,
              ${theme.accentStart} -20%,
              ${theme.accentEnd} 60%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          1 : 1
        </h4>
        <h3
          css={`
            margin-bottom: ${0.5 * GU}px;
            font-weight: ${fontWeight.medium};
            font-size: 18px;
          `}
        >
          Conversion rate
        </h3>
        <p
          css={`
            color: ${theme.surfaceContentSecondary};
            letter-spacing: 0.04em;
          `}
        >
          <span
            css={`
              color: ${theme.surfaceContent};
            `}
          >
            1
          </span>{' '}
          ANT v1{' '}
          <span
            css={`
              margin-left: ${1 * GU}px;
              margin-right: ${1 * GU}px;
              color: ${theme.contentSecondary};
            `}
          >
            :
          </span>{' '}
          <span
            css={`
              color: ${theme.surfaceContent};
            `}
          >
            1
          </span>{' '}
          ANT v2
        </p>
      </div>
    </div>
  )
}

export default ConversionRate
