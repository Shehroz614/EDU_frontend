import React from 'react'
import styled from '@emotion/styled'

type CourseWrapperType = {
  children: React.ReactNode
}

const CourseContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  margin-bottom: 50px;
`

const CourseWrapper: React.FC<CourseWrapperType> = ({ children }) => {
  return <CourseContainer>{children}</CourseContainer>
}

export default CourseWrapper
