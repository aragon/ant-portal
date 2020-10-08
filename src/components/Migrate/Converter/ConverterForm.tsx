import React from 'react'
// @ts-ignore
import { Button } from '@aragon/ui'
import { useMigrateState } from '../MigrateStateProvider'

function ConverterForm(): JSX.Element {
  const { setSigningStage } = useMigrateState()

  return (
    <div>
      <Button onClick={setSigningStage}>Convert</Button>
    </div>
  )
}

export default ConverterForm
