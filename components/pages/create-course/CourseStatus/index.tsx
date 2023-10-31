// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import {
  StatusWrapper,
  StatusContainer,
  StatusDetails,
  StatusIndicator,
  StatusDropdown,
  StatusRow,
  AddButton,
} from '@styled_components/CourseStatus/styled.components'
import { useCreateCourse } from '@contexts/CreateCourse'
import CourseStatuses from '@constants/courseStatuses'
import { PlusCircleOutline } from '@styled-icons/evaicons-outline'
import { Course } from '@ugu/types'
import getCourse from '@helpers/getCourseHelper'

type CourseStatusProps = {
  isSmall?: boolean
}
const CourseStatus = ({ isSmall = false }: CourseStatusProps): JSX.Element => {
  const {
    courseLoaded,
    course,
    versions,
    course_id,
    createNewDraft,
    switchCourse,
  } = useCreateCourse()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const hasDraftVersion = (): boolean => {
    if (
      Object.values(versions).some(
        (item) => item.status !== 'online' && item.status !== 'rejected'
      )
    ) {
      return true
    }
    return Object.values(versions).some((item) => item.status === 'draft')
  }

  console.log(hasDraftVersion())

  const handleCourseDropdownClick = (course: Course) => {
    switchCourse(course)
    setIsOpen(false)
  }

  const dropdownRef = useRef<HTMLDivElement>(null)

  const [liveVersion, setLiveVersion] = useState(-1)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [dropdownRef])

  const getLiveVersion = async () => {
    setLiveVersion((await getCourse(course_id))?.liveVersion)
  }

  useEffect(() => {
    getLiveVersion()
  }, [])

  return (
    <StatusWrapper isSmall={isSmall}>
      {isOpen ? (
        <StatusDropdown ref={dropdownRef}>
          {Object.values(versions).map(
            (c, index) =>
              (c?.status != 'online' || liveVersion == c?.version) && (
                <StatusRow
                  key={index}
                  active={c.version === course?.version}
                  onClick={() => handleCourseDropdownClick(c)}
                >
                  <StatusIndicator status={c.status} isSmall={isSmall} />
                  {CourseStatuses[c?.status || 'draft']}
                </StatusRow>
              )
          )}
        </StatusDropdown>
      ) : (
        <StatusContainer isSmall={isSmall}>
          {courseLoaded ? (
            <>
              <StatusDetails
                isSmall={isSmall}
                onClick={() =>
                  isSmall
                    ? {}
                    : Object.keys(versions).length > 1 && setIsOpen(true)
                }
              >
                <StatusIndicator
                  status={course?.status || 'draft'}
                  isSmall={isSmall}
                />
                {!isSmall && CourseStatuses[course?.status || 'draft']}
              </StatusDetails>
              {!isSmall && !hasDraftVersion() && (
                <AddButton onClick={createNewDraft}>
                  <PlusCircleOutline size={22} />
                </AddButton>
              )}
            </>
          ) : (
            <StatusDetails isSmall={isSmall}>
              <StatusIndicator status="draft" isSmall={isSmall} />
              {!isSmall && 'Loading...'}
            </StatusDetails>
          )}
        </StatusContainer>
      )}
    </StatusWrapper>
  )
}

export default CourseStatus
