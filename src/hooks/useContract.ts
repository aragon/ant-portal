import { useMemo } from 'react'
import {
  Contract as EthersContract,
  providers as Providers,
  Signer,
} from 'ethers'
import { Provider } from '@ethersproject/providers'
import { useWallet } from '../providers/Wallet'
import { networkEnvironment } from '../environment'
import tokenAntV1Abi from '../abi/token-ant-v1.json'
import tokenAntV2Abi from '../abi/token-ant-v1.json'
import { TokenAntV1 } from '../abi/types/TokenAntV1'
import { TokenAntV2 } from '../abi/types/TokenAntV2'

const { endpoints, contracts } = networkEnvironment

const DEFAULT_PROVIDER = new Providers.JsonRpcProvider(endpoints.ethereum)

type ExtendedContract<T> = T & EthersContract

function getContract<T>(
  address: string,
  abi: string,
  provider: Signer | Provider = DEFAULT_PROVIDER
): T {
  return new EthersContract(address, abi, provider) as ExtendedContract<T>
}

function useContract<T>(
  address: string,
  abi: string,
  signer = true
): ExtendedContract<T> | null {
  const { account, ethers } = useWallet()

  return useMemo(() => {
    // Apparently .getSigner() returns a new object every time, so we use the
    // connected account as memo dependency.
    if (!address || !ethers || !account) {
      return null
    }

    return getContract(address, abi, signer ? ethers.getSigner() : ethers)
  }, [abi, account, address, ethers, signer]) as ExtendedContract<T> | null
}

export function useAntTokenV1Contract(): TokenAntV1 | null {
  const { tokenAntV1 } = contracts

  return useContract<TokenAntV1>(tokenAntV1, tokenAntV1Abi as any)
}

export function useAntTokenV2Contract(): TokenAntV2 | null {
  const { tokenAntV2 } = contracts

  return useContract<TokenAntV2>(tokenAntV2, tokenAntV2Abi as any)
}
