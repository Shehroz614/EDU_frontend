import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
`
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
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
    height: 8rem;
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
const PageHeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.7rem;
  font-weight: bold;
  z-index: 2;
`
const PageContent = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 0 1rem;
  }
`

const IllustrationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-start;

  @media (min-width: 768px) {
    width: 50%;
  }
`

const AuthorVerifyWrapper = styled.div`
  display: flex;
  @media (min-width: 768px) {
    width: 50%;
  }
`
const VerifyStepsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const VerifyStepWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`
const CollapseContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CollapseContentRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const CollapseContentRowWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
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

const Select = styled.select`
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  border-color: ${colors.uguPurple};
`

export {
  PageContainer,
  PageHeader,
  PageHeaderTitle,
  PageContent,
  IllustrationWrapper,
  AuthorVerifyWrapper,
  VerifyStepsWrapper,
  VerifyStepWrapper,
  CollapseContentWrapper,
  CollapseContentRow,
  CollapseContentRowWrapper,
  LoaderContainer,
  Select,
}
