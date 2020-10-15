import React, { ReactNode } from 'react'
// @ts-ignore
import { Modal, IconCross, ButtonIcon, useTheme, GU } from '@aragon/ui'
import { shadowDepth } from '../../style/shadow'
import { radius } from '../../style/radius'
import { rgba } from 'polished'

type BrandModalProps = {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

function BrandModal({
  children,
  visible,
  onClose,
}: BrandModalProps): JSX.Element {
  const theme = useTheme()

  const scrimColor = rgba(`#${theme.disabledContent.hexColor}`, 0.3)

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      closeButton={false}
      padding={0}
      css={`
        > div > div > div {
          border-radius: ${radius.high} !important;
          box-shadow: ${shadowDepth.high};
        }

        background-color: ${scrimColor};
      `}
    >
      <div
        css={`
          position: relative;
          overflow: hidden;
          padding: ${4 * GU}px;
        `}
      >
        <div
          css={`
            position: relative;
          `}
        >
          <ButtonIcon
            label=""
            css={`
              position: absolute;
              top: -${1 * GU}px;
              right: -${1 * GU}px;
              z-index: 2;
            `}
            onClick={onClose}
          >
            <IconCross
              css={`
                color: ${theme.surfaceContent};
              `}
            />
          </ButtonIcon>
          {children}
        </div>
      </div>
    </Modal>
  )
}

export default BrandModal
