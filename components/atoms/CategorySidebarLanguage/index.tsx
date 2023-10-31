import React from 'react'
import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'
import Checkmark from '@components/atoms/Checkmark'

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
export default function CategorySidebarLanguage() {
  return (
    <CategoryContainer>
      <CheckboxWrapper>
        <Checkmark
          width="1rem"
          height="1rem"
          onClick={() => {}}
          value={false}
          borderRadius="0.2rem"
        />
        <CheckboxLabel>All languages</CheckboxLabel>
      </CheckboxWrapper>
      <CheckboxWrapper>
        <Checkmark
          width="1rem"
          height="1rem"
          onClick={() => {}}
          value={false}
          borderRadius="0.2rem"
        />
        <CheckboxLabel>English</CheckboxLabel>
      </CheckboxWrapper>
      <CheckboxWrapper>
        <Checkmark
          width="1rem"
          height="1rem"
          onClick={() => {}}
          value={false}
          borderRadius="0.2rem"
        />
        <CheckboxLabel>Spanish</CheckboxLabel>
      </CheckboxWrapper>
      <CheckboxWrapper>
        <Checkmark
          width="1rem"
          height="1rem"
          onClick={() => {}}
          value={false}
          borderRadius="0.2rem"
        />
        <CheckboxLabel>Ukranian</CheckboxLabel>
      </CheckboxWrapper>
    </CategoryContainer>
  )
}
