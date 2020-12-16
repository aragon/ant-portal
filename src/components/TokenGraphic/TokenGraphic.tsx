import React from 'react'
import { rgba } from 'polished'
// @ts-ignore
import { useTheme } from '@aragon/ui'
import { TokenName } from '../../token-info/types'
import { tokenInfo } from '../../token-info/tokenInfo'

type TokenGraphicProps = {
  type: TokenName
  shadow?: boolean
  size?: number
}

const shadowTint = '#3f899b'

function TokenAntGraphic({
  type,
  shadow,
  size = 100,
  ...props
}: TokenGraphicProps): JSX.Element {
  const theme = useTheme()

  const { graphic } = tokenInfo[type]

  return (
    <div
      css={`
        position: relative;
        width: ${size}px;
        height: ${size}px;
        background-color: ${theme.background};
        border-radius: 100%;
        overflow: hidden;

        box-shadow: ${shadow
          ? `0px 5px 10px ${rgba(shadowTint, 0.2)}, 2px 12px 20px ${rgba(
              shadowTint,
              0.4
            )}`
          : ''};
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
