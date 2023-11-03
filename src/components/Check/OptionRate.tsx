import React from 'react'
// @ts-ignore
import { GU, useTheme, useLayout, Help } from '@aragon/ui'
import { fontWeight } from '../../style/font'
import { radius } from '../../style/radius'
import { shadowDepth } from '../../style/shadow'
import TokenGraphic from '../TokenGraphic/TokenGraphic'
import styled, { css } from 'styled-components'
import { Rate } from '../Migrate/Converter/ConversionRate'
import { useOptionConversionRate } from '../../hooks/usePolledBalance'
import { theme as localTheme } from '../../style/theme'

type OptionRateProps = {
  compactMode: boolean
  tokenSymbol: string
}

function OptionRate({ tokenSymbol }: OptionRateProps): JSX.Element {
  const theme = useTheme()
  const { layoutName } = useLayout()
  const compactMode = layoutName === 'small' || layoutName === 'medium'
  const conversionRate = useOptionConversionRate()

  return (
    <div>
      <Pill color={theme.surface}>
        <TokenGraphic tokenName={'opt'} shadow size={compactMode ? 80 : 100} />
        <TokenGraphic
          tokenName="antV2"
          size={compactMode ? 80 : 100}
          shadow
          css={`
            margin-left: -${1 * GU}px;
          `}
        />
      </Pill>
      <TextContainer>
        <h4
          css={`
            font-size: ${compactMode ? 52 : 60}px;
            font-weight: ${fontWeight.semiBold};

            // Optically offset left edge of number 1 for centering
            margin-left: -0.15em;
            letter-spacing: -0.075em;

            line-height: 1;
            margin-bottom: ${1.75 * GU}px;

            background: ${localTheme.primary};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          1 : <Rate value={conversionRate} />
        </h4>
        <div
          css={`
            display: flex;
            align-items: center;
            margin-bottom: ${0.5 * GU}px;
          `}
        >
          <h3
            css={`
              font-weight: ${fontWeight.medium};
              font-size: 18px;
              margin-right: ${1 * GU}px;
            `}
          >
            Current conversion rate
          </h3>
          <Help>
            <p>
              This rate depends on the total value that is migrated by all DAOs
              to Govern. Learn more{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://blog.aragon.org/uma-kpi-options-airdrop-now-live-for-aragon-govern-daos/"
              >
                here
              </a>
            </p>
          </Help>
        </div>
        <SecondaryParagraph color={localTheme.secondary}>
          <NumberSpan color={theme.surfaceContent}>1</NumberSpan> {tokenSymbol}{' '}
          <ColonSpan color={localTheme.secondary}>:</ColonSpan>{' '}
          <NumberSpan color={theme.surfaceContent}>{conversionRate}</NumberSpan>{' '}
          ANTv2
        </SecondaryParagraph>
        <SecondaryParagraph color={localTheme.secondary}>
          <b>Expiry Date:</b> September 30th 2021
        </SecondaryParagraph>
      </TextContainer>
    </div>
  )
}

const Pill = styled.div<{ color: any }>`
  display: flex;
  justify-content: center;
  padding: ${2 * GU}px;
  background-color: ${(props) => props.color};

  // Create pill corners
  border-radius: ${radius.pill};
  box-shadow: ${shadowDepth.high};
  margin-bottom: ${3.5 * GU}px;
`

const withColor = css<{ color: any }>`
  color: ${(props) => props.color};
`

const NumberSpan = styled.span`
  ${withColor}
`

const ColonSpan = styled.span`
  ${withColor}
  margin-left: ${1 * GU}px;
  margin-right: ${1 * GU}px;
`

const SecondaryParagraph = styled.p`
  ${withColor}
  letter-spacing: 0.04em;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default OptionRate
