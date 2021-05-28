import React from 'react'
import { useMigrateState } from '../MigrateStateProvider'
// @ts-ignore
import { Info, Link, GU } from '@aragon/ui'

function StakingInfo(): JSX.Element {
  const { getMinConvertAmount } = useMigrateState()

  // format the amount to have no decimals
  const minConvertAmount = getMinConvertAmount(0)

  return (
    <>
      {minConvertAmount && (
        <Info
          css={`
            margin-top: ${3 * GU}px;
            margin-bottom: 0;
          `}
        >
          To be a juror you need at least {minConvertAmount} ANT staked on
          Court.{' '}
          <Link
            href={'https://aragon.org/old/court'}
            css={`
              display: inline-flex;
              align-items: center;
              text-decoration: none;
              line-height: 1;
            `}
          >
            Learn more
          </Link>
        </Info>
      )}
    </>
  )
}

export default StakingInfo
