import React, { createContext, useState, useEffect, useContext } from 'react'
import { CourseVersion, CourseProgress } from '@ugu/types'
import { useAuth } from '@hooks/useAuth'
import getMyCourses from '@services/api/author/getMyCourses'

interface CourseContextType {
  isLoading: boolean
  myCourses: CourseVersion[]
  progress: CourseProgress[]
  refreshMyCourses: () => void
  isMyCourse: (id: string) => boolean
}

export const MyCoursesContext = createContext<CourseContextType | undefined>(
  undefined
)

export const useMyCourses = () => {
  const context = useContext(MyCoursesContext)
  if (context === undefined) {
    throw new Error('useMyCourses must be used within a MyCoursesProvider')
  }
  return context
}

export const MyCoursesProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [myCoursesData, setMyCoursesData] = useState<{
    myCourses: CourseVersion[]
    progress: CourseProgress[]
  }>({ myCourses: [], progress: [] })

  const { authState } = useAuth()

  const isMyCourse = (courseId: string | undefined): boolean => {
    if (!courseId || !authState.isAuthenticated) return false
    if (myCoursesData.myCourses.find((course) => course._id === courseId))
      return true
    return false
  }

  // Function to refresh the courses.
  const refreshMyCourses = async () => {
    if (!authState.isAuthenticated) return
    setIsLoading(true)
    const { courses: myCourses, progress } = await getMyCourses()
    setIsLoading(false)
    setMyCoursesData({ myCourses, progress })
  }

  const clearMyCourses = () => {
    setMyCoursesData({ myCourses: [], progress: [] })
  }

  useEffect(() => {
    if (authState.isAuthenticated) refreshMyCourses()
    else clearMyCourses()
  }, [authState.isAuthenticated])

  const myCoursesProviderValue = {
    isLoading,
    myCourses: myCoursesData.myCourses,
    progress: myCoursesData.progress,
    refreshMyCourses: refreshMyCourses,
    isMyCourse: isMyCourse,
  }

  return (
    <MyCoursesContext.Provider value={myCoursesProviderValue}>
      {children}
    </MyCoursesContext.Provider>
  )
}
