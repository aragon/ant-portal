import React from 'react'
import { css } from 'styled-components'
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
      <div
        css={`
          padding: ${compactMode ? 4 * GU : 6 * GU}px;
          background-color: ${theme.surface};
          box-shadow: ${shadowDepth.high};
          border-radius: ${radius.high};
          display: grid;
          grid-gap: ${4 * GU}px;
          ${compactMode ? stackedLayout : multiColumnLayout}
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
            justify-content: center;
            grid-area: rate;
            padding: ${2 * GU}px;
          `}
        >
          <OptionRate tokenSymbol="OPT" compactMode={compactMode} />
        </div>
        <BaseCheckerFormControls />
      </div>
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
  grid-template-areas:
    'title'
    'rate'
    'inputs';
`

export default CheckerForm
