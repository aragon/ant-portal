import React from 'react'
import {
  GU,
  // @ts-ignore
} from '@aragon/ui'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { theme } from '../../style/theme'
import { When } from 'react-if'
import { ErrorType } from './types'

type LoadingProps = {
  message: string | null
  errorType?: ErrorType
}

const Loading: React.FC<LoadingProps> = ({ message, errorType }) => (
  <div
    css={`
      margin-top: ${4 * GU}px;
      margin-bottom: ${2 * GU}px;
      display: flex;
      flex-direction: column;
      gap: ${2 * GU}px;
      align-items: center;
      justify-content: center;
      color: ${errorType === 'permitFail' && theme.negative};
    `}
  >
    <When condition={errorType === 'permitFail'}>
      <div
        css={`
          margin-bottom: ${2 * GU}px;
          margin-right: auto;
          display: flex;
          align-items: left;
          justify-content: left;
        `}
      >
        {message}
      </div>
    </When>
    <LoadingSpinner
      css={`
        color: ${theme.accent};
        width: ${errorType === 'permitFail' ? '3em' : '5em'};
        height: ${errorType === 'permitFail' ? '3em' : '5em'};
      `}
    />
  </div>
)

export default Loading
