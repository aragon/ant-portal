import { useMemo } from 'react'
import { Contract as EthersContract, providers as Providers } from 'ethers'
import { useWallet } from '../providers/Wallet'
import { networkEnvironment } from '../environment'
import tokenAbi from '../abi/token.json'

const { endpoints, contracts } = networkEnvironment

const DEFAULT_PROVIDER = new Providers.JsonRpcProvider(endpoints.ethereum)

function useContract(
  address: string,
  abi: string,
  signer = true
): EthersContract | null {
  const { account, ethers } = useWallet()

  return useMemo(() => {
    // Apparently .getSigner() returns a new object every time, so we use the
    // connected account as memo dependency.

    if (!address || !ethers || !account) {
      return null
    }

    return getContract(address, abi, signer ? ethers.getSigner() : ethers)
  }, [abi, account, address, ethers, signer])
}

function getContract(
  address: string,
  abi: string,
  provider:
    | Providers.Web3Provider
    | Providers.JsonRpcSigner
    | Providers.JsonRpcProvider = DEFAULT_PROVIDER
): EthersContract {
  return new EthersContract(address, abi, provider)
}

export function useAntTokenV1Contract(): EthersContract | null {
  const { tokenAntV1 } = contracts

  return useContract(tokenAntV1, tokenAbi as any)
}

export function useAntTokenV2Contract(): EthersContract | null {
  const { tokenAntV2 } = contracts

  return useContract(tokenAntV2, tokenAbi as any)
}
