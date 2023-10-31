import React from 'react'
import styled from '@emotion/styled'
import RoundButton from 'components/atoms/RoundButton'
import ButtonArrow from 'public/static/icons/button-arrow-icon'
import { colors, fontFamilies } from '@configs/styles/config'
import Link from 'next/link'
import RoundedButton from '@components/atoms/Button'
import { useTranslation } from 'react-i18next'
import ButtonWithIcon from '../ButtonWithIcon'

type ContinueCourseButtonProps = {
  courseId: string | undefined
  ViewMode:
    | 'coursePage'
    | 'verticalCard'
    | 'horizontalCard'
    | 'responsiveCoursePage'
    | 'CourseInfoWindow'
}

const ContinueButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5px;
`

const ContinueButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit; // or any color you want

    &:visited {
      color: inherit; // or any color you want
    }

    &:hover {
      color: inherit; // or any color you want
      text-decoration: none;
    }

    &:active {
      color: inherit; // or any color you want
    }
  }
`
/**
 * ContinueLearningButton is a React component that provides a button for a user to continue with a course.
 *
 * @param {'coursePage'|'verticalCard'|'horizontalCard'|'responsiveCoursePage'} ViewMode - The display mode of the button: 'coursePage'|'verticalCard'|'horizontalCard'|'responsiveCoursePage'
 * @param {string|undefined} courseId - The unique ID of the course, if available.
 */

const ContinueLearningButton: React.FC<ContinueCourseButtonProps> = ({
  ViewMode,
  courseId,
}) => {
  const { t } = useTranslation('courses')

  const link = courseId ? `/study-course/${courseId}` : ''
  const continueTitle = t('strings.Continue')
  const ContinueLearningTitle = t('strings.Continue learning')

  switch (ViewMode) {
    case 'coursePage':
      return (
        <>
          <Link href={link} passHref>
            <RoundedButton
              marginTop=".5rem"
              width="100%"
              height="3rem"
              text={ContinueLearningTitle}
              fontSize="0.8rem"
              fontFamily="RobotoBold"
              backgroundColor={colors.uguBlue}
            />
          </Link>
        </>
      )
    case 'verticalCard':
      return (
        <ContinueButtonsWrapper
          style={{
            marginBottom: '.3rem',
            backgroundColor: 'rgba(228, 231, 255, 1)',
            fontFamily: fontFamilies.medium,
            padding: 5,
            borderRadius: 8,
            width: 109,
          }}
        >
          <Link
            href={link}
            passHref
            style={{
              width: '100%',
            }}
          >
            <ContinueButton
              style={{
                color: '#7b8aff',
                fontSize: 14,
                textAlign: 'center',
                width: '100%',
              }}
            >
              {continueTitle}
            </ContinueButton>
          </Link>
          {/* <Link href={link} passHref>
            <RoundButton
              color={colors.uguWhite}
              height="1.7rem"
              width="1.7rem"
              border="1px solid #1A1E3D"
            >
              <ButtonArrow width="8px" />
            </RoundButton>
          </Link> */}
        </ContinueButtonsWrapper>
      )
    case 'horizontalCard':
      return (
        <ContinueButtonsWrapper>
          <Link href={link} passHref>
            <ContinueButton>{continueTitle}</ContinueButton>
          </Link>
          <Link href={link} passHref>
            <RoundButton
              color={colors.uguWhite}
              height="1.7rem"
              width="1.7rem"
              border="1px solid #1A1E3D"
            >
              <ButtonArrow width="8px" />
            </RoundButton>
          </Link>
        </ContinueButtonsWrapper>
      )
    case 'responsiveCoursePage':
      return (
        <>
          <Link href={link} passHref>
            <ButtonWithIcon
              icon={<ButtonArrow />}
              text={ContinueLearningTitle}
              border={true}
              backgroundColor="rgba(0,0,0,0)"
            />
          </Link>
        </>
      )
    case 'CourseInfoWindow':
      return (
        <>
          <Link href={link} passHref style={{ width: '100%' }}>
            <RoundedButton
              marginTop=".5rem"
              width="100%"
              height="2.25rem"
              text={ContinueLearningTitle}
              fontSize="0.7rem"
              fontFamily="RobotoBold"
              backgroundColor={colors.uguBlue}
            />
          </Link>
        </>
      )
  }
}

export default ContinueLearningButton
