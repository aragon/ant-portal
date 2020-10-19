import { useCallback, useState } from 'react'
import { BigNumber } from 'ethers'
import { captureErrorWithSentry } from '../sentry'
import { useMounted } from './useMounted'
import { useInterval } from './useInterval'
import { useWallet } from '../providers/Wallet'
import { useIncentivePoolContract } from './useContract'
import { MOCK_INCENTIVE_POOL_ACCOUNT } from '../mock'

const POLL_INTERVAL = 3000

export function usePollIncentivePool({
  mockAccount,
}: {
  mockAccount: boolean
}): BigNumber | null {
  const wallet = useWallet()
  const account = mockAccount ? MOCK_INCENTIVE_POOL_ACCOUNT : wallet.account
  const mounted = useMounted()
  const contract = useIncentivePoolContract()
  const [antInPool, setAntInPool] = useState<BigNumber | null>(null)

  const getBalance = useCallback(
    async (clear) => {
      if (!contract || !account) {
        // Clear any residual value
        if (mounted()) {
          setAntInPool(null)
        }
        return
      }

      try {
        const { balanceOf } = contract.functions

        const [{ 0: userBalance }] = await Promise.all([balanceOf(account)])

        const amount = userBalance

        // Avoid unnessesary re-renders by only updating value when it has actually changed
        if (mounted() && (!antInPool || !amount.eq(antInPool))) {
          setAntInPool(amount)
        }
      } catch (err) {
        captureErrorWithSentry(err)
        clear()

        if (mounted()) {
          setAntInPool(null)
        }
      }
    },
    [account, mounted, contract, antInPool]
  )

  useInterval(getBalance, POLL_INTERVAL)

  return antInPool
}
