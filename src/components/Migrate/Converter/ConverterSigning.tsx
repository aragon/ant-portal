import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
// @ts-ignore
import { useLayout, GU } from '@aragon/ui'
import BrandButton from '../../BrandButton/BrandButton'
import Stepper from '../../Stepper/Stepper'
import { getMockSteps } from '../../../mock'
import SigningInfo from './SigningInfo'

function ConverterSigning(): JSX.Element {
  const { layoutName } = useLayout()
  const history = useHistory()
  const stackedButtons = layoutName === 'small'

  const handleBackToHome = useCallback(() => {
    history.push('/')
  }, [history])

  return (
    <Stepper
      steps={getMockSteps(1)}
      renderInfo={({ stepperStatus, handleSign }) => (
        <div
          css={`
            margin-top: ${4 * GU}px;
          `}
        >
          <div
            css={`
              margin-bottom: ${4 * GU}px;
            `}
          >
            {stepperStatus === 'error' ? (
              <div
                css={`
                  display: grid;
                  grid-gap: ${1 * GU}px;
                  grid-template-columns: ${stackedButtons ? 'auto' : '1fr 1fr'};
                `}
              >
                <BrandButton wide onClick={handleBackToHome}>
                  Abandon process
                </BrandButton>
                <BrandButton mode="strong" onClick={handleSign} wide>
                  Repeat transaction
                </BrandButton>
              </div>
            ) : (
              <BrandButton
                onClick={handleBackToHome}
                disabled={stepperStatus === 'working'}
                wide
                css={`
                  max-width: ${30 * GU}px;
                  margin: auto;
                `}
              >
                Back to Migrate
              </BrandButton>
            )}
          </div>
          <SigningInfo status={stepperStatus} />
        </div>
      )}
      css={`
        padding-top: ${4 * GU}px;
        width: 100%;
        max-width: ${70 * GU}px;
      `}
    />
  )
}

export default ConverterSigning
