import { useState } from 'react'
import { Course } from '@ugu/types'
import getCourseHelper from 'helpers/getCourseHelper'

const useGetCourseById = () => {
  const [course, setCourse] = useState<Course>()

  const getCourse = (courseId: string) => {
    getCourseHelper(courseId).then((course: Course) => {
      setCourse(course)
    })
  }

  return { course, getCourse }
}

export default useGetCourseById
