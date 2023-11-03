import React from 'react'
import {
  IconExternal,
  Link,
  GU,
  // @ts-ignore
} from '@aragon/ui'
import { getEtherscanUrl } from '../../utils/etherscan'
import { theme } from '../../style/theme'
import BrandButton from '../BrandButton/BrandButton'

type SuccessProps = {
  onClose: () => void
  message: string | null
}

const Success: React.FC<SuccessProps> = ({ onClose, message }) => {
  if (!message) return null
  return (
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
          color: ${theme.positive};
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
          <div>Successfully redeemed ANTv2 to ETH</div>
          <Link
            href={getEtherscanUrl(message, 'transaction')}
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
            View on Etherscan{' '}
            <IconExternal
              css={`
                position: relative;
                top: 3px;
                width: 1.1em;
                height: 1.1em;
                flex-shrink: 0;

                margin-left: ${0.5 * GU}px;
                margin-right: ${3 * GU}px;
              `}
            />
          </Link>
        </div>
      </div>
      <BrandButton mode="strong" wide onClick={onClose}>
        Done
      </BrandButton>
    </div>
  )
}

export default Success
