import React from 'react'
import {
  GU,
  // @ts-ignore
} from '@aragon/ui'
import BrandButton from '../BrandButton/BrandButton'
import { TermsAndConditions } from '../TermsAndConditions/TermsAndConditionsText'

interface TosModalProps {
  onClose: () => void
  onAccept: () => void
}

const TOS: React.FC<TosModalProps> = ({ onClose, onAccept }) => {
  return (
    <>
      <div
        css={`
          max-height: 450px;
          overflow-y: auto;
          padding-right: ${2 * GU}px;
          text-align: justify;
          & > p {
            margin-bottom: ${2 * GU}px;
          }
        `}
      >
        <TermsAndConditions />
      </div>
      <div
        css={`
          margin-top: ${4 * GU}px;
          display: flex;
          justify-content: space-between;
          gap: ${2 * GU}px;
        `}
      >
        <BrandButton wide onClick={onClose}>
          Decline
        </BrandButton>
        <BrandButton mode="strong" wide onClick={onAccept}>
          Accept
        </BrandButton>
      </div>
    </>
  )
}

export default TOS
