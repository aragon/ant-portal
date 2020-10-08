import React from 'react'
import Stepper from '../../Stepper/Stepper'
import { StepItems } from '../../Stepper/types'
import { mockPromiseLatency, MOCK_HASH } from '../../../mock'

const mockSteps: StepItems = [
  {
    title: 'Initiate ANT migration',
    handleSign: async ({ setSuccess, setWorking, setError, setHash }) => {
      try {
        await mockPromiseLatency(1000)
        setWorking()
        setHash(MOCK_HASH)
        await mockPromiseLatency(1000)
        setSuccess()
      } catch (err) {
        console.error(err)
        setError()
      }
    },
  },
]

function ConverterSigning(): JSX.Element {
  return <Stepper steps={mockSteps} />
}

export default ConverterSigning
