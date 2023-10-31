import axios from 'axios'
import { Course } from 'types/course'
import routes from '@configs/api'

export const getAuthorCourses = (token: string): Promise<Course[]> => {
  return new Promise((resolve, reject) => {
    const url = `${routes.BASE}/api/author/courses`
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .get(url, config)
      .then((res) => {
        const courses = res.data
        console.log("Author's courses: ", courses)
        resolve(courses)
      })
      .catch((err) => {
        reject("Error fetching Author's Courses: " + err)
      })
  })
}
