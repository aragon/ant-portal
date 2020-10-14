import React, { useCallback, useState } from 'react'
import {
  blockExplorerUrl,
  TextInput,
  Link,
  useTheme,
  useLayout,
  Info,
  IconExternal,
  GU,
  noop,
  // @ts-ignore
} from '@aragon/ui'
import BrandButton from '../../BrandButton/BrandButton'
import { fontWeight } from '../../../style/font'
import { useMigrateState } from '../MigrateStateProvider'
import ConverterButton from './ConverterButton'
import useInputValidation from './useInputValidation'
import { networkEnvironment } from '../../../environment'

const { contracts, legacyNetworkType } = networkEnvironment

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

  const antV2ContractUrl = blockExplorerUrl('address', contracts.tokenAntV2, {
    networkType: legacyNetworkType,
  })

  const stackedButtons = layoutName === 'small'

  const handleAmountChange = useCallback((event) => {
    setAmount(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      if (validationStatus === 'valid') {
        continueToSigning()
      }

      if (validationStatus === 'notConnected') {
        // TODO: Add call to account module
        noop()
      }
    },
    [continueToSigning, validationStatus]
  )

  return (
    <form onSubmit={handleSubmit}>
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
        This conversion is a one way path.{' '}
        <Link
          href={antV2ContractUrl}
          css={`
            display: inline-flex;
            align-items: center;
            text-decoration: none;
            line-height: 1;
          `}
        >
          {' '}
          Review {tokenSymbol} v2 token contract{' '}
          <IconExternal
            size="small"
            css={`
              margin-left: ${0.5 * GU}px;
            `}
          />
        </Link>
      </Info>
      <div
        css={`
          display: grid;
          grid-gap: ${1 * GU}px;

          grid-template-columns: ${stackedButtons ? 'auto' : '1fr 1fr'};
        `}
      >
        <BrandButton wide>Back</BrandButton>
        <ConverterButton status={validationStatus} />
      </div>
    </form>
  )
}

export default ConverterFormControls
