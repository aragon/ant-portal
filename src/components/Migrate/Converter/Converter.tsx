import React from 'react'
import { useAccountBalances } from '../../../providers/AccountBalances'
import { useMigrateState } from '../MigrateStateProvider'
import ConverterForm from './ConverterForm'
import ConverterSigning from './ConverterSigning'

function Converter(): JSX.Element {
  const { conversionStage } = useMigrateState()
  const { antV1, antV2 } = useAccountBalances()

  console.log({ antV1, antV2 })

  return (
    <>
      {conversionStage === 'entering' && <ConverterForm />}
      {conversionStage === 'signing' && <ConverterSigning />}
    </>
  )
}

export default Converter
