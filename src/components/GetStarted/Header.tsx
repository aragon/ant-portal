import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
// @ts-ignore
import { GU, IconArrowRight, useTheme, useLayout } from '@aragon/ui'
import { fontWeight } from '../../style/font'
import BrandButton from '../BrandButton/BrandButton'
import LayoutLimiter from '../Layout/LayoutLimiter'
import { CONVERTER_PATH } from '../../Routes'

function Header(): JSX.Element {
  const history = useHistory()
  const theme = useTheme()

  const { layoutName } = useLayout()
  const compactMode = layoutName === 'small'

  const handleNavigateToConverter = useCallback(() => {
    history.push(CONVERTER_PATH)
  }, [history])

  return (
    <LayoutLimiter>
      <div
        css={`
          width: 100%;
          text-align: center;
        `}
      >
        <h3
          css={`
            font-weight: ${fontWeight.medium};
            font-size: 26px;
            background: linear-gradient(
              88.01deg,
              ${theme.accentStart} 0%,
              ${theme.accentEnd} 75%
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
            margin-bottom: ${2.5 * GU}px;
            font-size: ${compactMode ? `44` : `54`}px;
          `}
        >
          Migrate to ANT&nbsp;v2
        </h1>
        <p
          css={`
            font-weight: ${fontWeight.medium};
            font-size: ${compactMode ? `22` : `26`}px;
            color: ${theme.contentSecondary};
            margin: auto;
            margin-bottom: ${4 * GU}px;
            max-width: ${110 * GU}px;
          `}
        >
          Use Aragon Migrate system to upgrade your ANT balance to the newest
          version of the token&nbsp;contract.
        </p>
        <BrandButton
          mode="strong"
          size="large"
          onClick={handleNavigateToConverter}
        >
          Migrate ANT v1{' '}
          <IconArrowRight
            css={`
              opacity: 0.75;
              margin-left: ${1 * GU}px;
              margin-right: ${1 * GU}px;
            `}
          />{' '}
          ANT v2
        </BrandButton>
      </div>
    </LayoutLimiter>
  )
}

export default Header
