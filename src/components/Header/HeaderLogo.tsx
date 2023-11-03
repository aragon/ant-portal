import React from 'react'
// @ts-ignore
import { unselectable, GU } from '@aragon/ui'
import headerLogoSvg from '../../assets/logo-navbar.svg'

function HeaderLogo(): JSX.Element {
  return (
    <div
      css={`
        ${unselectable};
        display: flex;
        align-items: center;
      `}
    >
      <img alt="Aragon" src={headerLogoSvg} width={6.5 * GU} />
    </div>
  )
}

export default HeaderLogo
