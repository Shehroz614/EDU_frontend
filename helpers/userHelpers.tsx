import axios, { AxiosRequestConfig } from 'axios'
import {
  Course,
  CourseProgress,
  CourseVersion,
  ShortCourse,
} from 'types/course'
import { RawUser, User, UserProfileUpdate } from 'types/user'
import routes from '@configs/api'
import normalizeUser from '@utils/normalizeUser'

// TODO - Deprecated, migrated to individual api's under services;
export const signUpUserHelper = (
  tokenId: string,
  firstName: string,
  lastName: string,
  emailSubscription: boolean
): Promise<User> => {
  return new Promise((resolve, reject) => {
    const url = `${routes.BASE}/register`

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    const data = {
      userData: {
        first_name: firstName,
        last_name: lastName,
        email_subscription: emailSubscription,
      },
    }

    axios
      .post(url, data, config)
      .then((res) => {
        const user: User = normalizeUser(res.data)
        resolve(user)
      })
      .catch((err) => {
        reject('Error creating user occurred: ' + err)
      })
  })
}

export const getMyCoursesHelper = (): Promise<{
  courses: CourseVersion[]
  progress: CourseProgress[]
}> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/user/my-courses`

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .get(url, config)
      .then((res) => {
        console.log('My Courses:', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occurred while generating link: ' + err)
      })
  })
}

//in progress
export const setProgressForCourse = (_courseId: string): Promise<Course[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/user/my-courses`

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .get(url, config)
      .then((res) => {
        console.log('My Courses:', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occurred while generating link: ' + err)
      })
  })
}
export const getCartHelper = (): Promise<ShortCourse[]> => {
  const tokenId = localStorage.getItem('tokenId')

  return new Promise((resolve, reject) => {
    const url = `${routes.BASE}/api/user/cart`
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .get(url, config)
      .then((res) => {
        const cart = res.data
        console.log('Got cart: ', cart)
        resolve(cart as ShortCourse[])
      })
      .catch((err) => {
        reject('Error fetching cart: ' + err)
      })
  })
}

export const putCartHelper = (courseId: string) => {
  const tokenId = localStorage.getItem('tokenId')

  return new Promise((resolve, reject) => {
    const url = `${routes.BASE}/api/user/cart`
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { courseId: courseId }

    axios
      .post(url, data, config)
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

export const removeCartHelper = (courseId: string) => {
  const tokenId = localStorage.getItem('tokenId')

  return new Promise((resolve, reject) => {
    const url = `${routes.BASE}/api/user/cart`
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
      data: {
        courseId: courseId,
      },
    }

    axios
      .delete(url, config)
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

export const getWishlistHelper = (): Promise<ShortCourse[]> => {
  const tokenId = localStorage.getItem('tokenId')

  return new Promise((resolve, reject) => {
    const url = `${routes.BASE}/api/user/wishlist`
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .get(url, config)
      .then((res) => {
        const cart = res.data
        console.log('Got wishlist: ', cart)
        resolve(cart as ShortCourse[])
      })
      .catch((err) => {
        reject('Error fetching wishlist: ' + err)
      })
  })
}

export const putWishlistHelper = (courseId: string) => {
  const tokenId = localStorage.getItem('tokenId')

  return new Promise((resolve, reject) => {
    const url = `${routes.BASE}/api/user/wishlist`
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { courseId: courseId }

    console.log('Course added to wishlist')

    axios
      .post(url, data, config)
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

export const removeWishlistHelper = (courseId: string) => {
  const tokenId = localStorage.getItem('tokenId')

  return new Promise((resolve, reject) => {
    const url = `${routes.BASE}/api/user/wishlist`
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
      data: {
        courseId: courseId,
      },
    }

    axios
      .delete(url, config)
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

export const updateProfileInfo = (userData: UserProfileUpdate) => {
  console.log(userData)

  const tokenId = localStorage.getItem('tokenId')
  if (Object.keys(userData)?.length === 0) {
    return Promise.reject(new Error('User data is required'))
  }
  return new Promise<RawUser>((resolve, reject) => {
    const url = `${routes.BASE}/api/user/profile`

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .patch(url, userData, config)
      .then((res) => {
        const userProfile: RawUser = res.data
        console.log('Got user: ', userProfile)
        resolve(userProfile)
      })
      .catch((err) => {
        reject('Error fetching course: ' + err)
      })
  })
}
