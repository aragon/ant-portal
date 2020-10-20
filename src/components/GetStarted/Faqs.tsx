import React from 'react'
// @ts-ignore
import { GU, Link } from '@aragon/ui'
import { fontWeight } from '../../style/font'
import LayoutLimiter from '../Layout/LayoutLimiter'
import Faq from './Faq'
import PageHeading from '../PageHeading/PageHeading'

// TODO: Add url when available
const FAQS_URL = ''

function Faqs(): JSX.Element {
  return (
    <LayoutLimiter size="medium">
      <div
        css={`
          magin-top: 100px;
          text-align: center;
        `}
      >
        <PageHeading
          title="FAQs"
          description="Have questions? We have answers."
          css={`
            width: 100%;
            margin-bottom: ${7 * GU}px;
          `}
        />
        <Faq
          content="What is ANT v2?"
          expansion="This is the part of your collateral balance that is backing a particular action that has been challenged or disputed in Aragon Court. Part of this amount could be slashed (transferred to the challenger’s account) if the challenge or dispute outcome results in canceling the action."
        />
        <Faq
          content="Why should I migrate my ANT?"
          expansion="This is the part of your collateral balance that is backing a particular action that has been challenged or disputed in Aragon Court. Part of this amount could be slashed (transferred to the challenger’s account) if the challenge or dispute outcome results in canceling the action."
        />
        <Faq
          content="For how long will this migration last?"
          expansion="This is the part of your collateral balance that is backing a particular action that has been challenged or disputed in Aragon Court. Part of this amount could be slashed (transferred to the challenger’s account) if the challenge or dispute outcome results in canceling the action."
        />
        <Faq
          content="What is the conversion rate?"
          expansion="This is the part of your collateral balance that is backing a particular action that has been challenged or disputed in Aragon Court. Part of this amount could be slashed (transferred to the challenger’s account) if the challenge or dispute outcome results in canceling the action."
        />

        <Link
          href={FAQS_URL}
          css={`
            margin-top: ${6 * GU}px;
            font-weight: ${fontWeight.medium};
            font-size: 20px;
          `}
        >
          Go to all FAQs
        </Link>
      </div>
    </LayoutLimiter>
  )
}

export default Faqs
