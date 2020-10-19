import React, { ReactNode } from 'react'
// @ts-ignore
import { Link, Info, useTheme } from '@aragon/ui'

type InfoStatus = 'working' | 'error' | 'success'

type Descriptions = Record<InfoStatus, ReactNode>

type SigningInfoProps = {
  status: InfoStatus
  multipleTransactions: boolean
}

const SINGLE_TX_DESCRIPTIONS: Descriptions = {
  working: (
    <>
      Open your Ethereum provider (
      <Link
        href="https://metamask.io/"
        css={`
          text-decoration: none;
        `}
      >
        Metamask
      </Link>{' '}
      or similar) to sign the transaction. Do not close this window until the
      process has finished.
    </>
  ),
  error: (
    <>
      An error has occurred at the time of transaction. You can increase your
      gas settings and try again.{' '}
      <Link
        href="https://metamask.zendesk.com/hc/en-us/articles/360015488771-How-to-Adjust-Gas-Price-and-Gas-Limit-"
        css={`
          text-decoration: none;
        `}
      >
        How to adjust gas price and gas limit?
      </Link>
    </>
  ),
  success:
    'Success! The transaction has been sent to the network for processing. You can now review other migration options.',
}

const MULTI_TX_DESCRIPTIONS: Descriptions = {
  working: (
    <>
      Open your Ethereum provider (
      <Link
        href="https://metamask.io/"
        css={`
          text-decoration: none;
        `}
      >
        Metamask
      </Link>{' '}
      or similar) to sign the transactions. Do not close this window until the
      process has finished.
    </>
  ),
  error: (
    <>
      An error has occurred with one of the transactions. You can increase your
      gas settings and try again.{' '}
      <Link
        href="https://metamask.zendesk.com/hc/en-us/articles/360015488771-How-to-Adjust-Gas-Price-and-Gas-Limit-"
        css={`
          text-decoration: none;
        `}
      >
        How to adjust gas price and gas limit?
      </Link>
    </>
  ),
  success:
    'Success! The transactions have been sent to the network for processing. You can now review other migration options.',
}

function SigningInfo({
  status = 'working',
  multipleTransactions,
  ...props
}: SigningInfoProps): JSX.Element {
  const theme = useTheme()
  const description = multipleTransactions
    ? MULTI_TX_DESCRIPTIONS[status]
    : SINGLE_TX_DESCRIPTIONS[status]

  return (
    <Info
      mode={status === 'error' ? 'error' : 'info'}
      css={
        status === 'success' &&
        `
          background-color: ${theme.positiveSurface};
          color: ${theme.positiveSurfaceContent};
          border-color: ${theme.positive};
        `
      }
      {...props}
    >
      {description}
    </Info>
  )
}

export default SigningInfo
