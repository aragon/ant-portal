import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useWallet } from '../../providers/Wallet'
// @ts-ignore
import { GU, IconConnect, useViewport } from '@aragon/ui'
import AccountButton from './AccountButton'
import AccountPopover from './AccountPopover'
import BrandButton from '../BrandButton/BrandButton'
import ScreenConnected from './ScreenConnected'
import ScreenConnecting from './ScreenConnecting'
import ScreenError from './ScreenError'
import ScreenProviders from './ScreenProviders'
import { ScreenConfig, WalletConnector } from './types'

const SCREENS: ScreenConfig[] = [
  { id: 'providers', title: 'Use account from' },
  { id: 'connecting', title: 'Use account from' },
  { id: 'connected', title: 'Active account' },
  { id: 'error', title: 'Connection error' },
]

function AccountModule(): JSX.Element {
  const wallet = useWallet()
  const { account, connector, error, status } = wallet
  const [opened, setOpened] = useState(false)
  const [
    activatingDelayed,
    setActivatingDelayed,
  ] = useState<WalletConnector | null>(null)
  const buttonRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const { below } = useViewport()
  const compactMode = below('medium')

  const toggle = useCallback(() => setOpened((opened) => !opened), [])

  useEffect(() => {
    if (status === 'error') {
      setActivatingDelayed(null)
    }

    if (status === 'connecting') {
      setActivatingDelayed(connector)
    }
  }, [connector, status])

  const handleResetConnection = useCallback(() => {
    wallet.reset()
  }, [wallet])

  const handleActivate = useCallback(
    (providerId: WalletConnector) => wallet.connect(providerId),
    [wallet]
  )

  const previousScreenIndex = useRef(-1)

  const { screenIndex, direction } = useMemo((): {
    direction: -1 | 1
    screenIndex: number
  } => {
    const screenId = status === 'disconnected' ? 'providers' : status

    const screenIndex = SCREENS.findIndex((screen) => screen.id === screenId)
    const direction = previousScreenIndex.current > screenIndex ? -1 : 1

    previousScreenIndex.current = screenIndex

    return { direction, screenIndex }
  }, [status])

  const screen = SCREENS[screenIndex]
  const screenId = screen.id

  const handlePopoverClose = useCallback(() => {
    // Reject closing the popover when connecting or on error
    if (screenId === 'connecting' || screenId === 'error') {
      return false
    }
    setOpened(false)
  }, [screenId])

  return (
    <div
      ref={buttonRef}
      css={`
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 100%;
        width: ${compactMode ? 'auto' : `${24.5 * GU}px`};
        outline: 0;
      `}
    >
      {screen.id === 'connected' ? (
        <AccountButton onClick={toggle} />
      ) : (
        <BrandButton
          icon={<IconConnect />}
          label="Enable account"
          onClick={toggle}
          display={compactMode ? 'icon' : 'all'}
        />
      )}
      <AccountPopover
        direction={direction}
        heading={screen.title}
        onClose={handlePopoverClose}
        opener={buttonRef.current}
        screenId={screenId}
        screenData={{
          account,
          activating: activatingDelayed,
          activationError: error,
          status,
          screenId,
        }}
        visible={opened}
      >
        {({ activating, activationError, screenId }) => {
          if (screenId === 'connecting') {
            return (
              <ScreenConnecting
                providerId={activating}
                onCancel={handleResetConnection}
              />
            )
          }
          if (screenId === 'connected') {
            return <ScreenConnected />
          }
          if (screenId === 'error') {
            return (
              <ScreenError
                error={activationError}
                onBack={handleResetConnection}
              />
            )
          }
          return <ScreenProviders onActivate={handleActivate} />
        }}
      </AccountPopover>
    </div>
  )
}

export default AccountModule
