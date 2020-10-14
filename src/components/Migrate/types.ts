export type TokenConversionType = 'ANT'
export type ConversionStage = 'entering' | 'signing'
export type ValidationStatus =
  | 'notConnected'
  | 'insufficientBalance'
  | 'noAmount'
  | 'valid'
