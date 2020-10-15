import { utils as EthersUtils, BigNumber } from 'ethers'

export function bigNum(value: string | number): BigNumber {
  return BigNumber.from(value)
}

/**
 * Format a decimal-based number back to a big number
 *
 * @param {string} value the number
 * @param {number} digits number of decimal places
 * @returns {BN} value converted to it's normal representation
 */
export function parseUnits(value: string, digits: number): BigNumber {
  try {
    return EthersUtils.parseUnits(value, digits)
  } catch (err) {
    return bigNum(-1)
  }
}

/**
 * Round a value
 *
 * @param {String} value Value to round
 * @param {Number} precision Rounding precision
 * @returns {String} Value rounded to `precision` decimals
 */
export function round(value: string, precision = 2): string {
  const [whole, decimal] = value.split('.')

  if (!decimal || decimal.length <= precision) return value

  // Round and keep the last `precision` digits
  const preciseDecimal = Math.round(
    parseInt((decimal || '0').slice(0, precision + 2)) / 100
  )

  return `${whole}${preciseDecimal ? `.${preciseDecimal}` : ''}`
}
