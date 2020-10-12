import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  // @ts-ignore
} from '@aragon/ui'
import LayoutGutter from '../Layout/LayoutGutter'

function GetStarted(): JSX.Element {
  const history = useHistory()

  const handleNavigateToConverter = useCallback(() => {
    history.push('/ant')
  }, [history])

  return (
    <LayoutGutter>
      <div
        css={`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        `}
      >
        <div>
          <h2>Get started page</h2>
          <Button onClick={handleNavigateToConverter}>Migrate ANT</Button>
        </div>
      </div>
    </LayoutGutter>
  )
}

export default GetStarted
