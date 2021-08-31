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
import { Case, Switch } from 'react-if'
import { optionsInfo } from '../../token-info/options'

const FORTY_DIGITS_HEX = /^0x[0-9a-fA-F]{40}$/s
type ComponentState = 'init' | 'error' | 'options' | 'no options'

export function BaseCheckerFormControls(): JSX.Element {
  const history = useHistory()
  const { layoutName } = useLayout()
  const [address, setAddress] = useState('')
  const [state, setState] = useState<ComponentState>('init')
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
    const isValidAddress = FORTY_DIGITS_HEX.test(address)
    if (!isValidAddress) return setState('error')

    const optionsAmount = optionsInfo[address]
    if (optionsAmount) {
      setOptions(optionsAmount.amount) // TODO get number of options from json
      setState('options')
    } else setState('no options')
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

      <ButtonRow stacked={stackedButtons}>
        <BrandButton
          mode="strong"
          wide
          type="submit"
          disabled={!address}
          label={'Check'}
        />
        <BrandButton wide onClick={handleNavigateHome} label={'Back'} />
      </ButtonRow>
      <InfoColumn>
        <Switch>
          <Case condition={state === 'error'}>
            <Info mode={'error'}>This address is invalid</Info>
          </Case>
          <Case condition={state === 'options'}>
            <Info>Your DAO is entitled to {options} options</Info>
            <Info mode={'warning'}>
              To learn how to convert your options into ANT after the expiry
              date, refer to <a href={'aragon.org'}>this</a> article.
            </Info>
          </Case>
          <Case condition={state === 'no options'}>
            <Info>Your DAO is not entitled to receive options</Info>
            <Info mode={'warning'}>
              To learn how to convert your options into ANT after the expiry
              date, refer to <a href={'aragon.org'}>this</a> article.
            </Info>
          </Case>
        </Switch>
      </InfoColumn>
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
`

const InfoColumn = styled.div`
  & > section {
    margin-top: ${2 * GU}px;
  }
`

export default ConverterFormControls
