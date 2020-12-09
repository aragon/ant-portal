import React, { useMemo } from 'react'
import {
  GU,
  IconCheck,
  IconCross,
  IconClock,
  IconExternal,
  ButtonBase,
  useTheme,
  Link,
  // @ts-ignore
} from '@aragon/ui'
import { useActivity } from '../../providers/ActivityProvider'
import { fontWeight } from '../../style/font'
import { radius } from '../../style/radius'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { getEtherscanUrl } from '../../utils/etherscan'

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
                        margin-bottom: ${0.75 * GU}px;
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
                      `}
                    >
                      {description}

                      <IconExternal
                        css={`
                          width: 1.5em;
                          height: 1.5em;
                          flex-shrink: 0;

                          margin-left: ${0.75 * GU}px;
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

function ActivityStatusIcon({
  status,
}: {
  status: 'confirmed' | 'timeout' | 'failed'
}): JSX.Element {
  const theme = useTheme()

  const { icon, color, title } = useMemo(() => {
    const iconPresentation = {
      confirmed: {
        icon: <IconCheck />,
        color: theme.positive,
        title: 'Transaction confirmed',
      },
      failed: {
        icon: <IconCross />,
        color: theme.negative,
        title: 'Transaction failed',
      },
      timeout: {
        icon: <IconClock />,
        color: theme.warning,
        title: 'Transaction is taking a long time',
      },
    }

    return iconPresentation[status]
  }, [status, theme])

  return (
    <div
      css={`
        position: relative;
        width: 1.1em;
        height: 1.1em;

        svg {
          position: absolute;
          top: 50%;
          left: 50%;

          margin-left: -0.8em;
          margin-top: -0.8em;
          width: 1.6em;
          height: 1.6em;

          color: ${color};
        }
      `}
      title={title}
    >
      {icon}
    </div>
  )
}

export default ActivityList
