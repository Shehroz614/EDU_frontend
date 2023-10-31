import React from 'react'
import styled from '@emotion/styled'
import LogoOnDark from '../../../public/static/icons/logo-on-dark'
import IconTextBlock from '../../atoms/IconText'
import CourseSectionRowOpenIcon from '../../../public/static/icons/course-section-row-icon-open'

const HeaderContainer = styled.div`
  height: 3rem;
  width: 100vw;
  background-color: #1a1e3d;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  box-sizing: border-box;
`

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  width: 3.5rem;
  justify-content: center;
`

const CourseTitle = styled.div`
  width: 35rem;
  display: flex;
  align-items: center;
  color: white;
  opacity: 0.85;
  margin-left: 2rem;
  font-size: 1rem;
`

const MaterialCourseButton = styled.div`
  display: flex;
  width: 23rem;
  height: 2.8rem;
  border: 1px solid #f8f8f8;
  border-radius: 10px;
  margin-left: auto;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
`

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <LogoOnDark />
      </Logo>
      <CourseTitle>
        Тестирование ПО для начинающих. Web, Mobile, API. (QA/QC)
      </CourseTitle>
      <MaterialCourseButton>
        <IconTextBlock
          icon={<CourseSectionRowOpenIcon />}
          iconHeight="1.3rem"
          iconWidth="1.3rem"
          text="Материалы курса"
          textColor="white"
          fontSize="0.875rem"
          opacity="0.85"
          marginBetween="1rem"
        ></IconTextBlock>
      </MaterialCourseButton>
    </HeaderContainer>
  )
}

export default Header
