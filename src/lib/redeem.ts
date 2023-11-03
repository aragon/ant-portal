import { AntV2Redemption } from '../abi/types/AntV2Redemption'
import { TokenAntV2 } from '../abi/types/TokenAntV2'
import { signPermit } from './permit'
import { providers, BigNumber } from 'ethers'
import { getTermsHash } from './terms'

const TOKEN_NAME = 'Aragon Network Token'
const TOKEN_VERSION = '1'
const DEADLINE_MARGIN = 60 * 60 * 24

/**
 * Redeems the current token balance into Ether using permit, if needed
 * @param account The address of the wallet to swap from
 * @param antV2RedeemContract The Swap contract Ethers client
 * @param tokenContract The token contract Ethers client
 * @param signer A connected JsonRpcSigner with a signer
 * @returns The transaction hash of the swap
 */
export async function redeemAntV2(
  account: string,
  antV2RedeemContract: AntV2Redemption,
  tokenContract: TokenAntV2,
  signer: providers.JsonRpcSigner,
  setPermitFailed: React.Dispatch<React.SetStateAction<boolean>>
): Promise<string> {
  if (!account) {
    throw new Error('Invalid account')
  } else if (!antV2RedeemContract.provider || !tokenContract.provider) {
    throw new Error('The contract is not connected to the network')
  } else if (!signer) {
    throw new Error('Invalid signer')
  }

  const tokenBalance = await tokenContract.balanceOf(account)
  if (tokenBalance.eq(0)) return ''

  const termsHash = await getTermsHash()

  // Check token allowance
  const allowance = await tokenContract.allowance(
    account,
    antV2RedeemContract.address
  )

  // We try with permit, if it fails we fall back to approve()
  if (allowance.lt(tokenBalance)) {
    // Permit
    try {
      const nonce = await tokenContract.nonces(account)

      const permitParams = {
        name: TOKEN_NAME,
        chainId: signer.provider.network.chainId,
        version: TOKEN_VERSION,
      }
      const lastBlock = await signer.provider.getBlock('latest')
      const deadline = lastBlock.timestamp + DEADLINE_MARGIN

      const signature = await signPermit(
        signer,
        account,
        tokenContract.address,
        antV2RedeemContract.address, // spender
        tokenBalance,
        deadline,
        nonce,
        permitParams
      )

      const tx = await antV2RedeemContract.permitRedeem(
        termsHash,
        tokenBalance, // amount
        deadline,
        signature.v,
        signature.r,
        signature.s
      )
      const receipt = await tx.wait()
      return receipt.transactionHash
    } catch (err) {
      setPermitFailed(true)
      // Fall back to approve()
    }

    console.warn(
      "Warning: Your mobile app doesn't support typed signatures. Defaulting to approve()"
    )

    // Approve because it failed
    try {
      const tx = await tokenContract.approve(
        antV2RedeemContract.address,
        tokenBalance
      )
      await tx.wait()
    } catch (err) {
      throw new Error('Redeem failed: could not approve the token spending')
    }
  }

  try {
    // Enough allowance
    const tx = await antV2RedeemContract.redeem(termsHash, tokenBalance)
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (err) {
    throw new Error('The redeem process could not be completed')
  }
}

export function redemptionEthBalance(
  antV2RedeemContract: AntV2Redemption
): Promise<BigNumber> {
  return antV2RedeemContract.provider.getBalance(antV2RedeemContract.address)
}

export function redeemableEth(
  tokenHolderAddress: string,
  antV2RedeemContract: AntV2Redemption,
  tokenContract: TokenAntV2
): Promise<BigNumber> {
  return Promise.all([
    tokenContract.balanceOf(tokenHolderAddress),
    antV2RedeemContract.tokenToEthRate(),
    antV2RedeemContract.tokenAmountBase(),
  ]).then(([tokenAmount, tokenToEthRate, tokenAmountBase]) => {
    // (tokenAmount * tokenToEthRate) / tokenAmountBase
    return tokenAmount.mul(tokenToEthRate).div(tokenAmountBase)
  })
}
