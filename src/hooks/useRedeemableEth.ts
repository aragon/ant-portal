import { useState, useEffect, useMemo } from 'react'
import { utils } from 'ethers'
import { redeemableEth } from '../lib/redeem'
import {
  useAntTokenV2Contract,
  useAntV2RedemptionContract,
} from './useContract'
import { useWallet } from '../providers/Wallet'
import { useAccountBalances } from '../providers/AccountBalances'
import TokenAmount from 'token-amount'

const useRedeemableEth = (): string | null => {
  const [unclaimedFunds, setUnclaimedFunds] = useState<string | null>(null)
  const antV2RedeemContract = useAntV2RedemptionContract()
  const antV2TokenContract = useAntTokenV2Contract()
  const { account } = useWallet()
  const { antV2 } = useAccountBalances()

  const antBalance = useMemo(
    (): string | null =>
      antV2.balance &&
      new TokenAmount(antV2.balance, antV2.decimals).format({
        digits: 2,
      }),
    [antV2.balance, antV2.decimals]
  )

  useEffect(() => {
    const fetchUnclaimedFunds = () => {
      if (account === null) return
      else if (antV2RedeemContract === null || antV2TokenContract === null)
        return

      redeemableEth(account, antV2RedeemContract, antV2TokenContract)
        .then((value) => {
          const formattedValue = utils.formatUnits(value, 18)
          setUnclaimedFunds(formattedValue)
        })
        .catch((error) => {
          console.error('Failed to fetch redeemableEth', error)
        })
    }

    fetchUnclaimedFunds()
  }, [account, antBalance, antV2RedeemContract, antV2TokenContract])

  return unclaimedFunds
}

export default useRedeemableEth
