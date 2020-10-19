import { useCallback, useState } from 'react'
import { BigNumber } from 'ethers'
import { captureErrorWithSentry } from '../sentry'
import { useMounted } from './useMounted'
import { useInterval } from './useInterval'
import { TokenAntV1 } from '../abi/types/TokenAntV1'
import { TokenAntV2 } from '../abi/types/TokenAntV2'
import { useWallet } from '../providers/Wallet'

const POLL_INTERVAL = 3000

export function usePollTokenBalanceOf(
  tokenContract: TokenAntV1 | TokenAntV2 | null
): BigNumber | null {
  const { account } = useWallet()
  const mounted = useMounted()
  const [tokenBalance, setTokenBalance] = useState<BigNumber | null>(null)

  const getBalance = useCallback(
    async (clear) => {
      if (!tokenContract || !account) {
        // Clear any existing balance
        if (mounted()) {
          setTokenBalance(null)
        }
        return
      }

      try {
        const { balance } = await tokenContract.functions.balanceOf(account)

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
