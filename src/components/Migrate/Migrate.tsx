import React from 'react'
import { mockPromiseLatency, MOCK_HASH } from '../../mock'
import LayoutGutter from '../Layout/LayoutGutter'
import Stepper from '../Stepper/Stepper'
import { StepItems } from '../Stepper/types'

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

function Migrate(): JSX.Element {
  return (
    <LayoutGutter>
      <div
        css={`
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        `}
      >
        <Stepper steps={mockSteps} />
      </div>
    </LayoutGutter>
  )
}

export default Migrate
