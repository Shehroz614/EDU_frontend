import React from 'react'
import { useMyCourses } from '@contexts/MyCoursesContext'

interface IfOwnedCoursePropsBase {
  id: string | undefined
  children: React.ReactNode
}

interface IfOwnedCoursePropsShow extends IfOwnedCoursePropsBase {
  show: true
  hide?: never
}

interface IfOwnedCoursePropsHide extends IfOwnedCoursePropsBase {
  show?: never
  hide: true
}

type IfOwnedCourseProps = IfOwnedCoursePropsShow | IfOwnedCoursePropsHide

/**
 * IfOwnedCourse checks if a course is owned by the current user.
 *
 * If `show` prop is true, the children are rendered only when the course is owned.
 * If `hide` prop is true, the children are rendered only when the course is not owned.
 *
 * This component should be used with either the `show` or `hide` prop.
 * If neither `show` nor `hide` is provided, TypeScript will throw an error.
 *
 * @example
 * ```tsx
 *  <IfOwnedCourse show id="courseId">
 *    <OwnedCourseComponent />
 *  </IfOwnedCourse>
 * ```
 *
 * @example
 * ```tsx
 *  <IfOwnedCourse hide id="courseId">
 *    <NotOwnedCourseComponent />
 *  </IfOwnedCourse>
 * ```
 *
 * @param props The props to pass to the component.
 * @param props.id The ID of the course to check.
 * @param props.show Whether to show the children when the course is owned.
 * @param props.hide Whether to show the children when the course is not owned.
 * @param props.children The components to render when the condition is met.
 * @returns The children if the conditions are met; otherwise, null.
 */

const IfOwnedCourse: React.FC<IfOwnedCourseProps> = ({
  id,
  show = false,
  hide = false,
  children,
}) => {
  const { isMyCourse, isLoading } = useMyCourses()
  const isOwnedCourse = id && isMyCourse(id)

  if (isLoading) {
    return null
  }
  if ((show && isOwnedCourse) || (hide && !isOwnedCourse)) {
    return <>{children}</>
  }

  return null
}

export default IfOwnedCourse
