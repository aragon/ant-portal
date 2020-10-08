import React from 'react'
import { ConversionStage, TokenConversionType } from './types'
import Converter from './Converter/Converter'
import LayoutGutter from '../Layout/LayoutGutter'
import PageHeading from '../PageHeading/PageHeading'
import { MigrateStateProvider, useMigrateState } from './MigrateStateProvider'

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

type PageDetails = Record<
  TokenConversionType,
  { [key in ConversionStage]: { title: string; description: string } }
>

const pageDetails: PageDetails = {
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

function MigrateContent() {
  const { conversionStage, conversionType } = useMigrateState()

  const { title, description } = pageDetails[conversionType][conversionStage]

  return (
    <LayoutGutter>
      <PageHeading title={title} description={description} />

      <div
        css={`
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        `}
      >
        <Converter />
      </div>
    </LayoutGutter>
  )
}

export default Migrate
