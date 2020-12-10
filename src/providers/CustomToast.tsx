import React, { ReactNode } from 'react'
//@ts-ignore
import { ToastHub, GU } from '@aragon/ui'
import { fontWeight } from '../style/font'
import { radius } from '../style/radius'

function CustomToast({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ToastHub
      timeout={4000}
      showIndicator
      css={`
        // Toast spacing element
        > div {
          // We must re-enable pointer events as some of our toasts contain clickable elements
          pointer-events: auto;

          // Toast inner element
          > div {
            position: relative;
            height: auto;
            padding-top: ${1.75 * GU}px;
            padding-bottom: ${1.75 * GU + 1}px;
            font-weight: ${fontWeight.medium};
            overflow: hidden;
            border-radius: ${radius.medium};

            // Adjust height of indicator bar
            > div {
              height: 1px;
            }

            // Allow of better flex positioning on child elements
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
