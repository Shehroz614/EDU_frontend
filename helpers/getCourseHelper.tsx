import { Course } from '@ugu/types'
import axios from 'axios'
import routes from '@configs/api'

const getCourse = (courseId: string): Promise<Course> => {
  return new Promise((resolve, reject) => {
    const url = `${routes.BASE}/api/education/courses/` + courseId
    const tokenId = localStorage.getItem('tokenId')
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .get(url, config)
      .then((res) => {
        const course = res.data
        console.log('Got course: ', course)
        resolve(course)
      })
      .catch((err) => {
        reject('Error fetching course: ' + err)
      })
  })
}

export default getCourse
