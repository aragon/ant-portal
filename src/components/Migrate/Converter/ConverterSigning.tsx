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
import { useWallet } from '../../../providers/Wallet'

const { contracts } = networkEnvironment

type ConverterSigningProps = {
  mockSigningSteps?: 1 | 2 | 3
}

function ConverterSigning({
  mockSigningSteps,
}: ConverterSigningProps): JSX.Element {
  const history = useHistory()
  const { layoutName } = useLayout()
  const { account } = useWallet()
  const { convertAmount, goToForm, requiresApprovalReset } = useMigrateState()
  const antTokenV1Contract = useAntTokenV1Contract()
  const stackedButtons = layoutName === 'small'

  const handleBackToHome = useCallback(() => {
    history.push('/')
  }, [history])

  const transactionSteps = useMemo(() => {
    const steps = [
      {
        title: 'Initiate migration',
        handleSign: async ({
          setSuccess,
          setWorking,
          setError,
          setHash,
        }: StepHandleSignProps): Promise<void> => {
          try {
            // convertAmount should have already been validated and exist
            // per the form but we still want to check here because:
            // 1. It keeps typescript happy
            // 2. Detailed errors are a good thing
            if (!convertAmount) {
              throw new Error('No amount was provided!')
            }

            setWorking()

            const tx = await antTokenV1Contract?.functions.approveAndCall(
              contracts.migrator,
              convertAmount,
              '0x'
            )

            setHash(tx ? tx.hash : '')
            setSuccess()
          } catch (err) {
            console.error(err)
            setError()
          }
        },
      },
    ]

    if (requiresApprovalReset) {
      steps.unshift({
        title: 'Reset approval',
        handleSign: async ({
          setSuccess,
          setWorking,
          setError,
          setHash,
        }: StepHandleSignProps): Promise<void> => {
          try {
            setWorking()

            const tx = await antTokenV1Contract?.functions.approve(
              contracts.migrator,
              '0'
            )

            setHash(tx ? tx.hash : '')
            setSuccess()
          } catch (err) {
            console.error(err)
            setError()
          }
        },
      })
    }

    return steps
  }, [antTokenV1Contract, convertAmount, requiresApprovalReset])
  return (
    <Stepper
      steps={
        mockSigningSteps ? getMockSteps(mockSigningSteps) : transactionSteps
      }
      renderInfo={({ stepperStatus, handleSign }) => (
        <div
          css={`
            margin-top: ${4 * GU}px;
            margin-left: auto;
            margin-right: auto;
            max-width: ${70 * GU}px;
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
                <BrandButton wide onClick={goToForm}>
                  Abandon process
                </BrandButton>
                <BrandButton
                  mode="strong"
                  onClick={handleSign}
                  wide
                  // Cover edge case where a user rejects signing and disconnects the account
                  disabled={!account}
                >
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
        width: 100%;
      `}
    />
  )
}

export default ConverterSigning
