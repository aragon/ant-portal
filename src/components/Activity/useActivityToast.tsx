import React from 'react'
import { useCallback } from 'react'
// @ts-ignore
import { useToast, ButtonBase, GU } from '@aragon/ui'
import { Activity, ActivityActionType, ActivityFinalStatus } from './types'
import ActivityStatusIcon from './ActivityStatusIcon'
import { fontWeight } from '../../style/font'

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
}

export function useActivityToast(): (
  activity: Activity,
  status: ActivityFinalStatus
) => void {
  const summonToast = useToast()

  return useCallback(
    (activity: Activity, status: ActivityFinalStatus) => {
      const description = DESCRIPTIONS[activity.type][status]

      summonToast(
        <ButtonBase
          css={`
            display: flex;
            justify-content: space-between;
            width: 100%;
            text-align: left;
            font-weight: ${fontWeight.medium};
          `}
        >
          <span
            css={`
              position: relative;
              overflow: hidden;
              flex: 1;
              margin-right: ${2 * GU}px;
            `}
          >
            {description}
          </span>
          <ActivityStatusIcon
            status={status}
            css={`
              flex-shrink: 0;
            `}
          />
        </ButtonBase>
      )
    },
    [summonToast]
  )
}
