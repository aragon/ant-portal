import React, { useMemo } from 'react'
import {
  noop,
  // @ts-ignore
} from '@aragon/ui'
import BrandButton from '../../BrandButton/BrandButton'
import { ValidationStatus } from '../types'

type ConverterButtonProps = {
  status: ValidationStatus
  onContinue: () => void
  onConnect: () => void
}

const BUTTON_MESSAGES: Record<ValidationStatus, string> = {
  notConnected: 'Connect Wallet',
  insufficientBalance: 'Insufficient ANT balance',
  noAmount: 'Enter an amount',
  valid: 'Continue',
}

function ConverterButton({
  status,
  onContinue,
  onConnect,
}: ConverterButtonProps): JSX.Element {
  const disableButton =
    status === 'insufficientBalance' || status === 'noAmount'

  const handleClick = useMemo(() => {
    if (status === 'valid') {
      return onContinue
    }

    if (status === 'notConnected') {
      return onConnect
    }

    return noop
  }, [onContinue, onConnect, status])

  return (
    <BrandButton
      onClick={handleClick}
      mode="strong"
      wide
      disabled={disableButton}
    >
      {BUTTON_MESSAGES[status]}
    </BrandButton>
  )
}

export default ConverterButton
