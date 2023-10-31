// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import CourseSectionRowIcon from 'public/static/icons/course-section-row-icon'
import CourseSectionRowIconOpen from 'public/static/icons/course-section-row-icon-open'
import {
  CenterNotification,
  ContentType,
  Course,
  Lecture,
  Resource,
  Section,
} from '@ugu/types'
import DraggableIcon from 'public/static/icons/draggable-icon'
import XIcon from 'public/static/icons/x-icon'
import EditIcon from 'public/static/icons/createCourseIcons/edit-icon'
import PlusIcon from 'public/static/icons/createCourseIcons/plus-icon'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import LectureRow from '../LectureRow'
import { secondsToHms } from 'helpers/secondsToHms'
import { confirmSectionDeletion } from 'configs/constants/labels/modal-labels'
import PopUpCenter from 'components/organisms/PopUpCenter'
import styles from './styles.module.scss'
import readDroppedItems from '@utils/fileUploader'
import useUploadVideo from '@hooks/uploadFiles/useUploadPrivateVideo'
import VideoTypeLectureIcon from '@public/static/icons/video-content-type-icon'
import formatBytes from '@utils/formatBytes'
import { AnimatePresence, motion } from 'framer-motion'
import { Tooltip } from '@nextui-org/react'
import doesCourseMaterialExistsOnLive from '@helpers/doesCourseMaterialExistsOnLive'
import { useCreateCourse } from '@contexts/CreateCourse'

type SectionRowProps = {
  index: number
  fontSize?: string
  section: Section
  course: Course
  courseId: string
  iconWidth?: string
  iconHeight?: string
  disabled?: boolean
  showEditSection: (section: Section) => void
  deleteSection: (section: Section) => void
  addNewLecture: (
    sectionId: string,
    title: string,
    preview: boolean,
    contentType: ContentType,
    content: any,
    resources: Resource[],
    duration: number
  ) => void
  addNewLectureBlock: (section: Section) => void
  showEditLecture: (lecture: Lecture, section: Section) => void
  deleteLecture: (lecture: Lecture, section: Section) => void
  setBottomNotification: Function
}

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

//ANCHOR Section Row
const SectionRow: React.FunctionComponent<SectionRowProps> = (props) => {
  const {
    liveVersion,
    versions,
    abortControllers,
    addAbortController,
    removeAbortController,
  } = useCreateCourse()

  const {
    index,
    course,
    courseId,
    showEditSection,
    deleteSection,
    addNewLecture,
    addNewLectureBlock,
    showEditLecture,
    deleteLecture,
    setBottomNotification,
    disabled = false,
  } = props
  const { section, iconWidth = '', iconHeight = '' } = props
  const sectionRow = useRef<any>()

  const [totalTime, setTotalTime] = useState<number>(0)
  const [hovered, setHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredWithFile, setHoveredWithFile] = useState(false)
  const [isVideoUploading, setIsVideoUploading] = useState<boolean>(false)
  const [currentVideos, setCurrentVideos] = useState<{ [key: string]: File }>(
    {}
  )
  const [centerNotification, setCenterNotification] =
    useState<CenterNotification>()
  const [showPopUp, setShowPopUp] = useState(true)
  const dragEvent = useRef<DragEvent | null>()

  const { onPrivateFileChange, cancelMultiPartUpload } = useUploadVideo({
    courseId,
    courseVersion: course.version,
    isVideoUploading,
    setIsVideoUploading,
    setVideoContent: () => {},
    setBottomNotification,
    abortControllers,
    addAbortController,
    removeAbortController,
  })

  useEffect(() => {
    const element = sectionRow?.current
    if (element) {
      element.addEventListener('dragover', handleDrag)
      element.addEventListener('dragleave', handleDrag)
      element.addEventListener('drop', handleOver)

      return () => {
        element.removeEventListener('dragover', handleDrag)
        element.removeEventListener('dragleave', handleDrag)
        element.removeEventListener('drop', handleOver)
      }
    }
  }, [sectionRow])

  useEffect(() => {
    let totalTime = 0
    section.lectures.forEach((lecture) => {
      totalTime = totalTime + lecture.content?.duration
    })
    setTotalTime(totalTime)
  }, [section])

  const deleteSectionHandler = () => {
    setShowPopUp(true)
    const notificationMessage =
      confirmSectionDeletion.message +
      (section.lectures.length > 0
        ? section.lectures.length +
          ' Lecture(s) under this Section will be deleted as well.'
        : '')
    setCenterNotification({
      title: confirmSectionDeletion.title,
      message: notificationMessage,
      firstBtn: {
        title: confirmSectionDeletion.firstBtn.title,
        actionType: confirmSectionDeletion.firstBtn.actionType,
        action: () => {
          deleteSection(section)
          setShowPopUp(false)
        },
      },
      secondBtn: {
        title: confirmSectionDeletion.secondBtn.title,
        actionType: confirmSectionDeletion.secondBtn.actionType,
        action: () => {
          setShowPopUp(false)
        },
      },
    })
  }

  function doesLectureExistInCourse(
    course: Course,
    lectureId: string
  ): boolean {
    if (course) {
      for (const section of course.course_materials.sections) {
        for (const lecture of section.lectures) {
          if (lecture._id === lectureId) {
            return true // Lecture with the given ID exists in the course
          }
        }
      }
    }
    return false
  }

  const getLectures = () => {
    return section.lectures.map((lecture, index) => {
      return (
        <LectureRow
          lecture={lecture}
          course={course}
          courseId={courseId}
          section={section}
          key={lecture._id}
          showEditLecture={showEditLecture}
          index={index}
          deleteLecture={deleteLecture}
          disabled={disabled}
          isEditDisabled={doesLectureExistInCourse(
            versions[liveVersion],
            lecture._id
          )}
        />
      )
    })
  }

  const handleDrag = (event: DragEvent) => {
    dragEvent.current = event
    setHoveredWithFile(event.type === 'dragover')
    event.preventDefault()
  }
  const handleOver = async (event: DragEvent) => {
    event.preventDefault()
    setHoveredWithFile(false)
    setIsOpen(true)
    const data: any = await readDroppedItems(event.dataTransfer)
    if (data) {
      const ids: Array<number> = []
      // Format Files Data
      Object.keys(data).forEach((folderName: string) => {
        const files: {} | File = data[folderName]
        if (files instanceof File) {
          const id = Math.floor(Math.random() * (999 - 100 + 1) + 100)
          ids.push(id)
          setCurrentVideos((state) => ({
            ...state,
            [id]: files,
          }))
        }
      })

      // upload files/folders in sequence
      for (const folderName of Object.keys(data)) {
        const files: {} | File = data[folderName]
        // process files & ignore folders
        if (files instanceof File) {
          onPrivateFileChange(files, true).then(async (videoContent) => {
            const lectureName: string = files.name.replace(/\.[^/.]+$/, '')
            await addNewLecture(
              section._id,
              lectureName,
              false,
              'video',
              videoContent,
              [],
              videoContent.duration
            )
            const findIndex = ids[Object.keys(data).indexOf(folderName)]
            setCurrentVideos((state) => {
              const { [findIndex]: _, ...newState } = state
              return newState
            })
          })
        }
      }
    }
    return false
  }
  const handleDragAndDropCancel = async (id: Number, fileName: string) => {
    console.log(fileName)

    await cancelMultiPartUpload(fileName)
    setCurrentVideos((state) => {
      const { [id]: _, ...newState } = state
      return newState
    })
  }

  return (
    <div ref={sectionRow}>
      <Draggable
        draggableId={section._id}
        index={index}
        isDragDisabled={disabled}
      >
        {(provided, snapshot) => (
          <SectionRowDraggable
            ref={provided.innerRef}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
            style={getStyle(provided.draggableProps.style, snapshot)}
          >
            <Droppable droppableId={section._id}>
              {(provided, snapshot) => (
                <SectionRowDroppable
                  hover={hovered}
                  withFile={hoveredWithFile}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <SectionRowWrapper
                    onMouseOver={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    <DraggableIconContainer marginRight="1rem">
                      {hovered && <DraggableIcon />}
                    </DraggableIconContainer>
                    <Icon
                      iconWidth={iconWidth}
                      iconHeight={iconHeight}
                      onClick={() => {
                        setIsOpen(!isOpen)
                      }}
                    >
                      {isOpen ? (
                        <CourseSectionRowIconOpen />
                      ) : (
                        <CourseSectionRowIcon />
                      )}
                    </Icon>
                    <Text style={{ marginRight: 15, wordBreak: 'break-all' }}>
                      {section?.title ? section.title : 'Основы JavaScript'}
                    </Text>
                    {!isOpen && (
                      <LectureQty>
                        {section.lectures.length > 0
                          ? section.lectures.length + ' lectures'
                          : '0 lectures'}
                      </LectureQty>
                    )}
                    <TotalTime>
                      {totalTime ? secondsToHms(totalTime) : '00:00:00'}
                    </TotalTime>
                    <EditButtonsContainer>
                      {!disabled ? (
                        <>
                          <SideButton
                            onClick={() => addNewLectureBlock(section)}
                          >
                            <Tooltip content={'Add Lecture'} color="invert">
                              {hovered && <PlusIcon />}
                            </Tooltip>
                          </SideButton>
                          {doesCourseMaterialExistsOnLive(
                            versions[liveVersion]?.course_materials?.sections,
                            section._id
                          ) && (
                            <>
                              <SideButton
                                onClick={() => showEditSection(section)}
                              >
                                <Tooltip
                                  content={'Edit Section'}
                                  color="invert"
                                >
                                  {hovered && <EditIcon />}
                                </Tooltip>
                              </SideButton>
                              <SideButton onClick={deleteSectionHandler}>
                                <Tooltip
                                  content={'Delete Section'}
                                  color="invert"
                                >
                                  {hovered && <XIcon />}
                                </Tooltip>
                              </SideButton>
                            </>
                          )}
                        </>
                      ) : null}
                    </EditButtonsContainer>
                  </SectionRowWrapper>
                  {isOpen && (
                    <LecturesContainer>
                      <AnimatePresence>
                        {currentVideos &&
                          Object.keys(currentVideos).map((videoId, index) => {
                            const video = currentVideos[videoId]
                            return (
                              <motion.div
                                key={index}
                                className={styles.uploading_container}
                                layout
                              >
                                <IconWrapper>
                                  <VideoTypeLectureIcon />
                                </IconWrapper>
                                <div className={styles.video_name}>
                                  {video?.name?.replace(/\.[^/.]+$/, '')}
                                </div>
                                <div className={styles.video_upload_progress}>
                                  Uploading
                                  <div className={styles.loader}></div>
                                </div>
                                <div className={styles.video_size}>
                                  {formatBytes(video?.size || 0)}
                                </div>
                                <div className={styles.video_actions}>
                                  <button
                                    onClick={() =>
                                      handleDragAndDropCancel(
                                        videoId,
                                        video?.name
                                      )
                                    }
                                  >
                                    <XIcon />
                                  </button>
                                </div>
                              </motion.div>
                            )
                          })}
                      </AnimatePresence>
                      <LecturesList>{getLectures()}</LecturesList>
                    </LecturesContainer>
                  )}
                  {provided.placeholder}
                </SectionRowDroppable>
              )}
            </Droppable>
            {centerNotification && (
              <PopUpCenter
                centerNotification={centerNotification}
                showPopUp={showPopUp}
              />
            )}
          </SectionRowDraggable>
        )}
      </Draggable>
    </div>
  )
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
const SectionRowDraggable = styled.div<{ isDragging: boolean }>`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
  background-color: ${(props) => (props.isDragging ? '#f1f1f1' : '')};
  border-radius: 30px;
`

const SectionRowDroppable = styled.div<{
  isDraggingOver: boolean
  hover: boolean
  withFile: boolean
}>`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  background-color: ${(props) => {
    if (props.hover || props.isDraggingOver) {
      return '#f1f1f1'
    } else if (props.withFile) {
      return 'rgba(41, 98, 255, 0.1)'
    } else {
      return ''
    }
  }};
  border-radius: 30px;
  /* transition: all 0.1s linear; */
`

const SectionRowWrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  font-size: 14px;
  color: #1a1e3d;
  /* justify-content: space-between; */
  border-radius: 10px;
  /* background-color: rgba(107, 181, 201, 0.05); */
  align-items: center;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
`

const Icon = styled.div<{ iconWidth: string; iconHeight: string }>`
  width: ${(props) => (props.iconWidth ? props.iconWidth : '1.375rem')};
  height: ${(props) => (props.iconHeight ? props.iconHeight : '1.375rem')};
  display: flex;
  cursor: pointer;
`

const Text = styled.div<{
  width?: string
  opacity?: string
  isDragging?: boolean
}>`
  overflow: hidden; /* hide the text that goes beyond the width */
  text-overflow: ellipsis; /* show three dots to indicate truncated text */
  width: ${(props) => (props.width ? props.width : '45%')};
  margin-left: 1rem;
  opacity: ${(props) =>
    props.opacity && !props.isDragging ? props.opacity : ''};
  word-wrap: break-word;
`
const LectureQty = styled.div`
  opacity: 0.31;
  margin-right: 2rem;
  /* width: 9rem; */
  text-align: center;
`
const TotalTime = styled.div`
  margin-left: auto;
  margin-right: 1rem;
  width: 4rem;
  text-align: left;
`

const LecturesContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const LecturesList = styled.ul`
  list-style-type: none;
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

const IconWrapper = styled.div`
  display: flex;
  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.5rem;
  justify-content: center;
  align-items: center;
`

export default SectionRow
