export type DaoAddress = string
export type TxHash = string

// Add tx hashes (values) for DAOs (keys) that received their options.
export const optionsInfo: Record<DaoAddress, TxHash> = {
  '0x8367dc645e31321CeF3EeD91a10a5b7077e21f70':
    '0x7b6f030dbbf8ee4e22488b4edf239f0e9cdbaa54fcef985c81d324bd3cbccffb',
}
