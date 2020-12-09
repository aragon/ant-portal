import React, { ReactNode } from 'react'
//@ts-ignore
import { ToastHub } from '@aragon/ui'
import { fontWeight } from '../style/font'

function CustomToast({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ToastHub
      timeout={1000000000}
      css={`
        // Toast item
        > div {
          // We must re-enable pointer events as some of our toasts contain clickable elements
          pointer-events: auto;

          // Toast item inner
          > div {
            font-weight: ${fontWeight.medium};

            > p {
              width: 100%;
            }
          }
        }
      `}
    >
      {children}
    </ToastHub>
  )
}

export default CustomToast
