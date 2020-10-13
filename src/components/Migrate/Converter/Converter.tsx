import React from 'react'
import { useAccountBalances } from '../../../providers/AccountBalances'
import { useMigrateState } from '../MigrateStateProvider'
import ConverterForm from './ConverterForm'
import ConverterSigning from './ConverterSigning'

function Converter(): JSX.Element {
  const { conversionStage } = useMigrateState()
  const testBalanceContext = useAccountBalances()

  console.log(testBalanceContext)

  return (
    <>
      {conversionStage === 'entering' && <ConverterForm />}
      {conversionStage === 'signing' && <ConverterSigning />}
    </>
  )
}

export default Converter
