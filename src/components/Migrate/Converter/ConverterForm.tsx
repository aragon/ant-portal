import React, { useMemo } from 'react'
import { css } from 'styled-components'
import {
  useTheme,
  useLayout,
  GU,
  // @ts-ignore
} from '@aragon/ui'
// @ts-ignore
import TokenAmount from 'token-amount'
import { fontWeight } from '../../../style/font'
import { TokenConversionType } from '../types'
import { useMigrateState } from '../MigrateStateProvider'
import { shadowDepth } from '../../../style/shadow'
import { useAccountBalances } from '../../../providers/AccountBalances'
import ConverterFormControls from './ConverterFormControls'

const AMOUNT_DIGITS = 6
const TOKEN_SYMBOL: Record<TokenConversionType, string> = {
  ANT: 'ANT',
}

const multiColumnLayout = css`
  grid-template-columns: 50% auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    'title rate'
    'inputs rate';
`

const stackedLayout = css`
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'title'
    'rate'
    'inputs';
`

function ConverterForm(): JSX.Element {
  const theme = useTheme()
  const { layoutName } = useLayout()
  const { conversionType } = useMigrateState()
  const { antV1 } = useAccountBalances()
  const { balance, decimals } = antV1

  const compactMode = layoutName === 'small' || layoutName === 'medium'
  const tokenSymbol = TOKEN_SYMBOL[conversionType]

  const formattedAntV1Balance = useMemo(
    () =>
      balance &&
      new TokenAmount(balance, decimals).format({
        digits: AMOUNT_DIGITS,
      }),
    [balance, decimals]
  )

  return (
    <form
      css={`
        width: 100%;
        max-width: ${130 * GU}px;
        padding: ${6 * GU}px;
        background-color: ${theme.surface};
        box-shadow: ${shadowDepth.high};
        border-radius: ${1.5 * GU}px;
        display: grid;
        grid-gap: ${4 * GU}px;
        ${compactMode ? stackedLayout : multiColumnLayout}
      `}
    >
      <div
        css={`
          grid-area: title;
        `}
      >
        <h2
          css={`
            line-height: 1;
            font-weight: ${fontWeight.medium};
            font-size: 32px;
            margin-bottom: ${1.5 * GU}px;
          `}
        >
          Migrate {tokenSymbol}
        </h2>
        <p
          css={`
            color: ${theme.surfaceContentSecondary};
          `}
        >
          {formattedAntV1Balance
            ? `Balance: ${formattedAntV1Balance} ${tokenSymbol}`
            : 'Enable account to see your balance'}
        </p>
      </div>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          grid-area: rate;
          border: 1px dashed ${theme.border};
          border-radius: ${1 * GU}px;
        `}
      >
        Conversion Rate
      </div>
      <div
        css={`
          grid-area: inputs;
        `}
      >
        <ConverterFormControls
          tokenSymbol={tokenSymbol}
          amountDigits={AMOUNT_DIGITS}
        />
      </div>
    </form>
  )
}

export default ConverterForm
