import React from 'react'
// @ts-ignore
import { GU } from '@aragon/ui'
import LayoutGutter from '../Layout/LayoutGutter'
import AnimateEntrance from '../AnimateEntrance/AnimateEntrance'
import AntV2EthConverter from './Converter/AntV2EthConverter'

function RedeemAntV2Eth(): JSX.Element {
  return <RedeemContent />
}

function RedeemContent() {
  return (
    <AnimateEntrance
      css={`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        flex: 1;
      `}
    >
      <LayoutGutter
        css={`
          padding-top: ${7 * GU}px;
          padding-bottom: ${10 * GU}px;
        `}
      >
        <div
          css={`
            margin-top: -${4 * GU}px;
            width: 100%;
          `}
        >
          <div
            css={`
              display: flex;
              justify-content: center;
              width: 100%;
            `}
          >
            <AntV2EthConverter />
          </div>
        </div>
      </LayoutGutter>
    </AnimateEntrance>
  )
}

export default RedeemAntV2Eth
