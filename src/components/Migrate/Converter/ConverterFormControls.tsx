import React, { useCallback, useState } from 'react'
import {
  TextInput,
  Link,
  useTheme,
  useLayout,
  Info,
  GU,
  noop,
  // @ts-ignore
} from '@aragon/ui'
// @ts-ignore
import BrandButton from '../../BrandButton/BrandButton'
import { fontWeight } from '../../../style/font'
import { useMigrateState } from '../MigrateStateProvider'
import ConverterButton from './ConverterButton'
import useInputValidation from './useInputValidation'

const BLOG_POST_URL = ''

type ConverterFormControlsProps = {
  tokenSymbol: string
  amountDigits: number
}

function ConverterFormControls({
  tokenSymbol,
  amountDigits,
}: ConverterFormControlsProps): JSX.Element {
  const [amount, setAmount] = useState('')
  const theme = useTheme()
  const { continueToSigning } = useMigrateState()
  const { layoutName } = useLayout()
  const { formattedAmount, validationStatus } = useInputValidation(
    amount,
    amountDigits
  )

  const stackedButtons = layoutName === 'small'

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
        <ConverterButton
          // TODO: Add call to account module
          onConnect={noop}
          onContinue={continueToSigning}
          status={validationStatus}
        />
      </div>
    </>
  )
}

export default ConverterFormControls
