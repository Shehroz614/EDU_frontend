import styled from '@emotion/styled'

const Body = styled.div`
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
  justify-content: center;
  height: 8rem;
  width: 100%;
  margin-left: 0.5rem;
  flex-direction: column;
  max-width: 1440px;
  @media (min-width: 768px) {
    align-items: flex-start;
    justify-content: center;
  }
  z-index: 2;
`
const Title = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  font-weight: bold;
`
const WishlistArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2rem;
  justify-content: space-between;
`
const GroupedButtons = styled.div`
  display: flex;
`
const TotalCoursesQty = styled.div`
  font-weight: bold;
  width: 100%;
  margin-bottom: 2rem;
  font-size: 1.125rem;
  margin-top: 2rem;
`
const CoursesWrapper = styled.div`
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

export {
  Body,
  TitleBackground,
  InnerWrapper,
  Title,
  WishlistArea,
  GroupedButtons,
  TotalCoursesQty,
  CoursesWrapper,
  CoursesRow,
}
