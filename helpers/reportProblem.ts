import axios, { AxiosError } from 'axios'
import routes from '@configs/api'

export const reportProblemHelper = (
  title: string,
  description: string,
  problemType: 'legalConcern' | 'featureRequest' | 'uiUxProblems',
  relatedItem: {
    itemType: string
    itemId: string
  }
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/support/report`
    const data = {
      title: title,
      description: description,
      user: tokenId,
      type: problemType,
      relatedItem: relatedItem,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .post(url, data, config)
      .then((res) => {
        const reportProblem = res.data
        console.log('Created reportProblem: ', reportProblem)
        //callback function
        resolve()
      })
      .catch((err: AxiosError) => {
        reject(
          'Error creating reportProblem: ' + err.response?.status + ' Error'
        )
      })
  })
}
