import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

type Props = {
  id?: string
  title?: string
  question?: string
  author?: string
  date?: string
  lectureNumber?: string
  answered?: boolean
  icon?: ReactNode
}

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem 1rem 2rem 2rem;
  border-radius: 10px;
  background-color: rgba(248, 248, 248, 0.16);
  margin-top: 1rem;
  box-sizing: border-box;
`
const Image = styled.div`
  display: flex;
  min-width: 4rem;
  height: 4rem;
  border-radius: 20px;
  background-color: rgba(107, 181, 201, 0.25);
  margin-right: 1rem;
`
const QuestionBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
`

const QuestionUpperBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const QuestionTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const DatePosted = styled.div`
  opacity: 0.5;
`

const QuestionText = styled.div`
  opacity: 0.5;
  margin-top: 0.5rem;
  line-height: 1.5rem;
`
const BottomBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
`
const AuthorName = styled.div`
  opacity: 0.5;
`

const LectureNumber = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2rem;
  opacity: 0.5;
`
const AnswersQty = styled.div`
  margin-left: 2rem;
  opacity: 0.5;
`

const AnswerStatus = styled.div<{ answered: boolean }>`
  margin-left: auto;
  color: ${(props) => (props.answered ? colors.uguYellow : colors.uguRed)};
  font-weight: bold;
`

const CourseStudyQuestion: React.FC<Props> = () => {
  return (
    <QuestionWrapper>
      <Image></Image>
      <QuestionBlock>
        <QuestionUpperBlock>
          <QuestionTitle>How do I set up a Visual Studio</QuestionTitle>
          <DatePosted>15.05.2019</DatePosted>
        </QuestionUpperBlock>
        <QuestionText>
          Chris You really put all your heart and soul into this courseware. and
          I chose not to teach in your MBA programs, you a guy with a lot of
          conviction and truthfulness in your heart, and you poured all my stuff
          and made this course a really rewarding effort, and I learned a great
          deal.{' '}
        </QuestionText>
        <BottomBlock>
          <AuthorName>Nikolai Dulsky</AuthorName>
          <LectureNumber>Lecture 12</LectureNumber>
          <AnswersQty>No answers</AnswersQty>
          <AnswerStatus answered>Not answered</AnswerStatus>
        </BottomBlock>
      </QuestionBlock>
    </QuestionWrapper>
  )
}

export default CourseStudyQuestion
