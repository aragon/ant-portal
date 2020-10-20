import React, { ReactNode } from 'react'
import {
  Modal,
  IconCross,
  ButtonIcon,
  useTheme,
  useViewport,
  GU,
  // @ts-ignore
} from '@aragon/ui'
import { shadowDepth } from '../../style/shadow'
import { radius } from '../../style/radius'
import { rgba } from 'polished'

const SPACE_AROUND = 4 * GU

type BrandModalProps = {
  visible: boolean
  width?: number
  onClose: () => void
  children: ReactNode
}

function BrandModal({
  children,
  visible,
  onClose,
  width = 600,
}: BrandModalProps): JSX.Element {
  const theme = useTheme()
  const { width: viewportWidth } = useViewport()

  const modalWidth = Math.min(viewportWidth - SPACE_AROUND * 2, width)
  const scrimColor = rgba(`#${theme.disabledContent.hexColor}`, 0.3)

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      closeButton={false}
      padding={0}
      width={modalWidth}
      css={`
        > div > div > div {
          border-radius: ${radius.high} !important;
          box-shadow: ${shadowDepth.overlay};
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
