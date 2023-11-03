import React from 'react'
import {
  useTheme,
  GU,
  // @ts-ignore
} from '@aragon/ui'
import { tokenInfo } from '../../token-info/tokenInfo'
import { TokenName } from '../../token-info/types'
import { theme as localTheme } from '../../style/theme'

type AntAmountProps = {
  amount: string
  tokenName: TokenName
}

function TokenTotalAmount({
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
            ? localTheme.secondary
            : theme.surfaceContent};
        `}
      >
        {amount}
      </span>
      <span
        css={`
          color: ${localTheme.secondary};
          margin-left: ${0.75 * GU}px;
        `}
      >
        {suffix}
      </span>
    </span>
  )
}

export default TokenTotalAmount
