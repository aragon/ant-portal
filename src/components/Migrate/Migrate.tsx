import React from 'react'
// @ts-ignore
import { GU } from '@aragon/ui'
import { ConversionStage, TokenConversionType } from './types'
import Converter from './Converter/Converter'
import LayoutGutter from '../Layout/LayoutGutter'
import PageHeading from '../PageHeading/PageHeading'
import { MigrateStateProvider, useMigrateState } from './MigrateStateProvider'

type PageDetails = Record<
  TokenConversionType,
  { [key in ConversionStage]: { title: string; description: string } }
>

const PAGE_DESCRIPTION: PageDetails = {
  ANT: {
    entering: {
      title: 'Aragon Migrate',
      description: 'How much ANT would you like to upgrade?',
    },
    signing: {
      title: 'Aragon Migrate',
      description: 'Upgrading your ANT',
    },
  },
}

type MigrateProps = {
  conversionType: TokenConversionType
}

function Migrate({ conversionType }: MigrateProps): JSX.Element {
  return (
    <MigrateStateProvider conversionType={conversionType}>
      <MigrateContent />
    </MigrateStateProvider>
  )
}

function MigrateContent() {
  const { conversionStage, conversionType } = useMigrateState()

  const { title, description } = PAGE_DESCRIPTION[conversionType][
    conversionStage
  ]

  return (
    <LayoutGutter
      css={`
        padding-top: ${7 * GU}px;
        padding-bottom: ${7 * GU}px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      `}
    >
      <div
        css={`
          margin-top: -${8 * GU}px;
          width: 100%;
        `}
      >
        <PageHeading
          title={title}
          description={description}
          css={`
            width: 100%;
            margin-bottom: ${7 * GU}px;
          `}
        />

        <div
          css={`
            display: flex;
            justify-content: center;
            width: 100%;
          `}
        >
          <Converter />
        </div>
      </div>
    </LayoutGutter>
  )
}

export default Migrate
