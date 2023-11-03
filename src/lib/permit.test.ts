// Adapted from https://github.com/SamuraiT/ethers-js-permit
import { BigNumber, Wallet } from 'ethers'
import { signPermit } from './permit'

describe('Sign permit payload', () => {
  const seedPhrase =
    'village dignity insect mass potato match track organ electric auction where private'

  const wallet = Wallet.fromMnemonic(seedPhrase)
  const tokenAddress = '0x29C087132Ae893DFACDacc9De9CBD7777C45B202'
  const spenderAddress = '0x4bf5c8a103B4e6782FA84769A378a708B76893BB'

  const permitParams = {
    name: 'TokenNAME',
    chainId: 31337,
    version: '1',
  }
  const nonce = 0

  it('Should produce a valid signature', async () => {
    const signature = await signPermit(
      wallet,
      wallet.address,
      tokenAddress,
      spenderAddress,
      BigNumber.from('100'),
      60 * 60 * 24,
      nonce,
      permitParams
    )

    expect(signature.r).toEqual(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf'
    )
    expect(signature.s).toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature._vs).toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.recoveryParam).toEqual(0)
    expect(signature.v).toEqual(27)
    expect(signature.yParityAndS).toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.compact).toEqual(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
  })

  it('Should produce a different signature (different contract)', async () => {
    const signature = await signPermit(
      wallet,
      wallet.address,
      '0x0000000000000000000000000000000000000000',
      spenderAddress,
      BigNumber.from('100'),
      60 * 60 * 24,
      nonce,
      permitParams
    )

    expect(signature.r).not.toBe(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf'
    )
    expect(signature.s).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature._vs).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.yParityAndS).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.compact).not.toEqual(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
  })

  it('Should produce a different signature (different spender)', async () => {
    const signature = await signPermit(
      wallet,
      wallet.address,
      tokenAddress,
      '0x0000000000000000000000000000000000000000',
      BigNumber.from('100'),
      60 * 60 * 24,
      nonce,
      permitParams
    )

    expect(signature.r).not.toBe(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf'
    )
    expect(signature.s).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature._vs).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.yParityAndS).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.compact).not.toEqual(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
  })

  it('Should produce a different signature (different value)', async () => {
    const signature = await signPermit(
      wallet,
      wallet.address,
      tokenAddress,
      spenderAddress,
      BigNumber.from('10000000'),
      60 * 60 * 24,
      nonce,
      permitParams
    )

    expect(signature.r).not.toBe(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf'
    )
    expect(signature.s).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature._vs).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.yParityAndS).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.compact).not.toEqual(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
  })

  it('Should produce a different signature (different deadline)', async () => {
    const signature = await signPermit(
      wallet,
      wallet.address,
      tokenAddress,
      spenderAddress,
      BigNumber.from('100'),
      60 * 60 * 24 * 1000,
      nonce,
      permitParams
    )

    expect(signature.r).not.toBe(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf'
    )
    expect(signature.s).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature._vs).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.yParityAndS).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.compact).not.toEqual(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
  })

  it('Should produce a different signature (different nonce)', async () => {
    const signature = await signPermit(
      wallet,
      wallet.address,
      tokenAddress,
      spenderAddress,
      BigNumber.from('100'),
      60 * 60 * 24,
      100,
      permitParams
    )

    expect(signature.r).not.toBe(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf'
    )
    expect(signature.s).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature._vs).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.yParityAndS).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.compact).not.toEqual(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
  })
  it('Should produce a different signature (different domain)', async () => {
    const myPermitParams = {
      nonce: 10,
      name: 'Different name',
      chainId: 1234,
      version: '2',
    }

    const signature = await signPermit(
      wallet,
      wallet.address,
      tokenAddress,
      spenderAddress,
      BigNumber.from('100'),
      60 * 60 * 24,
      nonce,
      myPermitParams
    )

    expect(signature.r).not.toBe(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf'
    )
    expect(signature.s).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature._vs).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.yParityAndS).not.toEqual(
      '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
    expect(signature.compact).not.toEqual(
      '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
    )
  })
})
