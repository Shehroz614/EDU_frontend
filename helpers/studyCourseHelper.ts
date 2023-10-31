import axios, { AxiosError } from 'axios'
import { CourseProgress, LectureProgress } from 'types/course'
import routes from '@configs/api'

//Get Course Progress
export const getCourseProgressHelper = (
  courseId: string
): Promise<CourseProgress> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/course-progress/` + courseId

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .get(url, config)
      .then((res) => {
        console.log('Fetched Course Progress:', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while fetching Course Progress: ' + err)
      })
  })
}

//put("/lecture-progress")
export const updateLectureProgressHelper = (
  courseId: string,
  newLectureProgress: LectureProgress
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const { lectureId, done } = newLectureProgress
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/lecture-progress`
    const data = {
      lecture_progress: {
        courseId,
        lectureId: lectureId,
        done: done,
        watchtime: 0,
      },
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .put(url, data, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err: AxiosError) => {
        reject('Error updating Lecture Progress: ' + err)
      })
  })
}

//put("/course-progress")
//set the last lecture
export const updateCourseProgressHelper = (
  courseId: string,
  lastLectureId: string
): Promise<LectureProgress> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/course-progress`
    const data = {
      course_progress: {
        courseId,
        lastLectureId,
      },
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .put(url, data, config)
      .then((res) => {
        console.log('Updated last lecture to be: ', lastLectureId, 'res: ', res)
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error updating Lecture Progress: ' + err)
      })
  })
}
