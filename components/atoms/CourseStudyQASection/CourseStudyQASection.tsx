import React from 'react'
import styled from '@emotion/styled'
import SearchBar from '../SearchBar'
import Button from '../Button'
import { colors } from '@configs/styles/config'

type Props = {
  text?: string
}

const CourseStudyQASectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem 0;
  box-sizing: border-box;
`

const AskQuestionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CourseStudyQASection: React.FC<Props> = () => {
  return (
    <CourseStudyQASectionWrapper>
      <AskQuestionArea>
        <SearchBar text="Введите ваш вопрос" width="95%"></SearchBar>
        <Button
          width="20rem"
          height="3rem"
          text="Задать новый вопрос"
          fontWeight="bold"
          backgroundColor={colors.uguYellow}
          marginTop={'2rem'}
        ></Button>
      </AskQuestionArea>
    </CourseStudyQASectionWrapper>
  )
}

export default CourseStudyQASection
