import React from 'react'
import {
  useTheme,
  GU,
  useLayout,
  // @ts-ignore
} from '@aragon/ui'
import { useHistory } from 'react-router-dom'
import TokenGraphic from '../TokenGraphic/TokenGraphic'
import BrandButton from '../BrandButton/BrandButton'
import { BalanceItem } from './BalanceCard'
import { radius } from '../../style/radius'
import { fontWeight } from '../../style/font'
import { TokenName } from '../../token-info/types'
import { tokenInfo } from '../../token-info/tokenInfo'
import rightArrowPng from '../../assets/right-arrow.png'
import LockIcon from '../icons/LockIcon'
import { REDEEM_ANTV2_PATH } from '../../Routes'
import useAntV2ToEthRate from '../../hooks/useAntV2ToEthRate'
import { theme as localTheme } from '../../style/theme'

type AntV2EthConversionCardProps = {
  balance: string | null
  accountConnected: boolean
  available?: boolean
}

function AntV2EthConversionCard({
  balance: antBalance,
  accountConnected,
  available = true,
}: AntV2EthConversionCardProps): JSX.Element {
  const tokenName: TokenName = 'antV2'

  const theme = useTheme()
  const history = useHistory()
  const { layoutName } = useLayout()
  const antV2ToEthRate = useAntV2ToEthRate()

  const compactMode = layoutName === 'small'
  const tabletMobileMode = layoutName === 'small' || layoutName === 'medium'

  const tokenTitle = tokenInfo[tokenName].suffix

  return (
    <div
      css={`
        background-color: ${localTheme.whiteCard};
        border-radius: ${radius.high};
        padding: ${3 * GU}px;

        max-width: ${90 * GU}px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
      `}
    >
      <div
        css={`
          height: ${!available ? `100%` : ``};
          display: flex;
          justify-content: space-between;
          padding-bottom: ${available ? `${4 * GU}px;` : ``};
          margin-bottom: ${available ? `${4.5 * GU}px;` : ``};
          border-bottom: ${available ? `1px solid ${theme.border}` : ``};
        `}
      >
        <div
          css={`
            height: ${!available ? `100%` : ``};
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: center;
            flex-direction: column;
          `}
        >
          <div
            css={`
              display: flex;
              justify-content: space-between;
              width: 100%;
              padding-bottom: ${4 * GU}px;
            `}
          >
            <div
              css={`
                font-weight: bold;
                font-size: 1.2em;
              `}
            >
              For ANTv2 Holders
            </div>
            <div
              css={`
                display: flex;
                align-items: center;
              `}
            >
              ETH/ANTv2: {antV2ToEthRate}
            </div>
          </div>
          <div
            css={`
              display: flex;
              align-items: center;
            `}
          >
            <TokenGraphic
              shadow
              tokenName={tokenName}
              size={compactMode ? 75 : 100}
              css={`
                flex-shrink: 0;
              `}
            />
            <img
              css={`
                height: 20px;
                margin-left: ${1 * GU}px;
                margin-right: ${1 * GU}px;
              `}
              src={rightArrowPng}
              alt=""
            />
            <TokenGraphic
              shadow
              tokenName={'eth'}
              size={compactMode ? 75 : 100}
              css={`
                flex-shrink: 0;
              `}
            />
          </div>
          <div
            css={`
              flex: 1;
              text-align: center;
            `}
          >
            <p
              css={`
                font-weight: ${fontWeight.medium};
                font-size: 22px;
                color: ${localTheme.secondary};
                padding-top: ${2 * GU}px;
              `}
            >
              Convert
            </p>
            <h3
              css={`
                font-size: ${compactMode ? 24 : 28}px;
                font-weight: ${fontWeight.medium};
                line-height: 1.3;
                margin-bottom: ${1 * GU}px;
              `}
            >
              {tokenTitle} to ETH
            </h3>
          </div>
          {available ? (
            <div
              css={`
                padding-top: ${2 * GU}px;
              `}
            >
              <BrandButton
                mode="strong"
                size="large"
                wide
                disabled={!antBalance || antBalance === '0'}
                onClick={() => {
                  history.push(REDEEM_ANTV2_PATH)
                }}
                label="Start now"
              />
            </div>
          ) : (
            <div
              css={`
                padding-top: ${2 * GU}px;
                width: 100%;
                height: 100%;
              `}
            >
              <BrandButton
                icon={<LockIcon />}
                mode="strong"
                size="large"
                wide
                disabled={true}
                label="Coming soon"
                css={`
                  width: 100%;
                  height: ${14.75 * GU}px;
                `}
              />
            </div>
          )}
        </div>
      </div>
      {available && (
        <div
          css={`
            font-size: 18px;
            line-height: 1;
          `}
        >
          {accountConnected ? (
            <ul
              css={`
                ${!tabletMobileMode &&
                `& > * {
                    max-width: 400px;
                    margin-left: auto;
                    margin-bottom: ${1.5 * GU}px;
                  }`}
              `}
            >
              <BalanceItem
                title={
                  <span>
                    Redeemable{' '}
                    <span
                      css={`
                        font-weight: bold;
                      `}
                    >
                      {tokenTitle}
                    </span>{' '}
                    balance
                  </span>
                }
                amount={antBalance}
                compactMode={compactMode}
                tokenName={tokenName}
              />
            </ul>
          ) : (
            <p
              css={`
                color: ${localTheme.secondary};
              `}
            >
              Enable account to see your balance
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default AntV2EthConversionCard
