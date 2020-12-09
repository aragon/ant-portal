import React, { useMemo } from 'react'
import {
  IconCheck,
  IconCross,
  IconClock,
  useTheme,
  // @ts-ignore
} from '@aragon/ui'
import { ActivityFinalStatus } from './types'

function ActivityStatusIcon({
  status,
  ...props
}: {
  status: ActivityFinalStatus
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
    <span
      css={`
        display: block;
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
      {...props}
    >
      {icon}
    </span>
  )
}

export default ActivityStatusIcon
