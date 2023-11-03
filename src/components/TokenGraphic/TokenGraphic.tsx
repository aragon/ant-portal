import React from 'react'
import { rgba } from 'polished'
// @ts-ignore
import { useTheme } from '@aragon/ui'
import { TokenName } from '../../token-info/types'
import { tokenInfo } from '../../token-info/tokenInfo'

type TokenGraphicProps = {
  tokenName: TokenName
  shadow?: boolean
  size?: number
}

const SHADOW: Record<TokenName, string> = {
  antV1: `0px 5px 10px ${rgba('#3f899b', 0.2)}, 2px 12px 20px ${rgba(
    '#3f899b',
    0.4
  )}`,
  antV2: `0px 5px 10px ${rgba('#3f899b', 0.2)}, 2px 12px 20px ${rgba(
    '#3f899b',
    0.4
  )}`,
  anj: `0px 5px 10px ${rgba('#9c7974', 0.1)}, 2px 12px 20px ${rgba(
    '#9c7974',
    0.2
  )}`,
  opt: `0px 24px 54px rgba(5, 50, 62, 0.21);`,
  eth: `0px 5px 10px ${rgba('#627eea', 0.2)}, 2px 12px 20px ${rgba(
    '#627eea',
    0.4
  )}`,
}

function TokenAntGraphic({
  tokenName,
  shadow,
  size = 100,
  ...props
}: TokenGraphicProps): JSX.Element {
  const theme = useTheme()

  const { graphic } = tokenInfo[tokenName]

  return (
    <div
      css={`
        position: relative;
        width: ${size}px;
        height: ${size}px;
        background-color: ${theme.background};
        border-radius: 100%;
        overflow: hidden;

        box-shadow: ${shadow ? SHADOW[tokenName] : ''};
      `}
      {...props}
    >
      <img
        alt=""
        src={graphic}
        css={`
          display: block;
          width: 100%;
        `}
      />
    </div>
  )
}

export default TokenAntGraphic
