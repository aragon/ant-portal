import React, { useCallback, useState } from 'react'
import {
  TextInput,
  useLayout,
  GU,
  Info,
  // @ts-ignore
} from '@aragon/ui'
import { useHistory } from 'react-router-dom'
import { fontWeight } from '../../style/font'
import BrandButton from '../BrandButton/BrandButton'
import ConverterFormControls from '../Migrate/Converter/ConverterFormControls'
import styled from 'styled-components'
import { When } from 'react-if'

const FORTY_DIGITS_HEX = /^0x[0-9a-fA-F]{40}$/s

export function BaseCheckerFormControls(): JSX.Element {
  const history = useHistory()
  const [address, setAddress] = useState('')
  const { layoutName } = useLayout()
  const [showError, setShowError] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [options, setOptions] = useState(42)

  const handleNavigateHome = useCallback(() => {
    history.push('/')
  }, [history])

  const stackedButtons = layoutName === 'small'

  const handleAddressChange = useCallback((event) => {
    const value = event.target.value
    setAddress(value)
  }, [])

  const handleSubmit = () => {
    const isValidValue = FORTY_DIGITS_HEX.test(address)
    if (!isValidValue) setShowError(true)
    else {
      setOptions(42) //get number of options from json
      setShowOptions(true)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Label>
        <LabelText>Enter your Govern DAO executor address</LabelText>
        <StyledInput
          wide
          type={'text'}
          placeholder={`0x01234...cdef`}
          value={address}
          onChange={handleAddressChange}
        />
      </Label>

      {/* {showError && !allowanceCheckLoading && (
        <ValidationWarning status={validationStatus} />
      )} */}

      <ButtonRow stacked={stackedButtons}>
        <BrandButton
          mode="strong"
          wide
          type="submit"
          disabled={!address}
          label={'Check'}
        />
        {/* <BrandButton
          mode="strong"
          wide
          type="submit"
          label={'Check'}
          disabled={!isValidValue}
        /> */}
        <BrandButton wide onClick={handleNavigateHome} label={'Back'} />
      </ButtonRow>
      <When condition={showError}>
        <Info mode={'error'}>This address is invalid</Info>
      </When>
      <When condition={showOptions}>
        <Info>Your DAO is entitled to {options} options</Info>
        <Info mode={'warning'}>This address is invalid</Info>
      </When>
    </form>
  )
}

const LabelText = styled.h3`
  font-weight: ${fontWeight.light};
  margin-bottom: ${1 * GU}px;
  font-size: 22px;
`

const Label = styled.label`
  display: block;
`
const StyledInput = styled(TextInput)`
  display: block;
`
const ButtonRow = styled.div<{ stacked: boolean }>`
  display: grid;
  grid-gap: ${1 * GU}px;
  grid-template-columns: ${(props) => (props.stacked ? 'auto' : '1fr 1fr')};
  margin-top: ${2 * GU}px;
  margin-bottom: ${2 * GU}px;
`

export default ConverterFormControls
