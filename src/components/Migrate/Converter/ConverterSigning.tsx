import React from 'react'
import Stepper from '../../Stepper/Stepper'
import { getMockSteps } from '../../../mock'

function ConverterSigning(): JSX.Element {
  return <Stepper steps={getMockSteps(1)} />
}

export default ConverterSigning
