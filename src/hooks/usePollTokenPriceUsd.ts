import { useCallback, useState } from 'react'
import { captureErrorWithSentry } from '../sentry'
import { useInterval } from './useInterval'
import { useMounted } from './useMounted'

const API_BASE = 'https://api.0x.org'
const BUY_TOKEN = 'USDC'
const SELL_TOKEN = 'ANT'
const SELL_AMOUNT = '1000000000000000000'

const POLL_INTERVAL = 60000

export function usePollTokenPriceUsd(): string | null {
  const mounted = useMounted()
  const [amountInUsd, setAmountInUsd] = useState<string | null>(null)

  const fetchPrice = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_BASE}/swap/v1/price?sellAmount=${SELL_AMOUNT}&sellToken=${SELL_TOKEN}&buyToken=${BUY_TOKEN}`
      )

      const { price } = (await res.json()) as any

      // Clamp to two decimals
      const formattedAmount = Number(price).toFixed(2)

      if (mounted()) {
        setAmountInUsd(formattedAmount)
      }
    } catch (err) {
      console.error(`Could not fetch ANT USD price`, err)
      captureErrorWithSentry(err)
    }
  }, [mounted])

  useInterval(fetchPrice, POLL_INTERVAL)

  return amountInUsd
}
