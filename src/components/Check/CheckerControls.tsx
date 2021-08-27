import React, { useCallback, useState } from 'react'
import {
  TextInput,
  useLayout,
  GU,
  // @ts-ignore
} from '@aragon/ui'
import { useHistory } from 'react-router-dom'
import { fontWeight } from '../../style/font'
import BrandButton from '../BrandButton/BrandButton'
import ConverterFormControls from '../Migrate/Converter/ConverterFormControls'
import styled from 'styled-components'

const FLOAT_REGEX = /^\d*[.]?\d*$/

export function BaseCheckerFormControls(): JSX.Element {
  const history = useHistory()
  const [amount, setAmount] = useState('')
  const [showError, setShowError] = useState(false)
  const { layoutName } = useLayout()

  const handleNavigateHome = useCallback(() => {
    history.push('/')
  }, [history])

  const stackedButtons = layoutName === 'small'

  const handleAmountChange = useCallback(
    (event) => {
      const value = event.target.value

      setShowError(false)
      if (FLOAT_REGEX.test(value)) {
        setAmount(value)
      }
    },
    [setAmount]
  )

  const handleSubmit = useCallback((event) => {
    event.preventDefault()
    console.log('hi')
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <Label>
        <LabelText>Enter your Govern DAO executor address</LabelText>
        <StyledInput
          wide
          placeholder={`0x01234..cdef`}
          value={amount}
          onChange={handleAmountChange}
        />
      </Label>

      {/* {showError && !allowanceCheckLoading && (
        <ValidationWarning status={validationStatus} />
      )} */}

      <ButtonRow stacked={stackedButtons}>
        <BrandButton mode="strong" wide type="submit" label={'Check'} />
        <BrandButton wide onClick={handleNavigateHome} label={'Back'} />
      </ButtonRow>
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
  font-variant-numeric: tabular-nums;
  display: block;
`
const ButtonRow = styled.div<{ stacked: boolean }>`
  display: grid;
  grid-gap: ${1 * GU}px;
  grid-template-columns: ${(props) => (props.stacked ? 'auto' : '1fr 1fr')};
  margin-top: ${2 * GU}px;
`

export default ConverterFormControls
