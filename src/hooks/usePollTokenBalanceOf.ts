import { useCallback, useState } from 'react'
import { BigNumber, Contract as EthersContract } from 'ethers'
import { captureErrorWithSentry } from '../sentry'
import { useMounted } from './useMounted'
import { useInterval } from './useInterval'

const POLL_INTERVAL = 3000

export function usePollTokenBalanceOf(
  account: string | null,
  tokenContract: EthersContract | null
): BigNumber | null {
  const mounted = useMounted()
  const [tokenBalance, setTokenBalance] = useState<BigNumber | null>(null)

  const getBalance = useCallback(
    async (clear) => {
      if (!tokenContract) {
        // Clear any existing balance
        if (mounted()) {
          setTokenBalance(null)
        }
        return
      }

      try {
        const balance: BigNumber = await tokenContract.balanceOf(account)

        // Avoid unnessesary re-renders by only updating value when it has actually changed
        if (mounted() && (!tokenBalance || !balance.eq(tokenBalance))) {
          setTokenBalance(balance)
        }
      } catch (err) {
        captureErrorWithSentry(err)
        clear()

        if (mounted()) {
          setTokenBalance(null)
        }
      }
    },
    [account, mounted, tokenContract, tokenBalance]
  )

  useInterval(getBalance, POLL_INTERVAL)

  return tokenBalance
}
