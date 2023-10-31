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
  margin-left: 0;
`
const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  padding-left: 0;
  align-items: center;
`
const CheckboxLabel = styled.label`
  color: ${colors.uguPurple};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin-left: 0.8rem;
`
const CategorySidebarDifficulty = (props: {
  selectedDifficulties: string[]
  addDifficultyHandler: Function
  removeDifficultyHandler: Function
}) => {
  const {
    selectedDifficulties,
    addDifficultyHandler,
    removeDifficultyHandler,
  } = props

  const handleOnClick = (difficulty: string) => {
    if (selectedDifficulties.includes(difficulty)) {
      removeDifficultyHandler(difficulty)
    } else {
      addDifficultyHandler(difficulty)
    }
  }

  return (
    <CategoryContainer>
      <CheckboxWrapper>
        <Checkmark
          width="1rem"
          height="1rem"
          onClick={() => {
            handleOnClick('all')
          }}
          value={selectedDifficulties.includes('all')}
          borderRadius="0.2rem"
          opacity={1}
        />
        <CheckboxLabel>All levels</CheckboxLabel>
      </CheckboxWrapper>
      <CheckboxWrapper>
        <Checkmark
          width="1rem"
          height="1rem"
          onClick={() => {
            handleOnClick('beginner')
          }}
          value={selectedDifficulties.includes('beginner')}
          borderRadius="0.2rem"
        />
        <CheckboxLabel>Beginner</CheckboxLabel>
      </CheckboxWrapper>
      <CheckboxWrapper>
        <Checkmark
          width="1rem"
          height="1rem"
          onClick={() => {
            handleOnClick('intermediate')
          }}
          value={selectedDifficulties.includes('intermediate')}
          borderRadius="0.2rem"
        />
        <CheckboxLabel>Intermediate</CheckboxLabel>
      </CheckboxWrapper>
      <CheckboxWrapper>
        <Checkmark
          width="1rem"
          height="1rem"
          onClick={() => {
            handleOnClick('expert')
          }}
          value={selectedDifficulties.includes('expert')}
          borderRadius="0.2rem"
        />
        <CheckboxLabel>Expert</CheckboxLabel>
      </CheckboxWrapper>
    </CategoryContainer>
  )
}

export default CategorySidebarDifficulty
