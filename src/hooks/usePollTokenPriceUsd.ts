import { useCallback, useState } from 'react'
import { captureErrorWithSentry } from '../sentry'
import { round } from '../utils/math-utils'
import { useInterval } from './useInterval'
import { useMounted } from './useMounted'

const API_BASE = 'https://api.0x.org'
const SELL_TOKEN = 'USDC'

const POLL_INTERVAL = 60000

type Prices = { records: Record<string, string>[] }

export function usePollTokenPriceUsd(symbol: string): string | null {
  const mounted = useMounted()
  const [amountInUsd, setAmountInUsd] = useState<string | null>(null)

  const fetchPrice = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_BASE}/swap/v0/prices?sellToken=${SELL_TOKEN}`
      )

      const prices = (await res.json()) as Prices

      if (!prices?.records?.length) {
        return
      }

      const priceRecord = prices.records.find(
        (price) => price.symbol === symbol
      )

      if (!priceRecord) {
        return
      }

      // Add trailing zeros to stored amount
      const formattedAmount = Number(round(priceRecord.price, 2)).toFixed(2)

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
