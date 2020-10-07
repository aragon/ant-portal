import React from 'react'
import LayoutGutter from '../Layout/LayoutGutter'

function Migrate(): JSX.Element {
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
        Migration page
      </div>
    </LayoutGutter>
  )
}

export default Migrate
