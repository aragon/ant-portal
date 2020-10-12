import React, { useState } from 'react'
// @ts-ignore
import { GU } from '@aragon/ui'
import Stepper from '../../Stepper/Stepper'
import { getMockSteps } from '../../../mock'
import SigningInfo from './SigningInfo'
import { SigningFlowStatus } from '../types'

function ConverterSigning(): JSX.Element {
  const [signingStatus, setSigningStatus] = useState<SigningFlowStatus>(
    'working'
  )

  return (
    <>
      <Stepper
        steps={getMockSteps(1)}
        onSuccess={() => setSigningStatus('success')}
        onError={() => setSigningStatus('error')}
        css={`
          padding-top: ${3 * GU}px;
          margin-bottom: ${5 * GU}px;
        `}
      />
      <SigningInfo status={signingStatus} />
    </>
  )
}

export default ConverterSigning
