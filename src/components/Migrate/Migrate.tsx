import React from 'react'
import { mockPromiseLatency, MOCK_HASH } from '../../mock'
import LayoutGutter from '../Layout/LayoutGutter'
import PageHeading from '../PageHeading/PageHeading'
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
      <PageHeading
        title="Aragon Migrate"
        description="How much ANT would you like to upgrade?"
      />
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
