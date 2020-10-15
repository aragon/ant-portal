import React, { ReactNode } from 'react'
// @ts-ignore
import { GU, Link, useTheme, useLayout } from '@aragon/ui'
import FooterLogo from './FooterLogo'
import LayoutGutter from '../Layout/LayoutGutter'
import LayoutLimiter from '../Layout/LayoutLimiter'

// TODO: Add urls when available
const RESOURCES_URL = ''
const COMMUNITY_URL = ''
const LEGAL_URL = ''

function Footer(): JSX.Element {
  const theme = useTheme()
  const { layoutName } = useLayout()
  const compactMode = layoutName === 'small'

  return (
    <footer>
      <LayoutGutter>
        <LayoutLimiter>
          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-direction: ${compactMode ? `column` : `row`};
              padding-top: ${4 * GU}px;
              padding-bottom: ${4 * GU}px;
              border-top: 1px solid ${theme.border};
            `}
          >
            <div
              css={`
                display: inline-grid;
                grid-auto-flow: column;
                grid-gap: ${5 * GU}px;

                margin-bottom: ${compactMode ? 2 * GU : `0`}px;
              `}
            >
              <FooterLink href={RESOURCES_URL}>Resources</FooterLink>
              <FooterLink href={COMMUNITY_URL}>Community</FooterLink>
              <FooterLink href={LEGAL_URL}>Legal terms</FooterLink>
            </div>
            <FooterLogo />
          </div>
        </LayoutLimiter>
      </LayoutGutter>
    </footer>
  )
}

type FooterLinkProps = {
  href: string
  children?: ReactNode
}

function FooterLink({ href, children }: FooterLinkProps): JSX.Element {
  const theme = useTheme()

  return (
    <Link
      css={`
        text-decoration: none;
        color: ${theme.surfaceContentSecondary};
      `}
      href={href}
    >
      {children}
    </Link>
  )
}

export default Footer
