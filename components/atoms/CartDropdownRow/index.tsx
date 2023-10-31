import React from 'react'
import {
  CartDropdownRowWrapper,
  CourseInfoWrapper,
  CourseTitle,
  BottomCourseInfoWrapper,
  CourseAuthor,
  ImageContainer,
  CourseImage,
  Price,
} from './styled.components'
import { ShortCourse } from '@ugu/types'
import Link from 'next/link'

type CategoriesDropdownRow = {
  course: ShortCourse
  marginBottom?: string
}

// TODO - FIX AUTHOR
const CategoriesDropdownRow: React.FunctionComponent<CategoriesDropdownRow> = (
  props
) => {
  const { course, marginBottom = '' } = props

  return (
    <CartDropdownRowWrapper marginBottom={marginBottom}>
      <ImageContainer>
        <CourseImage src={course?.presentationalImage} alt="" />
      </ImageContainer>
      <CourseInfoWrapper>
        <Link
          href={{ pathname: '/course-page', query: { id: course?._id } }}
          prefetch={true}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <CourseTitle>{course?.title}</CourseTitle>
        </Link>
        <BottomCourseInfoWrapper>
          <CourseAuthor>
            Author: {course.author?.first_name} {course.author?.last_name}
          </CourseAuthor>
        </BottomCourseInfoWrapper>
      </CourseInfoWrapper>
      <Price>
        {course && course.price !== undefined
          ? ((course.salePrice || course.price) / 100)
              .toFixed(2)
              .replace(/\.00$/, '') + ' $'
          : ''}
      </Price>
    </CartDropdownRowWrapper>
  )
}

export default CategoriesDropdownRow
