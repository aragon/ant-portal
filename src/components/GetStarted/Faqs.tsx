import React, { ReactNode } from 'react'
// @ts-ignore
import { GU, Link } from '@aragon/ui'
import LayoutLimiter from '../Layout/LayoutLimiter'
import Faq from './Faq'
import PageHeading from '../PageHeading/PageHeading'
import { networkEnvironment } from '../../environment'
import { getEtherscanUrl } from '../../utils/etherscan'

const { contracts } = networkEnvironment

// TODO: Add url and content when available
const FAQS_ITEMS: [string, ReactNode][] = [
  [
    'How did the Aragon Association (AA) determine the redemption rate?',
    <>
      <p>
        The AA arrived at the best redemption rate it could achieve for all ANT
        holders by identifying the most compliant and tax efficient path forward
        allowing for the continuation and protection of the project.
      </p>
      <p>
        <b>First (1)</b>, the AA defined the circulating supply with the
        following calculation: [Total ANT Supply] - [ANT directly owned or
        controlled by the AA] - [ANT locked in inactive legacy contracts]. This
        ensures all ANT holders have the option to participate in the
        redemption, regardless of whether they are currently holding ANTv1 or
        v2. This resulted in <b>34,220,397 ANT</b>.
      </p>
      <p>
        <b>Second (2)</b>, the AA committed the majority of its treasury toward
        the redemption, with the exception of funds necessary for project
        protection, continuity, and tax compliance. This amount was calculated
        as: [Total treasury held in non-native assets] - [Funds to protect the
        project] - [Funds for development and operations]. This resulted in{' '}
        <b>86,343 ETH</b> (approx. 87% of non-native assets).
      </p>
      <p>
        The ETH/ANT rate was set by dividing the (2) treasury committed to the
        redemption by (1) the circulating supply. This resulted in a fixed rate
        of <b>0.0025376 ETH / ANT</b>.
      </p>
    </>,
  ],
  [
    "If I can't find my ANT or have lost the keys of the wallet where I hold ANT, can I still participate in the redemption?",
    <p>
      ANT Holders will need to connect a wallet holding ANT to the redemption
      contract in order to participate. If you hold your ANT in a self-custodial
      wallet but have lost your keys, unfortunately there is nothing we can do.
    </p>,
  ],
  [
    'If I have my ANT in a centralized exchange (CEX), what am I supposed to do?',
    <>
      <p>
        If your ANT is in a CEX, we recommend you to withdraw the tokens to a
        self-custody wallet, such as{' '}
        <a
          href="https://metamask.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Metamask
        </a>
        , and then login to the ANT Redemption Portal with it to perform the
        redemption directly.
      </p>
      <p>
        You may also withdraw your ANT to a hard wallet, such as Ledger or
        Trezor. However, you will need to import the hard wallet into Metamask
        in order to connect to the ANT Redemption Portal.
      </p>
    </>,
  ],
  [
    'If I have my ANT in a Ledger Live, Exodus, or other unsupported wallets, what am I supposed to do?',
    <p>
      If you attempt to connect to the ANT Redemption Portal with a wallet that
      is not supported, you may not be able to interact with the portal. In that
      case, please transfer your ANT to a supported self-custody wallet, such as{' '}
      <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
        Metamask
      </a>
      , and connect with it instead. If you are using a hardware wallet, such as
      Trezor or Ledger, you can also import it into Metamask and use that to
      connect to the ANT Redemption Portal.
    </p>,
  ],
  [
    'Can I review the smart contract?',
    <p>
      The contract can be viewed{' '}
      <Link
        href={
          contracts.antV2Redemption
            ? getEtherscanUrl(contracts.antV2Redemption, 'address')
            : ''
        }
        css={`
          text-align: left;
          white-space: initial;
          word-break: break-all;
        `}
      >
        here
      </Link>{' '}
      and the Halborn audit report{' '}
      <Link href="./audit-report.pdf">can be viewed here</Link>.
    </p>,
  ],
  [
    "Why can't I just send ANT to the smart contract instead of going through the ANT Redemption Portal?",
    <p>
      There is a specific function that has to be called on the smart contract.
      Sending ANT or any other assets to the contract will result in a loss of
      funds.
    </p>,
  ],
  [
    'What if I have technical issues? Do you have any support?',
    <p>
      If you have technical issues, you can email{' '}
      <Link href="mailto:ant@aragon.org">ant@aragon.org</Link> and a
      representative from the Aragon Shield Foundation will get back to you as
      soon as possible.
    </p>,
  ],
  [
    'Will there be any future redemption initiatives?',
    <p>
      The token redemption is a voluntary initiative by the Aragon Association.
      It is time-bound, one-off, and subject to the{' '}
      <Link href="#/terms">Terms and Conditions</Link>. There will be no future
      redemption initiatives or utility for the Aragon Network Token (ANT).
    </p>,
  ],
  [
    'What does this mean for the future of the Aragon Project?',
    <p>
      The Aragon Project will continue under new leadership. Please{' '}
      <Link href="https://blog.aragon.org/a-new-chapter-for-the-aragon-project/">
        refer to the announcement
      </Link>{' '}
      for more details.
    </p>,
  ],
]

function Faqs(): JSX.Element {
  return (
    <LayoutLimiter size="small">
      <div
        css={`
          a {
            text-decoration: none;
          }
        `}
      >
        <PageHeading
          title="FAQs"
          description=""
          css={`
            width: 100%;
            margin-bottom: ${7 * GU}px;
          `}
        />
        <Faq items={FAQS_ITEMS} />
      </div>
    </LayoutLimiter>
  )
}

// function AddressLink({ address }: { address: string }): JSX.Element {
//   return (
//     <Link
//       href={getEtherscanUrl(address)}
//       css={`
//         text-align: left;
//         white-space: initial;
//         word-break: break-all;
//       `}
//     >
//       {address}
//     </Link>
//   )
// }

export default Faqs
