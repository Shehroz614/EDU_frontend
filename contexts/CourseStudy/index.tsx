// @ts-nocheck
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import Head from 'next/head'
import {
  Content,
  CourseProgress,
  CourseVersion,
  Lecture,
  LectureProgress,
  LiveCourse,
} from '@type/course'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { BottomNotification } from '@type/main'
import {
  getCourseLectureContent,
  getLiveCourse,
  updateCourseLectureProgress,
} from '@services/api/course'
import getCourseProgress from '@services/api/course/getCourseProgress'
import { flatten } from 'lodash'
import { updateCourseProgress } from '@services/api/course'
import {
  LECTURE_DONE_PERCENT,
  SAVE_LECTURE_DELAY,
  INTERVAL_TO_SAVE_LECTURE_IN_SEC,
} from '@configs/courseStudy'
import useCountDownInSeconds from '@hooks/useCountDownInSeconds'
import useDelayedCallback from '@hooks/useDelayedCallback'
import { confirmSectionDeletion } from '@configs/constants/labels/modal-labels'
import { useAuth } from '@hooks/useAuth'

type StudyCourseContext = {
  course_id: string
  course: CourseVersion | null
  courseLoaded: boolean
  bottomNotification: boolean | BottomNotification
  setBottomNotification: Dispatch<SetStateAction<boolean | BottomNotification>>
  lectureProgresses?: LectureProgress[]
  flatListOfLectures?: Lecture[]
  lastLectureId?: string
  loadedContent?: Content
  currentLecture?: Lecture
  currentProgress?: LectureProgress
  nextLecture?: Lecture
  nextLectureHandler?: () => void
  isNextLectureCountdown?: boolean
  countDown?: number
  previousLecture?: Lecture
  previousLectureHandler?: () => void
  onVideoProgressHandler?: (seconds: number) => void
  onVideoEndHandler?: () => void
  onLecturePressHandler?: (lecture: Lecture, sectionId: string) => void
  changeLectureProgressStatusHandler?: (lectureId: string) => void
}
const Index = createContext({} as StudyCourseContext)
const useStudyCourse = () => useContext(Index)

//NOTE - Business Logic:
//1. Fetch Course - initialStudyCourseLoad()
//2. Fetch Course Progress - initialStudyCourseLoad()
//3. Set lastLecture using lastLectureId from Course Progress(use getLectureProgressById) - initialStudyCourseLoad()
//3.1 If doesn not exists - create a new one and set - initialStudyCourseLoad()
//4. Map Lectures with LectureProgresses to display their progress
//4.1 If Lectures are not mapped - skip
//5. Next Lecture -> Save Current Lecture Progress ->
//5.1 Set Next Lecture(if exists) and find it's progress, if doesn't exists - create a new one
//6. Previous Lecture -> Save Current Lecture Progress -> Set Next Lecture and find it's progress, if doesn't exists - create a new one
//6.1 Set Next Lecture(if exists) and find it's progress, if doesn't exists - create a new one
//7. Mark Lecture as done(using checkmark btn) - update LectureContent on backend to be done
//8. Save LectureProgress(when video is redirected to the next lecture, or at the end, or when on pause).

//NOTE - List of Functions:
// 1. initialStudyCourseLoad - load Course and set the page:
// 1.1 setLecturesHandler -
// 1.2 setCurrentLectureProgress
// 1.3 setFlatListOfLectures
// 1.4 setCourseLoaded

// 2. setLecturesHandler:
// 2.1 setCurrentLectureHandler
// 2.2 setNextLectureHandler
// 2.3 setPreviousLectureHandler

// 3. handleCourseProgress - set Course progress(lastLecture, map Lectures with LectureProgresses)
// 3. setLecturesHandler - update current lecture, set lecture progresses
// 4. updateLectureProgress - update lecture progress in DB

const StudyCourseProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation()
  const { course_id } = router.query
  const [course, setCourse] = useState<LiveCourse | null>(null)
  const [courseLoaded, setCourseLoaded] = useState<boolean>(false)
  const [bottomNotification, setBottomNotification] = useState<
    boolean | BottomNotification
  >(false)
  const [flatListOfLectures, setFlatListOfLectures] = useState<Lecture[]>([])
  const [loadedContent, setLoadedContent] = useState<Content>()
  const [lectureProgresses, setLectureProgresses] =
    useState<LectureProgress[]>()
  const [lastLectureId, setLastLectureId] = useState<string>()
  const [currentProgress, setCurrentProgress] = useState<LectureProgress>()
  const [currentLecture, setCurrentLecture] = useState<Lecture>()
  const [nextLecture, setNextLecture] = useState<Lecture>()
  const [previousLecture, setPreviousLecture] = useState<Lecture>()
  const [secondsPlayed, setSecondsPlayed] = useState<number>(0)
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)

  const delayCallbackForVideoProgress = useDelayedCallback(SAVE_LECTURE_DELAY)
  const [isNextLectureCountdown, setIsNextLectureCountdown] =
    useState<boolean>(false)
  const { countDown, isCountDownOn, startCountdown, reset } =
    useCountDownInSeconds(5)
  let isSavingProgress: boolean = false
  const { authState } = useAuth()

  //LINK - Initial Load

  useEffect(() => {
    const fetchData = async () => {
      await initialStudyCourseLoad()
    }

    if (!authState.isLoading) {
      if (authState.user?.purchased_courses?.includes(course_id)) {
        fetchData()
      } else {
        router.push('/course-page?id=' + course_id)
      }
    }
  }, [authState])

  useEffect(() => {
    //console.log("Protected Pages test", authState?.user?.my_courses, authState?.user?.my_courses?.includes(course_id))
    // if (
    //   !authState?.user?.my_courses?.includes(course_id) &&
    //   !authState.isLoading
    // ) {
    //   router.push('/course-page?id=' + course_id)
    // }
  }, [authState.isLoading])

  //NOTE - This useEffect navigates to the next lecture
  //TODO - Does it make sence to switch this logic to a function?? Here is logic:
  // if lecture has ended we call method that updates its internal timer every second
  // it also updates countDown, once it reached 0 - execute action
  // potential issue could be that the function could reload, but that shouldn't happen
  useEffect(() => {
    if (countDown === 0 && isNextLectureCountdown) {
      nextLectureHandler()
      reset()
      setIsNextLectureCountdown(false)
    }
  }, [countDown, isNextLectureCountdown])

  //NOTE - initialStudyCourseLoad
  const initialStudyCourseLoad = async () => {
    try {
      // 1. Check if CourseId has been passed
      if (!course_id) {
        console.error('Error: courseId is undefined')
        return // Early return if courseId is not defined
      }

      // 2. Fetch Course
      const course = await getLiveCourse(course_id)
      if (!course) {
        console.error('Error fetching Live Course with id: ', course_id)
      }
      // 3. Flatten lectures and set them
      const flatListOfLectures = getFlatListOfLecturesHandler(course)
      setFlatListOfLectures(flatListOfLectures)

      // 4. Fetch progresses
      const progress = await getCourseProgress(course_id)

      setCourse(course)

      //5. Progress exists
      if (progress) {
        console.log('Got Course Progress')
        setCourseProgressHanler(course, flatListOfLectures, progress)
      }
      //6. Should not go here as progress must be returned
      else {
        console.error('Course Progress must exist!')
      }

      setCourseLoaded(true)
    } catch (err) {
      //2.1 Course wasn't fetched or there was an error with getCourseProgress - check the error and display why
      console.error('Error while fetching course or progress: ', err)
      router.push('/course-page?id=' + course_id)

      //TODO - Display Error pop-up with proper reason
    }
  }

  //LINK - handleCourseProgress:
  //1. Accept flat list of lectures and progresses
  const setCourseProgressHanler = (
    course: LiveCourse,
    flatListOfLectures: Lecture[],
    progress: CourseProgress
  ) => {
    if (!course) {
      console.error('Error: Course is undefined')
      return // Early return if courseId is not defined
    }
    //2. Set lectureProgresses and lastLectureId
    const { lectures: lectureProgresses, lastLectureId } = progress
    setLastLectureId(lastLectureId)
    setLectureProgresses(lectureProgresses)

    console.log('lectureProgresses', lectureProgresses)

    //3. If lastLectureId does not exist:
    if (!lastLectureId) {
      console.log('lastLectureId is not set - setting')

      const section = course.course_materials.sections.find(
        (section) => section.lectures && section.lectures.length > 0
      )

      //3.1 set first lecture to be the current one:
      setLecturesHandler(
        course,
        section.lectures[0],
        flatListOfLectures,
        false,
        lectureProgresses
      )
      //4.1 Load Content for the first lecture
      loadContentForLecture(
        section._id,
        section.lectures[0]._id,
        section.lectures[0].content._id,
        course
      )
    }
    //4. If lastLectureId exists:
    else {
      //4.1 Find lastWatchedLecture:
      const lastWatchedLecture = flatListOfLectures.find((lecture) => {
        return lecture._id === lastLectureId
      })
      const sectionId = getSectionByLectureId(course, lastLectureId)

      if (!sectionId) {
        console.error(
          'Error: section with lectureId: ',
          lastLectureId,
          ' has not been found'
        )
      } else {
        if (!lastWatchedLecture) {
          //NOTE - EDGE CASE:
          //3.2 lastLectureId must match with lecture list
          //so this case should not happen, but if such error happens - we set first lecture as current lecture
          //TODO - write logic to send us report if this error has happened

          console.error(
            'Error: lecture with lectureId: ',
            lastLectureId,
            ' has not been found'
          )
          setLecturesHandler(
            course,
            course.course_materials.sections[0].lectures[0],
            flatListOfLectures,
            false,
            lectureProgresses
          )

          loadContentForLecture(
            sectionId,
            lastLectureId,
            course.course_materials.sections[0].lectures[0].content._id,
            course
          )
        } else {
          //3.1 Update Lectures to set lastWatchedLecture as current one
          setLecturesHandler(
            course,
            lastWatchedLecture,
            flatListOfLectures,
            false,
            lectureProgresses
          )
          loadContentForLecture(
            sectionId,
            lastLectureId,
            lastWatchedLecture.content._id,
            course
          )
        }

        //3.4 Load Content for current Lecture
        if (sectionId && lastWatchedLecture) {
          loadContentForLecture(
            sectionId,
            lastLectureId,
            lastWatchedLecture.content._id
          )
        } else {
          //NOTE - EDGE CASE:
          //3.5 This should not happen as each lecture is part of the section
          //TODO - write logic to send us report if this error has happened
          console.error(
            'Error: section with lectureId: ',
            lastLectureId,
            ' has not been found'
          )
        }
      }
    }
  }

  //Gives Lecture array without sections in the order from first to last section
  const getFlatListOfLecturesHandler = (course: CourseVersion) => {
    const arrayOfSections = course.course_materials.sections.map(
      (section) => section.lectures
    )
    return flatten(arrayOfSections)
  }

  //LINK - setLecturesHandler:
  //1. Function takes params to update states all together
  const setLecturesHandler = (
    course: LiveCourse,
    newCurrentLecture: Lecture,
    flatListOfLectures: Lecture[],
    // if true - will update course progress on backend
    shouldUpdateCourseProgress: boolean,
    lectureProgresses: LectureProgress[]
  ) => {
    //2.1 Check if Course exists
    if (!course) {
      console.error('Error: course is undefined')
      return // Early return if courseId is not defined
    }
    //2.2 Check if newCurrentLecture exists
    if (!newCurrentLecture) {
      console.error('Error: newCurrentLecture is undefined')
      return // Early return if courseId is not defined
    }
    //2.3 Check if lectures > 0
    if (!flatListOfLectures || !(flatListOfLectures.length > 0)) {
      console.error('Error: there is no lectures')
      return // Early return if courseId is not defined
    }

    //3. Set newCurrentLecture
    if (newCurrentLecture._id !== currentLecture?._id) {
      //2.1 Set newCurrentLecture
      console.log('setting new current lecture')
      setCurrentLecture(newCurrentLecture)

      //4. Set Progress for Current Lecture
      setCurrentProgressHandler(lectureProgresses, newCurrentLecture._id)

      //TODO -  - Move this part to a separate function??
      //update lastLectureId on the server
      shouldUpdateCourseProgress &&
        updateCourseProgress(course_id, newCurrentLecture._id)
      //set nextLecture (might be undefined)
      const nextLecture = getNextLecture(newCurrentLecture, flatListOfLectures)
      setNextLecture(nextLecture)
      //set previousLecture (might be undefined)
      const previousLecture = getPreviousLecture(
        newCurrentLecture,
        flatListOfLectures
      )
      setPreviousLecture(previousLecture)
    } else {
      //no need to set - it is the same one
    }
  }

  const setCurrentProgressHandler = (
    lectureProgresses: LectureProgress[],
    currentLectureId: string
  ) => {
    //1. Check if currentLectureId is not undefined
    if (!currentLectureId || currentLectureId === '') {
      console.error('Error: currentLectureId is undefined')
      return
    }

    //2. Set new Lecture Progress if there is no lecture progresses
    if (!lectureProgresses || !(lectureProgresses.length > 0)) {
      console.log('set initial lectureProgress')
      setCurrentProgress({
        lectureId: currentLectureId,
        done: false,
        watchTime: 0,
      })
    } else {
      //3. Find current progress in existing progresses
      const currentProgress = getLectureProgressById(
        lectureProgresses,
        currentLectureId
      )
      //2.3 If does not exists - create a new one
      if (!currentProgress) {
        setCurrentProgress({
          lectureId: currentLectureId,
          done: false,
          watchTime: 0,
        })
      } else {
        setCurrentProgress(currentProgress)
      }
    }
  }

  //loads content for the lecture
  const loadContentForLecture = (
    sectionId: string,
    lectureId: string,
    contentId: string,
    courseProp: CourseVersion = course as CourseVersion //FIXME - Apply proper type
  ) => {
    console.log('loading content')
    if (courseProp) {
      console.log('fetching content')
      getCourseLectureContent(
        course_id,
        courseProp?.version as number,
        sectionId,
        lectureId,
        contentId,
        true,
        true
      ).then((content: Content) => {
        console.log('Study Course->fetched content: ', content)
        setLoadedContent(content)
      })
    }
  }

  //search local lectureProgresses and return one that matches lectureId
  const getLectureProgressById = (
    lectureProgresses: LectureProgress[],
    lectureId: string
  ) => {
    if (lectureProgresses && lectureProgresses.length > 0) {
      const currentLectureProgress = lectureProgresses?.find(
        (lectureProgress) => {
          return lectureProgress.lectureId === lectureId
        }
      )
      return currentLectureProgress
    }
  }

  //return section based on lectureId
  const getSectionByLectureId = (course: CourseVersion, lectureId: string) => {
    const section = course?.course_materials.sections.find((section) => {
      return section.lectures.find((lecture) => {
        return lecture._id === lectureId
      })
    })
    return section?._id
  }

  //LINK - getNextLecture
  // if lastLecture - do not return anything
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
    } else {
      //TODO - Execute another method like courseCompleted()
    }
  }

  //LINK - nextLectureHandler
  // 1. This method is being trigered by buttons or event listeners
  const nextLectureHandler = () => {
    //2. Check if ruquired items exist
    if (course && nextLecture && flatListOfLectures) {
      //3. Save current lectureProgress
      // the value might be max 5sec late
      if (currentLecture) {
        saveWatchTimeProgress(secondsPlayed, currentLecture)
      }
      //4. load next lecture and its content
      const sectionId = getSectionByLectureId(course, nextLecture._id)
      if (sectionId) {
        loadContentForLecture(
          sectionId,
          nextLecture._id,
          nextLecture.content._id
        )
        //5. update lectures
        lectureProgresses &&
          setLecturesHandler(
            course,
            nextLecture,
            flatListOfLectures,
            true,
            lectureProgresses
          )
        setSecondsPlayed(0)
        setIsInitialLoad(false)
      }
    }
  }

  //LINK - getPreviousLecture
  // if first lecture - do not return anything
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

  //LINK - previousLectureHandler
  // 1. This method is being trigered by buttons or event listeners
  const previousLectureHandler = () => {
    //2. Check if ruquired items exist
    if (previousLecture && course && flatListOfLectures) {
      //3. Save current lectureProgress
      if (currentLecture) {
        saveWatchTimeProgress(secondsPlayed, currentLecture) // the value might be max 5sec late
      }
      //4. load previous lecture and its content
      const sectionId = getSectionByLectureId(course, previousLecture._id)
      if (sectionId) {
        loadContentForLecture(
          sectionId,
          previousLecture._id,
          previousLecture.content._id
        )
        lectureProgresses &&
          setLecturesHandler(
            course,
            previousLecture,
            flatListOfLectures,
            true,
            lectureProgresses
          )
        setSecondsPlayed(0)
        setIsInitialLoad(false)
      }
    }
  }

  //LINK - handleSaveWatchedTime
  //delays watched time using delayCallbackForVideoProgress
  //once delay is passed - saves new progress
  const handleSaveWatchedTime = (secondsWatched: number) => {
    delayCallbackForVideoProgress(() => {
      console.log('Save progress called')
      //here we will call API
      if (currentLecture) {
        saveWatchTimeProgress(secondsWatched, currentLecture)
      }
    }, false)
  }

  //LINK - onVideoProgressHandler
  const onVideoProgressHandler = (seconds: number) => {
    if (currentLecture && !currentProgress?.done) {
      //update lecture status to done when > than required % watched:
      if (seconds > currentLecture?.content.duration * LECTURE_DONE_PERCENT) {
        if (!isSavingProgress) {
          //clear previous timer
          clearTimerForProgress()
          saveWatchTimeProgress(seconds, currentLecture)
        }
      } else {
        // update secondsPlayed:
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

  //LINK - onVideoEndHandler
  const onVideoEndHandler = () => {
    //Update lecture to be done
    //commented as we already save it when > 95% has been watched
    // if (currentLecture) {
    //   updateLectureProgressDoneHandler(currentLecture._id, true, 0)
    // }

    //Set countdown for nextLecture if it is available
    if (nextLecture) {
      startCountdown()
      console.log('countDown', countDown)
      setIsNextLectureCountdown(true)
    }
    //TODO - Implement:
    //Not Done = if not - is it the last lecture?
    //Not Done = if it's the last lecture - we need to call endCourseHandler()
    //Not Done = if nextLecture is available - call initiateNextLecture()
    console.log('Video has ended')
  }

  //LINK - saveWatchTimeProgress
  // saves new lecture progress to DB using below function: updateLectureProgress
  //TODO - combine these two methods ??
  const saveWatchTimeProgress = (
    secondsPlayed: number,
    currentLecture: Lecture
  ) => {
    if (currentLecture) {
      const lectureIsDone = secondsPlayed > currentLecture.content.duration - 10
      lectureIsDone
        ? updateLectureProgress(currentLecture._id, true, secondsPlayed)
        : updateLectureProgress(currentLecture._id, false, secondsPlayed)
    }
  }

  //LINK - updateLectureProgress
  // update lecture progress in DB
  const updateLectureProgress = async (
    lectureId,
    done = false,
    watchTime = 0
  ) => {
    const newLectureProgress = {
      courseId: course_id,
      lectureId,
      watchTime,
      done,
    }

    if (!course) {
      return // No course to update progress for
    }

    // Prevent redundant attempts to save the progress
    if (isSavingProgress) {
      return
    }

    isSavingProgress = true

    try {
      // Update progress on the backend
      const updatedProgress = await updateCourseLectureProgress(
        course_id,
        newLectureProgress
      )

      console.log('newLectureProgress from backend', updatedProgress)

      // Update state based on the previous state
      setLectureProgresses((prevProgresses) => {
        const existingIndex = prevProgresses?.findIndex(
          (progress) => progress?.lectureId === lectureId
        )
        console.log('existingIndex: ', existingIndex)

        if (existingIndex === -1) {
          // Lecture progress does not exist, add it to the array
          return [...prevProgresses, updatedProgress]
        } else {
          // Lecture progress exists, update it in the array
          const updatedLectureProgresses = [...prevProgresses]
          updatedLectureProgresses[existingIndex] = {
            ...updatedLectureProgresses[existingIndex],
            ...updatedProgress,
          }
          return updatedLectureProgresses
        }
      })
    } catch (error) {
      console.error('Error updating lecture progress:', error)
    } finally {
      // Ensure isSavingProgress is reset even if an error occurs
      isSavingProgress = false
    }
  }

  //LINK - onLecturePressHandler
  // called when clicked on Lecture
  const onLecturePressHandler = (lecture: Lecture, sectionId: string) => {
    if (
      course &&
      flatListOfLectures &&
      flatListOfLectures.length > 0 &&
      lectureProgresses
    ) {
      console.log('onLecturePressHandler clicked')
      setLecturesHandler(
        course,
        lecture,
        flatListOfLectures,
        true,
        lectureProgresses
      )
      if (course) {
        loadContentForLecture(sectionId, lecture._id, lecture.content?._id)
        setIsInitialLoad(false)
      }
    }
  }

  //LINK - changeLectureProgressStatusHandler
  //when called will set progress.done status from false to true OR vise versa
  const changeLectureProgressStatusHandler = (lectureId: string) => {
    // TODO - FIX WITH TEXT CONTENT
    //What's this is about??

    if (lectureProgresses && lectureProgresses.length > 0) {
      //Find current lectureProgress
      const lectureProgress = getLectureProgressById(
        lectureProgresses,
        lectureId
      )

      //there is no progress associated with this lecture
      if (!lectureProgress) {
        //create a new lectureProgress
        updateLectureProgress(lectureId, true, 0)
      } else {
        //update existing lectureProgress
        updateLectureProgress(
          lectureProgress.lectureId,
          !lectureProgress.done,
          lectureProgress.watchTime
        )
      }
    }
    //lecture progresses does not exist - so we need to create them
    else {
      //TODO - Check if Lecture id is valid

      if (lectureId) {
        console.log('update progress.done called')
        updateLectureProgress(lectureId, true, 0)
      }
    }
  }

  //LINK - clearTimerForProgress
  // Clear timer so it does not execute the action
  const clearTimerForProgress = () => {
    delayCallbackForVideoProgress(() => {
      console.log('clearTimerForProgress')
    }, true)
  }

  const contextValues = {
    course_id: course_id as string,
    course,
    lectureProgresses,
    courseLoaded,
    bottomNotification,
    setBottomNotification,
    flatListOfLectures,
    lastLectureId,
    loadedContent,
    currentLecture,
    currentProgress,
    nextLecture,
    isNextLectureCountdown,
    countDown,
    previousLecture,
    previousLectureHandler,
    nextLectureHandler,
    onVideoProgressHandler,
    onVideoEndHandler,
    onLecturePressHandler,
    changeLectureProgressStatusHandler,
  }

  return (
    <Index.Provider value={contextValues}>
      <Head>
        <title>
          {t('Edugram')}&nbsp; - &nbsp;
          {courseLoaded ? course?.title : t('messages.Please wait')}
        </title>
      </Head>
      {children}
    </Index.Provider>
  )
}

export { useStudyCourse, StudyCourseProvider }
