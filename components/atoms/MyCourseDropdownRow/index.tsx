import React from 'react'
import styled from '@emotion/styled'
import { ImageContainer } from 'components/atoms/DropdownEmptyRow'
import ProgressBar from 'components/molecules/ProgressBar'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  courseTitle: string
  marginBottom?: string
  image: string
  courseId: string
}

const MyCourseDropdownRowWrapper = styled.div<{
  marginBottom: string
}>`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
`

const CourseInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 1rem;
`
const CourseTitle = styled.div`
  font-size: 0.9rem;
  line-height: 1.2rem;
  text-align: left;
  text-overflow: ellipsis;
  word-break: break-word;
  overflow: hidden;
  max-height: 2.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`

const BottomCourseInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 0.5rem;
  justify-content: space-between;
`

const TimeLeftWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
`

export const Price = styled.div`
  display: flex;
  font-size: 0.9rem;
  font-family: 'RobotoBold';
`

const MyCourseDropdownRow: React.FunctionComponent<Props> = (props) => {
  const { courseTitle, marginBottom = '', image, courseId } = props
  return (
    <MyCourseDropdownRowWrapper marginBottom={marginBottom}>
      <ImageContainer>
        <Image
          quality={100}
          unoptimized={true}
          src={image}
          alt="presentationalImage"
          width={48}
          height={48}
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
      </ImageContainer>
      <CourseInfoWrapper>
        <Link
          href={`/study-course/${courseId}`}
          prefetch={true}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <CourseTitle>{courseTitle}</CourseTitle>
        </Link>
        <BottomCourseInfoWrapper>
          <ProgressBar
            value={23}
            withPercentage={true}
            height="6px"
          ></ProgressBar>
          <TimeLeftWrapper>12h 13min left</TimeLeftWrapper>
        </BottomCourseInfoWrapper>
      </CourseInfoWrapper>
    </MyCourseDropdownRowWrapper>
  )
}

export default MyCourseDropdownRow
