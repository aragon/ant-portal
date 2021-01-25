export type TokenConversionType = 'ANT' | 'ANJ'
export type ConversionStage = 'form' | 'signing'
export type ValidationStatus =
  | 'notConnected'
  | 'insufficientBalance'
  | 'noAmount'
  | 'valid'
