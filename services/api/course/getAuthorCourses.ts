import axios from 'axios'
import { Course } from 'types/course'
import routes from '@configs/api'

const getAuthorCourses = (): Promise<Course[]> => {
  const tokenId = localStorage.getItem('tokenId')
  return new Promise((resolve, reject) => {
    const URL = routes.AUTHOR_COURSES
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .get(URL, config)
      .then((res) => {
        console.log("Author's courses: ", res.data)
        resolve(res.data)
      })
      .catch((err) => {
        reject("Error fetching Author's Courses: " + err)
      })
  })
}

export default getAuthorCourses
