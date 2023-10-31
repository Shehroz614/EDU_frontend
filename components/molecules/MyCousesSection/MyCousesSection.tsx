import styled from '@emotion/styled'
import BlockSectionTitle from '../BlockSectionTitle'
// import MyCourse from '../../atoms/MyCourse'
import { useMyCourses } from '@contexts/MyCoursesContext'
import MyCourse from '../../atoms/MyCourse'
import Link from 'next/link'

const MyCoursesSectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  margin-top: -30px;
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row: 2;
`

const MyCoursesWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
  gap: 2rem;
`

const MyCousesSection: React.FC<{ max: number }> = (props) => {
  const { myCourses, progress } = useMyCourses()

  return (
    <>
      <MyCoursesSectionWrapper>
        <div style={{ width: 'max-content' }}>
          <Link href={'/my-courses'}>
            <BlockSectionTitle navigationButtons={false}>
              My Courses
            </BlockSectionTitle>
          </Link>
        </div>
        {myCourses?.length > 0 ? (
          <MyCoursesWrapper>
            {myCourses?.slice(0, props?.max || -1)?.map((element) => (
              <MyCourse
                marginBottom="20px"
                course={element}
                key={element._id}
                progress={progress}
              ></MyCourse>
            ))}
          </MyCoursesWrapper>
        ) : (
          'You have no courses yet'
        )}
      </MyCoursesSectionWrapper>
    </>
  )
}

export default MyCousesSection
