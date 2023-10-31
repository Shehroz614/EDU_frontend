import React from 'react'
import { StudyCourseProvider } from '@contexts/CourseStudy'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import StudyCourseContainer from '@components/pages/study-course/StudyCourseContainer'

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'studyCourse',
        'footer',
      ])),
    },
  }
}

const StudyCourseWrapper = (): JSX.Element => {
  return (
    <StudyCourseProvider>
      <StudyCourseContainer />
    </StudyCourseProvider>
  )
}

export default StudyCourseWrapper
