import { useCallback, useState } from 'react'
// import { getNetworkConfig } from '../environment/networks'
import { captureErrorWithSentry } from '../sentry'
import { useInterval } from './useInterval'
import { useMounted } from './useMounted'

const POLL_INTERVAL = 1000 * 60 * 10

export function usePollTokenPriceUsd(): string | null {
  const mounted = useMounted()
  const [amountInUsd, setAmountInUsd] = useState<string | null>(null)

  const fetchPrice = useCallback(async () => {
    try {
      const price = await fetchLiveCoinWatch()

      if (mounted()) {
        setAmountInUsd(price)
      }
    } catch (err: any) {
      console.error(`Could not fetch ANT USD price`, err)
      captureErrorWithSentry(err)
    }
  }, [mounted])

  useInterval(fetchPrice, POLL_INTERVAL)

  return amountInUsd
}

function fetchLiveCoinWatch(): Promise<string> {
  return fetch(
    'https://http-api.livecoinwatch.com/coins/ANT/about?currency=USD'
  )
    .then((res) => res.json())
    .then((res) => res.real.price.toFixed(2))
}

/*
function fetch0x(): Promise<string> {
  const API_BASE = 'https://api.0x.org'
  const BUY_TOKEN = 'USDC'
  const SELL_TOKEN = getNetworkConfig('ethereum').contracts.tokenAntV2
  const SELL_AMOUNT = '1000000000000000000'

  return fetch(
    `${API_BASE}/swap/v1/price?sellAmount=${SELL_AMOUNT}&sellToken=${SELL_TOKEN}&buyToken=${BUY_TOKEN}`
  )
    .then((res) => res.json())
    .then((res) => res.price)
}
*/
