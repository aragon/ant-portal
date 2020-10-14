import React, { useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
// @ts-ignore
import { useLayout, GU } from '@aragon/ui'
import BrandButton from '../../BrandButton/BrandButton'
import Stepper from '../../Stepper/Stepper'
import { getMockSteps } from '../../../mock'
import SigningInfo from './SigningInfo'
import { StepHandleSignProps } from '../../Stepper/types'
import { useAntTokenV1Contract } from '../../../hooks/useContract'
import { networkEnvironment } from '../../../environment'
import { useMigrateState } from '../MigrateStateProvider'

const { contracts } = networkEnvironment

function ConverterSigning({
  mockSigning,
}: {
  mockSigning?: boolean
}): JSX.Element {
  const { layoutName } = useLayout()
  const history = useHistory()
  const { convertAmount } = useMigrateState()
  const antTokenV1Contract = useAntTokenV1Contract()
  const stackedButtons = layoutName === 'small'

  const handleBackToHome = useCallback(() => {
    history.push('/')
  }, [history])

  const transactionSteps = useMemo(
    () => [
      {
        title: 'Initiate ANT migration',
        handleSign: async ({
          setSuccess,
          setWorking,
          setError,
          setHash,
        }: StepHandleSignProps): Promise<void> => {
          try {
            setWorking()

            // convertAmount should have already been validated and exist per form view
            // but we still want to check here because:
            // 1. It keeps typescript happy
            // 2. Detailed errors are a good thing
            if (convertAmount) {
              const tx = await antTokenV1Contract?.functions.approveAndCall(
                contracts.migrator,
                convertAmount,
                '0x'
              )

              setHash(tx ? tx.hash : '')
            } else {
              throw new Error('No amount was provided!')
            }

            setSuccess()
          } catch (err) {
            console.error(err)
            setError()
          }
        },
      },
    ],
    [antTokenV1Contract, convertAmount]
  )
  return (
    <Stepper
      steps={mockSigning ? getMockSteps(1) : transactionSteps}
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
