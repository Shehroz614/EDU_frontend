import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Loading } from '@nextui-org/react'
import Loader from '@components/organisms/Loader'
import { useTranslation } from 'next-i18next'
import { getLiveCourse } from '@services/api/course'

const CoursePageBlock = dynamic(
  () => import('components/organisms/CoursePageBlock'),
  {
    loading: () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          paddingTop: '29vh',
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
        'authentication',
        'footer',
        'courses',
        'reportProblem',
        'stickyCoursePageBlock',
        'aboutAuthor',
        'courseReviews',
      ])),
    },
  }
}

const Course = () => {
  const router = useRouter()
  const { course_id } = router.query
  const { t } = useTranslation(['common', 'courses', 'footer'])

  const [course, setCourse] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [id, setId] = useState('')

  useEffect(() => {
    setId(router.query.id as string)
  }, [router.isReady])

  useEffect(() => {
    getLiveCourse(course_id)
      .then(async (data) => {
        await setCourse(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }, [])

  return (
    <Layout fullWidth={true}>
      {isLoading ? (
        <div
          style={{
            width: '100vw',
            display: 'flex',
            height: '400px',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Loading></Loading>
        </div>
      ) : course ? (
        <CoursePageBlock course={course} course_id={id} />
      ) : (
        <div
          style={{
            width: '100vw',
            display: 'flex',
            height: '400px',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {t('messages.Course not found', { ns: 'courses' })}
        </div>
      )}
    </Layout>
  )
}

export default Course
