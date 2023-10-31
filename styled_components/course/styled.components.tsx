import styled from '@emotion/styled'

const PageContainer = styled.div`
  width: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
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
const ErrorSubText = styled.h3`
  font-size: 1.5rem;
`

export {
  PageContainer,
  LoaderContainer,
  ErrorContainer,
  ErrorIconWrapper,
  ErrorText,
  ErrorSubText,
}
