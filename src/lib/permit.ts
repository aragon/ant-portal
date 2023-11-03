// Adapted from https://github.com/SamuraiT/ethers-js-permit
import { BigNumberish, Signature } from 'ethers'
import { splitSignature } from 'ethers/lib/utils'
import {
  TypedDataDomain,
  TypedDataField,
  TypedDataSigner,
} from '@ethersproject/abstract-signer'

export type PermitParams = {
  name: string
  chainId: number
  version: string
}

const PERMIT_TYPES: Record<string, TypedDataField[]> = {
  Permit: [
    {
      name: 'owner',
      type: 'address',
    },
    {
      name: 'spender',
      type: 'address',
    },
    {
      name: 'value',
      type: 'uint256',
    },
    {
      name: 'nonce',
      type: 'uint256',
    },
    {
      name: 'deadline',
      type: 'uint256',
    },
  ],
}

export function signPermit(
  signer: TypedDataSigner,
  ownerAddress: string,
  tokenAddress: string,
  spenderAddress: string,
  value: BigNumberish,
  /** Block timestamp into the future */
  deadline: BigNumberish,
  nonce: BigNumberish,
  permitParams: PermitParams
): Promise<Signature> {
  const { name, version, chainId } = permitParams

  const domain: TypedDataDomain = {
    name,
    version,
    chainId,
    verifyingContract: tokenAddress,
  }
  const values: Record<string, any> = {
    owner: ownerAddress,
    spender: spenderAddress,
    value,
    nonce,
    deadline,
  }

  return signer
    ._signTypedData(domain, PERMIT_TYPES, values)
    .then((signature) => splitSignature(signature))
}
