import { useState, useEffect } from 'react'
import { utils, BigNumber } from 'ethers'
import { useAntV2RedemptionContract } from './useContract'

const useAntV2ToEthRate = (): string | null => {
  const [antV2ToEthRate, setAntV2ToEthRate] = useState<string | null>(null)
  const antV2RedeemContract = useAntV2RedemptionContract()

  useEffect(() => {
    const fetchAntV2ToEthRate = async () => {
      if (antV2RedeemContract === null) return

      try {
        const rate: BigNumber = await antV2RedeemContract.tokenToEthRate()
        const formattedRate = utils.formatUnits(rate, 18)
        setAntV2ToEthRate(formattedRate)
      } catch (error) {
        console.error('Failed to fetch antV2ToEthRate', error)
      }
    }

    fetchAntV2ToEthRate()
  }, [antV2RedeemContract])

  return antV2ToEthRate
}

export default useAntV2ToEthRate
