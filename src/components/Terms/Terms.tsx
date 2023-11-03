import React, { ReactNode, useCallback } from 'react'
// @ts-ignore
import { Link, useLayout, IconArrowLeft, GU } from '@aragon/ui'
import LayoutGutter from '../Layout/LayoutGutter'
import LayoutLimiter from '../Layout/LayoutLimiter'
import { fontWeight } from '../../style/font'
import AnimateEntrance from '../AnimateEntrance/AnimateEntrance'
import { useHistory } from 'react-router-dom'
import { theme as localTheme } from '../../style/theme'
import { TermsAndConditions } from '../TermsAndConditions/TermsAndConditionsText'

function TermsPage(): JSX.Element {
  const { layoutName } = useLayout()
  const history = useHistory()
  const compactMode = layoutName === 'small'

  const handleBackClick = useCallback(() => {
    history.push('/')
  }, [history])

  return (
    <LayoutGutter
      css={`
        display: flex;
        align-items: center;
        flex: 1;
      `}
    >
      <AnimateEntrance
        css={`
          margin-top: -${5 * GU}px;
          width: 100%;
        `}
      >
        <LayoutLimiter
          size="small"
          css={`
            padding-top: ${7 * GU}px;
            padding-bottom: ${10 * GU}px;
          `}
        >
          <Link
            onClick={handleBackClick}
            css={`
              display: flex;
              align-items: center;
              font-size: 18px;
              margin-bottom: ${2 * GU}px;
              font-weight: ${fontWeight.medium};
            `}
          >
            <IconArrowLeft
              css={`
                margin-right: ${0.5 * GU}px;
              `}
            />
            Back home
          </Link>
          <h1
            css={`
              font-weight: ${fontWeight.bold};
              line-height: 1.2;
              margin-bottom: ${2.5 * GU}px;
              font-size: ${compactMode ? `44` : `54`}px;
            `}
          >
            Terms and Conditions
          </h1>
          <TermsContainer compactMode={compactMode}>
            <TermsAndConditions />
          </TermsContainer>
        </LayoutLimiter>
      </AnimateEntrance>
    </LayoutGutter>
  )
}

function TermsContainer({
  children,
}: {
  children: ReactNode
  compactMode: boolean
}) {
  return (
    <p
      css={`
        & > * {
          margin-bottom: ${2 * GU}px;
        }
        font-weight: ${fontWeight.medium};
        line-height: 1.6;
        color: ${localTheme.secondary};
      `}
    >
      {children}
    </p>
  )
}

export default TermsPage
