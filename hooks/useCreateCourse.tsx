import { useState, useEffect } from 'react'
import getCourseHelper from 'helpers/getCourseHelper'
import createNewCourseHelper from 'helpers/createNewCourseHelper'
import { Course } from '@ugu/types'

const useCreateCourse = (courseId: string) => {
  const [course, setCourse] = useState<Course>()
  const [courseLoaded, setCourseLoaded] = useState<boolean>(false)
  const [changesSaved, setChangesSaved] = useState<boolean>(true)

  useEffect(() => {
    if (courseId == 'new') {
      console.log('Create new course')
      createNewCourseHelper()
        .then((course) => {
          setCourse(course)
          setCourseLoaded(true)
        })
        .catch((err) => console.log(err))
    } else {
      console.log('Fetch course with courseID: ', courseId)
      getCourseHelper(courseId)
        .then((course) => {
          setCourse(course)
          setCourseLoaded(true)
        })
        .catch((err) => console.log(err))
    }
  }, [courseId])

  const saveChanges = (updatedCourse: Course) => {
    setChangesSaved(true)
    setCourse(updatedCourse)
  }

  const discardChanges = () => {
    setChangesSaved(true)
  }

  return {
    course,
    courseLoaded,
    saveChanges,
    setChangesSaved,
    changesSaved,
    discardChanges,
  }
}

export default useCreateCourse
