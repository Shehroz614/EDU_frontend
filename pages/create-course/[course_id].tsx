import React, { useEffect, useState } from 'react'
//import CreateCourse from './components/CreateCourse'
import dynamic from 'next/dynamic'
//import { CreateCourseProvider } from '@contexts/CreateCourse'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Loader from '@components/organisms/Loader'
import { getAuthorCourses } from '@helpers/authorHelpers'
import { useRouter } from 'next/router'
import { useAuth } from '@hooks/useAuth'

const CreateCourse = dynamic(
  () => import('@pages_components/create-course/CreateCourse'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          paddingTop: '49vh',
        }}
      >
        <Loader />
      </div>
    ),
  }
)
const CreateCourseProvider = dynamic(
  async () => (await import('@contexts/CreateCourse')).CreateCourseProvider,
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          paddingTop: '49vh',
        }}
      >
        <Loader />
      </div>
    ),
  }
)

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'home',
        'createCourse',
        'courseMaterials',
        'footer',
      ])),
    },
  }
}

const CreateCourseWrapper = (): JSX.Element => {
  const [isMyCourse, setIsMyCourse] = useState(false)
  const router = useRouter()
  const { authState } = useAuth()

  const getCourses = async () => {
    if (router.query.course_id != 'new') {
      const token = localStorage.getItem('tokenId') || ''
      const courses = await getAuthorCourses(token)

      if (
        courses.filter((item) => item._id == router.query.course_id).length > 0
      ) {
        setIsMyCourse(true)
      } else {
        setIsMyCourse(false)
        router.push('/')
      }
    } else {
      if (!authState.isAuthenticated && !authState.isLoading) {
        setIsMyCourse(false)
        router.push('/')
      } else {
        setIsMyCourse(true)
      }
    }
  }

  useEffect(() => {
    getCourses()
  }, [router.isReady])

  useEffect(() => {
    if (!authState.isAuthenticated && !authState.isLoading) {
      setIsMyCourse(false)
      router.push('/')
    }
  }, [authState.isLoading])

  return isMyCourse ? (
    <CreateCourseProvider>
      <CreateCourse />
    </CreateCourseProvider>
  ) : (
    <></>
  )
}

export default CreateCourseWrapper
