import React, { ReactNode } from 'react'

type LayoutGutterProps = {
  children?: ReactNode
}

function LayoutLimiter({ children, ...props }: LayoutGutterProps): JSX.Element {
  return (
    <div
      css={`
        margin-left: auto;
        margin-right: auto;
        max-width: 1280px;
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default LayoutLimiter
