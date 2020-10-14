import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
// @ts-ignore
import { GU, IconArrowRight, useTheme, useViewport } from '@aragon/ui'
import { fontWeight } from '../../style/font'
import BrandButton from '../BrandButton/BrandButton'
import LayoutLimiter from '../Layout/LayoutLimiter'

function Header(): JSX.Element {
  const history = useHistory()
  const theme = useTheme()
  const { below } = useViewport()
  const compactMode = below('medium')

  const handleNavigateToConverter = useCallback(() => {
    history.push('/ant')
  }, [history])

  return (
    <LayoutLimiter>
      <div
        css={`
          padding: ${10 * GU}px ${2 * GU}px;
          width: 100%;
          text-align: center;
        `}
      >
        <h3
          css={`
            font-weight: ${fontWeight.medium};
            font-size: 26px;
            background: -webkit-linear-gradient(
              88.01deg,
              ${theme.accentStart} -19.78%,
              ${theme.accentEnd} 109.13%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: ${1.5 * GU}px;
          `}
        >
          Aragon Migrate
        </h3>
        <h1
          css={`
            font-weight: ${fontWeight.bold};
            line-height: 1.2;
            font-size: 52px;
            margin-bottom: ${2.5 * GU}px;
          `}
        >
          Migrate to ANT v2
        </h1>
        <p
          css={`
            font-weight: ${fontWeight.medium};
            font-size: ${compactMode ? `20` : `26`}px;
            color: ${theme.surfaceContentSecondary};
            margin: auto;
            margin-bottom: ${3 * GU}px;
            max-width: ${143 * GU}px;
          `}
        >
          Use Aragon Migrate system to upgrade your ANT balance to the newest
          version of the token contract. Connect your wallet to view the
          available migrations on your account.
        </p>
        <BrandButton mode="strong" onClick={handleNavigateToConverter}>
          Migrate ANT v1 <IconArrowRight /> ANT v2
        </BrandButton>
      </div>
    </LayoutLimiter>
  )
}

export default Header
