import React from 'react'
import {
  GU,
  Link,
  IconExternal,
  // @ts-ignore
} from '@aragon/ui'
import { theme } from '../../style/theme'
import BrandButton from '../BrandButton/BrandButton'
import { TERMS_URL_PATH } from '../../lib/terms'
import { When } from 'react-if'
import { ErrorType } from './types'

type ErrorProps = {
  onClose: () => void
  message?: string | null
  errorType?: ErrorType
}

const Error: React.FC<ErrorProps> = ({ onClose, message, errorType }) => (
  <div
    css={`
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 17px;
      text-align: left;
    `}
  >
    <div
      css={`
        margin-top: ${2 * GU}px;
        margin-bottom: ${4 * GU}px;
        display: flex;
        justify-content: left;
        color: ${theme.negative};
        margin-right: auto;
      `}
    >
      <div
        css={`
          display: flex;
          flex-direction: column;
          gap: ${1 * GU}px;
          align-items: left;
        `}
      >
        <div>{message}</div>
        <When condition={errorType === 'ofac'}>
          <Link
            href={TERMS_URL_PATH}
            css={`
              text-align: left;
              white-space: initial;
              word-break: break-word;
              display: inline-flex;
              text-decoration: none;
              &:focus:after {
                border: none;
              }
            `}
          >
            Terms and Conditions{' '}
            <IconExternal
              css={`
                position: relative;
                top: 3px;
                width: 1.1em;
                height: 1.1em;
                flex-shrink: 0;

                margin-left: ${0.5 * GU}px;
                margin-right: ${0.5 * GU}px;
              `}
            />
          </Link>
        </When>
      </div>
    </div>
    <div>
      <BrandButton mode="strong" wide onClick={onClose}>
        Dismiss
      </BrandButton>
    </div>
  </div>
)

export default Error
