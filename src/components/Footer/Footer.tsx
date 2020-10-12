import React from 'react'
// @ts-ignore
import { GU, Link, useTheme, useLayout } from '@aragon/ui'
import FooterLogo from './FooterLogo'
import LayoutGutter from '../Layout/LayoutGutter'
import LayoutLimiter from '../Layout/LayoutLimiter'

function Footer(): JSX.Element {
  const { layoutName } = useLayout()
  const compactMode = layoutName === 'small'
  // TODO: add links urls when confirmed

  return (
    <footer>
      <LayoutGutter>
        <LayoutLimiter>
          <div
            css={`
              height: ${8 * GU}px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-direction: ${compactMode ? `column` : `row`};
              padding: ${4 * GU}px 0 ${8 * GU}px 0;
              border-top: 1px solid #dde4e9b3;
            `}
          >
            <div
              css={`
                display: inline-grid;
                grid-auto-flow: column;
                grid-gap: ${4 * GU}px;
              `}
            >
              <FooterLink>Resources</FooterLink>
              <FooterLink>Community</FooterLink>
              <FooterLink>Legal terms</FooterLink>
            </div>
            <FooterLogo />
          </div>
        </LayoutLimiter>
      </LayoutGutter>
    </footer>
  )
}

interface FooterLinkProps {
  to?: string
  children?: string
}

function FooterLink({ to, children }: FooterLinkProps): JSX.Element {
  const theme = useTheme()

  return (
    <Link
      css={`
        text-decoration: none;
        color: ${theme.contentSecondary};
      `}
    >
      {children}
    </Link>
  )
}

export default Footer
