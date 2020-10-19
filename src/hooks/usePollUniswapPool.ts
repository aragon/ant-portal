import { useCallback, useState } from 'react'
import { BigNumber } from 'ethers'
import { captureErrorWithSentry } from '../sentry'
import { useMounted } from './useMounted'
import { useInterval } from './useInterval'
import { useWallet } from '../providers/Wallet'
import { useAntEthUniswapPool } from './useContract'
import { MOCK_UNISWAP_POOL_ACCOUNT } from '../mock'

const POLL_INTERVAL = 3000

export function usePollUniswapPool({
  mockAccount,
}: {
  mockAccount: boolean
}): BigNumber | null {
  const wallet = useWallet()
  const account = mockAccount ? MOCK_UNISWAP_POOL_ACCOUNT : wallet.account
  const mounted = useMounted()
  const contract = useAntEthUniswapPool()
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
        const { balanceOf, totalSupply, getReserves } = contract.functions

        const [
          { 0: balance },
          { 0: supply },
          { 0: antReserve },
        ] = await Promise.all([
          balanceOf(account),
          totalSupply(),
          getReserves(),
        ])

        const amount = balance.mul(antReserve).div(supply)

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
