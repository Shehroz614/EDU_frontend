// @ts-nocheck
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import Head from 'next/head'
import { Course, CourseVersion } from '@type/course'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { BottomNotification, CenterNotification } from '@type/main'
import { createCourse, getCourse, updateCourse } from '@services/api/course'
import createCourseDraftVersion from '@services/api/course/createCourseDraftVersion'
import useWindowDimensions from '@hooks/useWindowDimensions'

interface CreateCourseContext {
  course_id: string
  course: CourseVersion | null
  versions: CourseVersion[]
  courseLoaded: boolean
  changesSaved: boolean
  setChangesSaved: Dispatch<SetStateAction<boolean>>
  saveChanges: (e: CourseVersion) => void
  updateChanges: (e: {}) => Promise<void>
  discardChanges: () => void
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  bottomNotification: boolean | BottomNotification
  setBottomNotification: Dispatch<SetStateAction<boolean | BottomNotification>>
  centerNotification: boolean | CenterNotification
  setCenterNotification: Dispatch<SetStateAction<boolean | CenterNotification>>
  createNewDraft: () => void
  switchCourse: (course: CourseVersion) => void
  liveVersion: number | null
  draftVersion: number | null
  abortControllers: {
    [key: string]: AbortController
  }
  addAbortController: (name: string, controller: AbortController) => void
  removeAbortController: (name: string) => void
}
const Index = createContext<CreateCourseContext | undefined>(undefined)
const useCreateCourse = () => {
  const context = useContext(Index)
  if (context === undefined) {
    throw new Error(
      'useCreateCourse must be used within a CreateCourseProvider'
    )
  }
  return context
}

const CreateCourseProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation()
  const dimensions = useWindowDimensions()
  const { course_id } = router.query
  const [course, setCourse] = useState<CourseVersion | null>(null)
  const [versions, setVersions] = useState<CourseVersion[]>([])
  const [courseLoaded, setCourseLoaded] = useState<boolean>(false)
  const [liveVersion, setLiveVersion] = useState<number | null>()
  const [draftVersion, setDraftVersion] = useState<number | null>()

  const [changesSaved, setChangesSaved] = useState<boolean>(true)
  const [activeStep, setActiveStep] = useState<number>(1)
  const [bottomNotification, setBottomNotification] = useState<
    boolean | BottomNotification
  >(false)
  const [centerNotification, setCenterNotification] = useState<
    boolean | CenterNotification
  >(false)
  const [abortControllers, setAbortControllers] = useState<{
    [key: string]: AbortController
  }>([])

  useEffect(() => {
    if ((dimensions?.width as number) < 992) {
      setCenterNotification({
        title: 'Sorry for the interruption!',
        message:
          'Create Course module currently is only supported on desktop resolution. Our dev team is working on adding tablet and mobile support soon',
        firstBtn: {
          actionType: 'confirm',
          title: 'Continue with Desktop Resolution',
          action: () => router.push('/author'),
        },
      })
      return
    } else {
      setCenterNotification(false)
    }
  }, [dimensions])
  useEffect(() => {
    if (course_id === 'new') {
      createCourse()
        .then((course) => {
          console.log('course', course)
          if (course.draftVersion) {
            const version = course.versions[course.draftVersion]
            version.author = course.author
            setCourse(version)
          } else {
            const versions: any[] = Object.keys(course.versions).reverse()
            const version = course.versions[versions[0]]
            version.author = course.author
            setCourse(course.versions[versions[0]])
          }
          setDraftVersion(course.draftVersion)
          setLiveVersion(course.liveVersion)
          setVersions(course.versions)
          setCourseLoaded(true)
          router.query.course_id = course._id
          router.push(router)
        })
        .catch((err) => {
          setBottomNotification({
            message:
              err?.response?.data?.message || 'Unable to create a new Course',
            actionType: 'error',
          })
        })
    } else {
      getCourse(course_id)
        .then((course) => {
          if (course.draftVersion) {
            const version = course.versions[course.draftVersion]
            version.author = course.author
            setCourse(version)
          } else {
            const versions: any[] = Object.keys(course.versions).reverse()
            const version = course.versions[versions[0]]
            version.author = course.author
            setCourse(course.versions[versions[0]])
          }
          setDraftVersion(course.draftVersion)
          setLiveVersion(course.liveVersion)
          setVersions(course.versions)
          setCourseLoaded(true)
        })
        .catch((err) => console.log(err))
    }
  }, [])

  const createNewDraft = () => {
    createCourseDraftVersion(course_id)
      .then(async (newCourse) => {
        setDraftVersion(newCourse.draftVersion)
        setLiveVersion(newCourse.liveVersion)
        setVersions(newCourse.versions)
        switchCourse(newCourse.versions[newCourse.draftVersion])
        setBottomNotification({
          message: 'A new draft has been created successfully',
          actionType: 'success',
        })
      })
      .catch((err) => {
        console.log(err)
        setBottomNotification({
          message: err?.response?.data?.message || 'Failed to create new Draft',
          actionType: 'error',
        })
      })
  }
  const switchCourse = async (course: Course) => {
    await setCourse(course)
    if (course.status === 'draft') {
      setActiveStep(1)
    } else {
      setActiveStep(5)
    }
  }
  const saveChanges = (updatedCourse: Course) => {
    setChangesSaved(true)
    setCourse(updatedCourse)
  }
  const updateChanges = async (updatedFields: {}) => {
    return await updateCourse(
      course_id as string,
      updatedFields,
      course?.version as number
    )
  }
  const discardChanges = () => {
    setChangesSaved(true)
  }
  const addAbortController = (name: string, controller: AbortController) => {
    setAbortControllers((state) => ({
      ...state,
      [name]: controller,
    }))
  }
  const removeAbortController = (name: string) => {
    setAbortControllers(({ [name]: _, ...rest }) => rest)
  }

  const contextValues = {
    course_id: course_id as string,
    course,
    versions,
    courseLoaded,
    saveChanges,
    setChangesSaved,
    changesSaved,
    updateChanges,
    discardChanges,
    activeStep,
    setActiveStep,
    bottomNotification,
    setBottomNotification,
    centerNotification,
    setCenterNotification,
    createNewDraft,
    switchCourse,
    liveVersion,
    draftVersion,
    abortControllers,
    addAbortController,
    removeAbortController,
  }

  return (
    <Index.Provider value={contextValues}>
      <Head>
        <title>
          {t('Edugram')}&nbsp; - &nbsp;
          {courseLoaded
            ? course_id === 'new'
              ? t('common.Create Course', { ns: 'createCourse' })
              : t('common.Edit Course', { ns: 'createCourse' })
            : t('messages.Please wait')}
        </title>
      </Head>
      {children}
    </Index.Provider>
  )
}

export { useCreateCourse, CreateCourseProvider }
