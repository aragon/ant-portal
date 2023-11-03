export enum RedeemStep {
  Ready,
  CheckFunds,
  AcceptTerms,
  OfacCheck,
  RedeemTx,
  Success,
  Error,
}

export type ErrorType = 'ofac' | 'permitFail' | 'funds' | 'redeem' | null
