import React from 'react'
// @ts-ignore
import { GU, Info } from '@aragon/ui'
import Features from './Features'
import LayoutGutter from '../Layout/LayoutGutter'
import Header from './Header'
import Balances from './Balances'
import Faqs from './Faqs'
import useDetectMobileDevice from '../../hooks/useDetectMobileDevice'
import Stats from './Stats'

function GetStarted(): JSX.Element {
  const isMobile = useDetectMobileDevice()
  return (
    <LayoutGutter>
      <div
        css={`
          padding-top: ${7 * GU}px;
          padding-bottom: ${24 * GU}px;
        `}
      >
        <Header />
        {isMobile && (
          <Info
            css={`
              max-width: ${62 * GU}px;
              margin: ${4 * GU}px auto;
            `}
          >
            ANT v2 Migration is not supported for mobile wallets. Use a web or
            hardware wallet to interact with your account and begin the
            migration.{' '}
          </Info>
        )}
        <Balances
          css={`
            padding-top: ${14 * GU}px;
            padding-bottom: ${17 * GU}px;
          `}
        />
        <Features
          css={`
            padding-bottom: ${24 * GU}px;
          `}
        />
        <Stats
          css={`
            padding-bottom: ${20 * GU}px;
          `}
        />
        <Faqs />
      </div>
    </LayoutGutter>
  )
}

export default GetStarted
