import React from 'react'
import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'
import Checkmark from '@components/atoms/Checkmark'
import { Category } from '@type/main'

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
const CategorySidebarTopic = (props: {
  topics: Category[]
  addTopic: Function
  removeTopic: Function
  selectedTopics: string[]
}) => {
  const { topics, addTopic, removeTopic, selectedTopics } = props

  const handleOnClick = (id: string) => {
    if (selectedTopics.includes(id)) {
      removeTopic(id)
    } else {
      addTopic(id)
    }
  }

  return (
    <CategoryContainer>
      {topics?.map((category) => {
        return (
          <CheckboxWrapper key={category._id}>
            <Checkmark
              width="1rem"
              height="1rem"
              onClick={() => {
                handleOnClick(category._id)
              }}
              value={selectedTopics.includes(category._id)}
              borderRadius="0.2rem"
            />
            <CheckboxLabel>{category?.name?.en}</CheckboxLabel>
          </CheckboxWrapper>
        )
      })}
    </CategoryContainer>
  )
}

export default CategorySidebarTopic
