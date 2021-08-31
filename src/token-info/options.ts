type TokenAddress = string
type TransactionHash = string
type OptionInfo = {
  amount: number
  txHash?: TransactionHash
}

// TODO Add information for migration options here
export const optionsInfo: Record<TokenAddress, OptionInfo> = {
  '0x8367dc645e31321CeF3EeD91a10a5b7077e21f70': {
    amount: 42,
  },
  '0x000000000000000000000000000000000000dEaD': {
    amount: -1,
    txHash:
      '0x7b6f030dbbf8ee4e22488b4edf239f0e9cdbaa54fcef985c81d324bd3cbccffb',
  },
}
