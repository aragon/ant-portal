import React from 'react'
import AccountModule from '../Account/AccountModule'
import LayoutGutter from '../Layout/LayoutGutter'
import LayoutLimiter from '../Layout/LayoutLimiter'

// @ts-ignore
import { GU } from '@aragon/ui'

function Header(): JSX.Element {
  return (
    <header>
      <LayoutGutter>
        <LayoutLimiter>
          <div
            css={`
              padding-top: ${4 * GU}px;
              display: flex;
              justify-content: space-between;
            `}
          >
            Header
            <AccountModule />
          </div>
        </LayoutLimiter>
      </LayoutGutter>
    </header>
  )
}

export default Header
