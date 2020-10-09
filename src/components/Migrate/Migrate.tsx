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
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: flex-end;
          flex: 1;
          width: 100%;
        `}
      >
        <PageHeading
          title={title}
          description={description}
          css={`
            width: 100%;
            margin-bottom: ${6 * GU}px;
          `}
        />
      </div>

      <div
        css={`
          display: flex;
          justify-content: center;
          width: 100%;
        `}
      >
        <Converter />
      </div>

      {/* Bookend to centrally align converter via flex */}
      <div
        css={`
          flex: 1;
        `}
      ></div>
    </LayoutGutter>
  )
}

export default Migrate
