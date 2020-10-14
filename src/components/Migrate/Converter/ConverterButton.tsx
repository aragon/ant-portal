import React from 'react'
import {
  IconConnect,
  // @ts-ignore
} from '@aragon/ui'
import BrandButton from '../../BrandButton/BrandButton'
import { ValidationStatus } from '../types'

type ConverterButtonProps = {
  status: ValidationStatus
}

const BUTTON_MESSAGES: Record<ValidationStatus, string> = {
  notConnected: 'Enable account',
  insufficientBalance: 'Insufficient ANT balance',
  noAmount: 'Enter an amount',
  valid: 'Continue',
}

function ConverterButton({ status }: ConverterButtonProps): JSX.Element {
  const disableButton =
    status === 'insufficientBalance' || status === 'noAmount'

  const showConnectIcon = status === 'notConnected'

  return (
    <BrandButton
      mode="strong"
      wide
      type="submit"
      disabled={disableButton}
      icon={showConnectIcon && <IconConnect />}
      label={BUTTON_MESSAGES[status]}
    />
  )
}

export default ConverterButton
