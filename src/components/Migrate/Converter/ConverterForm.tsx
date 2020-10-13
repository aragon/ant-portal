import React, { useCallback, useState } from 'react'
import { css } from 'styled-components'
import {
  TextInput,
  Link,
  useTheme,
  useLayout,
  Info,
  GU,
  // @ts-ignore
} from '@aragon/ui'
// @ts-ignore
import TokenAmount from 'token-amount'
import BrandButton from '../../BrandButton/BrandButton'
import { fontWeight } from '../../../style/font'
import { TokenConversionType } from '../types'
import { useMigrateState } from '../MigrateStateProvider'
import { shadowDepth } from '../../../style/shadow'
import { useAccountBalances } from '../../../providers/AccountBalances'

const BLOG_POST_URL = ''
const MOCK_AMOUNT = '78,000'
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

  const compactMode = layoutName === 'small' || layoutName === 'medium'
  const tokenSymbol = TOKEN_SYMBOL[conversionType]

  const formattedAntV1Balance =
    antV1.balance && new TokenAmount(antV1.balance, antV1.decimals).format()

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
          Balance: {formattedAntV1Balance} {tokenSymbol}
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
        <FormControls />
      </div>
    </form>
  )
}

function FormControls() {
  const [amount, setAmount] = useState('')
  const theme = useTheme()
  const { continueToSigning } = useMigrateState()
  const { layoutName } = useLayout()
  const { conversionType } = useMigrateState()

  const stackedButtons = layoutName === 'small'
  const tokenSymbol = TOKEN_SYMBOL[conversionType]

  const handleAmountChange = useCallback((event) => {
    setAmount(event.target.value)
  }, [])

  return (
    <>
      <label
        css={`
          display: block;
        `}
      >
        <h3
          css={`
            font-weight: ${fontWeight.medium};
            margin-bottom: ${1 * GU}px;
          `}
        >
          Enter the amount you would like to convert
        </h3>
        <TextInput
          wide
          placeholder="0.0"
          value={amount}
          onChange={handleAmountChange}
          type="number"
          css={`
            display: block;
          `}
        />
      </label>
      <p
        css={`
          margin-top: ${1 * GU}px;
          color: ${theme.surfaceContentSecondary};
        `}
      >
        You will receive:{' '}
        <span css={`font-weight: ${fontWeight.medium}; color ${theme.accent}`}>
          {MOCK_AMOUNT} {tokenSymbol}
        </span>
      </p>
      <Info
        css={`
          margin-top: ${3 * GU}px;
          margin-bottom: ${2 * GU}px;
        `}
      >
        Please read our{' '}
        <Link href={BLOG_POST_URL}>ANT Migration blog post</Link> if you have
        any questions.
      </Info>
      <div
        css={`
          display: grid;
          grid-gap: ${1 * GU}px;

          grid-template-columns: ${stackedButtons ? 'auto' : '1fr 1fr'};
        `}
      >
        <BrandButton wide>Back</BrandButton>
        <BrandButton onClick={continueToSigning} mode="strong" wide>
          Continue
        </BrandButton>
      </div>
    </>
  )
}

export default ConverterForm
