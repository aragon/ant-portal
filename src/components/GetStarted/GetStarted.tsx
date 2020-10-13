import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import LayoutGutter from '../Layout/LayoutGutter'
import BrandButton from '../BrandButton/BrandButton'

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
          <BrandButton onClick={handleNavigateToConverter}>
            Migrate ANT
          </BrandButton>
        </div>
      </div>
    </LayoutGutter>
  )
}

export default GetStarted
