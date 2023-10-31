import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ProgressBar from 'components/molecules/ProgressBar'
import { CourseVersion } from 'types/course'
import Link from 'next/link'
import Image from 'next/image'
import ContinueLearningButton from '../ContinueLearningButton/ContinueLearningButton'
import { fontFamilies } from '@configs/styles/config'

type MyCourseProps = {
  course?: CourseVersion //won't be optional in the future
  marginBottom?: string
  progress?: any
}

const MyCourseWrapper = styled.div<{ marginBottom: string }>`
  height: 10rem;
  width: 100%;
  display: flex;
  min-width: 31rem;
  flex-direction: row;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};

  @media (max-width: 530px) {
    min-width: 0;
    width: 95vw;
    flex-direction: column;
    height: auto;
  }
`

const ImageWrapper = styled.div`
  min-width: 43%;

  @media (max-width: 530px) {
    height: 10rem;
  }
`

const MyCourseInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
  border-radius: 0 15px 15px 0;
  padding: 0.5rem 0rem 0.5rem 1.3rem;
  box-sizing: border-box;
  padding-right: 20px;
  max-width: 57%;
  justify-content: space-between;
  @media (max-width: 530px) {
    max-width: 100%;
    padding: 0.5rem 0.7rem 0.5rem 0.7rem;
    gap: 1rem;
  }
`

//better use another tag for semantic
const Title = styled.div`
  color: black;
  word-wrap: break-word;
  width: 100%;
  height: 48px;
  font-size: 1.05rem;
  font-family: ${fontFamilies.medium};
`

const MyCourse: React.FC<MyCourseProps> = (props) => {
  const { marginBottom = '', course, progress } = props
  const link = course?._id ? `/study-course/${course?._id}` : ''
  const [imageStyle, setImageStyle] = useState<Object>({
    minWidth: '100%',
    height: '100%',
    backgroundColor: 'rgba(228, 231, 255, 1)',
    borderRadius: '15px',
    objectFit: 'cover',
  })
  const [presentImage, setPresentImage] = useState(
    course?.presentationalImage || ''
  )
  const [progressCalc, setProgressCalc] = useState(0)
  const [time, setTime] = useState(0)
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const courseProgress = progress[course?._id || '']
    let totalProgress = 0
    let totalTime = 0
    if (courseProgress) {
      courseProgress.lectures.forEach((lecture) => {
        if (lecture.done) {
          totalProgress++
        } else {
          totalTime += lecture.watchTime
        }
      })
      setProgressCalc((totalProgress * 100) / courseProgress.lectures.length)
      setTime(totalTime)
    }
  }, [])

  useEffect(() => {
    const hhmm = new Date((time || 0) * 1000)
      .toISOString()
      .substring(11, 16)
      .split(':')
    const tmstr = parseInt(hhmm[0]) + 'h ' + parseInt(hhmm[1]) + 'm'
    setTimeStr(tmstr)
  }, [time])

  return (
    <Link
      href={link}
      passHref
      style={{ width: '100%', minWidth: '25rem', flex: '1 1 0' }}
    >
      <MyCourseWrapper marginBottom={marginBottom}>
        <ImageWrapper>
          <Image
            src={presentImage}
            alt={'My courses'}
            width={250}
            height={250}
            style={imageStyle}
            onError={() => {
              setPresentImage('/static/images/placeholder.svg')
              setImageStyle({
                minWidth: '100%',
                height: '100%',
                padding: '50px',
                backgroundColor: 'rgba(228, 231, 255, 1)',
                borderRadius: '15px',
              })
            }}
          />
        </ImageWrapper>
        <MyCourseInfoWrapper>
          <Link
            href={{ pathname: '/course-page', query: { id: course?._id } }}
            prefetch={false}
            style={{ width: '100%' }}
          >
            <Title>
              {course &&
                (course?.title
                  ? course?.title.slice(0, 43) +
                    (course?.title.length > 43 ? '...' : '')
                  : 'No title...')}
            </Title>
          </Link>
          <ProgressBar value={progressCalc} />
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 16, fontFamily: fontFamilies.medium }}>
                {progressCalc ? progressCalc.toFixed(0) : 0}% Completed
              </div>
              <div style={{ fontSize: 14 }}>{timeStr} left</div>
            </div>
            <ContinueLearningButton
              ViewMode="verticalCard"
              courseId={course?._id}
            />
          </div>
        </MyCourseInfoWrapper>
      </MyCourseWrapper>
    </Link>
  )
}

export default MyCourse
