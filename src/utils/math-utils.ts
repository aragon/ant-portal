import { utils as EthersUtils, BigNumber } from 'ethers'
// @ts-ignore
import TokenAmount from 'token-amount'

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

export function formatTokenAmountToUsd(
  amount: BigNumber,
  decimals: number,
  rate: string
): string {
  const formattedAmount = new TokenAmount(amount, decimals)
    .convert(rate, decimals)
    .format()

  // TokenAmount removes trailing zeros so we add them manually
  const [, decimal] = formattedAmount.split('.')
  const formattedDecimal = !decimal ? '.00' : decimal.length < 2 ? '0' : ''

  return `${formattedAmount}${formattedDecimal}`
}
