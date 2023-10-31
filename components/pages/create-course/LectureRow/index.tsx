// @ts-nocheck
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colors } from 'configs/styles/config'

import {
  CenterNotification,
  Content,
  Course,
  Lecture,
  Section,
} from '@ugu/types'
import VideoTypeLectureIcon from 'public/static/icons/video-content-type-icon'
import ContentTypeLectureIcon from 'public/static/icons/text-section-icon'
import TestTypeLectureIcon from 'public/static/icons/quiz-section-icon'
import DraggableIcon from 'public/static/icons/draggable-icon'
import XIcon from 'public/static/icons/x-icon'
import EditIcon from 'public/static/icons/createCourseIcons/edit-icon'
import { Draggable } from 'react-beautiful-dnd'
import _ from 'lodash'
import VideoPlayerModal from 'components/organisms/VideoPlayerModal'
import { secondsToHms } from 'helpers/secondsToHms'
import PopUpCenter from 'components/organisms/PopUpCenter'
import { confirmLectureDeletion } from 'configs/constants/labels/modal-labels'
import getCourseLectureContent from '@services/api/course/getCourseLectureContent'
import TextPreviewModal from '@components/organisms/TextPreviewModal'
import { Tooltip } from '@nextui-org/react'

type LectureRowProps = {
  lecture: Lecture
  section: Section
  course: Course
  courseId: string
  showEditLecture: (lecture: Lecture, section: Section) => void
  deleteLecture: (lecture: Lecture, section: Section) => void
  index: number
  disabled: boolean
  // provided: any //for drag & drop functionality
}

const DraggableIconContainer = styled.div<{
  marginRight?: string
  marginLeft?: string
}>`
  display: flex;
  height: 2rem;
  width: 2rem;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
`

const Text = styled.text<{
  width?: string
  opacity?: string
  isDragging?: boolean
}>`
  width: ${(props) => (props.width ? props.width : '45%')};
  margin-left: 1rem;
  opacity: ${(props) =>
    props.opacity && !props.isDragging ? props.opacity : ''};
  word-wrap: break-word;
`

const EditButtonsContainer = styled.div<{
  width?: string
}>`
  display: flex;
  width: ${(props) => (props.width ? props.width : '6rem')};
`
const SideButton = styled.div`
  display: flex;
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  cursor: pointer;
`

const TotalTime = styled.div`
  margin-left: auto;
  margin-right: 1rem;
  width: 4rem;
  text-align: left;
`

const LectureRowContainer = styled.li<{
  isDragging: boolean
  hover: boolean
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin-left: 1rem; */
  padding: 0.5rem;
  /* padding: 0.5rem; */
  cursor: default;
  background-color: ${(props) => (props.hover ? '#f1f1f1' : '')};
  background-color: ${(props) => (props.isDragging ? colors.uguLightBlue : '')};
  border-radius: ${(props) => (props.hover ? '30px' : '')};
  border-radius: 30px;
  font-size: 14px;
`

const IconWrapper = styled.div`
  display: flex;
  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.5rem;
  justify-content: center;
  align-items: center;
`
const PreviewButton = styled.div`
  /* margin-right: 1rem; */
  margin-left: auto;
  color: rgba(107, 181, 201, 1);
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

function getStyle(style: any, snapshot: any) {
  if (!snapshot.isDropAnimating) {
    return style
  }
  const { moveTo, curve, duration } = snapshot.dropAnimation
  // move to the right spot
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`
  // add a bit of turn for fun
  // const rotate = 'rotate(0.5turn)'

  // patching the existing style
  return {
    ...style,
    transform: `${translate}`,
    // slowing down the drop because we can
    transition: `all ${curve} ${duration + 0.5}s`,
  }
}

//ANCHOR Lecture Row
const LectureRow: React.FunctionComponent<LectureRowProps> = (props) => {
  const {
    course,
    courseId,
    lecture,
    section,
    showEditLecture,
    deleteLecture,
    index,
    disabled = false,
    isEditDisabled = false,
  } = props
  const [hovered, setHovered] = useState(false)
  const [previewModalContent, setPreviewModalContent] = useState<string | null>(
    null
  )
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false)
  const [previewModalType, setPreviewModalType] = useState<string | null>(null)
  const [centerNotification, setCenterNotification] =
    useState<CenterNotification>()
  //show PopUpCenter
  const [showPopUp, setShowPopUp] = useState(true)

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
  //   const setShow = (value: boolean) => {
  //     setShowPreviewModal(value)
  //   }

  const previewBtnHandler = () => {
    getCourseLectureContent(
      courseId,
      course.version,
      section._id,
      lecture._id,
      lecture.content?._id,
      true
    ).then((content: Content) => {
      console.log('Content Res: ', content)
      setPreviewModalType(content.type)
      if (content.type === 'video') {
        if (content.public.urls !== undefined && content.public.urls !== '') {
          setPreviewModalContent(content.public.urls)
          setShowPreviewModal(true)
        }
      } else if (content.type === 'text') {
        setPreviewModalContent(content.content)
        setShowPreviewModal(true)
      }
    })
  }

  const closePreviewModal = () => {
    setShowPreviewModal(false)
    setPreviewModalType(null)
  }

  const deleteLectureHandler = () => {
    setShowPopUp(true)
    setCenterNotification({
      title: confirmLectureDeletion.title,
      message: confirmLectureDeletion.message,
      firstBtn: {
        title: confirmLectureDeletion.firstBtn.title,
        actionType: confirmLectureDeletion.firstBtn.actionType,
        action: () => {
          deleteLecture(lecture, section)
          setShowPopUp(false)
        },
      },
      secondBtn: {
        title: confirmLectureDeletion.secondBtn.title,
        actionType: confirmLectureDeletion.secondBtn.actionType,
        action: () => {
          setShowPopUp(false)
        },
      },
    })
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

  return (
    <>
      <Draggable
        draggableId={lecture._id}
        index={index}
        isDragDisabled={disabled}
      >
        {(provided, snapshot) => (
          <LectureRowContainer
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            hover={hovered}
            ref={provided.innerRef}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
            style={getStyle(provided.draggableProps.style, snapshot)}
          >
            <DraggableIconContainer marginRight="1rem" marginLeft="1rem">
              {(hovered || snapshot.isDragging) && <DraggableIcon />}
            </DraggableIconContainer>
            <IconWrapper>{getIcon()}</IconWrapper>
            <Text
              width="17rem"
              opacity={hovered ? '1' : '0.51'}
              isDragging={snapshot.isDragging}
            >
              {lecture.title ? lecture.title : 'Как проходить данный курс'}
            </Text>
            {lecture.preview && (
              <PreviewButton onClick={() => previewBtnHandler()}>
                Preview
              </PreviewButton>
            )}
            <TotalTime>{secondsToHms(lecture.content?.duration)}</TotalTime>
            <EditButtonsContainer>
              {disabled
                ? null
                : !isEditDisabled && (
                    <>
                      <SideButton
                        onClick={() => showEditLecture(lecture, section)}
                      >
                        <Tooltip content={'Edit Lecture'} color="invert">
                          {hovered && <EditIcon />}
                        </Tooltip>
                      </SideButton>
                      <SideButton onClick={deleteLectureHandler}>
                        <Tooltip content={'Delete Lecture'} color="invert">
                          {hovered && <XIcon />}
                        </Tooltip>
                      </SideButton>
                    </>
                  )}
            </EditButtonsContainer>
          </LectureRowContainer>
        )}
      </Draggable>
      {showPreviewModal && getPreviewModal()}
      {centerNotification && (
        <PopUpCenter
          centerNotification={centerNotification}
          showPopUp={showPopUp}
        />
      )}
    </>
  )
}

export default LectureRow
