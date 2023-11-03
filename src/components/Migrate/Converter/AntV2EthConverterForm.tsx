import React, { useMemo, useCallback, useState } from 'react'
import { css } from 'styled-components'
import {
  useLayout,
  GU,
  IconConnect,
  // @ts-ignore
} from '@aragon/ui'
import TokenAmount from 'token-amount'
import { fontWeight } from '../../../style/font'
import { useAccountBalances } from '../../../providers/AccountBalances'
import { radius } from '../../../style/radius'
import AntV2EthConversionRate from './AntV2EthConversionRate'
import PageHeading from '../../PageHeading/PageHeading'
import useRedeemableEth from '../../../hooks/useRedeemableEth'
import BrandButton from '../../BrandButton/BrandButton'
import { useHistory } from 'react-router-dom'
import AntV2EthModal from '../../Modals/AntV2EthModal'
import { ErrorType, RedeemStep } from '../../Modals/types'
import { useAccountModule } from '../../Account/AccountModuleProvider'
import { theme as localTheme } from '../../../style/theme'

const multiColumnLayout = css`
  grid-template-columns: 55% auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    'title rate'
    'inputs rate';
`

const stackedLayout = css`
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'title'
    'rate'
    'inputs';
`

function AntV2EthConverterForm(): JSX.Element {
  const { layoutName } = useLayout()
  const { antV2 } = useAccountBalances()
  const unclaimedFunds = useRedeemableEth()
  const { showAccount } = useAccountModule()

  const compactMode = layoutName === 'small' || layoutName === 'medium'
  const tokenSymbol = 'ANTv2'

  const formattedBalance = useMemo(
    (): string | null =>
      antV2.balance &&
      new TokenAmount(antV2.balance, antV2.decimals).format({
        digits: antV2.decimals,
      }),
    [antV2.balance, antV2.decimals]
  )

  const history = useHistory()
  const handleNavigateHome = useCallback(() => {
    history.push('/')
  }, [history])

  const [redeemStep, setRedeemStep] = useState<RedeemStep>(RedeemStep.Ready)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [errorType, setErrorType] = useState<ErrorType>(null)
  const onClose = () => {
    setModalVisible(false)
    setErrorType(null)
  }

  return (
    <>
      <AntV2EthModal
        visible={modalVisible}
        onClose={onClose}
        redeemStep={redeemStep}
        setRedeemStep={setRedeemStep}
        errorType={errorType}
        setErrorType={setErrorType}
      />
      <PageHeading
        title="ANT Portal"
        description={'Redeem your ANT tokens for ETH'}
        css={`
          margin-bottom: ${7 * GU}px;
        `}
      />
      <div
        css={`
          padding: ${compactMode ? 4 * GU : 6 * GU}px;
          background-color: ${localTheme.whiteCard};
          border-radius: ${radius.high};
          display: grid;
          grid-gap: ${compactMode ? 3 * GU : 4 * GU}px;
          ${compactMode ? stackedLayout : multiColumnLayout}
        `}
      >
        <div
          css={`
            grid-area: title;
            text-align: ${compactMode ? 'center' : 'left'};
          `}
        >
          <h2
            css={`
              line-height: 1;
              font-weight: ${fontWeight.medium};
              font-size: 32px;
              margin-bottom: ${1.5 * GU}px;
            `}
          >
            {'Redeem'} {tokenSymbol}
          </h2>
          <div
            css={`
              color: ${localTheme.secondary};
            `}
          >
            {formattedBalance ? (
              <div>
                <div
                  css={`
                    margin-top: ${compactMode ? 6 * GU : 12 * GU}px;
                    font-size: 18px;
                  `}
                >
                  You will redeem:{' '}
                  <span
                    css={`
                      word-break: break-all;
                      font-weight: ${fontWeight.medium};
                    `}
                  >
                    {formattedBalance}
                  </span>{' '}
                  {tokenSymbol}
                </div>
                <div
                  css={`
                    margin-top: ${1 * GU}px;
                    font-size: 18px;
                  `}
                >
                  You will receive:{' '}
                  <span
                    css={`
                      word-break: break-all;
                      font-weight: ${fontWeight.medium};
                    `}
                  >
                    {unclaimedFunds}
                  </span>{' '}
                  ETH
                </div>
              </div>
            ) : (
              <div
                css={`
                  margin-top: ${compactMode ? 6 * GU : 14 * GU}px;
                  margin-bottom: ${!compactMode && 2.375 * GU}px;
                  font-size: 18px;
                `}
              >
                Connect your wallet to continue
              </div>
            )}
          </div>
        </div>
        <div
          css={`
            display: flex;
            align-items: center;
            justify-content: center;
            grid-area: rate;
            padding: ${2 * GU}px;
          `}
        >
          <AntV2EthConversionRate
            tokenSymbol={tokenSymbol}
            compactMode={compactMode}
          />
        </div>
        <div
          css={`
            grid-area: inputs;
          `}
        >
          <div
            css={`
              margin-top: ${compactMode ? 2 * GU : 8 * GU}px;
              display: flex;
              flex-wrap: wrap;
              row-gap: ${2 * GU}px;
              column-gap: ${5 * GU}px;
              justify-content: ${compactMode ? 'center' : 'flex-start'};
            `}
          >
            <BrandButton wide onClick={handleNavigateHome}>
              Back
            </BrandButton>
            {formattedBalance ? (
              <BrandButton
                mode="strong"
                wide
                disabled={formattedBalance === '0'}
                onClick={() => {
                  setModalVisible(true)
                  setRedeemStep(RedeemStep.CheckFunds)
                }}
              >
                Continue
              </BrandButton>
            ) : (
              <BrandButton
                wide
                mode="strong"
                icon={<IconConnect />}
                label="Connect wallet"
                onClick={showAccount}
                display="all"
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AntV2EthConverterForm
