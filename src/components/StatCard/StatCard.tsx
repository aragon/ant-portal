import React from 'react'
// @ts-ignore
import { useTheme, GU } from '@aragon/ui'
import { radius } from '../../style/radius'

type StatCardProps = {
  title: string
  value: string
  graphic: string
  desc: string
}

function StatCard({ graphic, title, value, desc }: StatCardProps): JSX.Element {
  const theme = useTheme()

  return (
    <div
      css={`
        background-color: ${theme.surface};
        border-radius: ${radius.high};
        padding: ${3 * GU}px;
      `}
    >
      <img
        alt=""
        src={graphic}
        css={`
          width: ${10 * GU}px;
          width: ${10 * GU}px;
        `}
      />
      <h3>{title}</h3>
      <div>{value}</div>
      <p>{desc}</p>
    </div>
  )
}

export default StatCard
