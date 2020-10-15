import React from 'react'
// @ts-ignore
import { GU } from '@aragon/ui'
import Features from './Features'
import LayoutGutter from '../Layout/LayoutGutter'
import Header from './Header'

function GetStarted(): JSX.Element {
  return (
    <LayoutGutter>
      <div
        css={`
          padding-top: ${7 * GU}px;
          padding-bottom: ${7 * GU}px;
        `}
      >
        <Header />
        <Features />
      </div>
    </LayoutGutter>
  )
}

export default GetStarted
