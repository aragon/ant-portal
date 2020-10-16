import React, { useCallback, useEffect, useState } from 'react'
import {
  ButtonBase,
  TextInput,
  Link,
  useTheme,
  useLayout,
  Info,
  IconExternal,
  GU,
  // @ts-ignore
} from '@aragon/ui'
import BrandButton from '../../BrandButton/BrandButton'
import { fontWeight } from '../../../style/font'
import { useMigrateState } from '../MigrateStateProvider'
import ConverterButton from './ConverterButton'
import useInputValidation from './useInputValidation'
import { networkEnvironment } from '../../../environment'
import { shadowDepth } from '../../../style/shadow'
import { useAccountModule } from '../../Account/AccountModuleProvider'
import { useHistory } from 'react-router-dom'
import { getEtherscanUrl } from '../../../utils/etherscan'

const FLOAT_REGEX = /^\d*[.]?\d*$/

const { contracts } = networkEnvironment

type ConverterFormControlsProps = {
  tokenSymbol: string
  amountDigits: number
}

function ConverterFormControls({
  tokenSymbol,
  amountDigits,
}: ConverterFormControlsProps): JSX.Element {
  const history = useHistory()
  const [amount, setAmount] = useState('')
  const theme = useTheme()
  const { goToSigning, updateConvertAmount } = useMigrateState()
  const { showAccount } = useAccountModule()
  const { layoutName } = useLayout()
  const {
    formattedAmount,
    maxAmount,
    validationStatus,
    parsedAmountBn,
  } = useInputValidation(amount, amountDigits)

  const handleNavigateHome = useCallback(() => {
    history.push('/')
  }, [history])

  const antV2ContractUrl = getEtherscanUrl(contracts.tokenAntV2)
  const stackedButtons = layoutName === 'small'

  const handleAmountChange = useCallback((event) => {
    const value = event.target.value

    if (FLOAT_REGEX.test(value)) {
      setAmount(value)
    }
  }, [])

  const handleMaxClick = useCallback(() => {
    setAmount(maxAmount)
  }, [maxAmount])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      if (validationStatus === 'valid') {
        goToSigning()
      }

      if (validationStatus === 'notConnected') {
        showAccount()
      }
    },
    [validationStatus, goToSigning, showAccount]
  )

  // Pass updated amount to context state for use in the signing stepper
  useEffect(() => {
    updateConvertAmount(parsedAmountBn)
  }, [parsedAmountBn, updateConvertAmount])

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
          css={`
            font-variant-numeric: tabular-nums;
            display: block;
          `}
          adornment={
            validationStatus !== 'notConnected' && (
              <ButtonBase
                onClick={handleMaxClick}
                css={`
                  padding: ${0.65 * GU}px ${1.25 * GU}px;
                  background-color: white;
                  box-shadow: ${shadowDepth.low};
                  text-transform: uppercase;
                  font-weight: ${fontWeight.medium};
                  color: ${theme.link};
                  font-size: 12px;
                  line-height: 1;

                  &:active {
                    transform: translateY(1px);
                  }
                `}
              >
                Max
              </ButtonBase>
            )
          }
          adornmentPosition="end"
          adornmentSettings={{
            padding: 1.5 * GU,
          }}
        />
      </label>
      <p
        css={`
          margin-top: ${1 * GU}px;
          color: ${theme.surfaceContentSecondary};
        `}
      >
        You will receive:{' '}
        <span
          css={`
            font-weight: ${fontWeight.medium};
            font-variant-numeric: tabular-nums;
            ${validationStatus === 'valid' ? `color ${theme.accent};` : ''}
          `}
        >
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
        <BrandButton wide onClick={handleNavigateHome}>
          Back
        </BrandButton>
        <ConverterButton status={validationStatus} />
      </div>
    </form>
  )
}

export default ConverterFormControls
