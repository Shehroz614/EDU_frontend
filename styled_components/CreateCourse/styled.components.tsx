import styled from '@emotion/styled'

const CourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const CourseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10rem;
  padding: 1rem 0;
  width: 100%;
  margin-left: 0.5rem;
  flex-direction: column;
  max-width: 1440px;
  z-index: 2;
  &::before {
    content: '';
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 12rem;
    background-color: #f8f8f8;
    position: absolute;
    left: 0;
    z-index: -1;
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
const CourseHeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  font-weight: bold;
`
const LoaderContainer = styled.div`
  margin-top: 7rem;
  display: flex;
  height: 100%;
  min-height: 300px;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const ErrorContainer = styled.div`
  margin-top: 7rem;
  display: flex;
  height: 100%;
  min-height: 300px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const ErrorIconWrapper = styled.div`
  width: 6rem;
  height: 6rem;
  margin-bottom: 2rem;
`
const ErrorText = styled.h2`
  font-size: 2rem;
`

const PopoverContentWrapper = styled.div`
  display: flex;
  width: 28rem;
  padding: 1rem;
  background-color: black;
  color: white;
  font-size: 0.875rem;
  z-index: 2;
`
const TooltipWrapper = styled.div`
  display: flex;
  margin-left: 0.5rem;
`

export {
  CourseWrapper,
  CourseHeader,
  CourseHeaderTitle,
  LoaderContainer,
  ErrorContainer,
  ErrorIconWrapper,
  ErrorText,
  PopoverContentWrapper,
  TooltipWrapper,
}
