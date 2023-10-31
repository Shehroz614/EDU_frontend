import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const TitleBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10rem;
  padding: 1rem 0;
  width: 100%;
  margin-left: 0.5rem;
  flex-direction: column;
  max-width: 1440px;
  z-index: 1;
  background-color: #f8f8f8;
  margin-bottom: 1.5rem;
  &::before {
    content: '';
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 12rem;
    background-color: #f8f8f8;
    position: absolute;
    left: 0;
    z-index: 1;
    @media (min-width: 768px) {
      height: 8rem;
    }
  }

  @media (min-width: 768px) {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 8rem;
    padding: 0;
  }
`
const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10rem;
  padding: 1rem 0;
  width: 100%;
  margin-left: 0.5rem;
  flex-direction: column;
  max-width: 1440px;
  @media (min-width: 768px) {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 8rem;
    padding: 0;
  }
  z-index: 2;
`
const Title = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  font-weight: bold;
`
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 992px) {
    width: 55%;
  }
  @media (min-width: 1300px) {
    width: 65%;
  }
`
const CoursesWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  position: relative;
`
const CoursesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14.5rem, 1fr));

  flex-direction: row;
  align-items: flex-start;
  margin: 0px 0 30px 0;
  margin-top: 1rem;
  width: 100%;
  flex-wrap: wrap;
  position: relative;
  column-gap: 2rem;
  row-gap: 2rem;
  //cross browser commands to hide scrollbar, but allow scrolling
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent Chrome */
  }
`
const AddCourse = styled.div<{ disabled: boolean }>`
  height: 338px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 14.5rem;
  flex: 1 1 0;
  border-radius: 15px;
  border: 1px solid rgba(151, 151, 151, 0.25);
  box-shadow: 4px 10px 5px #f9f9f9;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  &:hover {
    box-shadow: 4px 10px 20px #e7e7e7;
  }
`
const AddCourseText = styled.div`
  margin-top: 0.5rem;
`
const NotVerifiedNoticeWrapper = styled.div`
  width: 100%;
  margin-bottom: 3em;
`
const NotVerifiedNoticeRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const NotVerifiedNoticeCol = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const NotVerifiedNoticeIconWrapper = styled.div`
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
  margin-top: 5px;
`

export {
  Wrapper,
  TitleBackground,
  InnerWrapper,
  Title,
  ButtonsWrapper,
  CoursesWrapper,
  CoursesRow,
  AddCourse,
  AddCourseText,
  NotVerifiedNoticeWrapper,
  NotVerifiedNoticeRow,
  NotVerifiedNoticeCol,
  NotVerifiedNoticeIconWrapper,
}
