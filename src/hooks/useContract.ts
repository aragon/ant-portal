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
import migratorAbi from '../abi/migrator.json'
import uniswapPoolAbi from '../abi/uniswap-pool.json'
import incentivePoolAbi from '../abi/incentive-pool.json'
import balancerPoolAbi from '../abi/balancer-pool.json'
import { TokenAntV1 } from '../abi/types/TokenAntV1'
import { TokenAntV2 } from '../abi/types/TokenAntV2'
import { Migrator } from '../abi/types/Migrator'
import { UniswapPool } from '../abi/types/UniswapPool'
import { IncentivePool } from '../abi/types/IncentivePool'
import { BalancerPool } from '../abi/types/BalancerPool'

const { endpoints, contracts } = networkEnvironment

const DEFAULT_PROVIDER = new Providers.JsonRpcProvider(endpoints.ethereum)

type UseContractProps = {
  address?: string
  abi: string
  signer?: boolean
}

type ExtendedContract<T> = T & EthersContract

function getContract<T>(
  address: string,
  abi: string,
  provider: Signer | Provider = DEFAULT_PROVIDER
): T {
  return new EthersContract(address, abi, provider) as ExtendedContract<T>
}

function useContract<T>({
  address,
  abi,
  signer = true,
}: UseContractProps): ExtendedContract<T> | null {
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

export function useMigratorContract(): Migrator | null {
  const { migrator } = contracts

  return useContract<Migrator>({ address: migrator, abi: migratorAbi as any })
}

export function useAntTokenV1Contract(): TokenAntV1 | null {
  const { tokenAntV1 } = contracts

  return useContract<TokenAntV1>({
    address: tokenAntV1,
    abi: tokenAntV1Abi as any,
  })
}

export function useAntTokenV2Contract(): TokenAntV2 | null {
  const { tokenAntV2 } = contracts

  return useContract<TokenAntV2>({
    address: tokenAntV2,
    abi: tokenAntV2Abi as any,
  })
}

export function useUniswapPoolContract(): UniswapPool | null {
  const { antEthUniswapPool } = contracts

  return useContract<UniswapPool>({
    address: antEthUniswapPool,
    abi: uniswapPoolAbi as any,
  })
}

export function useIncentivePoolContract(): IncentivePool | null {
  const { antUniIncentivePool } = contracts

  return useContract<IncentivePool>({
    address: antUniIncentivePool,
    abi: incentivePoolAbi as any,
  })
}

export function useBalancerPoolContract(): BalancerPool | null {
  const { antEthBalancerPool } = contracts

  return useContract<BalancerPool>({
    address: antEthBalancerPool,
    abi: balancerPoolAbi as any,
  })
}
