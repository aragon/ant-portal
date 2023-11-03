import React, { ReactNode, useCallback } from 'react'
// @ts-ignore
import { GU, Link, useTheme, useLayout } from '@aragon/ui'
import FooterLogo from './FooterLogo'
import LayoutGutter from '../Layout/LayoutGutter'
import { useHistory, useLocation } from 'react-router-dom'
import { TERMS_AND_CONDITIONS_PATH } from '../../Routes'
import { theme as localTheme } from '../../style/theme'

const DOCS_URL = 'https://legacy-docs.aragon.org/the-ant-token/about-the-token'
const CONTACT_URI = 'mailto:ant@aragon.org'

const ARAGON_WEBSITE_URL = 'https://aragon.org'

function Footer(): JSX.Element {
  const location = useLocation()
  const history = useHistory()
  const theme = useTheme()
  const { layoutName } = useLayout()
  const compactMode = layoutName === 'small'

  const handleTermsAndConditionsClick = useCallback(() => {
    if (location.pathname !== TERMS_AND_CONDITIONS_PATH) {
      history.push(TERMS_AND_CONDITIONS_PATH)
    }
  }, [location.pathname, history])

  return (
    <footer>
      <LayoutGutter>
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
              grid-gap: ${compactMode ? 3 * GU : 5 * GU}px;

              margin-bottom: ${compactMode ? 2 * GU : `0`}px;
            `}
          >
            <FooterLink href={DOCS_URL}>Documentation</FooterLink>
            <FooterLink onClick={handleTermsAndConditionsClick}>
              Terms and Conditions
            </FooterLink>
            <FooterLink href={CONTACT_URI}>Contact</FooterLink>
          </div>
          <Link href={ARAGON_WEBSITE_URL}>
            <FooterLogo />
          </Link>
        </div>
      </LayoutGutter>
    </footer>
  )
}

type FooterLinkProps = {
  href?: string
  children?: ReactNode
  onClick?: () => void
}

function FooterLink({ href, children, onClick }: FooterLinkProps): JSX.Element {
  const theme = useTheme()

  return (
    <Link
      css={`
        text-decoration: none;
        color: ${localTheme.secondary};

        &:hover {
          color: ${theme.surfaceContent};
        }
      `}
      href={href}
      onClick={onClick && onClick}
    >
      {children}
    </Link>
  )
}

export default Footer
