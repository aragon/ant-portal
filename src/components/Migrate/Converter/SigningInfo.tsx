import React, { ReactNode } from 'react'
// @ts-ignore
import { Info } from '@aragon/ui'
import { SigningFlowStatus } from '../types'

type Descriptions = Record<SigningFlowStatus, ReactNode>

type SigningInfoProps = {
  multiple?: boolean
  status: SigningFlowStatus
}

const DESCRIPTIONS_SINGLE: Descriptions = {
  working:
    'Open your Ethereum provider (Metamask or similar) to sign the transaction. Do not close this window until the process has finished.',
  error: 'There was an error when trying to sign this transaction.',
  success:
    'Success! The transaction has been sent to the network for processing. You can review other migration options.',
}

const DESCRIPTIONS_MULTI: Descriptions = {
  working:
    'Open your Ethereum provider (Metamask or similar) to sign the transactions. Do not close this window until the process has finished.',
  error: 'There was an error when trying to sign a transaction.',
  success:
    'Success! The transactions have been sent to the network for processing. You can review other migration options.',
}

function SigningInfo({
  multiple = false,
  status = 'working',
}: SigningInfoProps): JSX.Element {
  const descriptionSet = multiple ? DESCRIPTIONS_MULTI : DESCRIPTIONS_SINGLE
  const description = descriptionSet[status]

  return <Info mode={status === 'error' ? 'error' : 'info'}>{description}</Info>
}

export default SigningInfo
