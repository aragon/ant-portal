import React from 'react'
// @ts-ignore
import { unselectable, GU } from '@aragon/ui'
import footerLogoSvg from '../../assets/logo-footer.svg'

function FooterLogo(): JSX.Element {
  return (
    <div
      css={`
        ${unselectable};
        display: flex;
        align-items: center;
      `}
    >
      <img alt="Aragon" src={footerLogoSvg} width={15 * GU} />
    </div>
  )
}

export default FooterLogo
