import styled from '@emotion/styled'
import IconTextBlock from 'components/atoms/IconText'
import { BorderRadius, colors } from 'configs/styles/config'
import React from 'react'
import { CoursePrice } from 'types/course'

type CoursePriceSelectorProps = {
  id: string
  type: CoursePrice
  selected?: boolean
  onClick: () => void
  disabled?: boolean
}

const priceLabels = {
  smart: 'Smart Price (recommended)',
  custom: 'Custom Price',
}

const CoursePriceSelectorWrapper = styled.div<{
  selected: boolean
  type: CoursePrice
  disabled: boolean
}>`
  display: flex;
  /* border: 1px solid ${colors.uguLightGrey}; */
  border: 1px solid
    ${(props) =>
      props.disabled
        ? colors.uguLightGrey
        : props.selected
        ? colors.uguBrightPurple
        : colors.uguLightGrey};
  height: 2.6rem;
  border-radius: 30px;
  align-items: center;
  padding: 0 0.75rem;
  background: ${(props) =>
    props.disabled ? colors.uguLightLightGrey : '#FFFFFF'};
  color: ${(props) =>
    props.disabled ? colors.uguLightGrey : colors.uguPurple};
  :hover {
    cursor: pointer;
  }
`

const RadioBtnWrapper = styled.div<{ selected: boolean; disabled: boolean }>`
  display: flex;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: ${BorderRadius.round};
  border: 1px solid
    ${(props) =>
      props.disabled
        ? colors.uguLightGrey
        : props.selected
        ? colors.uguBrightPurple
        : colors.uguLightGrey};
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
  flex-shrink: 0;
`
const InnerCircle = styled.div`
  display: flex;
  height: 0.75rem;
  width: 0.75rem;
  border-radius: ${BorderRadius.round};
  background-color: ${colors.uguBrightPurple};
`

const CoursePriceSelector: React.FC<CoursePriceSelectorProps> = (props) => {
  const { id, type, selected = false, onClick, disabled = false } = props
  return (
    <CoursePriceSelectorWrapper
      id={id}
      onClick={() => (disabled ? {} : onClick())}
      selected={selected}
      type={type}
      disabled={disabled}
    >
      <RadioBtnWrapper selected={selected} disabled={disabled}>
        {selected && <InnerCircle />}
      </RadioBtnWrapper>
      <IconTextBlock
        iconWidth="0px"
        iconHeight="0px"
        text={priceLabels[type]}
        marginBetween="0.5rem"
        fontSize="0.875rem"
        opacity="1"
        disabled={disabled}
        color={disabled ? colors.uguLightGrey : colors.uguPurple}
      />
    </CoursePriceSelectorWrapper>
  )
}

export default CoursePriceSelector
