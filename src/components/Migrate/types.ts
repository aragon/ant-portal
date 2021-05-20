export type TokenConversionType = 'ANT' | 'ANJ' | 'ANJ-LOCK'
export type ConversionStage = 'form' | 'signing'
export type ValidationStatus =
  | 'notConnected'
  | 'insufficientBalance'
  | 'noAmount'
  | 'valid'

export const TOKEN_SYMBOL: Record<TokenConversionType, string> = {
  ANT: 'ANTv1',
  ANJ: 'ANJ',
  'ANJ-LOCK': 'ANJ',
}
