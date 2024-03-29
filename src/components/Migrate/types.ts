export type TokenConversionType = 'ANT' | 'ANJ'
export type ConversionStage = 'form' | 'signing'
export type ValidationError =
  | 'insufficientBalance'
  | 'insufficientAmount'
  | 'noAmount'

export type ValidationStatus =
  | ValidationError
  | 'notConnected'
  | 'loading'
  | 'valid'

export const TOKEN_SYMBOL: Record<TokenConversionType, string> = {
  ANT: 'ANTv1',
  ANJ: 'ANJ',
}
