import { BigNumber } from 'ethers'

export function bigNum(value: string | number): BigNumber {
  return BigNumber.from(value)
}
