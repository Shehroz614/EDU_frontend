import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Loading } from '@nextui-org/react'
import Loader from '@components/organisms/Loader'
import routes from '@configs/api'

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

export async function getStaticProps({ locale }: { locale: string }) {
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

const CoursePage = () => {
  const [course, setCourse] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [id, setId] = useState('')

  useEffect(() => {
    setId(router.query.id as string)
  }, [router.isReady])

  useEffect(() => {
    const url = `${routes.BASE}/api/education/courses/${
      id || router.query.id
    }/live`

    axios
      .get(url)
      .then((res) => {
        console.log('Course Object Res from the backend: ', res)
        setCourse(res.data)
        console.log(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log('Error fetching the Course:', err)
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      })
  }, [id])

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
          Error 404
        </div>
      )}
    </Layout>
  )
}

export default CoursePage
