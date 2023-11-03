import { useEffect, useState } from 'react'
import { utils } from 'ethers'
import { useWallet } from '../providers/Wallet'
import { useAntV2RedemptionContract } from './useContract'
import { redemptionEthBalance } from '../lib/redeem'

function useRedemptionEthBalance(): number | null {
  const [contractBalance, setContractBalance] = useState<number | null>(null)
  const antV2RedeemContract = useAntV2RedemptionContract()
  const { account } = useWallet()

  useEffect(() => {
    const fetchContractBalance = async () => {
      if (account === null) return
      else if (antV2RedeemContract === null) return

      try {
        const value = await redemptionEthBalance(antV2RedeemContract)
        const formattedValue = utils.formatUnits(value, 18)
        setContractBalance(Number(formattedValue))
      } catch (error) {
        console.error('Failed to fetch redemptionEthBalance', error)
      }
    }

    fetchContractBalance()
  }, [account, antV2RedeemContract])

  return contractBalance
}

export default useRedemptionEthBalance
