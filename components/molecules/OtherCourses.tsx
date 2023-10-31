import React from 'react'
import styled from '@emotion/styled'
import GroupedCourses from '../atoms/GroupedCourses'
import VerticalCourse from './VerticalCourse'
import { useTranslation } from 'react-i18next'

type Props = {
  title?: string
}

const OtherCoursesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  color: #1a1e3d;
`

const Title = styled.div`
  font-size: 1.25rem;
  margin-bottom: 2rem;
`

const OtherCourses: React.FunctionComponent<Props> = () => {
  const { t } = useTranslation(['otherCourses'])
  return (
    <OtherCoursesWrapper>
      <Title>{t('Authors Other Courses')}</Title>
      <GroupedCourses>
        <VerticalCourse></VerticalCourse>
        <VerticalCourse></VerticalCourse>
        <VerticalCourse></VerticalCourse>
      </GroupedCourses>
    </OtherCoursesWrapper>
  )
}

export default OtherCourses
