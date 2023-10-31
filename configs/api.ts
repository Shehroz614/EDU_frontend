const URL =
  process.env.NEXT_PUBLIC_IS_DEV?.toString() === 'true'
    ? process.env.NEXT_PUBLIC_IS_LOCAL?.toString() === 'true'
      ? 'http://localhost:4000'
      : 'https://katowice.edugram.io'
    : 'https://berlin.edugram.io'

const routes = {
  BASE: URL,
  LOGIN: URL + '/login',
  REGISTER: URL + '/register',
  COURSE: URL + '/api/education/courses/',
  AUTHOR: URL + '/api/author',
  AUTHOR_COURSES: URL + '/api/author/courses/',
  AUTHOR_PUBLIC_FILE_URL: URL + '/api/author/public-file-url',
  AUTHOR_INTRODUCTION_VIDEO: URL + '/api/author/introduction-video',
  PAYMENTS: URL + '/api/payments',
  CHECKOUT: URL + '/api/payments/checkout',
  USER_CART: URL + '/api/user/cart',
  USER_WISHLIST: URL + '/api/user/wishlist',
  MY_COURSES: URL + '/api/user/my-courses',
  USER_SAVED_ITEMS: URL + '/api/user/saved-items',
  CATEGORIES: URL + '/api/categories',
  COURSES: URL + '/api/education/courses',
  ORDERS: URL + '/api/orders',
  GIFTING: URL + '/api/gifting',
  SETTINGS: URL + '/api/settings',
}

export default routes
