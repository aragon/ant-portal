import { TokenConversionType } from './types'

export const CONVERSION_RATE: Record<TokenConversionType, number> = {
  ANT: 1,
  ANJ: 0.015,
  'ANJ-LOCK': 0.044,
}

export const ANJ_CONVERSIONS = new Set(['ANJ', 'ANJ-LOCK'])
