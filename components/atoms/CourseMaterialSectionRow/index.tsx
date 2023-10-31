import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import CourseSectionRowIcon from '../../../public/static/icons/course-section-row-icon'
import CourseSectionRowIconOpen from '../../../public/static/icons/course-section-row-icon-open'
import { Content, Course, Lecture, Section } from '@ugu/types'
import VideoTypeLectureIcon from 'public/static/icons/video-content-type-icon'
import ContentTypeLectureIcon from 'public/static/icons/text-section-icon'
import TestTypeLectureIcon from 'public/static/icons/quiz-section-icon'
import { secondsToHms } from 'helpers/secondsToHms'
import { colors } from 'configs/styles/config'
import { getCourseLectureContent } from '@services/api/course'
import VideoPlayerModal from '@components/organisms/VideoPlayerModal'
import TextPreviewModal from '@components/organisms/TextPreviewModal'
import { useTranslation } from 'react-i18next'

type Props = {
  fontSize?: string
  section: Section
  course: Course
  iconWidth?: string
  iconHeight?: string
  course_id?: string
}

type LectureRowProps = {
  lecture: Lecture
  course: Course
  section: Section
  course_id?: string
}

const CourseMaterialSectionRowWrapper = styled.li`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  /* width: 100%; */
`

export const SectionRowWrapper = styled.div`
  display: flex;
  padding: 1rem;
  font-size: '14px';
  color: #1a1e3d;
  /* justify-content: space-between; */
  border-radius: 10px;
  background-color: rgba(107, 181, 201, 0.05);
  align-items: center;
  cursor: pointer;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
`

export const Icon = styled.div<{ iconWidth: string; iconHeight: string }>`
  width: ${(props) => (props.iconWidth ? props.iconWidth : '1.375rem')};
  height: ${(props) => (props.iconHeight ? props.iconHeight : '1.375rem')};
  display: flex;
`
export const Text = styled.text<{
  width?: string
  opacity?: string
}>`
  width: ${(props) => (props.width ? props.width : '60%')};
  margin-left: 1rem;
  opacity: ${(props) => (props.opacity ? props.opacity : '')};
  word-wrap: break-word;
  overflow: hidden;
`
const LectureQty = styled.div`
  opacity: 0.31;
  margin-right: 2rem;
  margin-left: 1rem;
`
export const TotalTime = styled.div`
  margin-left: auto;
  margin-right: 1rem;
  width: 4rem;
  text-align: left;
`

const LecturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`

const LecturesList = styled.ul`
  list-style-type: none;
`

const LectureRowContainer = styled.li<{ active?: boolean }>`
  display: flex;
  font-size: 0.9rem;
  flex-direction: row;
  align-items: center;
  margin-left: 2rem;
  padding: 0.7rem 1rem;
  cursor: default;
  overflow: hidden;
  @media (max-width: 600px) {
    margin-left: 0px;
  }
`

const LectureSeparatorLine = styled.div`
  border-bottom: solid 1px rgba(151, 151, 151, 0.07);
  margin: 0rem 1rem;
`

const IconWrapper = styled.div`
  display: flex;
  width: 1.2rem;
  height: 1.2rem;
  justify-content: center;
  align-items: center;
`
const PreviewButton = styled.div`
  margin-right: 1rem;
  margin-left: auto;
  color: rgba(107, 181, 201, 1);
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
  @media (max-width: 600px) {
    display: none;
  }
`

// const MobilePreview = styled.div`
//   margin-right: 1rem;
//   margin-left: 1rem;
//   margin-bottom: 1rem;
//   background-color: rgba(107, 181, 201, 1);
//   color: white;
//   max-width: max-content;
//   padding: 0.1rem 0.3rem;
//   border-radius: 0.3rem;
//   :hover {
//     cursor: pointer;
//     text-decoration: underline;
//   }
//   @media(min-width: 600px){
//     display: none;
//   }
// `
// const MobilePreviewWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: flex-end;
// `

const LectureRow: React.FunctionComponent<LectureRowProps> = (props) => {
  const { lecture, course, section, course_id } = props
  const [hovered, setHovered] = useState(false)

  const [previewModalContent, setPreviewModalContent] = useState<string | null>(
    null
  )
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false)
  const [previewModalType, setPreviewModalType] = useState<string | null>(null)

  const getIcon = () => {
    switch (lecture?.content?.type) {
      case 'video':
        return <VideoTypeLectureIcon />
      case 'text':
        return <ContentTypeLectureIcon />
      case 'test':
        return <TestTypeLectureIcon />
      default:
        return <p>Icon</p>
    }
  }

  const closePreviewModal = () => {
    setShowPreviewModal(false)
    setPreviewModalType(null)
  }

  const getPreviewModal = () => {
    switch (previewModalType) {
      case 'video':
        if (previewModalContent) {
          return (
            <VideoPlayerModal
              // courseId={course._id}
              // sectionId={section._id}
              // lectureId={lecture._id}
              // contentId={lecture.content._id}
              onClose={closePreviewModal}
              videoName={lecture.title}
              videoLink={previewModalContent}
              autoplay={true}
            />
          )
        }
        break
      case 'text':
        if (previewModalContent) {
          return (
            <TextPreviewModal
              onClose={closePreviewModal}
              value={previewModalContent}
            />
          )
        }
        break
    }
  }

  const previewBtnHandler = () => {
    console.log('Preview test course', course)
    getCourseLectureContent(
      course_id || '',
      course.liveVersion || 1,
      section._id,
      lecture._id,
      lecture.content._id,
      false
    ).then((content: Content) => {
      console.log('Content Res: ', content)
      setPreviewModalType(content.type)
      if (content.type === 'video') {
        if (content.public.url !== undefined && content.public.url !== '') {
          setPreviewModalContent(content.public.url)
          setShowPreviewModal(true)
        } else if (content.public.urls) {
          setPreviewModalContent(content.public.urls as any)
          setShowPreviewModal(true)
        }
      } else if (content.type === 'text') {
        setPreviewModalContent(content.content)
        setShowPreviewModal(true)
      }
    })
  }

  useEffect(() => {
    console.log('lecture,', lecture)
  }, [])

  return (
    <>
      <LectureRowContainer
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <IconWrapper>{getIcon()}</IconWrapper>
        <Text
          width="20rem"
          opacity={hovered ? '1' : '0.9'}
          style={{ color: lecture.preview ? colors.uguBlue : 'black' }}
        >
          {lecture.title ? lecture.title : 'No title'}
        </Text>
        {lecture.preview && (
          <PreviewButton onClick={() => previewBtnHandler()}>
            Preview
          </PreviewButton>
        )}
        <TotalTime>{secondsToHms(lecture?.content?.duration)}</TotalTime>
        {showPreviewModal && getPreviewModal()}
      </LectureRowContainer>
    </>
  )
}

const CourseMaterialSectionRow: React.FunctionComponent<Props> = (props) => {
  const { section, course, iconWidth = '', iconHeight = '', course_id } = props
  const [isOpen, setIsOpen] = useState(false)
  const [totalTime, setTotalTime] = useState<number>(0)

  useEffect(() => {
    let totalTime = 0
    section.lectures.forEach((lecture) => {
      totalTime = totalTime + lecture?.content?.duration
    })
    setTotalTime(totalTime)
  }, [section])

  const getLectures = () => {
    return section.lectures.map((lecture, index) => {
      return (
        <>
          <LectureRow
            lecture={lecture}
            course={course}
            section={section}
            key={lecture._id}
            course_id={course_id}
          />
          {index !== section.lectures.length - 1 && (
            <LectureSeparatorLine key={lecture._id + 'separator'} />
          )}
        </>
      )
    })
  }

  const { t } = useTranslation(['courseMaterials'])

  return (
    <CourseMaterialSectionRowWrapper>
      <SectionRowWrapper
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <Icon iconWidth={iconWidth} iconHeight={iconHeight}>
          {isOpen ? <CourseSectionRowIconOpen /> : <CourseSectionRowIcon />}
        </Icon>
        <Text
          style={{
            overflow: isOpen ? 'visible' : 'hidden',
          }}
        >
          {section.title ? section.title : 'Undefined'}
        </Text>
        {!isOpen && (
          <LectureQty>
            {section.lectures.length > 0
              ? section.lectures.length + ' ' + t('lectures')
              : 'No lectures'}
          </LectureQty>
        )}
        <TotalTime>{secondsToHms(totalTime)}</TotalTime>
      </SectionRowWrapper>
      {isOpen && (
        <LecturesContainer>
          <LecturesList>{getLectures()}</LecturesList>
        </LecturesContainer>
      )}
    </CourseMaterialSectionRowWrapper>
  )
}

export default CourseMaterialSectionRow
