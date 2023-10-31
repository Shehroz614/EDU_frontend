import { colors, fontFamilies } from '@configs/styles/config'
import styled from '@emotion/styled'
import CloseIcon from '@public/static/icons/close-icon'
import MinusIconRounded from '@public/static/icons/minus-icon-rounded'
import PlusIconRounded from '@public/static/icons/plus-icon-rounded'
import { formatNumber } from '@utils/formatNumber'
import { isNumber } from '@utils/isNumber'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

type SetEstimatesPopUpProps = {
  students: number
  price: number
  onApply: (students: number, price: number) => void
  onClose: () => void
}

const PopUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`
const PopUpWHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0.5rem 0;
`
const PopUpWHeaderTitle = styled.div`
  display: flex;
  font-family: ${fontFamilies.bold};
  font-size: 1rem;
  margin: auto;
  align-self: center;
`
const HeaderSeparator = styled.div`
  height: 1px;
  border-bottom: 1px solid ${colors.uguLighterGrey};
  width: 30rem;
`
const PopUpWHeaderCloseButton = styled.div`
  display: flex;
  border: 1px solid ${colors.uguPurple};
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 1.15rem;
  height: 1.15rem;
  :hover {
    cursor: pointer;
  }
`
const PopUpBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`
const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18rem;
  margin-bottom: 2rem;
`
const ButtonWrapper = styled.button<{
  disabled: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  min-height: 1.75rem;
  min-width: 1.75rem;
  max-width: 1.75rem;
  max-height: 1.75rem;
  border-radius: 100%;
  border-color: ${colors.uguPurple};
  opacity: ${(props) => (props.disabled ? 0.3 : 0.6)};
  transition: opacity 0.2s ease-in-out;
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  @media (min-width: 768px) {
    :hover {
      opacity: ${(props) => (props.disabled ? 0.3 : 1)};
      cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    }
    :focus {
    }
    :active {
      opacity: ${(props) => (props.disabled ? 0.3 : 1)};
      border: 1px solid;
    }
  }
  :focus {
    opacity: ${(props) => (props.disabled ? 0.3 : 0.6)};
  }
  :active {
    border: 1px solid;
    opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  }
`
const InputFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-family: ${fontFamilies.bold};
`

const InputField = styled.input`
  display: flex;
  border: 1px solid;
  border-radius: 10px;
  text-align: center;
  height: 3rem;
  width: 10rem;
  margin: 0 1.5rem;
  border-color: ${colors.uguLightGrey};
  :hover {
    border-color: ${colors.uguPurple};
  }
  :focus {
    border-color: ${colors.uguPurple};
    border: 2px solid;
  }
`
const InputFieldLabel = styled.div`
  display: flex;
  font-family: ${fontFamilies.bold};
  font-size: 0.8rem;
  margin-top: 0.25rem;
`

const MinimumPriceWrapper = styled.div`
  font-size: 0.75rem;
  font-family: ${fontFamilies.bold};
  color: ${colors.uguDarkGrey};
  height: 1rem;
  text-align: center;
`

const PopUpWFooter = styled.div`
  display: flex;
`
const ApplyButtonWrapper = styled.div`
  display: flex;
  color: white;
  background: ${colors.uguBrightPurple};
  font-family: ${fontFamilies.medium};
  font-size: 1rem;
  margin-top: 2rem;
  border-radius: 10px;
  padding: 0.75rem 2.5rem;
  @media (min-width: 360px) {
    padding: 0.75rem 4.5rem;
  }

  :hover {
    cursor: pointer;
  }
`

const STUDENTS_STEP = 100
const PRICE_STEP = 2
const BASE_PRICE = 12.99
const MAX_STUDENTS = 9999999
const MAX_COURSE_PRICE = 9999.99

const formatNumberString = (str: string) => {
  // Remove existing commas
  str = str.replace(/,/g, '')

  const numberValue = parseFloat(str)

  // Round to two decimal places
  const fixedValue = numberValue.toFixed(2)

  // Split the integer and decimal parts
  const parts = fixedValue.split('.')

  // Add commas to the integer part using a regular expression
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return parts.join('.')
}

const SetEstimatesPopUp: React.FC<SetEstimatesPopUpProps> = (props) => {
  const { students, price, onApply, onClose } = props
  const [studentsQty, setStudentsQty] = useState<number>(students)
  const [priceQty, setPriceQty] = useState<number>(price)
  const { t } = useTranslation()

  const increaseStudents = () => {
    const newStudentQty = Number((studentsQty + STUDENTS_STEP).toFixed(2))
    if (newStudentQty > MAX_STUDENTS) {
      return
    }
    setStudentsQty(newStudentQty)
  }

  const decreaseStudents = () => {
    const newStudentQty = Number((studentsQty - STUDENTS_STEP).toFixed(2))
    if (newStudentQty <= 0) {
      return
    }
    setStudentsQty(newStudentQty)
  }

  const increasePrice = () => {
    const newPriceQty = Number((priceQty + PRICE_STEP).toFixed(2))
    if (newPriceQty > MAX_COURSE_PRICE) {
      setPriceQty(BASE_PRICE)
    } else {
      setPriceQty(newPriceQty)
    }
  }

  const decreasePrice = () => {
    const newPriceQty = Number((priceQty - PRICE_STEP).toFixed(2))
    console.log('newPriceQty', newPriceQty)
    if (newPriceQty <= BASE_PRICE) {
      setPriceQty(BASE_PRICE)
    } else {
      setPriceQty(newPriceQty)
    }
  }

  const applyChangesClicked = () => {
    onApply(studentsQty, priceQty)
  }

  const onPriceChange = (e: React.FormEvent<HTMLInputElement>) => {
    const convertToNumber =
      e.currentTarget.value &&
      e.currentTarget.value
        .replace('$', '')
        .replace(',', '')
        .replace(/[^\d]/g, '')
    console.log('convertToPrice', convertToNumber)
    console.log('isNumber', isNumber(convertToNumber))
    if (isNumber(convertToNumber)) {
      const numberValue = parseFloat(convertToNumber) / 100
      if (numberValue <= BASE_PRICE) {
        setPriceQty(BASE_PRICE)
      } else if (numberValue > MAX_COURSE_PRICE) {
        setPriceQty(MAX_COURSE_PRICE)
      } else {
        setPriceQty(Number(numberValue))
      }
    }
  }

  const onStudentQtyChange = (e: React.FormEvent<HTMLInputElement>) => {
    const convertToNumber =
      e.currentTarget.value &&
      e.currentTarget.value
        .replace('$', '')
        .replace(',', '')
        .replace(/[^\d]/g, '')
    if (isNumber(convertToNumber)) {
      const numberValue = Number(convertToNumber)
      if (numberValue > MAX_STUDENTS) {
        setStudentsQty(Number(MAX_STUDENTS))
      } else {
        setStudentsQty(numberValue)
      }
    }
  }

  return (
    <PopUpWrapper>
      <PopUpWHeader>
        <PopUpWHeaderTitle>
          {t('setYourEstimates', { ns: 'aboutAuthor' })}
        </PopUpWHeaderTitle>
        <PopUpWHeaderCloseButton onClick={() => onClose()}>
          <CloseIcon
            width="0.625rem"
            height="0.625rem"
            backgroundColor={'none'}
          />
        </PopUpWHeaderCloseButton>
      </PopUpWHeader>
      <HeaderSeparator />
      <PopUpBody>
        <ControlWrapper key="student-controll">
          <InputFieldWrapper>
            <ButtonWrapper
              key={'student-decrease'}
              role={'button'}
              onClick={decreaseStudents}
              disabled={studentsQty - STUDENTS_STEP < 0}
            >
              <MinusIconRounded width={'0.6rem'} height={'0.6rem'} />
            </ButtonWrapper>
            <InputField
              key="student-qty-input"
              type="text"
              inputMode="numeric"
              value={formatNumber(Number(studentsQty))}
              onChange={onStudentQtyChange}
            />
            <ButtonWrapper
              key={'student-increase'}
              role={'button'}
              onClick={increaseStudents}
              disabled={studentsQty >= MAX_STUDENTS}
            >
              <PlusIconRounded width={'0.6rem'} height={'0.6rem'} />
            </ButtonWrapper>
          </InputFieldWrapper>
          <InputFieldLabel>
            {t('students', { ns: 'aboutAuthor' })}
          </InputFieldLabel>
        </ControlWrapper>
        <ControlWrapper key="price-controll">
          <InputFieldWrapper>
            <ButtonWrapper
              key={'price-decrease'}
              role={'button'}
              onClick={decreasePrice}
              disabled={priceQty - PRICE_STEP < BASE_PRICE}
            >
              <MinusIconRounded width={'0.6rem'} height={'0.6rem'} />
            </ButtonWrapper>
            <InputField
              key="price-input"
              inputMode="numeric"
              type="text"
              value={'$' + formatNumberString(priceQty.toString())}
              onChange={onPriceChange}
            />
            <ButtonWrapper
              key={'price-increase'}
              role={'button'}
              onClick={increasePrice}
              disabled={priceQty >= MAX_COURSE_PRICE}
            >
              <PlusIconRounded width={'0.6rem'} height={'0.6rem'} />
            </ButtonWrapper>
          </InputFieldWrapper>

          <InputFieldLabel>{t('price', { ns: 'aboutAuthor' })}</InputFieldLabel>
        </ControlWrapper>
        <MinimumPriceWrapper>
          {priceQty <= BASE_PRICE &&
            t('minimumPriceMessage', { ns: 'aboutAuthor' })}
        </MinimumPriceWrapper>
      </PopUpBody>
      <PopUpWFooter>
        <ApplyButtonWrapper onClick={() => applyChangesClicked()}>
          {t('updateYourEstimate', { ns: 'aboutAuthor' })}
        </ApplyButtonWrapper>
      </PopUpWFooter>
    </PopUpWrapper>
  )
}

export default SetEstimatesPopUp
