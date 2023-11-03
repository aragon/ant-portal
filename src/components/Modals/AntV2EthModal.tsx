// BrandModal.tsx
import React, { useCallback, useEffect, useState } from 'react'
import BrandModal from '../BrandModal/BrandModal'
import TOS from './TOS'
import Loading from './Loading'
import Success from './Success'
import Error from './Error'
import {
  GU,
  textStyle,
  // @ts-ignore
} from '@aragon/ui'
import { fontWeight } from '../../style/font'
import { useWallet } from '../../providers/Wallet'
import {
  useAntTokenV2Contract,
  useAntV2RedemptionContract,
  useBlockListContract,
} from '../../hooks/useContract'
import { validateOfac } from '../../lib/ofac'
import { redeemAntV2 } from '../../lib/redeem'
import useRedemptionEthBalance from '../../hooks/useRedemptionEthBalance'
import useRedeemableEth from '../../hooks/useRedeemableEth'
import { RedeemStep, ErrorType } from './types'

type AntV2EthModalProps = {
  visible: boolean
  onClose: () => void
  redeemStep: RedeemStep
  setRedeemStep: (redeemStep: RedeemStep) => void
  errorType: ErrorType
  setErrorType: (errorType: ErrorType) => void
}

const AntV2EthModal: React.FC<AntV2EthModalProps> = ({
  visible,
  onClose,
  redeemStep,
  setRedeemStep,
  errorType,
  setErrorType,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [permitFailed, setPermitFailed] = useState<boolean>(false)

  const { account, ethers } = useWallet()
  const blockListContract = useBlockListContract()
  const antV2RedeemContract = useAntV2RedemptionContract()
  const antV2TokenContract = useAntTokenV2Contract()
  const antV2RedeemContractBalance = useRedemptionEthBalance()
  const unclaimedFunds = useRedeemableEth()

  const DEFAULT_ERROR_MSG = 'The redeem process could not be completed'

  const OfacCheck = useCallback(() => {
    if (!account) return
    else if (!blockListContract) return

    validateOfac(account, blockListContract)
      .then(() => {
        setRedeemStep(RedeemStep.RedeemTx)
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setErrorType('ofac')
        setRedeemStep(RedeemStep.Error)
      })
  }, [account, blockListContract, setErrorMessage, setErrorType, setRedeemStep])

  const RedeemTx = useCallback(() => {
    if (!account) return
    else if (!antV2RedeemContract) return
    else if (!antV2TokenContract) return
    else if (!ethers) return

    redeemAntV2(
      account,
      antV2RedeemContract,
      antV2TokenContract,
      ethers.getSigner(),
      setPermitFailed
    )
      .then((txHash) => {
        setSuccessMessage(txHash)
        setRedeemStep(RedeemStep.Success)
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setErrorType('redeem')
        setRedeemStep(RedeemStep.Error)
      })
  }, [
    account,
    antV2RedeemContract,
    antV2TokenContract,
    ethers,
    setErrorMessage,
    setErrorType,
    setRedeemStep,
    setSuccessMessage,
  ])

  useEffect(() => {
    if (permitFailed) {
      setErrorMessage('Signing with permit failed, requesting approve instead')
      setErrorType('permitFail')
    }
  }, [permitFailed, setErrorMessage, setErrorType, setRedeemStep])

  const AcceptTerms = useCallback(() => {
    setRedeemStep(RedeemStep.OfacCheck)
  }, [setRedeemStep])

  const checkFunds = useCallback(() => {
    if (unclaimedFunds === null) return
    else if (antV2RedeemContractBalance === null) return

    if (Number(unclaimedFunds) === 0) {
      setErrorMessage('Redeem failed: No funds available to redeem.')
      setErrorType('funds')
      setRedeemStep(RedeemStep.Error)
    } else if (Number(unclaimedFunds) > antV2RedeemContractBalance) {
      setErrorMessage(
        'Redeem failed: Not enough funds available in the contract.'
      )
      setRedeemStep(RedeemStep.Error)
    } else {
      setRedeemStep(RedeemStep.AcceptTerms)
    }
  }, [
    unclaimedFunds,
    antV2RedeemContractBalance,
    setErrorMessage,
    setErrorType,
    setRedeemStep,
  ])

  useEffect(() => {
    switch (redeemStep) {
      case RedeemStep.CheckFunds:
        checkFunds()
        break
      case RedeemStep.OfacCheck:
        OfacCheck()
        break
      case RedeemStep.RedeemTx:
        RedeemTx()
        break
    }
  }, [redeemStep, checkFunds, OfacCheck, RedeemTx])

  const titles: Record<RedeemStep, string> = {
    [RedeemStep.Ready]: '',
    [RedeemStep.CheckFunds]: 'Please wait...',
    [RedeemStep.AcceptTerms]: 'Terms and Conditions',
    [RedeemStep.OfacCheck]: 'Please wait...',
    [RedeemStep.RedeemTx]: 'Transaction Loading...',
    [RedeemStep.Success]: 'Success',
    [RedeemStep.Error]: 'Error',
  }

  const components: Record<RedeemStep, JSX.Element> = {
    [RedeemStep.Ready]: <></>,
    [RedeemStep.CheckFunds]: (
      <Loading message={errorMessage} errorType={errorType} />
    ),
    [RedeemStep.AcceptTerms]: <TOS onClose={onClose} onAccept={AcceptTerms} />,
    [RedeemStep.OfacCheck]: (
      <Loading message={errorMessage} errorType={errorType} />
    ),
    [RedeemStep.RedeemTx]: (
      <Loading message={errorMessage} errorType={errorType} />
    ),
    [RedeemStep.Success]: (
      <Success onClose={onClose} message={successMessage} />
    ),
    [RedeemStep.Error]: (
      <Error
        onClose={onClose}
        message={errorMessage ?? DEFAULT_ERROR_MSG}
        errorType={errorType}
      />
    ),
  }

  return (
    <BrandModal visible={visible} onClose={onClose} width={700}>
      <h1
        css={`
          display: flex;
          flex-grow: 0;
          flex-shrink: 0;
          align-items: center;
          margin-bottom: ${3 * GU}px;

          ${textStyle('body2')};
          font-weight: ${fontWeight.medium};
          line-height: 1;
        `}
      >
        {titles[redeemStep]}
      </h1>
      {components[redeemStep]}
    </BrandModal>
  )
}

export default AntV2EthModal
