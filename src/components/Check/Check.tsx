import React from 'react'
// @ts-ignore
import { GU } from '@aragon/ui'
import LayoutGutter from '../Layout/LayoutGutter'
import AnimateEntrance from '../AnimateEntrance/AnimateEntrance'
import CheckerForm from './CheckerForm'
import styled from 'styled-components'

function Check(): JSX.Element {
  return (
    <StyledAnimationEntrance>
      <PaddedLayoutGutter>
        <div
          css={`
            margin-top: -${4 * GU}px;
            width: 100%;
            display: flex;
            justify-content: center;
          `}
        >
          <div
            css={`
              width: 100%;
              max-width: ${120 * GU}px;
            `}
          >
            <CheckerForm />
          </div>
        </div>
      </PaddedLayoutGutter>
    </StyledAnimationEntrance>
  )
}
const PaddedLayoutGutter = styled(LayoutGutter)`
  padding-top: ${7 * GU}px;
  padding-bottom: ${10 * GU}px;
`
const StyledAnimationEntrance = styled(AnimateEntrance)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
`

export default Check
