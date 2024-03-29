import React, { useCallback, useEffect, useState } from 'react'
import {
  ButtonBase,
  TextInput,
  useTheme,
  useLayout,
  GU,
  // @ts-ignore
} from '@aragon/ui'
import BrandButton from '../../BrandButton/BrandButton'
import { fontWeight } from '../../../style/font'
import { useMigrateState } from '../MigrateStateProvider'
import ConverterButton from './ConverterButton'
import useInputValidation from './useInputValidation'
import { shadowDepth } from '../../../style/shadow'
import { useAccountModule } from '../../Account/AccountModuleProvider'
import { useHistory } from 'react-router-dom'
import {
  useAnjTokenContract,
  useAntTokenV1Contract,
} from '../../../hooks/useContract'
import { useWallet } from '../../../providers/Wallet'
import { BigNumber } from 'ethers'
import { mockPromiseLatency } from '../../../mock'
import { useMounted } from '../../../hooks/useMounted'
import { CONVERSION_RATE, MIGRATORS } from '../conversionUtils'
import { TokenConversionType } from '../types'
import ConversionInfo from './ConversionInfo'
import ValidationWarning from './ValidationWarning'
import { theme as localTheme } from '../../../style/theme'

const FLOAT_REGEX = /^\d*[.]?\d*$/

type FormControlsProps = {
  tokenSymbol: string
}

type ConverterFormControlsProps = {
  conversionType: TokenConversionType
  tokenSymbol: string
}

function ConverterFormControls({
  conversionType,
  tokenSymbol,
}: ConverterFormControlsProps): JSX.Element {
  return <BaseConverterFormControls tokenSymbol={tokenSymbol} />
}

function BaseConverterFormControls({
  tokenSymbol,
}: FormControlsProps): JSX.Element {
  const history = useHistory()
  const [amount, setAmount] = useState('')
  const [showError, setShowError] = useState(false)
  const theme = useTheme()
  const { updateConvertAmount, conversionType } = useMigrateState()
  const { showAccount } = useAccountModule()
  const { layoutName } = useLayout()
  const [agree] = useState(true)
  const {
    formattedAmount,
    maxAmount,
    validationStatus,
    parsedAmountBn,
  } = useInputValidation(amount)

  const {
    handleCheckAllowanceAndProceed,
    allowanceCheckLoading,
  } = useCheckAllowanceAndProceed(parsedAmountBn)

  const handleNavigateHome = useCallback(() => {
    history.push('/')
  }, [history])

  const stackedButtons = layoutName === 'small'

  const isANJConversion = conversionType === 'ANJ'
  const conversionRate = CONVERSION_RATE[conversionType]

  const handleAmountChange = useCallback(
    (event) => {
      const value = event.target.value

      setShowError(false)
      if (FLOAT_REGEX.test(value)) {
        setAmount(value)
      }
    },
    [setAmount]
  )

  const handleMaxClick = useCallback(() => {
    setAmount(maxAmount)
  }, [maxAmount, setAmount])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      if (validationStatus === 'notConnected') {
        showAccount()
        return
      }

      if (validationStatus === 'valid') {
        handleCheckAllowanceAndProceed()
      } else {
        setShowError(true)
      }
    },
    [validationStatus, handleCheckAllowanceAndProceed, showAccount]
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
          Enter the amount you would like to{' '}
          {isANJConversion ? 'redeem' : 'upgrade'}
        </h3>

        <TextInput
          wide
          placeholder={`0.0 ${tokenSymbol}`}
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
          color: ${localTheme.secondary};
        `}
      >
        You will receive:{' '}
        <span
          css={`
            word-break: break-all;
            font-weight: ${fontWeight.medium};
            font-variant-numeric: tabular-nums;
            ${validationStatus === 'valid' ? `color ${theme.accent};` : ''}
          `}
        >
          {parseFloat(formattedAmount) * conversionRate}
        </span>{' '}
        ANTv2
      </p>

      {showError && !allowanceCheckLoading && (
        <ValidationWarning status={validationStatus} />
      )}

      <ConversionInfo />
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
        <ConverterButton
          status={allowanceCheckLoading ? 'loading' : validationStatus}
          agree={agree}
        />
      </div>
    </form>
  )
}

function useCheckAllowanceAndProceed(parsedAmountBn: BigNumber) {
  const mounted = useMounted()
  const { account } = useWallet()
  const [allowanceCheckLoading, setAllowanceCheckLoading] = useState(false)
  const {
    goToSigning,
    changeSigningConfiguration,
    conversionType,
  } = useMigrateState()
  const antTokenV1Contract = useAntTokenV1Contract()
  const anjTokenContract = useAnjTokenContract()
  const contract =
    conversionType === 'ANJ' ? anjTokenContract : antTokenV1Contract

  const handleCheckAllowanceAndProceed = useCallback(async () => {
    try {
      if (!account) {
        throw new Error('No account is connected!')
      } else if (!contract) {
        throw new Error(`The ${conversionType} token contract is not defined!`)
      }
      const migrator = MIGRATORS[conversionType]
      if (!migrator) {
        throw new Error(
          'The migrator contract is not available on this network'
        )
      }

      setAllowanceCheckLoading(true)

      // This is intentional latency to give a consistent / solid feel when the allowance response occurs very very quickly
      // Without it the flicker can feel very subtly jarring
      await mockPromiseLatency(200)

      const {
        remaining: allowanceRemaining,
      } = await contract.functions.allowance(account, migrator)

      // Prevent async set state errors if component is unmounted before promise resolves
      if (!mounted()) {
        return
      }

      // Update the signing steps configuration based on the allowance state
      // 1: directApproveAndCall – Allow is zero and we can proceed with the happy path
      // 2: requiresReset – Upgrade amount exceeds approved allowance and must be reset
      // 3: withinAnExistingAllowance – There is an allowance, but the upgrade amount is within it so we must call the migrator contract directly
      if (allowanceRemaining.isZero()) {
        changeSigningConfiguration('directApproveAndCall')
      } else {
        if (parsedAmountBn.gt(allowanceRemaining)) {
          changeSigningConfiguration('requiresReset')
        } else {
          changeSigningConfiguration('withinAnExistingAllowance')
        }
      }

      goToSigning()
    } catch (err) {
      console.error(err)
    }
  }, [
    contract,
    goToSigning,
    conversionType,
    account,
    mounted,
    setAllowanceCheckLoading,
    changeSigningConfiguration,
    parsedAmountBn,
  ])

  return { handleCheckAllowanceAndProceed, allowanceCheckLoading }
}

export default ConverterFormControls
