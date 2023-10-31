import axios, { AxiosError } from 'axios'
import routes from '@configs/api'

export const addCoupon = (
  code: string,
  discount: number,
  _type: string,
  expiry: string,
  courseId?: string,
  courseVersion?: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const url = `${routes.BASE}/api/education/courses/${courseId}/${courseVersion}/coupons`
    const tokenId = localStorage.getItem('tokenId')
    const data = {
      coupon: {
        code: code,
        discount: discount,
        courseId: courseId,
        expiry: expiry,
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
        const price = res.data
        console.log('Created price: ', price)
        //callback function
        resolve(res?.data)
      })
      .catch((err: AxiosError) => {
        reject('Error creating price: ' + err.response?.status + ' Error')
      })
  })
}

export const getCoupon = async (courseId?: string, courseVersion?: number) => {
  const url = `${routes.BASE}/api/education/courses/${courseId}/${courseVersion}/coupons`
  const tokenId = localStorage.getItem('tokenId')
  const config = {
    headers: {
      Authorization: `Bearer ${tokenId}`,
    },
  }
  return await axios.get(url, config)
}

export const deleteCouponHelper = (
  couponId: string,
  courseId?: string,
  courseVersion?: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const url = `${routes.BASE}/api/education/courses/${courseId}/${courseVersion}/coupons/${couponId}`
    const tokenId = localStorage.getItem('tokenId')
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .delete(url, config)
      .then(() => {
        console.log('Coupon deleted successfully.')
        resolve()
      })
      .catch((err: AxiosError) => {
        reject('Error deleting coupon: ' + err.response?.status + ' Error')
      })
  })
}

export const postCoupon = (
  code: string,
  discount: number,
  expiry: string,
  courseId?: string,
  courseVersion?: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const url = `${routes.BASE}/api/education/courses/${courseId}/${courseVersion}/coupons`
    const tokenId = localStorage.getItem('tokenId')
    const data = {
      coupon: {
        code: code,
        discount: discount,
        courseId: courseId,
        expiry: expiry,
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
        const coupon = res.data
        console.log('Created coupon: ', coupon)
        resolve(res?.data)
      })
      .catch((err: AxiosError) => {
        reject('Error creating coupon: ' + err.response?.status + ' Error')
      })
  })
}
