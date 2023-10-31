import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import CourseSectionRowIcon from 'public/static/icons/course-section-row-icon'
import CourseSectionRowIconOpen from 'public/static/icons/course-section-row-icon-open'
import {
  CombinedResource,
  Lecture,
  LectureProgress,
  Resource,
  Section,
} from '@ugu/types'
import VideoTypeLectureIcon from 'public/static/icons/video-content-type-icon'
import ContentTypeLectureIcon from 'public/static/icons/text-section-icon'
import TestTypeLectureIcon from 'public/static/icons/quiz-section-icon'
import { secondsToHms } from 'helpers/secondsToHms'
import Checkmark from 'components/atoms/Checkmark'
import { colors } from 'configs/styles/config'
import AttachResourcesIcon from 'public/static/icons/attach-resources-icon'
import getCourseResource from '@services/api/course/getCourseResource'

// const DUMMY_RESOURCES_ARRAY = [
//   'Getting Started.pdf',
//   'First Homework With Actual Project To Be Tested By Proffessor Miller.pdf',
// ]

type StudyCourseSectionRowProps = {
  courseId: string
  fontSize?: string
  section: Section
  iconWidth?: string
  iconHeight?: string
  onLecturePress: (lecture: Lecture, sectionId: string) => void
  lectureProgresses: LectureProgress[]
  onDoneChange: (lectureId: string) => void
  currentLecture: Lecture
}

type StudyCourseLectureRowProps = {
  courseId: string
  lecture: Lecture //lecture that will be used to construct LectureRow
  onLecturePress: (lecture: Lecture) => void
  lectureProgress: LectureProgress
  onDoneChange: (lectureId: string) => void
  currentLecture: Lecture //curentLecture selected to be displayed/played
  resources?: CombinedResource[]
}

const CourseMaterialSectionRowWrapper = styled.li`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  /* width: 27rem; */
`

const SectionRowWrapper = styled.div`
  display: flex;
  padding: 0 1rem;
  /* height: 3rem; */
  color: #1a1e3d;
  border-radius: 10px;
  background-color: rgba(248, 248, 248, 0.7);
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

// const Icon = styled.div`
//   width: 1.3rem;
//   height: 1.3rem;
//   display: flex;
//   margin: 1rem 0;
// `

const SectionIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  margin: 1rem 0;
`

const SectionText = styled.div<{
  width?: string
  opacity?: string
}>`
  font-size: 0.8rem;
  width: 13rem;
  margin: 0.5rem 0;
  margin-left: 0.7rem;
  opacity: ${(props) => (props.opacity ? props.opacity : '')};
`

const LectureText = styled.div<{
  width?: string
  opacity?: string
  hovered?: boolean
  playing?: boolean
}>`
  width: 14rem;
  font-size: 0.8rem;
  margin: 0.5rem 0;
  color: ${(props) =>
    props.hovered || props.playing ? colors.uguBlue : colors.uguPurple};
  cursor: default;

  :hover {
    cursor: pointer;
  }
`

const LectureRowRightWrapper = styled.div`
  display: flex;
  margin-left: auto;
  width: 8rem;
`

const LectureQty = styled.div`
  opacity: 0.31;
  margin-right: 1rem;
  width: 3rem;
  text-align: center;
  margin-left: auto;
  font-size: 0.8rem;
`
export const TotalTime = styled.div`
  display: flex;
  margin-left: auto;
  /* margin-right: 1rem; */
  /* width: 4rem; */
  text-align: left;
  font-size: 0.8rem;
  /* width: 2.5rem; */
  padding-left: 0.5rem;
  justify-content: flex-end;
`

const LecturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0.5rem 0; */
`

const LecturesList = styled.ul`
  list-style-type: none;
`

const LectureRowContainer = styled.li<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin-left: 2rem; */
  padding: 0rem 1rem;
`

const LectureSeparatorLine = styled.div`
  border-bottom: solid 1px rgba(151, 151, 151, 0.07);
  margin: 0rem 1rem;
`

const LectureIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 1rem;
`

const LectureTypeIconWrapper = styled.div`
  display: flex;
  width: 0.9rem;
  height: 0.9rem;
  justify-content: center;
  align-items: center;
`
const LectureResourcesWrapper = styled.div`
  display: flex;
  position: relative;
  margin-left: auto;
`

const LectureResourcesIconWrapper = styled.div`
  display: flex;
  /* position: relative; */
  width: 0.9rem;
  height: 0.9rem;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  :hover {
    cursor: pointer;
  }
`

// const PreviewButton = styled.div`
//   margin-right: 1rem;
//   margin-left: auto;
//   color: rgba(107, 181, 201, 1);
//   :hover {
//     cursor: pointer;
//     text-decoration: underline;
//   }
// `

const ResourcesPopUpWrapper = styled.div`
  display: flex;
  position: absolute;
  /* width: 250px; */
  /* height: 100px; */
  background-color: ${colors.uguWhite};
  border: 1px solid ${colors.uguPurple};
  top: 1.5rem;
  right: 0.5rem;
  border-radius: 10px;
  padding: 0.5rem;
  flex-direction: column;
`

const ResourcesItemWrapper = styled.a`
  display: flex;
  /* align-items: center; */
  /* height: 1.5rem; */
  font-size: 0.75rem;
  min-width: 13rem;
  max-width: 15rem;
  color: ${colors.uguPurple};
  text-decoration: none;
  :hover {
    cursor: pointer;
    color: ${colors.uguBlue};
    text-decoration: none;
  }
`

const ResourcesIconWrapper = styled.div`
  display: flex;
  margin-right: 0.3rem;
  margin-top: 0.2rem;
`

const ResourceSeparateLine = styled.div`
  border-bottom: solid 1px rgba(151, 151, 151, 0.07);
  margin: 0.3rem 0;
`
//TODO: resources must come with a lecture
//key must be an actual resource id
//resource must have a downloadable link
type ResourcePopUpProps = {
  resources: Resource[]
  setShowResources: (value: boolean) => void
  iconRef: any
}
const ResourcePopUp: React.FC<ResourcePopUpProps> = (props) => {
  const { resources, setShowResources, iconRef } = props
  const node = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick)
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const handleClick = (e: MouseEvent): void => {
    if (
      node!.current!.contains(e.target as Node) ||
      iconRef.current.contains(e.target as Node)
    ) {
      // inside click
      return
    }
    // outside click

    setShowResources(false)
  }

  //const resourceDownloadHandler = (resourceUrl: string) => {}
  console.log(resources)
  return (
    <ResourcesPopUpWrapper ref={node}>
      {resources.map((resource, index) => {
        // const [onHover, setOnHover] = useState<boolean>(false)
        console.log(resource)
        return (
          <>
            <ResourcesItemWrapper
              key={resource._id}
              href={resource.public?.url}
              // onMouseOver={() => setOnHover(true)}
              // onMouseLeave={() => setOnHover(false)}
              onClick={() => console.log('Downloading resources...')}
            >
              <ResourcesIconWrapper>
                <AttachResourcesIcon
                  width={'0.7rem'}
                  height={'0.7rem'}
                  // color={onHover ? colors.uguBlue : undefined}
                />
              </ResourcesIconWrapper>
              {resource.name}
            </ResourcesItemWrapper>
            {index !== resources.length - 1 && (
              <ResourceSeparateLine key={resource._id + 'separator'} />
            )}
          </>
        )
      })}
    </ResourcesPopUpWrapper>
  )
}

const StudyCourseSectionRowLectureRow: React.FunctionComponent<
  StudyCourseLectureRowProps
> = (props) => {
  const {
    courseId,
    lecture,
    onLecturePress,
    lectureProgress,
    onDoneChange,
    currentLecture,
  } = props
  const [hovered, setHovered] = useState(false)
  const [resourcesHovered, setResourcesHovered] = useState(false)
  const [showResources, setShowResources] = useState(false)
  const [resources, setResources] = useState<Resource[]>([])

  const iconRef = useRef(null)

  const getIcon = () => {
    switch (lecture.content?.type) {
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

  // const closeResourcesHandler = () => {
  //   showResources === true && setShowResources(false)
  // }

  const setCombinedResourceHandler = (courseId: string, lecture: Lecture) => {
    //get resources
    if (!showResources && lecture.resources && lecture.resources!.length > 0) {
      //fetch links
      const combinedResources: Resource[] = []
      // @ts-ignore
      lecture.resources.forEach(async (resource: string) => {
        try {
          const response = await getCourseResource(courseId, 0, resource)
          combinedResources.push(response)
        } catch (err) {}
      })
      console.log(combinedResources)
      setResources(combinedResources)
      setShowResources(!showResources)
    } else {
      setShowResources(false)
    }
  }

  return (
    <LectureRowContainer>
      <Checkmark
        value={lectureProgress.done}
        onClick={() => onDoneChange(lecture._id)}
        width={'1.1rem'}
        height={'1.1rem'}
        marginRight={'0.7rem'}
        marginTop={'0.7rem'}
        marginBottom={'0.7rem'}
        marginLeft="0.5rem"
      />

      <LectureText
        hovered={hovered}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onLecturePress(lecture)}
        playing={currentLecture._id === lecture._id}
      >
        {lecture.title ? lecture.title : 'Как проходить данный курс'}
      </LectureText>
      {/* {lecture.preview && <PreviewButton>Предпросмотр</PreviewButton>} */}
      <LectureRowRightWrapper>
        <LectureIconsWrapper>
          <LectureTypeIconWrapper>{getIcon()}</LectureTypeIconWrapper>
          {lecture.resources && lecture.resources.length > 0 && (
            <LectureResourcesWrapper>
              <LectureResourcesIconWrapper
                onMouseOver={() => setResourcesHovered(true)}
                onMouseLeave={() => setResourcesHovered(false)}
                onClick={() => setCombinedResourceHandler(courseId, lecture)}
                ref={iconRef}
              >
                <AttachResourcesIcon
                  width={'0.8rem'}
                  height={'.8rem'}
                  color={
                    resourcesHovered || showResources
                      ? colors.uguBlue
                      : undefined
                  }
                />
              </LectureResourcesIconWrapper>
              {showResources && (
                <ResourcePopUp
                  resources={resources}
                  setShowResources={() => setShowResources(false)}
                  iconRef={iconRef}
                />
              )}
            </LectureResourcesWrapper>
          )}
        </LectureIconsWrapper>
        <TotalTime>{secondsToHms(lecture.content?.duration)}</TotalTime>
        {/* <TotalTime>{'09:55:55'}</TotalTime> */}
      </LectureRowRightWrapper>
    </LectureRowContainer>
  )
}

const StudyCourseSectionRow: React.FunctionComponent<
  StudyCourseSectionRowProps
> = (props) => {
  const {
    courseId,
    section,
    lectureProgresses,
    onLecturePress,
    onDoneChange,
    currentLecture,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const [totalTime, setTotalTime] = useState<number>(0)

  useEffect(() => {
    let totalTime = 0
    section.lectures.forEach((lecture) => {
      totalTime = totalTime + lecture?.content?.duration
    })
    setTotalTime(totalTime)
  }, [section])

  const onLecturePressHandler = (lecture: Lecture) => {
    onLecturePress(lecture, section._id)
  }

  const getProgressForLecture = (lectureId: string) => {
    const progress = lectureProgresses.find((lecture) => {
      return lecture.lectureId === lectureId
    })
    if (progress) {
      return progress
    } else {
      //show error!!!
      const result: LectureProgress = {
        done: false,
        watchTime: 0,
        lectureId: 'undefined',
      }
      return result
    }
  }

  //returns how many lectures has been watched
  const getProgressForSection = () => {
    //match lecture with its progress obj
    const lectureProgressesForSection = section.lectures.map((lecture) => {
      return lectureProgresses.find((progress) => {
        return progress.lectureId === lecture._id
      })
    })

    //count how many of them are done
    let finishedLectures = 0
    lectureProgressesForSection.forEach((progress) => {
      if (progress?.done) {
        finishedLectures = finishedLectures + 1
      }
    })

    return finishedLectures
  }

  const getLectures = () => {
    return section.lectures.map((lecture, index) => {
      return (
        <>
          <StudyCourseSectionRowLectureRow
            courseId={courseId}
            lecture={lecture}
            key={lecture._id}
            onLecturePress={onLecturePressHandler}
            lectureProgress={getProgressForLecture(lecture._id)}
            onDoneChange={onDoneChange}
            currentLecture={currentLecture}
          />
          {index !== section.lectures.length - 1 && (
            <LectureSeparatorLine key={lecture._id + 'separator'} />
          )}
        </>
      )
    })
  }

  return (
    <CourseMaterialSectionRowWrapper>
      <SectionRowWrapper
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <SectionIcon>
          {isOpen ? <CourseSectionRowIconOpen /> : <CourseSectionRowIcon />}
        </SectionIcon>
        <SectionText>{section.title ? section.title : 'Undefined'}</SectionText>
        {!isOpen && (
          <LectureQty>
            {getProgressForSection() + '/' + section.lectures.length}
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

export default StudyCourseSectionRow
