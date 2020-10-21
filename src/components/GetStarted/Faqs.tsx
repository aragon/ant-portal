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
  const items = [
    [
      'What is ANT v2?',
      'This is the part of your collateral balance that is backing a particular action that has been challenged or disputed in Aragon Court. Part of this amount could be slashed (transferred to the challenger’s account) if the challenge or dispute outcome results in canceling the action.',
    ],
    [
      'Why should I migrate my ANT?',
      'This is the part of your collateral balance that is backing a particular action that has been challenged or disputed in Aragon Court. Part of this amount could be slashed (transferred to the challenger’s account) if the challenge or dispute outcome results in canceling the action.',
    ],
    [
      'For how long will this migration last?',
      'This is the part of your collateral balance that is backing a particular action that has been challenged or disputed in Aragon Court. Part of this amount could be slashed (transferred to the challenger’s account) if the challenge or dispute outcome results in canceling the action.',
    ],
    [
      'What is the conversion rate?',
      'This is the part of your collateral balance that is backing a particular action that has been challenged or disputed in Aragon Court. Part of this amount could be slashed (transferred to the challenger’s account) if the challenge or dispute outcome results in canceling the action.',
    ],
  ]
  return (
    <LayoutLimiter size="medium">
      <div
        css={`
          magin-top: 100px;
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
        {items.map(([title, description, index]) => (
          <Faq key={index} title={title} description={description} />
        ))}
        <div
          css={`
            text-align: center;
          `}
        >
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
      </div>
    </LayoutLimiter>
  )
}

export default Faqs
