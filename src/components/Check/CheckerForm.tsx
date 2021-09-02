import React from 'react'
import styled, { css } from 'styled-components'
import {
  useTheme,
  useLayout,
  GU,
  // @ts-ignore
} from '@aragon/ui'
import { radius } from '../../style/radius'
import { shadowDepth } from '../../style/shadow'
import PageHeading from '../PageHeading/PageHeading'
import { BaseCheckerFormControls } from './CheckerControls'
import OptionRate from './OptionRate'

function CheckerForm(): JSX.Element {
  const theme = useTheme()
  const { layoutName } = useLayout()
  const compactMode = layoutName === 'small' || layoutName === 'medium'

  return (
    <>
      <PageHeading
        title="Aragon Govern Reward Program"
        description={`Check how many options your DAO is entitled to receive`}
        css={`
          margin-bottom: ${7 * GU}px;
        `}
      />
      <WhiteSection surface={theme.surface} isCompact={compactMode}>
        <OptionSection>
          <OptionRate tokenSymbol="option" compactMode={compactMode} />
        </OptionSection>
        <BaseCheckerFormControls />
      </WhiteSection>
    </>
  )
}

const multiColumnLayout = css`
  grid-template-columns: 55% auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    'title rate'
    'inputs rate';
`

const stackedLayout = css`
  grid-template-rows: auto auto auto;
  grid-template-areas: 'title' 'rate' 'inputs';
`
const WhiteSection = styled.div<{ surface: any; isCompact: boolean }>`
  padding: ${(props) => (props.isCompact ? 4 * GU : 6 * GU)}px;
  background-color: ${(props) => props.surface};
  box-shadow: ${shadowDepth.high};
  border-radius: ${radius.high};
  display: grid;
  grid-gap: ${4 * GU}px;
  ${(props) => (props.isCompact ? stackedLayout : multiColumnLayout)}
`

const OptionSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: rate;
  padding: ${2 * GU}px;
`

export default CheckerForm
