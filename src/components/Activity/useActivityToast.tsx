import React from 'react'
import { useCallback } from 'react'
import {
  useToast,
  IconExternal,
  Link,
  useTheme,
  GU,
  // @ts-ignore
} from '@aragon/ui'
import { ActivityActionType, ActivityFinalStatus } from './types'
import ActivityStatusIcon from './ActivityStatusIcon'
import { fontWeight } from '../../style/font'
import { getEtherscanUrl } from '../../utils/etherscan'

const DESCRIPTIONS: Record<
  ActivityActionType,
  Record<ActivityFinalStatus, string>
> = {
  upgradeANT: {
    confirmed: 'Successfully upgraded ANTv1 to ANTv2',
    failed: 'Failed to upgrade ANTv1 to ANTv2',
    timeout: 'Upgrade from ANTv1 to ANTv2 timed out',
  },
  approveANT: {
    confirmed: 'Successfully approved ANTv1 spend',
    failed: 'Failed to approve ANTv1 spend',
    timeout: 'Approval to spend ANTv1 timed out',
  },
  redeemANJ: {
    confirmed: 'Successfully redeemed ANJ to ANTv2',
    failed: 'Failed to redeem ANJ to ANTv2',
    timeout: 'Redemption from ANJ to ANTv2 timed out',
  },
  approveANJ: {
    confirmed: 'Successfully approved ANJ spend',
    failed: 'Failed to approve ANJ spend',
    timeout: 'Approval to spend ANJ timed out',
  },
}

export function useActivityToast(): (
  hash: string,
  activityType: ActivityActionType,
  status: ActivityFinalStatus
) => void {
  const theme = useTheme()
  const showToast = useToast()

  return useCallback(
    (
      hash: string,
      activityType: ActivityActionType,
      status: ActivityFinalStatus
    ) => {
      const description = DESCRIPTIONS[activityType][status]

      showToast(
        <Link
          href={getEtherscanUrl(hash, 'transaction')}
          css={`
            // We must re-enable pointer events on this child element as the parent disables it
            pointer-events: auto;
            display: flex;
            width: 100%;
            text-align: left;
            font-weight: ${fontWeight.medium};
            text-decoration: none;
          `}
        >
          <ActivityStatusIcon
            status={status}
            css={`
              position: relative;
              top: 3px;
              flex-shrink: 0;
            `}
          />
          <span
            css={`
              display: block;
              margin-left: ${1.75 * GU}px;
              flex: 1;
              min-width: 0px;
            `}
          >
            <span
              css={`
                display: block;
                position: relative;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: ${0.25 * GU}px;

                color: ${theme.surface};
              `}
            >
              {description}
            </span>
            <span
              css={`
                display: flex;
                align-items: center;
                color: ${theme.surfaceIcon};
              `}
            >
              View on Etherscan{' '}
              <IconExternal
                css={`
                  margin-left: ${0.5 * GU}px;
                  width: 1.25em;
                  height: 1.25em;
                `}
              />
            </span>
          </span>
        </Link>
      )
    },
    [showToast, theme]
  )
}
