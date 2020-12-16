import React from 'react'
import {
  useTheme,
  GU,
  // @ts-ignore
} from '@aragon/ui'
import { tokenInfo } from '../../token-info/tokenInfo'
import { TokenName } from '../../token-info/types'

type AntAmountProps = {
  amount: string
  tokenName: TokenName
}

function AntAmount({
  amount,
  tokenName,
  ...props
}: AntAmountProps): JSX.Element {
  const theme = useTheme()

  const suffix = tokenInfo[tokenName].suffix

  return (
    <span
      css={`
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
      `}
      {...props}
    >
      <span
        css={`
          color: ${amount === '0'
            ? theme.contentSecondary
            : theme.surfaceContent};
        `}
      >
        {amount}
      </span>
      <span
        css={`
          color: ${theme.contentSecondary};
          margin-left: ${0.75 * GU}px;
        `}
      >
        {suffix}
      </span>
    </span>
  )
}

export default AntAmount
