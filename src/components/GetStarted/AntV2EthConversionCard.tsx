import React from 'react'
import {
  useTheme,
  GU,
  useLayout,
  // @ts-ignore
} from '@aragon/ui'
import TokenGraphic from '../TokenGraphic/TokenGraphic'
import { radius } from '../../style/radius'
import { fontWeight } from '../../style/font'
import { TokenName } from '../../token-info/types'
import { tokenInfo } from '../../token-info/tokenInfo'
import rightArrowPng from '../../assets/right-arrow.png'
import useAntV2ToEthRate from '../../hooks/useAntV2ToEthRate'
import { theme as localTheme } from '../../style/theme'

function AntV2EthConversionCard(): JSX.Element {
  const available = false
  const tokenName: TokenName = 'antV2'

  const theme = useTheme()
  const { layoutName } = useLayout()
  const antV2ToEthRate = useAntV2ToEthRate()

  const compactMode = layoutName === 'small'

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
            {antV2ToEthRate && (
              <div
                css={`
                  display: flex;
                  align-items: center;
                `}
              >
                ETH/ANTv2: {antV2ToEthRate}
              </div>
            )}
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

          <div
            css={`
              padding-top: ${2 * GU}px;
              width: 100%;
              height: 100%;
              text-align: center;
            `}
          >
            <p>
              The ANT Redemption Initiative ended on November 2nd 2024 23:59
              UTC. <br />
              For any questions, please reach out to ant@aragon.org
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AntV2EthConversionCard
