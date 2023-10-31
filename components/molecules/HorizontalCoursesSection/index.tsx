import React from 'react'
import styled from '@emotion/styled'
import HorizontalCourseCard from '@components/molecules/_HorizontalCourse/HorizontalCourse'
import { ShortCourse } from '@type/course'
import { Pagination } from '@nextui-org/react'
import LazyLoad from 'react-lazy-load'

type HorizontalCoursesSectionPropType = {
  title: string
  pagination: boolean
  courses: ShortCourse[]
}
const HorizontalCoursesSectionWrapper = styled.div`
  /* height: 50vh; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-flow: wrap;
`

// const HorizontalCoursesWrapper = styled.div`
//   /* height: 50vh; */
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   flex-flow: wrap;
//   justify-content: space-between;
// `

const HorizontalCoursesSection: React.FC<HorizontalCoursesSectionPropType> = ({
  courses,
}) => {
  return (
    <HorizontalCoursesSectionWrapper>
      {/* {<BlockSectionTitle navigationButtons={pagination}>
        {title}
      </BlockSectionTitle>} */}
      {/* <GroupedCourses> */}
      {courses?.length > 0 ? (
        <>
          <div>
            {courses?.map((item) => (
              <LazyLoad key={item._id}>
                <HorizontalCourseCard cardType="home" data={item} />
              </LazyLoad>
            ))}
            <div>
              <Pagination total={Math.ceil(courses.length / 20)} />
            </div>
          </div>
        </>
      ) : (
        <h3
          style={{
            fontSize: '1.3rem',
            color: '#888',
            margin: 'auto',
            marginTop: '10rem',
          }}
        >
          No courses found
        </h3>
      )}
      {/* </GroupedCourses> */}
      {/* <HorizontalCourse cardType="home" /> */}
      {/* <HorizontalCourse cardType="home" /> */}
    </HorizontalCoursesSectionWrapper>
  )
}

export default HorizontalCoursesSection
