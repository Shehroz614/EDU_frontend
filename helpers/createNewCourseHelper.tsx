import axios from 'axios'
import { Course } from 'types/course'
import routes from '@configs/api'

const createNewCourseHelper = (): Promise<Course> => {
  return new Promise((resolve, reject) => {
    //connect to backend and create a course
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/courses`
    const data = {
      userData: {
        // uid: user._id,
      },
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .post(url, data, config)
      .then((res) => {
        const course = res.data
        console.log('Created course: ', course)
        resolve(course)
      })
      .catch((err) => {
        reject('Error creating course: ' + err)
      })
  })
}

export default createNewCourseHelper
