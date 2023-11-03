import React from 'react'
// @ts-ignore
import { GU, Link, useLayout } from '@aragon/ui'
import movingBeyondANTSvg from '../../assets/moving-beyond-ant.svg'
import upgradeToANTv2Svg from '../../assets/upgrade-to-antv2.svg'
import wANTHoldersSvg from '../../assets/want-holders.svg'
import { fontWeight } from '../../style/font'
import LayoutLimiter from '../Layout/LayoutLimiter'
import { theme as localTheme } from '../../style/theme'
import { radius } from '../../style/radius'

const ANNOUNCEMENT_URL =
  'https://blog.aragon.org/a-new-chapter-for-the-aragon-project/'
const ARAGON_DAO_TOKEN_WRAPPER_URL =
  'https://dao.aragon.org/#/token-wrapper/0x5713c2d9e9d4381bff966b1cdbf52cf4e8addc2c'

function Features({
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const { layoutName } = useLayout()

  const compactMode = layoutName === 'small'
  const stackColumns = layoutName === 'small' || layoutName === 'medium'

  return (
    <LayoutLimiter size="medium" {...props}>
      <div
        css={`
          display: grid;
          grid-template-columns: ${stackColumns ? '1fr' : '20% 80%'};
          align-items: center;
          grid-gap: ${6 * GU}px;
          text-align: ${stackColumns ? 'center' : 'left'};
          margin-bottom: ${compactMode ? 16 * GU : 20 * GU}px;
          background-color: ${localTheme.whiteCard};
          border-radius: ${radius.high};
          padding: ${3 * GU}px;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        `}
      >
        <div>
          <div
            css={`
              max-width: ${stackColumns ? `${62 * GU}px` : 'auto'};
              margin: auto;
            `}
          >
            <div
              css={`
                position: relative;
                width: 100%;

                margin-left: auto;
                margin-right: auto;
              `}
            >
              <img
                alt="wAnt holders"
                src={wANTHoldersSvg}
                css={`
                  width: 100%;
                  max-width: 250px;
                `}
              />
            </div>
          </div>
        </div>
        <div>
          <h2
            css={`
              font-weight: ${fontWeight.semiBold};
              line-height: 1.2;
              font-size: ${compactMode ? `24` : `28`}px;
              margin-bottom: ${2 * GU}px;
            `}
          >
            wANT holders
          </h2>
          <p
            css={`
              font-weight: ${fontWeight.medium};
              font-size: ${compactMode ? `18` : `22`}px;
              color: ${localTheme.secondary};
              margin-bottom: ${2 * GU}px;
            `}
          >
            If you are a wANT holder, to obtain your ANTv2, you must first
            unwrap it
          </p>
          <div
            css={`
              font-weight: ${fontWeight.medium};
              font-size: ${compactMode ? `16` : `18`}px;
              color: ${localTheme.secondary};
              margin-bottom: ${1 * GU}px;
            `}
          >
            <span
              css={`
                color: ${localTheme.black};
                margin-right: ${2 * GU}px;
              `}
            >
              Step 1
            </span>
            Navigate to the{' '}
            <Link
              href={ARAGON_DAO_TOKEN_WRAPPER_URL}
              css={`
                text-decoration: none;
                &:focus:after {
                  border: none;
                }
              `}
            >
              Aragon DAO’s token wrapper
            </Link>
          </div>
          <div
            css={`
              font-weight: ${fontWeight.medium};
              font-size: ${compactMode ? `16` : `18`}px;
              color: ${localTheme.secondary};
            `}
          >
            <span
              css={`
                color: ${localTheme.black};
                margin-right: ${2 * GU}px;
              `}
            >
              Step 2
            </span>
            Click the button “Convert tokens” to unwrap your wANT back to ANTv2.
          </div>
        </div>
      </div>

      <div
        css={`
          display: grid;
          grid-template-columns: ${stackColumns ? '1fr' : '1fr 1fr'};
          align-items: center;
          grid-gap: ${10 * GU}px;
          text-align: ${stackColumns ? 'center' : 'left'};
          padding-bottom: ${compactMode ? 10 * GU : 20 * GU}px;
        `}
      >
        <div>
          <div
            css={`
              max-width: ${stackColumns ? `${62 * GU}px` : 'auto'};
              margin: auto;
            `}
          >
            <div
              css={`
                position: relative;
                width: 100%;

                margin-left: auto;
                margin-right: auto;
              `}
            >
              <img
                alt="Upgrade to ANTv2"
                src={upgradeToANTv2Svg}
                css={`
                  width: 100%;
                `}
              />
            </div>
          </div>
        </div>
        <div>
          <h2
            css={`
              font-weight: ${fontWeight.bold};
              line-height: 1.2;
              font-size: ${compactMode ? `35` : `48`}px;
              margin-bottom: ${2.5 * GU}px;
            `}
          >
            Upgrade to ANTv2
          </h2>
          <p
            css={`
              font-weight: ${fontWeight.medium};
              font-size: ${compactMode ? `18` : `26`}px;
              color: ${localTheme.secondary};
              margin-bottom: ${3 * GU}px;
            `}
          >
            Only ANTv2 is eligible for redemption. If you haven’t already, you
            will need to first migrate your ANTv1 or ANJ to ANTv2. Once your
            tokens are migrated to ANTv2, you can redeem it for ETH.
          </p>
        </div>
      </div>

      <div
        css={`
          display: grid;
          grid-template-columns: ${stackColumns ? '1fr' : '1fr 1fr'};
          align-items: center;
          grid-gap: ${10 * GU}px;
          text-align: ${stackColumns ? 'center' : 'left'};
        `}
      >
        <div
          css={`
            order: ${stackColumns ? 1 : 0};
          `}
        >
          <h2
            css={`
              font-weight: ${fontWeight.bold};
              line-height: 1.2;
              font-size: ${compactMode ? `35` : `48`}px;
              margin-bottom: ${2.5 * GU}px;
            `}
          >
            Moving beyond ANT
          </h2>
          <p
            css={`
              font-weight: ${fontWeight.medium};
              font-size: ${compactMode ? `18` : `26`}px;
              color: ${localTheme.secondary};
              margin-bottom: ${3 * GU}px;
            `}
          >
            The Aragon Association has decided to voluntarily use most of its
            treasury to offer all ANT holders the opportunity to redeem their
            ANT for ETH at a fixed rate of <b>0.0025376 ETH / ANT</b> as part of
            its dissolution process. The redemption period will be open for 1
            year, ending on <b>November 2nd 2024 at 23h59 UTC</b>.
          </p>
          <Link
            href={ANNOUNCEMENT_URL}
            css={`
              font-weight: ${fontWeight.medium};
              font-size: ${compactMode ? `17` : `20`}px;
              text-decoration: none;
            `}
          >
            Read the announcement
          </Link>
        </div>
        <div
          css={`
            order: ${stackColumns ? 0 : 1};
          `}
        >
          <div
            css={`
              max-width: ${stackColumns ? `${62 * GU}px` : 'auto'};
              margin: auto;
            `}
          >
            <div
              css={`
                position: relative;
                padding-top: 86%;
                width: 100%;

                margin-left: auto;
                margin-right: auto;
              `}
            >
              <img
                alt="ANT v2"
                src={movingBeyondANTSvg}
                css={`
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                `}
              />
            </div>
          </div>
        </div>
      </div>
    </LayoutLimiter>
  )
}

export default Features
