/* eslint-disable @typescript-eslint/no-inferrable-types */
// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import Button from '../../components/atoms/Button'
import ProgressBar from '../../components/molecules/ProgressBar'
import QASection from '../../components/atoms/CourseStudyQASection/CourseStudyQASection'
import Question from '../../components/molecules/CourseStudyQuestion'
import { Content, Lecture, LectureProgress, LiveCourse } from 'types/course'
import StudyCourseSectionRow from '@components/pages/course-study/StudyCourseSectionRow'
import { colors, fontFamilies } from 'configs/styles/config'
import CourseSectionRowIcon from 'public/static/icons/course-section-row-icon'
import CourseSectionRowIconOpen from 'public/static/icons/course-section-row-icon-open'
import VideoPlayer from 'components/organisms/VideoPlayer'
import {
  announcementsLabel,
  bookmarksLabel,
  courseMaterialsLabel,
  notesLabel,
  progressLabel,
  QALabel,
} from 'configs/constants/labels/study-course-labels'
import useCountDownInSeconds from 'hooks/useCountDownInSeconds'
import NextLectureLoader from '@pages_components/course-study/NextLectureLoader'
import useWindowDimensions from 'hooks/useWindowDimensions'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import TestComponent from 'components/organisms/TestComponent'
import { useRouter } from 'next/router'
import {
  getCourseLectureContent,
  updateCourseLectureProgress,
  updateCourseProgress,
} from '@services/api/course'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPaths } from 'next'

type SelectedTab = 'materials' | 'announcments' | 'qa' | 'notes' | 'bookmarks'

const Body = styled.div`
  display: flex;
  flex-direction: column;
`

const GreyBlock = styled.div`
  display: flex;
  width: 100vw;
  height: 20rem;
  position: absolute;
  background-color: rgba(151, 151, 151, 0.08);
  top: 3;
  left: 0;
  align-self: center;
`

const PlayerBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 1rem;
  box-shadow: 4px 10px 5px #f9f9f9;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  z-index: 2;
`

const TopBlockWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  align-items: center;
  height: 2.5rem;
`

const BottomBlockWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  @media (min-width: 1200px) {
    justify-content: space-between;
  }
`
const RightSide = styled.div`
  display: flex;
  width: 65%;
  /* max-width: 50rem; */
`

const TitleWrapper = styled.title`
  display: flex;
  font-family: ${fontFamilies.light};
  font-size: 1rem;
  padding: 0.5rem 0;
  :hover {
    cursor: pointer;
    color: ${colors.uguBlue};
  }
`
const CourseMaterialsBtnWrapper = styled.button`
  display: none;
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media (min-width: 1200px) {
    display: flex;
    border-radius: 10px;
    /* border: 1px solid ${colors.uguPurple}; */
    background-color: rgba(151, 151, 151, 0.08);
    width: 34%;
    padding: 0.5rem;
    align-items: center;
    margin-left: 0.5rem;

    :hover {
      cursor: pointer;
    }
  }
`

const CourseMaterialsTextWrapper = styled.div`
  display: flex;
  margin-left: 1rem;
  align-items: center;
  font-size: 0.875rem;
`

const CourseMaterialsWrapper = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: flex;
    flex-direction: column;
    /* margin-right: 1rem; */
    /* min-width: 27rem; */
    height: 66vh;
    margin-left: 0.5rem;
    width: 52%;
    //cross browser commands to hide scrollbar, but allow scrolling
    overflow-y: scroll;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent; /* make scrollbar transparent Chrome */
    }
  }
`

const CourseMaterialsBottomWrapper = styled.div`
  display: flex;
  /* @media (max-width: 968px) {
    justify-content: center;
  } */
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
  @media (min-width: 1200px) {
    display: none;
  }
`

const CourseMaterialsSmallScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-right: 1rem; */
  /* min-width: 27rem; */
  height: 70vh;
  width: 100%;
  //cross browser commands to hide scrollbar, but allow scrolling
  overflow-y: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent Chrome */
  }
  @media (min-width: 968px) {
    width: 90%;
  }
`

const BelowPlayerArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`
const BelowMenuWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  width: 100%;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: transparent; /* make scrollbar transparent */
  }
  background-image: linear-gradient(to right, white, white),
    linear-gradient(to right, white, white),
    linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0)),
    linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0));
  background-position: left center, right center, left center, right center;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 20px 100%, 20px 100%, 10px 100%, 10px 100%;
  background-attachment: local, local, scroll, scroll;
  @media (min-width: 1200px) {
    width: 70%;
  }
`

const ProgressWrapper = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: flex;
    /* flex-direction: row; */
    height: 3rem;
    border: 1px solid rgba(151, 151, 151, 0.12);
    width: 18rem;
    margin-left: auto;
    border-radius: 4px;
    align-items: center;
    padding: 0 1rem;
  }
`
const ProgressText = styled.div`
  font-weight: ${fontFamilies.bold};
  font-size: 0.875rem;
  margin-right: 1rem;
`

const SmallProgressText = styled.div`
  font-weight: ${fontFamilies.light};
  font-size: 0.7rem;
  /* margin-left: 0.5rem; */
`

const ProgressWrapperForSmallScreens = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1200px) {
    display: none;
  }
`
const CircularProgressBarWrapper = styled.div`
  display: flex;
  width: 2.5rem;
  justify-content: center;
  align-items: center;
`

const QuestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding-right: 4rem;
  align-self: flex-end;
`

const SectionIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  margin: 0.5rem 0;
  margin-left: 0.5rem;
`

//new changes from Oct 28
const CoursePlayerWrapper = styled.div`
  width: 100%;
  min-height: 40vh;
  align-items: center;
  justify-content: center;
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media (min-width: 1200px) {
    /* width: 65%; */
    /* max-width: 50rem; */
    justify-content: center;
    align-items: center;
    /* background-color: black; */
  }
`

//Logic for Loading:
//Load Course, load progress,
//set currentLecture, set nextLecture & previousLecture(the last 2 can be undefined)
//load content for CurrentLecture

//Logic for changing Lecture:
//Next/Previous btn clicked - load content for next/previous lecture
//Reset next & previous lectures - they might be of Lecture | undefined type (TODO: I need resetLectures(currentLecture: Lecture))
//If next/prev. lecture is undefined after the reset - it won't be possible
//to execute nextLectureHandler/previousLectureHandler

//Logic to update watchtime:
//1) After first 10sec call saveProgress() every 10sec with 12sec of delay,
//This will execute if the user has stopped watching the lecture for more than 2sec
//This will handle if user just left page? But
//2) If the totalTime watched is > 95% of the duration - we will
//cancel previous setTimer using parent method: clearTimerForProgress()
//and call lectureIsDoneHandler()
//which will set lectureProgress done to true, duration to 0, and save will make API call

//we use this hook to reduce a number of calls
const useDelayedCallback = (delay = 100) => {
  const ref = useRef<any>()

  React.useEffect(() => {
    // cleaning uncalled delayed callback with component destroying
    return () => {
      clearTimer()
    }
  }, [])

  //clear function
  const clearTimer = () => {
    if (ref.current) clearTimeout(ref.current)
  }

  //return a function
  return (callback: any, clear: boolean) => {
    //clear previously set timout
    if (ref.current) clearTimeout(ref.current)
    //check if clear option is true
    if (clear) {
      clearTimer()
    } else {
      //set timout with specified delay
      ref.current = setTimeout(callback, delay)
    }
  }
}

//represents threshold when lecture can be considered finished(10sec remaining in the lecture is considered to be done)
const LECTURE_DONE_SECONDS_REMAINER = 10
//milliseconds after which lecture will be saved
const SAVE_LECTURE_DELAY = 10000
//interval of seconds to attempt to save lecture
const INTERVAL_TO_SAVE_LECTURE_IN_SEC = 5

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'courses',
        'footer',
      ])),
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}

const CourseStudy = () => {
  const router = useRouter()
  const { course_id } = router.query
  const { width } = useWindowDimensions()
  const [course, setCourse] = useState<LiveCourse>() //Course must be fetched before, so when opening the page it should preload
  const [courseMaterialsOpen, setCourseMaterialsOpen] = useState(true)
  const [flatListOfLectures, setFlatListOfLectures] = useState<Lecture[]>([])
  const [currentLecture, setCurrentLecture] = useState<Lecture>()
  const [currentProgress, setCurrentProgress] = useState<LectureProgress>()
  const [nextLecture, setNextLecture] = useState<Lecture>()
  const [isNextLectureCountdown, setIsNextLectureCountdown] =
    useState<boolean>(false)
  // const [nextLectureCountdown, setNextLectureCountdown] = useState<number>(0)
  const [previousLecture, setPreviousLecture] = useState<Lecture>()

  // const [wideScreen, setWideScreen] = useState<boolean>(
  //   width && width < 1200 ? true : false
  // )
  const [loadedContent, setLoadedContent] = useState<Content>()
  // const [courseProgress, setCourseProgress] = useState<CourseProgress>()
  const [lectureProgresses, setLectureProgresses] =
    useState<LectureProgress[]>()
  const [lastLectureId, setLastLectureId] = useState<string>()

  const delayCallbackForVideoProgress = useDelayedCallback(SAVE_LECTURE_DELAY)
  const [secondsPlayed, setSecondsPlayed] = useState(0)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [selectedTab, setSelectedTab] = useState<SelectedTab>(
    width && width < 1200 ? 'materials' : 'announcments'
  )

  const { countDown, reset } = useCountDownInSeconds(5)

  //we need to have flag: isSavingProgress which will prevent redundant savings
  //if it's true it means it is saving the lecture progress/update.
  //it shouldn't be a state as we don't want it to affect UI.
  let isSavingProgress = false

  const handleSaveWatchedTime = (secondsWatched: number) => {
    delayCallbackForVideoProgress(() => {
      console.log('Save progress called')
      //here we will call API
      if (currentLecture) {
        saveWatchtimeProgress(secondsWatched, currentLecture)
      }
    }, false)
  }

  //this method is used to clear timer
  //when the lecture is over or when it's needed
  const clearTimerForProgress = () => {
    delayCallbackForVideoProgress(() => {
      console.log('clearTimerForProgress')
      //here we will call API
    }, true)
  }

  //to watch if next lecture needs to be played
  useEffect(() => {
    if (countDown === 0 && isNextLectureCountdown) {
      nextLectureHandler()
      reset()
      setIsNextLectureCountdown(false)
    }
  }, [countDown, isNextLectureCountdown])

  // const beforeUnload = (event: BeforeUnloadEvent) => {
  //   console.log('Before unload fired')
  //   event.preventDefault()

  //   //save progress on current lecture if it wasn't saved
  //   if (currentLecture) {
  //     const lectureIsDone =
  //       secondsPlayed > currentLecture.content.duration * 0.95

  //     if (course && !lectureIsDone) {
  //       const newLectureProgress: LectureProgress = {
  //         done: false,
  //         watchtime: secondsPlayed,
  //         lecture: currentLecture._id,
  //       }
  //       updateLectureProgressHelper(course._id, newLectureProgress).then(() => {
  //         console.log('Progress on the lecture has been saved')
  //       })
  //     }
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('beforeunload', (event) => beforeUnload(event))
  //   window.addEventListener('unload', () => {})
  //   return () => {
  //     window.removeEventListener('beforeunload', (event) => beforeUnload(event))
  //     window.removeEventListener('unload', () => {})
  //   }
  // }, [beforeUnload])

  //call whenever you want to determine & save lecture watched time, status
  const saveWatchtimeProgress = (
    secondsPlayed: number,
    currentLecture: Lecture // we must take this value in case lecture has been changed before we execute call to the server
  ) => {
    if (currentLecture) {
      const lectureIsDone =
        secondsPlayed >
        currentLecture.content.duration - LECTURE_DONE_SECONDS_REMAINER

      lectureIsDone
        ? updateLectureProgressDoneHandler(currentLecture._id, true, 0)
        : updateLectureProgressDoneHandler(
            currentLecture._id,
            false,
            secondsPlayed
          )
    }
  }

  //call to save lecture progress
  const updateLectureProgressDoneHandler = (
    lectureId: string,
    done: boolean = false,
    watchtime: number = 0
  ) => {
    //update to done: true, watchtime: 0,
    const newLectureProgress: LectureProgress = {
      lectureId: lectureId,
      watchTime: watchtime,
      done: done,
    }
    if (course && lectureProgresses && lastLectureId) {
      //to prevent redundand attempts to save the progress
      isSavingProgress = true
      updateCourseLectureProgress(course_id as string, newLectureProgress).then(
        () => {
          const updatedLectureProgresses = lectureProgresses.map((progress) => {
            return progress.lectureId === newLectureProgress.lectureId
              ? newLectureProgress
              : progress
          })
          setLectureProgresses(updatedLectureProgresses)

          //allow savings again
          isSavingProgress = false
        }
      )
    }
  }

  //call when done/undone btn pressed
  const changeLectureProgressDoneHandler = (lectureId: string) => {
    //update to //update to !done, watchtime: watchtime,
    if (lectureProgresses && lectureProgresses.length > 0) {
      const currentLectureProgress = lectureProgresses?.find(
        (lectureProgress) => {
          return lectureProgress.lectureId === lectureId
        }
      )

      if (currentLectureProgress) {
        updateLectureProgressDoneHandler(
          currentLectureProgress.lectureId,
          !currentLectureProgress.done,
          currentLectureProgress.watchTime
        )
      } else {
        //this should send error report to us
        console.log('Unable to update lecture')
      }
    }
  }

  const getLectureProgressById = (
    lectureProgresses: LectureProgress[],
    lectureId: string
  ) => {
    console.log('yeet', lectureProgresses)
    if (lectureProgresses && lectureProgresses.length > 0) {
      const currentLectureProgress = lectureProgresses?.find(
        (lectureProgress) => {
          return lectureProgress.lectureId === lectureId
        }
      )
      console.log('yeet', currentLectureProgress)
      return currentLectureProgress
    }
  }

  //Logic:
  //this method should be called at: 25%, 50%, 75% of the lecture with duration < 5min,
  //this method should be called at: each 10% up to 95% if the duration is < 10min,
  //this method should be called at: each 5% up to 95% if the duration is < 20min,
  //this method should be called at: each 3% up to 95% if the duration is > 20min,

  //when clicked on previous/next btn when the lecture is not done for more than 90% (+)
  //every 10sec we will call method with delay of 12sec(we will have 2sec in case user did click stop/play for a short time)
  //
  //when clicked play/stop, when moved progress (+) with delay of 5sec
  //when user is leaving the page (+)

  // const callWatchtimeUpdate = (timeoutId) => {
  //   if (timeoutId) clearTimeout(timeoutId)
  //   timeoutId = setTimeout(function() {
  //     if (value > 0 && value < 1000000 && value !== price) {
  //       editValue(value).then(() => {
  //         console.log('Price has been changed!')
  //       })
  //     }
  //   }, 3000)
  // }

  // useEffect(() => {
  //   if (timeoutId) clearTimeout(timeoutId)
  //   timeoutId = setTimeout(function() {
  //     // Runs 1 second (1000 ms) after the last change
  //     if (value > 0 && value < 1000000 && value !== price) {
  //       editValue(value).then(() => {
  //         console.log('Price has been changed!')
  //       })
  //     }
  //   }, 3000)
  //   return () => {
  //     clearTimeout(timeoutId)
  //   }
  // }, [value])

  const updateLectureProgressWatchtime = () => {
    //update to watchtime: timeWatched,
  }

  const getSections = () => {
    if (course && currentLecture) {
      return course.course_materials.sections.map((section) => {
        return (
          <StudyCourseSectionRow
            key={'section' + section._id}
            courseId={course_id as string}
            fontSize="12px"
            section={section}
            lectureProgresses={lectureProgresses ? lectureProgresses : []}
            onLecturePress={onLecturePressHandler}
            onDoneChange={changeLectureProgressDoneHandler}
            currentLecture={currentLecture}
          />
        )
      })
    }
  }

  const getFlatListOfLecturesHandler = (course: LiveCourse) => {
    // course.course_materials.
    const arrayOfSections = course.course_materials.sections.map(
      (section) => section.lectures
    )
    return flatten(arrayOfSections)
  }

  //returns flat array of any array with nested items
  const flatten = (ary: any[]) => {
    let ret: any[] = []
    for (let i = 0; i < ary.length; i++) {
      if (Array.isArray(ary[i])) {
        ret = ret.concat(flatten(ary[i]))
      } else {
        ret.push(ary[i])
      }
    }
    return ret
  }

  //handler when pressed on the Lecture in Course Materials
  const onLecturePressHandler = (lecture: Lecture, sectionId: string) => {
    if (
      course &&
      flatListOfLectures &&
      flatListOfLectures.length > 0 &&
      lectureProgresses
    ) {
      updateLectures(
        course,
        lecture,
        flatListOfLectures,
        true,
        lectureProgresses
      )
      if (course) {
        loadContentForLecture(
          course._id,
          sectionId,
          lecture._id,
          lecture.content._id,
          lecture.content.type
        )
        setIsInitialLoad(false)
      }
    }
  }

  //based on content type will load different content
  const loadContentForLecture = (
    courseId: string,
    sectionId: string,
    lectureId: string,
    contentId: string,
    lectureType: 'video' | 'text' | 'test'
  ) => {
    if (courseId !== undefined && courseId !== '') {
      getCourseLectureContent(
        courseId,
        course?.version as number,
        sectionId,
        lectureId,
        contentId,
        true,
        true
      ).then((textContent: Content) => {
        console.log('Study Course->fetched text content: ', textContent)
        setLoadedContent(textContent)
      })
    }
  }

  //set previos, current & next lectures
  const updateLectures = (
    course: LiveCourse,
    currentLecture: Lecture,
    flatListOfLectures: Lecture[],
    shouldUpdateCourseProgress: boolean, // if true - make the call to update Course Progress
    lectureProgresses: LectureProgress[]
    //could be improved
  ) => {
    //set currentLecture
    if (course) {
      setCurrentLecture(currentLecture)

      // TODO - FIX
      const currentProgress = getLectureProgressById(
        lectureProgresses,
        currentLecture._id
      )
      console.log('currentProgress: ', currentProgress)

      //fetch resources links & combined with existing resources(if exist)

      if (currentProgress) {
        setCurrentProgress(currentProgress)
      }
      console.log('currentLecture', currentLecture)
      //update lastLectureId on the server
      shouldUpdateCourseProgress &&
        updateCourseProgress(course_id, currentLecture._id)

      //set nextLecture(might be undefined)
      const nextLecture = getNextLecture(currentLecture, flatListOfLectures)
      setNextLecture(nextLecture)

      //set previousLecture(might be undefined)
      const previousLecture = getPreviousLecture(
        currentLecture,
        flatListOfLectures
      )
      setPreviousLecture(previousLecture)
    }
  }

  const setLastWatchedLectureHandler = (
    course: LiveCourse,
    flatListOfLectures: Lecture[],
    lectureProgresses: LectureProgress[],
    lastLectureId?: string
  ) => {
    if (course) {
      //last lecture exists
      if (lastLectureId) {
        //get lastWatchedLecture
        //error, not finding the lecture
        const lastWatchedLecture = flatListOfLectures.find((lecture) => {
          return lecture._id === lastLectureId
        })

        console.log('lastWatchedLecture', lastWatchedLecture)
        lastWatchedLecture
          ? updateLectures(
              course,
              lastWatchedLecture,
              flatListOfLectures,
              false,
              lectureProgresses
            )
          : updateLectures(
              course,
              course.course_materials.sections[0].lectures[0],
              flatListOfLectures,
              false,
              lectureProgresses
            )

        const sectionId = getSectionByLectureId(course, lastLectureId)

        console.log('sectionId', sectionId)
        //load content
        if (sectionId && lastWatchedLecture) {
          console.log('Loading content for the last watched lecture')
          loadContentForLecture(
            course_id as string,
            sectionId,
            lastLectureId,
            lastWatchedLecture.content._id,
            lastWatchedLecture.content.type
          )
        } else {
          //potential error, as sectionId was not found and content won't be loaded
        }
      } else {
        updateLectures(
          course,
          course.course_materials.sections[0].lectures[0],
          flatListOfLectures,
          false,
          lectureProgresses
        )
        loadContentForLecture(
          course_id as string,
          course.course_materials.sections[0]._id,
          course.course_materials.sections[0].lectures[0]._id,
          course.course_materials.sections[0].lectures[0].content._id,
          course.course_materials.sections[0].lectures[0].content.type
        )
      }
    }
  }

  const getSectionByLectureId = (course: LiveCourse, lectureId: string) => {
    const section = course?.course_materials.sections.find((section) => {
      return section.lectures.find((lecture) => {
        return lecture._id === lectureId
      })
    })
    return section?._id
  }

  //returns next Lecture
  const getNextLecture = (
    currentLecture: Lecture,
    flatListOfLectures: Lecture[]
  ) => {
    const flatListOfLecturesIds = flatListOfLectures.map(
      (lecture) => lecture._id
    )
    const currentLectureIndex = flatListOfLecturesIds.indexOf(
      currentLecture._id
    )
    if (currentLectureIndex < flatListOfLecturesIds.length) {
      return flatListOfLectures[currentLectureIndex + 1]
    }
  }

  //returns previous Lecture
  const getPreviousLecture = (
    currentLecture: Lecture,
    flatListOfLectures: Lecture[]
  ) => {
    const flatListOfLecturesIds = flatListOfLectures.map(
      (lecture) => lecture._id
    )
    const currentLectureIndex = flatListOfLecturesIds.indexOf(
      currentLecture._id
    )
    // if (currentLectureIndex < flatListOfLecturesIds.length) {
    if (currentLectureIndex > 0) {
      return flatListOfLectures[currentLectureIndex - 1]
    }
  }

  //called when next lecture btn pressed
  const nextLectureHandler = () => {
    if (nextLecture && course && flatListOfLectures) {
      //save current lectureProgress
      // the value might be max 5sec late
      if (currentLecture) {
        saveWatchtimeProgress(secondsPlayed, currentLecture)
      }
      const sectionId = getSectionByLectureId(course, nextLecture._id)
      if (sectionId) {
        loadContentForLecture(
          course_id as string,
          sectionId,
          nextLecture._id,
          nextLecture.content._id,
          nextLecture.content.type
        )
        lectureProgresses &&
          updateLectures(
            course,
            nextLecture,
            flatListOfLectures,
            true,
            lectureProgresses
          )
        resetPlayedSeconds()
        setIsInitialLoad(false)
      }
    }
  }

  //called when previous lecture btn pressed
  const previousLectureHandler = () => {
    if (previousLecture && course && flatListOfLectures) {
      //save current lectureProgress
      if (currentLecture) {
        saveWatchtimeProgress(secondsPlayed, currentLecture) // the value might be max 5sec late
      }
      const sectionId = getSectionByLectureId(course, previousLecture._id)
      if (sectionId) {
        loadContentForLecture(
          course._id,
          sectionId,
          previousLecture._id,
          previousLecture.content._id,
          previousLecture.content.type
        )
        lectureProgresses &&
          updateLectures(
            course,
            previousLecture,
            flatListOfLectures,
            true,
            lectureProgresses
          )
        resetPlayedSeconds()
        setIsInitialLoad(false)
      }
    }
  }

  const resetPlayedSeconds = () => {
    setSecondsPlayed(0)
  }

  //this handler is being called when video is played(every ~1sec)
  //this handler has a few functions:
  //1) Update secondsPlayed if more than 5sec from previous update has been watched - Done!
  //2) Clear the timer & update the lecture status to be done if > 10sec remaining - Done!
  //3) If seconds are smaller than previously stored by more than 10sec we should decrease secondsPlayed
  const videoPlayedHandler = (seconds: number) => {
    if (currentLecture && !currentProgress?.done) {
      //update lecture status to done:
      if (
        seconds >
        currentLecture?.content.duration - LECTURE_DONE_SECONDS_REMAINER
      ) {
        if (!isSavingProgress) {
          //clear previous timer
          clearTimerForProgress()
          //save currentLecture progress
          saveWatchtimeProgress(seconds, currentLecture)
        }
      } else {
        //updade secondsPlayed:
        if (seconds > secondsPlayed + INTERVAL_TO_SAVE_LECTURE_IN_SEC) {
          handleSaveWatchedTime(seconds)
          setSecondsPlayed(seconds)
        }
        //decrease secondsPlayed(in case user moved back in video for more than 10sec back)
        else if (secondsPlayed - seconds > 10) {
          setSecondsPlayed(seconds)
        }
      }
    }
  }

  //call when video ends
  const onVideoEndHandler = () => {
    //Update lecture to be done
    //commented as we already save it when > 95% has been watched
    // if (currentLecture) {
    //   updateLectureProgressDoneHandler(currentLecture._id, true, 0)
    // }

    //Not Done = check if nextLecture is available
    if (nextLecture) {
      initiateNextLecturePlay()
    }
    //TODO:
    //Not Done = if not - is it the last lecture?
    //Not Done = if it's the last lecture - we need to call endCourseHandler()
    //Not Done = if nextLecture is available - call initiateNextLecture()
    console.log('Video has ended')
  }

  //method to call to start playing next lecture
  const initiateNextLecturePlay = () => {
    startCountdown()
    console.log('countDown', countDown)
    setIsNextLectureCountdown(true)
    //Not Done = if autoPlay set to true - set nextLectureLoader to true, with 5sec delay
    //Not Done = if not - set nextLectureLoader to true with option to start
  }

  //call when next lecture autoplay is canceled
  const cancelNextLectureAutoplay = () => {
    reset()
  }

  //call when the course is done
  const endCourseHandler = () => {}

  //TODO:
  //load course(set loadSpinner to TRUE) DONE!
  //load progress - get last watched lecture DONE!
  //set last watched lecture(set first lecture if last doesn't exist)
  //load content of that lecture -> text API or video API, based on lecture type
  //set loadedContent(set loadSpinner to FALSE)

  const onWideScreenPressed = () => {
    // setWideScreen(!wideScreen)
    courseMaterialsOpen && window.scrollBy(0, 150)
    !courseMaterialsOpen && window.scrollBy(0, -150)
    setCourseMaterialsOpen(!courseMaterialsOpen)
  }

  return (
    <Layout>
      <Body>
        <GreyBlock />
        <PlayerBlockWrapper>
          <TopBlockWrapper>
            <RightSide>
              <TitleWrapper>
                {course ? course.title : 'Course Title'}
              </TitleWrapper>
            </RightSide>
            <CourseMaterialsBtnWrapper
              onClick={() => {
                setCourseMaterialsOpen(!courseMaterialsOpen)
              }}
            >
              <SectionIcon>
                {courseMaterialsOpen ? (
                  <CourseSectionRowIconOpen />
                ) : (
                  <CourseSectionRowIcon fillColor={colors.uguPurple} />
                )}
              </SectionIcon>
              <CourseMaterialsTextWrapper>
                {courseMaterialsLabel}
              </CourseMaterialsTextWrapper>
            </CourseMaterialsBtnWrapper>
            <ProgressWrapperForSmallScreens>
              <CircularProgressBarWrapper>
                <CircularProgressbar
                  value={30}
                  text={`${30}%`}
                  circleRatio={0.75}
                  strokeWidth={9}
                  // styles={buildStyles({
                  //   textColor: colors.uguPurple,
                  //   pathColor: colors.uguRed,
                  //   textSize: '26px',
                  //   rotation: 1 / 2 + 1 / 8,
                  // })}
                  styles={{
                    path: {
                      stroke: colors.uguRed,
                      transform: 'rotate(0.625turn)',
                      transformOrigin: 'center center',
                    },
                    trail: {
                      transform: 'rotate(0.625turn)',
                      transformOrigin: 'center center',
                    },
                    text: {
                      fill: colors.uguPurple,
                      fontFamily: fontFamilies.bold,
                      fontSize: '26px',
                    },
                  }}
                />
              </CircularProgressBarWrapper>
              <SmallProgressText>{progressLabel}</SmallProgressText>
            </ProgressWrapperForSmallScreens>
          </TopBlockWrapper>
          <BottomBlockWrapper>
            <CoursePlayerWrapper>
              {loadedContent && currentLecture && currentProgress ? (
                <>
                  {loadedContent.type === 'video' && (
                    <VideoPlayer
                      videoURL={loadedContent.public.urls}
                      videoName={''}
                      isMultipleVideos={true}
                      nextVideoHandler={nextLectureHandler}
                      previousVideoHandler={previousLectureHandler}
                      nextLectureTitle={
                        nextLecture ? nextLecture.title : undefined
                      }
                      previousLectureTitle={
                        previousLecture ? previousLecture.title : undefined
                      }
                      onVideoProgress={videoPlayedHandler}
                      onVideoEndHandler={onVideoEndHandler}
                      secPlayed={
                        isInitialLoad ? currentProgress?.watchTime : undefined
                      }
                      isWideScreen={width && width < 1200 ? true : false}
                      onWideScreenPressed={onWideScreenPressed}
                    />
                  )}
                  {loadedContent.type === 'text' && (
                    <div style={{ height: '30rem' }}>
                      {/* <TextViewer value={loadedContent.content} /> */}
                      <TestComponent />
                    </div>
                  )}
                  {nextLecture && isNextLectureCountdown && (
                    <NextLectureLoader
                      seconds={countDown}
                      nextLectureTitle={nextLecture?.title}
                      onPlayPress={() => nextLectureHandler()}
                      onCancelPress={() => {
                        console.log('Play next lecture')
                      }}
                    />
                  )}
                </>
              ) : (
                'Loading...'
              )}
            </CoursePlayerWrapper>
            {courseMaterialsOpen && width && width > 1200 && (
              <CourseMaterialsWrapper>{getSections()}</CourseMaterialsWrapper>
            )}
          </BottomBlockWrapper>
        </PlayerBlockWrapper>
        <BelowPlayerArea>
          <BelowMenuWrapper>
            <ButtonsWrapper>
              {width && width < 1200 && (
                <Button
                  text={courseMaterialsLabel}
                  borderRadius="4px"
                  backgroundColor={
                    selectedTab === 'materials' ? '#6BB5C9' : 'none'
                  }
                  height={'3rem'}
                  width={'10rem'}
                  fontWeight="bold"
                  marginRight="0.5rem"
                  onClick={() => {
                    if (selectedTab !== 'materials') {
                      setSelectedTab('materials')
                    }
                  }}
                />
              )}
              <Button
                text={announcementsLabel}
                borderRadius="4px"
                // marginLeft={'0'}
                backgroundColor={
                  selectedTab === 'announcments'
                    ? '#6BB5C9'
                    : selectedTab === 'materials' && width && width > 1200
                    ? '#6BB5C9' // to make sure at least one option is selected
                    : 'none'
                }
                height={'3rem'}
                width={'10rem'}
                marginRight="0.5rem"
                fontWeight="bold"
                opacity={0.5}
                onClick={() => {
                  if (selectedTab !== 'announcments') {
                    setSelectedTab('announcments')
                  }
                }}
              />
              <Button
                text={QALabel}
                borderRadius="4px"
                backgroundColor={selectedTab === 'qa' ? '#6BB5C9' : 'none'}
                height={'3rem'}
                width={'10rem'}
                marginRight="0.5rem"
                fontWeight="bold"
                // marginLeft="3rem"
                onClick={() => {
                  if (selectedTab !== 'qa') {
                    setSelectedTab('qa')
                  }
                }}
              />
              <Button
                text={bookmarksLabel}
                borderRadius="4px"
                backgroundColor={
                  selectedTab === 'bookmarks' ? '#6BB5C9' : 'none'
                }
                height={'3rem'}
                width={'10rem'}
                marginRight="0.5rem"
                fontWeight="bold"
                opacity={0.5}
                // marginLeft="3rem"
                onClick={() => {
                  if (selectedTab !== 'bookmarks') {
                    setSelectedTab('bookmarks')
                  }
                }}
              />
              <Button
                text={notesLabel}
                borderRadius="4px"
                backgroundColor={selectedTab === 'notes' ? '#6BB5C9' : 'none'}
                height={'3rem'}
                width={'10rem'}
                marginRight="0.5rem"
                fontWeight="bold"
                opacity={0.5}
                // marginLeft="3rem"
                onClick={() => {
                  if (selectedTab !== 'notes') {
                    setSelectedTab('notes')
                  }
                }}
              />
            </ButtonsWrapper>
            <ProgressWrapper>
              <ProgressText>{progressLabel + ':'}</ProgressText>
              <ProgressBar width="8rem" value={30} />
            </ProgressWrapper>
          </BelowMenuWrapper>

          {selectedTab === 'materials' && (
            <CourseMaterialsBottomWrapper>
              <CourseMaterialsSmallScreenWrapper>
                {getSections()}
              </CourseMaterialsSmallScreenWrapper>
            </CourseMaterialsBottomWrapper>
          )}

          <QASection></QASection>
          <QuestionsWrapper>
            <Question></Question>
            <Question></Question>
            <Question></Question>
            <Question></Question>
          </QuestionsWrapper>
        </BelowPlayerArea>
      </Body>
    </Layout>
  )
}

export default CourseStudy
