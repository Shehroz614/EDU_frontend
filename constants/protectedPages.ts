const protectedPages: string[] = [
  'my-courses',
  'settings',
  'author',
  'study-course',
  'create-course',
]

export const isProtected = (route: string) => {
  return protectedPages.includes(route.split('/')[1])
}

export default protectedPages
