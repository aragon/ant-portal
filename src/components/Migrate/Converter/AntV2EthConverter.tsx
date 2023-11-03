import React from 'react'
import {
  GU,
  // @ts-ignore
} from '@aragon/ui'
import AntV2EthConverterForm from './AntV2EthConverterForm'

function AntV2EthConverter(): JSX.Element {
  return (
    <div
      css={`
        width: 100%;
        max-width: ${120 * GU}px;
      `}
    >
      <AntV2EthConverterForm />
    </div>
  )
}

export default AntV2EthConverter
