import React from 'react'
import LayoutGutter from '../Layout/LayoutGutter'

function GetStarted(): JSX.Element {
  return (
    <LayoutGutter>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        `}
      >
        Get started page
      </div>
    </LayoutGutter>
  )
}

export default GetStarted
