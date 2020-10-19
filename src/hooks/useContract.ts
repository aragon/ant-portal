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
import antEthUniswapPoolAbi from '../abi/ant-eth-uniswap-pool.json'
import antUniIncentivePoolAbi from '../abi/ant-uni-incentive-pool.json'
import antEthBalancerPoolAbi from '../abi/ant-eth-balancer-pool.json'
import { TokenAntV1 } from '../abi/types/TokenAntV1'
import { TokenAntV2 } from '../abi/types/TokenAntV2'
import { Migrator } from '../abi/types/Migrator'
import { AntEthUniswapPool } from '../abi/types/AntEthUniswapPool'
import { AntUniIncentivePool } from '../abi/types/AntUniIncentivePool'
import { AntEthBalancerPool } from '../abi/types/AntEthBalancerPool'

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

export function useAntEthUniswapPool(): AntEthUniswapPool | null {
  const { antEthUniswapPool } = contracts

  return useContract<AntEthUniswapPool>({
    address: antEthUniswapPool,
    abi: antEthUniswapPoolAbi as any,
  })
}

export function useAntUniIncentivePool(): AntUniIncentivePool | null {
  const { antUniIncentivePool } = contracts

  return useContract<AntUniIncentivePool>({
    address: antUniIncentivePool,
    abi: antUniIncentivePoolAbi as any,
  })
}

export function useAntEthBalancerPool(): AntEthBalancerPool | null {
  const { antEthBalancerPool } = contracts

  return useContract<AntEthBalancerPool>({
    address: antEthBalancerPool,
    abi: antEthBalancerPoolAbi as any,
  })
}
