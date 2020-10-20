import { useCallback, useState } from 'react'
import { captureErrorWithSentry } from '../sentry'
import { useInterval } from './useInterval'
import { useMounted } from './useMounted'

const API_BASE = 'https://api.0x.org'
const BUY_TOKEN = 'ANT'
const SELL_TOKEN = 'USDC'
const SELL_AMOUNT = '1000000000000000000'

const POLL_INTERVAL = 60000

export function usePollTokenPriceUsd(symbol: string): string | null {
  const mounted = useMounted()
  const [amountInUsd, setAmountInUsd] = useState<string | null>(null)

  const fetchPrice = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_BASE}/swap/v1/price?sellAmount=${SELL_AMOUNT}&sellToken=${BUY_TOKEN}&buyToken=${SELL_TOKEN}`
      )

      const { price } = (await res.json()) as any

      // Clamp to two decimals
      const formattedAmount = Number(price).toFixed(2)

      if (mounted()) {
        setAmountInUsd(formattedAmount)
      }
    } catch (err) {
      console.error(`Could not fetch ${symbol} USD price`, err)
      captureErrorWithSentry(err)
    }
  }, [mounted, symbol])

  useInterval(fetchPrice, POLL_INTERVAL)

  return amountInUsd
}
