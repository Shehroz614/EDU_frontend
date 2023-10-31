import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

type CurrencyInputProps = {
  max?: number
  price: number
  editValue: (newPrice: number) => Promise<boolean>
  disabled?: boolean
}

const PriceBlockWrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  color: ${(props) => (props.disabled ? colors.uguLightGrey : '#000000')};
`

const CurrencyInputFieldWrapper = styled.div`
  display: flex;
  border-radius: 30px;
  border: 1px solid white;
  background-color: white;
  height: 3rem;
  width: 10rem;
  padding: 1rem;
  align-items: center;
`

const CurrencySignWrapper = styled.div`
  display: flex;
  font-family: 'RobotoLight', serif;
`
const PriceInput = styled.div`
  display: flex;
`

const CurrencyInputField = styled.input<{ disabled: boolean }>`
  display: flex;
  width: 5rem;
  margin-left: 1rem;
  text-align: right;
  background-color: inherit;
  border: none;
  font-family: 'RobotoLight', serif;
  color: ${(props) => (props.disabled ? colors.uguLightGrey : '#000000')};
`

const VALID_FIRST = /^[1-9]{1}$/
const VALID_NEXT = /^[0-9]{1}$/
const DELETE_KEY_CODE = 'Backspace'

const CurrencyInput: React.FC<CurrencyInputProps> = (props) => {
  const {
    max = Number.MAX_SAFE_INTEGER,
    price,
    editValue,
    disabled = false,
  } = props
  const [value, setValue] = useState<number>(0)
  const valueAbsTrunc = Math.trunc(Math.abs(value))

  let timeoutId: any

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(function () {
      // Runs 1 second (1000 ms) after the last change
      if (value > 0 && value < 1000000 && value !== price) {
        editValue(value).then(() => {
          console.log('Price has been changed!')
        })
      }
    }, 3000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [value])

  useEffect(() => {
    if (price !== value) {
      setValue(price)
    }
  }, [price])

  if (
    value !== valueAbsTrunc ||
    !Number.isFinite(value) ||
    Number.isNaN(value)
  ) {
    //throw new Error(`invalid value property`)
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>): void => {
      const { key } = e
      if (
        (value === 0 && !VALID_FIRST.test(key)) ||
        (value !== 0 && !VALID_NEXT.test(key) && key !== DELETE_KEY_CODE)
      ) {
        return
      }
      const valueString = value.toString()
      let nextValue: number
      if (key !== DELETE_KEY_CODE) {
        const nextValueString: string =
          value === 0 ? key : `${valueString}${key}`
        nextValue = Number.parseInt(nextValueString, 10)
      } else {
        const nextValueString = valueString.slice(0, -1)
        nextValue =
          nextValueString === '' ? 0 : Number.parseInt(nextValueString, 10)
      }
      if (nextValue > max) {
        return
      }

      setValue(nextValue)
    },
    [max, editValue, value]
  )

  const handleChange = useCallback(() => {
    // DUMMY TO AVOID REACT WARNING
  }, [])
  const valueDisplay = (value / 100).toFixed(2)

  return (
    <PriceBlockWrapper disabled={disabled}>
      <CurrencyInputFieldWrapper>
        <CurrencySignWrapper>$</CurrencySignWrapper>
        <PriceInput>
          <CurrencyInputField
            inputMode="numeric"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={valueDisplay}
            disabled={disabled}
          />
        </PriceInput>
      </CurrencyInputFieldWrapper>
    </PriceBlockWrapper>
  )
}

export default CurrencyInput
