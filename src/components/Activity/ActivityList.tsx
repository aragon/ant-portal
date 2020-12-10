import React, { useMemo } from 'react'
import {
  GU,
  IconExternal,
  ButtonBase,
  useTheme,
  Link,
  // @ts-ignore
} from '@aragon/ui'
import { useActivity } from './ActivityProvider'
import { fontWeight } from '../../style/font'
import { radius } from '../../style/radius'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { getEtherscanUrl } from '../../utils/etherscan'
import ActivityStatusIcon from './ActivityStatusIcon'

function ActivityList({
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const { activities, clearActivities } = useActivity()
  const theme = useTheme()

  const sortedActivites = useMemo(
    () => activities.sort((a, b) => b.createdAt - a.createdAt),
    [activities]
  )

  return (
    <div
      css={`
        padding: ${3 * GU}px;
        border-radius: ${radius.medium};
        border: 1px solid ${theme.border};
        overflow-y: auto;
        max-height: ${30 * GU}px;
      `}
      {...props}
    >
      {sortedActivites.length > 0 ? (
        <>
          <div
            css={`
              display: flex;
              justify-content: space-between;
              margin-bottom: ${1.5 * GU}px;
            `}
          >
            <h2
              css={`
                line-height: 1.2;
                font-weight: ${fontWeight.medium};
              `}
            >
              Recent transactions
            </h2>
            <ButtonBase
              onClick={() => clearActivities()}
              css={`
                padding: ${1 * GU}px ${1.25 * GU}px;
                margin-top: -${1 * GU}px;
                margin-right: -${1.25 * GU}px;
                border-radius: ${radius.low};
                line-height: 1;
                font-weight: ${fontWeight.medium};
                color: ${theme.contentSecondary};
              `}
            >
              Clear all
            </ButtonBase>
          </div>
          <ul
            css={`
              list-style: none;
            `}
          >
            {sortedActivites.map(
              ({ description, status, transactionHash }, i) => {
                return (
                  <li
                    key={i}
                    css={`
                      display: flex;
                      justify-content: space-between;
                      color: ${theme.contentSecondary};
                      font-size: 14px;

                      &:not(:last-child) {
                        margin-bottom: ${1 * GU}px;
                      }
                    `}
                  >
                    <Link
                      href={getEtherscanUrl(transactionHash, 'transaction')}
                      css={`
                        text-align: left;
                        white-space: initial;
                        word-break: break-word;
                        display: inline-flex;
                        /* text-decoration: none; */
                      `}
                    >
                      {description}

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

                    <div
                      css={`
                        margin-top: 0.25em;
                      `}
                    >
                      {status === 'pending' ? (
                        <LoadingSpinner
                          css={`
                            color: ${theme.accent};
                            width: 1.1em;
                            height: 1.1em;
                          `}
                        />
                      ) : (
                        <ActivityStatusIcon status={status} />
                      )}
                    </div>
                  </li>
                )
              }
            )}
          </ul>
        </>
      ) : (
        <p
          css={`
            color: ${theme.contentSecondary};
            line-height: 1.2;
          `}
        >
          Your transactions will appear here…
        </p>
      )}
    </div>
  )
}

export default ActivityList
