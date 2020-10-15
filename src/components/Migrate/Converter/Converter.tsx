import React from 'react'
import { useMigrateState } from '../MigrateStateProvider'
import ConverterForm from './ConverterForm'
import ConverterSigning from './ConverterSigning'

function Converter(): JSX.Element {
  const { conversionStage } = useMigrateState()

  return (
    <>
      {conversionStage === 'form' && <ConverterForm />}
      {conversionStage === 'signing' && <ConverterSigning />}
    </>
  )
}

export default Converter
