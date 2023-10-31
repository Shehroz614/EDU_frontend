import React from 'react'
import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'
import Checkmark from '@components/atoms/Checkmark'
//import { useSearchContext } from '@contexts/Search'

const CategoryContainer = styled.label`
  font-family: ${fontFamilies.light};
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  margin: 0.25rem 1rem 0.25rem 0.5rem;
`
const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  align-items: center;
`
const CheckboxLabel = styled.label`
  color: ${colors.uguPurple};
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  margin-left: 0.8rem;
`
const CategorySidebarDuration = (props: {
  durationSelection: number
  setDurationSelection: Function
}) => {
  const { durationSelection, setDurationSelection } = props

  return (
    <CategoryContainer>
      <CheckboxWrapper>
        <Checkmark
          width="1rem"
          height="1rem"
          onClick={() => {
            setDurationSelection(0)
          }}
          value={durationSelection == 0}
          borderRadius="50%"
        />
        <CheckboxLabel>Less than 10 hours</CheckboxLabel>
      </CheckboxWrapper>
      <CheckboxWrapper>
        <Checkmark
          width="1rem"
          height="1rem"
          onClick={() => {
            setDurationSelection(1)
          }}
          value={durationSelection == 1}
          borderRadius="50%"
        />
        <CheckboxLabel>Less than 20 hours</CheckboxLabel>
      </CheckboxWrapper>
      <CheckboxWrapper>
        <Checkmark
          width="1rem"
          height="1rem"
          onClick={() => {
            setDurationSelection(2)
          }}
          value={durationSelection == 2}
          borderRadius="50%"
        />
        <CheckboxLabel>Less than 30 hours</CheckboxLabel>
      </CheckboxWrapper>
      <CheckboxWrapper>
        <Checkmark
          width="1rem"
          height="1rem"
          onClick={() => {
            setDurationSelection(3)
          }}
          value={durationSelection == 3}
          borderRadius="50%"
        />
        <CheckboxLabel>More than 30 hours</CheckboxLabel>
      </CheckboxWrapper>
    </CategoryContainer>
  )
}

export default CategorySidebarDuration
