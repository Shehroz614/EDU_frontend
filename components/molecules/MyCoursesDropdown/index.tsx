import React from 'react'
// import styled from '@emotion/styled'
import MyCourseIcon from '../../../public/static/icons/headerIcons/my-courses-icon'
import MyCourseDropdownRow from '../../atoms/MyCourseDropdownRow'
import DropdownEmptyRow from '../../atoms/DropdownEmptyRow'
import Button from '../../atoms/Button'
import DashedSeparator from 'components/atoms/DashedSeparator'
import { colors } from '@configs/styles/config'
import router from 'next/router'
import { useMyCourses } from '@contexts/MyCoursesContext'

import {
  CoursesWrapper,
  CartDropdownContainer,
} from '../CartDropdown/styled.components'

type Props = {
  top?: string
  right?: string
  showMyCoursesDropdown?: boolean
}

// const СartDropdownContainer = styled.div<{
//   empty: boolean
//   top: string
// }>`
//   width: 19rem;
//   display: flex;
//   flex-direction: ${(props) => (props.empty ? 'row' : 'column')};
//   top: ${(props) => (props.top ? props.top : '4rem')};
//   transform: translateX(-45%);
//   position: absolute;
//   background-color: #ffffff;
//   border-radius: 18px 0px 18px 18px;
//   box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.08);
//   padding: 1rem 1rem;
//   z-index: 10;
// `

// const RowsWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   max-height: 13rem;
//   overflow: scroll;
//   //cross browser commands to hide scrollbar, but allow scrolling
//   -ms-overflow-style: none; /* Internet Explorer 10+ */
//   scrollbar-width: none; /* Firefox */
//   ::-webkit-scrollbar {
//     width: 0px;
//     background: transparent; /* make scrollbar transparent Chrome */
//   }
// `
// const EmptyRowsWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   max-height: 11rem;
//   width: 100%;
// `

const MyCoursesDropdown: React.FC<Props> = (props) => {
  const { top = '', right = '', showMyCoursesDropdown } = props
  const { myCourses } = useMyCourses()

  return (
    <div
      style={{
        display: showMyCoursesDropdown ? 'flex' : 'none',
        justifyContent: 'center',
      }}
    >
      <CartDropdownContainer
        empty={!(myCourses?.length > 0)}
        top={top}
        right={right}
      >
        {!(myCourses?.length > 0) ? (
          <DropdownEmptyRow
            icon={<MyCourseIcon height="50%" />}
            text="You have no courses yet"
          />
        ) : (
          <>
            <CoursesWrapper>
              {myCourses?.length > 0
                ? myCourses?.map((course: any) => (
                    <MyCourseDropdownRow
                      key={course._id}
                      marginBottom={'0.5rem'}
                      courseTitle={course.title}
                      image={course.presentationalImage}
                      courseId={course._id}
                    />
                  ))
                : null}
            </CoursesWrapper>
            <DashedSeparator marginBottom="1rem" />
            <Button
              backgroundColor={colors.uguYellow}
              width="100%"
              height="2.25rem"
              text="Go to My Courses"
              fontFamily="RobotoBold"
              fontSize="0.7rem"
              onClick={() => router.push('/my-courses')}
            />
          </>
        )}
      </CartDropdownContainer>
    </div>
  )
}

export default MyCoursesDropdown
