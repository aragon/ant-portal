import React from 'react'
// @ts-ignore
import { useTheme, GU } from '@aragon/ui'
import { radius } from '../../style/radius'
import { fontWeight } from '../../style/font'

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
        padding: ${4 * GU}px;
        width: 100%;
        max-width: ${65 * GU}px;
      `}
    >
      <img
        alt=""
        src={graphic}
        css={`
          width: ${10 * GU}px;
          width: ${10 * GU}px;
          margin-bottom: ${2 * GU}px;
        `}
      />
      <h3
        css={`
          font-size: 18px;
          font-weight: ${fontWeight.medium};
          color: ${theme.contentSecondary};
        `}
      >
        {title}
      </h3>
      <span
        css={`
          font-size: 32px;
          font-weight: ${fontWeight.semiBold};
        `}
      >
        {value}
      </span>
      <p
        css={`
          font-size: 18px;
          color: ${theme.surfaceContentSecondary};
        `}
      >
        {desc}
      </p>
    </div>
  )
}

export default StatCard
