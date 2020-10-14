import React, { useCallback, useMemo, useState } from 'react'
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
import { parseUnits } from '../../../utils/math-utils'
import { BigNumber } from 'ethers'

const BLOG_POST_URL = ''
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
        <FormControls />
      </div>
    </form>
  )
}

type ValidationStatus =
  | 'notConnected'
  | 'insufficientBalance'
  | 'noAmount'
  | 'valid'

const BUTTON_MESSAGE: Record<ValidationStatus, string> = {
  notConnected: 'Connect Wallet',
  insufficientBalance: 'Insufficient ANT balance',
  noAmount: 'Enter an amount',
  valid: 'Continue',
}

function FormControls() {
  const [amount, setAmount] = useState('')
  const theme = useTheme()
  const { continueToSigning } = useMigrateState()
  const { layoutName } = useLayout()
  const { conversionType } = useMigrateState()
  const { formattedAmount, validationStatus } = useInputValidation(
    amount,
    AMOUNT_DIGITS
  )

  console.log(formattedAmount, validationStatus)

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
          placeholder={`0.0 ${tokenSymbol} v1`}
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
          {formattedAmount}
        </span>{' '}
        {tokenSymbol} v2
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
        <BrandButton
          onClick={continueToSigning}
          mode="strong"
          wide
          disabled={true}
        >
          {BUTTON_MESSAGE[validationStatus]}
        </BrandButton>
      </div>
    </>
  )
}

function useInputValidation(amount: string, digits: number) {
  const { antV1 } = useAccountBalances()
  const { balance, decimals } = antV1

  const parsedAmountBn = useMemo(() => parseInputValue(amount, decimals), [
    amount,
    decimals,
  ])

  const formattedAmount = useMemo((): string => {
    return new TokenAmount(parsedAmountBn, decimals).format({
      digits,
    })
  }, [parsedAmountBn, decimals, digits])

  const validationStatus = useMemo((): ValidationStatus => {
    if (!balance) {
      return 'notConnected'
    }

    if (parsedAmountBn.gt(balance)) {
      return 'insufficientBalance'
    }

    if (parsedAmountBn.isZero()) {
      return 'noAmount'
    }

    return 'valid'
  }, [parsedAmountBn, balance])

  return {
    parsedAmountBn,
    formattedAmount,
    validationStatus,
  }
}

function parseInputValue(inputValue: string, decimals: number): BigNumber {
  const trimmedValue = inputValue.trim()

  return parseUnits(trimmedValue || '0', decimals)
}

export default ConverterForm
