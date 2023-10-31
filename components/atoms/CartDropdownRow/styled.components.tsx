import styled from '@emotion/styled'

const CartDropdownRowWrapper = styled.div<{
  marginBottom: string
}>`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
  flex: 1;
`
const CourseInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 1rem;
`
const CourseTitle = styled.div`
  font-size: 0.9rem;
  line-height: 1.2rem;
  text-align: left;
  text-overflow: ellipsis;
  word-break: break-word;
  overflow: hidden;
  max-height: 2.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`
const BottomCourseInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 0rem;
  justify-content: space-between;
`
const CourseAuthor = styled.div`
  font-size: 0.7rem;
  max-width: 9rem;
  opacity: 0.5;
  text-align: left;
  text-overflow: ellipsis;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /*number of lines to show */
  -webkit-box-orient: vertical;
  max-height: 1rem;
`
const Price = styled.div`
  display: flex;
  font-size: 0.8rem;
  width: 5rem;
  margin-top: auto;
  font-family: 'RobotoBold', serif;
`
const ImageContainer = styled.div`
  display: flex;
  border-radius: 30px;
  min-width: 3rem;
  max-width: 3rem;
  height: 3rem;
  background-color: #f2f2f2;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
const CourseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export {
  CartDropdownRowWrapper,
  CourseInfoWrapper,
  CourseTitle,
  BottomCourseInfoWrapper,
  CourseAuthor,
  ImageContainer,
  CourseImage,
  Price,
}
