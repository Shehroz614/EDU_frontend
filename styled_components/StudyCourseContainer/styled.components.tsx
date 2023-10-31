import styled from '@emotion/styled'

const CourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 85vw;
  /* ali: 'center'; */
  align-self: center;
`
const LoaderContainer = styled.div`
  margin-top: 7rem;
  display: flex;
  height: 100%;
  min-height: 400px;
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

export {
  CourseWrapper,
  LoaderContainer,
  ErrorContainer,
  ErrorIconWrapper,
  ErrorText,
}
