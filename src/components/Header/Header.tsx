import React from 'react'
// @ts-ignore
import { GU } from '@aragon/ui'
import AccountModule from '../Account/AccountModule'
import HeaderLogo from './HeaderLogo'
import LayoutGutter from '../Layout/LayoutGutter'
import LayoutLimiter from '../Layout/LayoutLimiter'

function Header(): JSX.Element {
  return (
    <header
      css={`
        padding-top: ${4 * GU}px;
      `}
    >
      <LayoutGutter>
        <LayoutLimiter>
          <div
            css={`
              height: ${8 * GU}px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <HeaderLogo />
            <AccountModule />
          </div>
        </LayoutLimiter>
      </LayoutGutter>
    </header>
  )
}

export default Header
