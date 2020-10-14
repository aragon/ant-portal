import { utils as EthersUtils, BigNumber } from 'ethers'

export function bigNum(value: string | number): BigNumber {
  return BigNumber.from(value)
}

/**
 * Format a decimal-based number back to a normal number
 *
 * @param {string} value the number
 * @param {number} digits number of decimal places
 * @returns {BN} value converted to it's normal representation
 */
export function parseUnits(value: string, digits: number): BigNumber {
  return EthersUtils.parseUnits(value, digits)
}
