import { useState } from 'react'
import { BigNumber, Contract as EthersContract } from 'ethers'
import { captureErrorWithSentry } from '../sentry'
import { useMounted } from './useMounted'
import { useInterval } from './useInterval'

export function useTokenBalanceOf(
  account: string | null,
  tokenContract: EthersContract | null
): BigNumber | null {
  const mounted = useMounted()
  const [tokenBalance, setTokenBalance] = useState<BigNumber | null>(null)

  useInterval(async (clear) => {
    if (!tokenContract) {
      clear()
      return
    }

    try {
      const balance = await tokenContract.balanceOf(account)

      if (mounted()) {
        setTokenBalance(balance)
      }
    } catch (err) {
      captureErrorWithSentry(err)
      clear()

      if (mounted()) {
        setTokenBalance(null)
      }
    }
  }, 5000)

  return tokenBalance
}
