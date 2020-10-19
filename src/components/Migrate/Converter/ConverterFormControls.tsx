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
import { useAntTokenV1Contract } from '../../../hooks/useContract'
import { useWallet } from '../../../providers/Wallet'

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
  const { account } = useWallet()
  const history = useHistory()
  const [amount, setAmount] = useState('')
  const theme = useTheme()
  const {
    goToSigning,
    updateConvertAmount,
    updateRequiresApprovalReset,
  } = useMigrateState()
  const antTokenV1Contract = useAntTokenV1Contract()
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

  const handleCheckAllowanceAndProgress = useCallback(async () => {
    try {
      if (!account) {
        throw new Error('No account is connected!')
      }

      if (!antTokenV1Contract) {
        throw new Error('The ANT v1 token contract is not defined!')
      }

      const {
        remaining: allowanceRemaining,
      } = await antTokenV1Contract.functions.allowance(
        account,
        contracts.migrator
      )

      // Inform the signing stage whether we need an additional approval reset step
      if (
        !allowanceRemaining.isZero() &&
        parsedAmountBn.gt(allowanceRemaining)
      ) {
        console.log('Requires reset')
        updateRequiresApprovalReset(true)
      } else {
        console.log('No reset')
        updateRequiresApprovalReset(false)
      }

      goToSigning()
    } catch (err) {
      console.error(err)
    }
  }, [
    antTokenV1Contract,
    goToSigning,
    account,
    updateRequiresApprovalReset,
    parsedAmountBn,
  ])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      if (validationStatus === 'valid') {
        handleCheckAllowanceAndProgress()
      }

      if (validationStatus === 'notConnected') {
        showAccount()
      }
    },
    [validationStatus, handleCheckAllowanceAndProgress, showAccount]
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
