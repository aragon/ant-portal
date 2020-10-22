import React from 'react'
// @ts-ignore
import { GU, Link } from '@aragon/ui'
import { fontWeight } from '../../style/font'
import LayoutLimiter from '../Layout/LayoutLimiter'
import Faq from './Faq'
import PageHeading from '../PageHeading/PageHeading'
import { MOCK_PARAGRAPH_CONTENT } from '../../mock'

// TODO: Add url and content when available
const FAQS_URL = ''
const FAQS_ITEMS: [string, string][] = [
  ['What is ANT v2?', MOCK_PARAGRAPH_CONTENT],
  ['Why should I migrate my ANT?', MOCK_PARAGRAPH_CONTENT],
  ['For how long will this migration last?', MOCK_PARAGRAPH_CONTENT],
  ['What is the conversion rate?', MOCK_PARAGRAPH_CONTENT],
]

function Faqs(): JSX.Element {
  return (
    <LayoutLimiter size="small">
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
        <Faq items={FAQS_ITEMS} />
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
