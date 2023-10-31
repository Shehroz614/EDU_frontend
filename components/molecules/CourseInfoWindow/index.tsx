// @ts-nocheck
import React from 'react'
import CheckMarkIcon from '@public/static/icons/checkmark-icon'
import Button from 'components/atoms/Button'
import IconTextBlock from 'components/atoms/IconText'
import { ShortCourse } from '@type/course'
import { useWindowSize } from 'react-use'
import { colors } from '@configs/styles/config'
import BulletIcon from '@public/static/icons/bullet-icon'
import {
  CourseInfoMainWrapper,
  CourseInfoWindowWrapper,
  ContentWrapper,
  LastUpdateText,
  TopWrapper,
  CourseKeywordsWrapper,
  Keyword,
  GeneralInfoWrapper,
  IconTextBlockWrapper,
  ShortDescription,
  CheckmarkSectionWrapper,
  LastWrapper,
} from './styled.components'
import IfOwnedCourse from '@components/atoms/IfOwnedCourse/IfOwnedCourse'
import ContinueLearningButton from '@components/atoms/ContinueLearningButton/ContinueLearningButton'
import ProgressBar from '../ProgressBar'

type CourseInfoWindow = {
  setCourseXPos?: number
  addToCart: (course: ShortCourse) => void
  course: ShortCourse
}

// TODO - FIX STATIC DATA
const CourseInfoWindow: React.FC<CourseInfoWindow> = (props) => {
  const { setCourseXPos, addToCart, course } = props
  const { width: windowWidth } = useWindowSize()

  return (
    <CourseInfoMainWrapper
      pos={windowWidth / 2 > (setCourseXPos ? setCourseXPos : 0) + 105}
    >
      <CourseInfoWindowWrapper>
        <ContentWrapper>
          {/* <TopWrapper>
            <LastUpdateText>{}</LastUpdateText>
          </TopWrapper> */}
          {/* <CourseTitle>
                Software Testing for Beginners. Web, Mobile, API. (QA/QC)
              </CourseTitle> */}

          <ShortDescription>{course.shortCourseDescription}</ShortDescription>
          <GeneralInfoWrapper>
            {/* <IconTextBlockWrapper>
                  <IconTextBlock
                    icon={
                      <BulletIcon width="0.4rem" color={colors.uguPurple} />
                    }
                    text="Bestseller"
                    marginBetween="0.25rem"
                    // iconWidth="0.8rem"
                    // iconHeight="0.9rem"
                    iconWidth="0.5rem"
                    iconHeight="0.5rem"
                    fontSize="0.75rem"
                    opacity="1"
                    fontFamily={fontFamilies.bold}
                  />
                </IconTextBlockWrapper> */}
            {/* <IconTextBlockWrapper>
              <IconTextBlock
                icon={<BulletIcon width="0.4rem" color={colors.uguPurple} />}
                text={course?.level}
                marginBetween="0.25rem"
                iconWidth="0.5rem"
                iconHeight="0.5rem"
                fontSize="0.75rem"
                opacity="1"
              />
            </IconTextBlockWrapper> */}
            <IconTextBlockWrapper>
              <IconTextBlock
                icon={<BulletIcon width="0.4rem" color={colors.uguPurple} />}
                text={course?.totalTime + ' Hours'}
                marginBetween="0.25rem"
                iconWidth="0.5rem"
                iconHeight="0.5rem"
                fontSize="0.75rem"
                opacity="1"
              />
            </IconTextBlockWrapper>
            <IconTextBlockWrapper>
              <IconTextBlock
                icon={<BulletIcon width="0.4rem" color={colors.uguPurple} />}
                text={course?.totalLectures + ' Lectures'}
                marginBetween="0.25rem"
                iconWidth="0.5rem"
                iconHeight="0.5rem"
                fontSize="0.75rem"
                opacity="1"
              />
            </IconTextBlockWrapper>
          </GeneralInfoWrapper>
          <CourseKeywordsWrapper>
            {course?.keywords?.map((keyword, index) => {
              return <Keyword key={(keyword, index)}>{keyword}</Keyword>
            })}
          </CourseKeywordsWrapper>
          <CheckmarkSectionWrapper>
            {course?.whatYouWillLearn?.slice(0, 3)?.map((item, index) => (
              <IconTextBlock
                icon={<CheckMarkIcon width="80%" color={colors.uguPurple} />}
                text={item}
                fontSize="0.9rem"
                lineHeight="1.1rem"
                opacity="1"
                marginBottom=".5rem"
                marginBetween="0.5rem"
                checkmark={true}
                key={item + index}
              />
            ))}
          </CheckmarkSectionWrapper>
          <LastWrapper>
            <IfOwnedCourse hide id={course._id}>
              <Button
                backgroundColor={colors.uguYellow}
                height="2.25rem"
                width="100%"
                text="Add to Cart"
                fontFamily="RobotoBold"
                fontSize="0.7rem"
                onClick={() => addToCart(course)}
              />
            </IfOwnedCourse>
            <IfOwnedCourse show id={course._id}>
              <ProgressBar value={25} />
              <ContinueLearningButton
                ViewMode="CourseInfoWindow"
                courseId={course._id}
              />
            </IfOwnedCourse>
          </LastWrapper>
        </ContentWrapper>
      </CourseInfoWindowWrapper>
    </CourseInfoMainWrapper>
  )
}

export default CourseInfoWindow
