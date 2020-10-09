import React from 'react'
import {
  GU,
  useTheme,
  // @ts-ignore
} from '@aragon/ui'
import { useMigrateState } from '../MigrateStateProvider'
import ConverterForm from './ConverterForm'
import ConverterSigning from './ConverterSigning'

function Converter(): JSX.Element {
  const theme = useTheme()
  const { conversionStage } = useMigrateState()

  return (
    <div
      css={`
        width: 100%;
        max-width: ${130 * GU}px;
        padding: ${6 * GU}px;
        background-color: ${theme.surface};
        box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 5px;
        border-radius: ${1.5 * GU}px;
      `}
    >
      {conversionStage === 'entering' && <ConverterForm />}
      {conversionStage === 'signing' && <ConverterSigning />}
    </div>
  )
}

export default Converter
