import axios from 'axios'
import routes from '@configs/api'

//TODO
//Promise type should not be any
//also updatedFields shouldn't be any - there should be way to know which properties will be there

const updateCourseHelper = (
  courseId: string,
  updatedFields: {}
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/courses`
    const data = {
      updatedFields: updatedFields,
      courseId: courseId,
    }
    console.log('Data: ', data)
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .patch(url, data, config)
      .then((res) => {
        console.log('Updated course res: ', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error updating the course:' + err)
      })
  })
}

export default updateCourseHelper
