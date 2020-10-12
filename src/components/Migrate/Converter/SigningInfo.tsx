import React, { ReactNode } from 'react'
// @ts-ignore
import { Link, Info } from '@aragon/ui'

type InfoStatus = 'working' | 'error' | 'success'

type Descriptions = Record<InfoStatus, ReactNode>

type SigningInfoProps = {
  status: InfoStatus
}

const DESCRIPTIONS: Descriptions = {
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
      An error has occurred at the time of the transaction. You can increase
      your gas settings and try again.{' '}
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
    'Success! The transaction has been sent to the network for processing. You can review other migration options.',
}

function SigningInfo({ status = 'working' }: SigningInfoProps): JSX.Element {
  const description = DESCRIPTIONS[status]

  return <Info mode={status === 'error' ? 'error' : 'info'}>{description}</Info>
}

export default SigningInfo
