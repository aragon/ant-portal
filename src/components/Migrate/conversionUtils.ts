import { TokenConversionType } from './types'
import { networkEnvironment } from '../../environment'

export const CONVERSION_RATE: Record<TokenConversionType, number> = {
  ANT: 1,
  ANJ: 0.015,
}

const { contracts } = networkEnvironment
export const MIGRATORS: Record<TokenConversionType, string | undefined> = {
  ANT: contracts.antV2Migrator,
  ANJ: contracts.anjNoLockMinterMigrator,
}
