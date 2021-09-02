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
import { DaoAddress, optionsInfo, TxHash } from '../../token-info/options'
import { isAddress } from 'ethers/lib/utils'
import { constants } from 'ethers/lib/index'

type ComponentState =
  | 'init'
  | 'invalid address'
  | 'error'
  | 'options'
  | 'no options'
  | 'with tx'

export function BaseCheckerFormControls(): JSX.Element {
  const history = useHistory()
  const { layoutName } = useLayout()

  const [address, setAddress] = useState<DaoAddress>('')
  const [tx, setTx] = useState<TxHash>('')
  const [options, setOptions] = useState(0)
  const [state, setState] = useState<ComponentState>('init')

  const handleNavigateHome = useCallback(() => {
    history.push('/')
  }, [history])

  const stackedButtons = layoutName === 'small'

  const handleAddressChange = useCallback((event) => {
    const value = event.target.value
    setAddress(value)
  }, [])

  const handleSubmit = async () => {
    if (!isAddress(address)) return setState('invalid address')
    try {
      const response = await fetch(
        `https://datafeed.aragon.org/organizations/${address}`
      )
      if (response.status === 404) return setState('no options')
      if (response.ok) {
        const data = await response.json()
        setOptions(data.value)
      }
      const tx: TxHash = optionsInfo[address]
      if (!tx) return setState('options')
      setTx(tx)
      return setState('with tx')
    } catch (err) {
      return setState('error')
    }
  }

  return (
    <div>
      <Label>
        <LabelText>Enter your Govern DAO executor address</LabelText>
        <StyledInput
          wide
          type={'text'}
          placeholder={constants.AddressZero}
          value={address}
          onChange={handleAddressChange}
        />
      </Label>

      <ButtonRow stacked={stackedButtons}>
        <BrandButton
          mode="strong"
          wide
          disabled={!address}
          label={'Check'}
          onClick={handleSubmit}
        />
        <BrandButton wide onClick={handleNavigateHome} label={'Back'} />
      </ButtonRow>
      <InfoColumn>
        <Switch>
          <Case condition={state === 'invalid address'}>
            <Info mode={'error'}>This address is invalid.</Info>
          </Case>
          <Case condition={state === 'error'}>
            <Info mode={'error'}>
              Something went wrong while fetching data. Please try again later.
            </Info>
          </Case>
          <Case condition={state === 'no options'}>
            <Info>Your DAO is not entitled to receive any options.</Info>
            <ConversionInfo />
          </Case>
          <Case condition={state === 'options'}>
            <Info>Your DAO is entitled to {options} options.</Info>
            <ConversionInfo />
          </Case>
          <Case condition={state === 'with tx'}>
            <Info>
              Your DAO has received {options} options. Check the transaction{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://etherscan.io/tx/${tx}`}
              >
                here.
              </a>
            </Info>
            <ConversionInfo />
          </Case>
        </Switch>
      </InfoColumn>
    </div>
  )
}

function ConversionInfo() {
  return (
    <Info mode={'warning'}>
      To learn how to convert your options into ANT after the expiry date, refer
      to{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={
          'https://help.aragon.org/article/108-redeeming-aragon-govern-reward-kpi-options'
        }
      >
        this article
      </a>
      .
    </Info>
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
