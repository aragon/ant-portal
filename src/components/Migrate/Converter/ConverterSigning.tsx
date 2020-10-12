import React, { useState } from 'react'
// @ts-ignore
import { Button, GU } from '@aragon/ui'
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
        renderInfo={() => (
          <div
            css={`
              margin-top: ${5 * GU}px;
            `}
          >
            <SigningInfo status={signingStatus} />
            <Button
              mode="strong"
              wide
              css={`
                margin-top: ${1 * GU}px;
              `}
            >
              Something something
            </Button>
          </div>
        )}
        css={`
          padding-top: ${3 * GU}px;
        `}
      />
    </>
  )
}

export default ConverterSigning
