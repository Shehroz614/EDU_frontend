import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'
import { CourseVersion } from '@ugu/types'

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`
const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`
const StatusContainer = styled.div`
  width: 15rem;
  height: 100%;
  border-radius: 1.1rem;
  border: solid 1px ${colors.uguPurple};
  color: ${colors.uguPurple};
  padding: 0.8rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0;
`

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'inReview':
      return colors.uguBlue
    case 'draft':
    case 'offline':
      return colors.uguGrey
    case 'approved':
    case 'online':
      return colors.uguGreen
    case 'rejected':
      return colors.uguRed
    default:
      return colors.uguWhite
  }
}

const StatusIndicator = styled.div<{ status: CourseVersion['status'] }>`
  background: ${(props) => getStatusColor(props.status)};
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  margin-right: 0.6rem;
`
const CourseStatusDescription = styled.div`
  color: ${colors.uguPurple};
  font-size: 1rem;
`
const CoursePreviewContainer = styled.div<{
  as: any
  initial: any
  animate: any
  exit: any
  transition: any
}>`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`
const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: flex-end;
`
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.uguLightLightGrey};
  border-radius: 27px;
  padding: 3rem 4rem;
`
const InputBlock = styled.div`
  margin-bottom: 2rem;
`
const TextFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`
const InfoWrapper = styled.div<{
  marginTop?: string
  marginLeft?: string
}>`
  display: flex;
  margin-left: 0.8rem;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
`
const TermsWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`
const TermsContainer = styled.div`
  border-radius: 1rem;
  background: black;
  height: 70%;
  width: 80%;
  max-width: 60rem;
  padding: 4rem;
  display: flex;
  flex-direction: row;
`

const TermsSectionHeader = styled.div`
  font-size: x-large;
  font-weight: 700;
  margin: 20px 0 20px 0;
`

const TermsBody = styled.div`
  display: flex;

  //height: 100%;
  flex: 1;
`
const TermsSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 30%;
  height: 100%;
  justify-content: center;
  align-content: space-between;
  flex-wrap: wrap;
`
const TermsContentWrapper = styled.div`
  color: white;
  height: 100%;
  position: relative;
`
const TermsContent = styled.div`
  height: calc(100% - 4.9rem);
  overflow: auto;
`
const TermsItems = styled.h4<{ isActive?: boolean; isVisited?: boolean }>`
  color: #ffffff;
  font-size: 1rem;
  margin: 1rem 0;
  opacity: ${(props) =>
    props.isActive ? '1' : props.isVisited ? '0.6' : '0.3'};
`
const TermsFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 2rem;
`
const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`

const SectionsWrapper = styled.div`
  align-items: center;
  margin-top: 0.6rem;
  padding: 0rem 1rem;
`
const SectionItem = styled.div`
  display: flex;
  margin-top: 1.5rem;
  align-items: flex-start;
`

const SectionName = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    font-family: ${fontFamilies.bold};
  }
`

const SectionStatus = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`

const SectionComplete = styled.div`
  width: 0%;
`

const IconWrapper = styled.div`
  width: 39px;
  height: 39px;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.56rem;
`
const SectionText = styled.div`
  font-size: 18px;
  margin-left: 0.7rem;
`

const IncmpletedSection = styled.div`
  background-color: #ef5959;
  border-radius: 1rem;
  padding: 0.2rem 1rem;
  font-size: 12px;
  color: white;
  width: max-content;
  display: flex;
  align-items: center;
`

const CompletedSection = styled.div`
  background-color: #4ac088;
  border-radius: 1rem;
  padding: 0.2rem 1rem;
  font-size: 12px;
  width: max-content;
  color: white;
  display: flex;
  align-items: center;
`

const CompleteButton = styled.div`
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.2rem 1rem;
  width: max-content;
  margin-left: 1rem;
  cursor: pointer;
  transition: 0.15s;
  :hover {
    background-color: ${colors.uguPurple};
    color: white;
  }
`
const HeaderWrapper = styled.div`
  background-color: #eaeaea;
  border-radius: 0.8rem;
  padding: 0.9rem 1rem;
  display: flex;
`

const SectionHeader = styled.div`
  color: #777;
  font-family: ${fontFamilies.medium};
  font-size: 1rem;
  width: 30%;
`

const SectionStatusHeader = styled.div`
  color: #777;
  font-family: ${fontFamilies.medium};
  font-size: 16px;
  width: 50%;
`

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1.3rem 0;
`

const StausTexts = styled.div`
  margin-left: 0.5rem;
`

const StatusHeader = styled.div`
  font-family: ${fontFamilies.medium};
  font-size: 18px;
`

const StatusSubHeader = styled.div`
  font-size: 14px;
  color: rgba(26, 30, 61, 0.7);
`

export {
  StatusWrapper,
  StausTexts,
  StatusHeader,
  StatusSubHeader,
  StepContainer,
  LoadingWrapper,
  StatusContainer,
  StatusIndicator,
  CourseStatusDescription,
  CoursePreviewContainer,
  ButtonsWrapper,
  MainWrapper,
  InputBlock,
  TextFieldWrapper,
  InfoWrapper,
  TermsWrapper,
  TermsContainer,
  TermsSectionHeader,
  TermsBody,
  TermsSidebar,
  TermsContentWrapper,
  TermsContent,
  TermsItems,
  TermsFooter,
  ButtonRow,
  SectionsWrapper,
  SectionItem,
  SectionName,
  SectionStatus,
  SectionComplete,
  IconWrapper,
  SectionText,
  IncmpletedSection,
  CompletedSection,
  CompleteButton,
  HeaderWrapper,
  SectionHeader,
  SectionStatusHeader,
}
