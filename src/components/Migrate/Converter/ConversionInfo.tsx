import React from 'react'
// @ts-ignore
import { Info, Link, GU } from '@aragon/ui'
import { getEtherscanUrl } from '../../../utils/etherscan'
import { networkEnvironment } from '../../../environment'
import styled from 'styled-components'

const { contracts } = networkEnvironment
const antV2ContractUrl = getEtherscanUrl(contracts.tokenAntV2)

const StyledInfo = styled(Info)`
  display: flex;
  flex-flow: column wrap;
  row-gap: ${GU}px;
  margin-top: ${3 * GU}px;
  margin-bottom: ${2 * GU}px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

function OneWayMessage(): JSX.Element {
  return (
    <div>
      This conversion is a one way path.{' '}
      <StyledLink href={antV2ContractUrl} style={{ textDecoration: 'none' }}>
        <label style={{ fontWeight: 'normal' }}>
          Review ANTv2 token contract
        </label>
      </StyledLink>
    </div>
  )
}

function StakingInfo(): JSX.Element {
  return (
    <StyledInfo>
      <OneWayMessage />
    </StyledInfo>
  )
}

export default StakingInfo
