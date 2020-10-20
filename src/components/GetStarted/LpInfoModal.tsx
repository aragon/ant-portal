import React from 'react'
import BrandModal from '../BrandModal/BrandModal'

type LpInfoModaProps = {
  visible: boolean
  onClose: () => void
}

function LpInfoModal({ visible, onClose }: LpInfoModaProps): JSX.Element {
  return (
    <BrandModal visible={visible} onClose={onClose} width={750}>
      I am a modal
    </BrandModal>
  )
}

export default LpInfoModal
