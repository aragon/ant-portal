import React from 'react'
// @ts-ignore
import { GU, Info } from '@aragon/ui'
import Features from './Features'
import LayoutGutter from '../Layout/LayoutGutter'
import Header from './Header'
import Balances from './Balances'
import Faqs from './Faqs'
import useDetectMobileDevice from '../../hooks/useDetectMobileDevice'
// import Stats from './Stats'
import AnimateEntrance from '../AnimateEntrance/AnimateEntrance'

function GetStarted(): JSX.Element {
  const isMobile = useDetectMobileDevice()

  return (
    <AnimateEntrance>
      <div
        css={`
          padding-top: ${7 * GU}px;
          padding-bottom: ${24 * GU}px;
        `}
      >
        <LayoutGutter>
          <Header />
          {isMobile && (
            <Info
              mode="warning"
              css={`
                max-width: ${62 * GU}px;
                margin-top: ${4 * GU}px;
                margin-left: auto;
                margin-right: auto;
              `}
            >
              This portal is not supported on mobile wallets. Use a desktop
              browser with Wallet Connect to begin the migration.
            </Info>
          )}
          <Balances
            css={`
              padding-top: ${10 * GU}px;
              padding-bottom: ${17 * GU}px;
            `}
          />
          <Features
            css={`
              padding-bottom: ${24 * GU}px;
            `}
          />
          {/* <Stats
            css={`
              padding-bottom: ${20 * GU}px;
            `}
          /> */}
          <Faqs />
        </LayoutGutter>
      </div>
    </AnimateEntrance>
  )
}

export default GetStarted
