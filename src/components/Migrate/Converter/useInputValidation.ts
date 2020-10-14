import { useMemo } from 'react'
// @ts-ignore
import TokenAmount from 'token-amount'
import { ValidationStatus } from '../types'
import { useAccountBalances } from '../../../providers/AccountBalances'
import { parseUnits } from '../../../utils/math-utils'
import { BigNumber } from 'ethers'

type InputValidation = {
  parsedAmountBn: BigNumber
  formattedAmount: string
  validationStatus: ValidationStatus
}

function useInputValidation(amount: string, digits: number): InputValidation {
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

export default useInputValidation
