import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'

const CourseInfoMainWrapper = styled.div<{ pos: boolean }>`
  display: flex;
  position: absolute;
  z-index: 10;
  /* padding-${(props) => (props.pos ? 'left' : 'right')}: 3rem; */
  padding-left: ${(props) => (props.pos ? '0.75rem' : '')};
  padding-right: ${(props) => (props.pos ? '' : '0.75rem')};
  /* transform: translate(${(props) => (props.pos ? '41' : '-92')}%, -10%); */
  transform: translate(${(props) => (props.pos ? '57' : '-100')}%, -10%);
  margin-top: 1rem;
  @media (max-width: 990px) {
    display: none;
  }
`
const CourseInfoWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: #ffffff;
  width: 25rem;
  box-shadow: 1px 5px 20px rgba(0, 0, 0, 0.2);
`
const CourseLabel = styled.div`
  border-radius: 15px;
  border: 1px solid ${colors.uguPurple};
  font-family: ${fontFamilies.light};
  padding: 0.1rem 0.75rem;
  margin-right: 0.5rem;
  align-items: flex-start;
  font-size: 0.75rem;
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.7rem 1.4rem;
`
const LastUpdateText = styled.div`
  display: flex;
  flex-direction: row;
  opacity: 0.7;
  font-family: ${fontFamilies.light};
  font-size: 0.75rem;
`
const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const CourseTitle = styled.div`
  display: flex;
  font-size: 0.9rem;
  line-height: 1.1rem;
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
  opacity: 0.68;
`
const CourseKeywordsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 1rem;
`
const Keyword = styled.div`
  border-radius: 15px;
  border: 1px solid ${colors.uguPurple};
  font-family: ${fontFamilies.light};
  padding: 0.2rem 0.75rem;
  margin-right: 0.5rem;
  align-items: flex-start;
  font-size: 0.75rem;
`
const GeneralInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-bottom: 1rem; */
  margin-top: 0.5rem;
`
const IconTextBlockWrapper = styled.div`
  display: flex;
  margin-right: 0.75rem;
`
const ShortDescription = styled.div`
  display: flex;
  font-size: 0.9rem;
  margin-top: 1rem;
  font-family: ${fontFamilies.regular};
  opacity: 0.8;
`
const CheckmarkSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const RoundedImage = styled.div`
  display: flex;
  border-radius: 2rem;
  height: 2.25rem;
  width: 2.25rem;
  background-color: ${colors.uguBlue};
  margin-right: 1rem;
  justify-content: center;
  align-items: center;
`
const LastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`

export {
  CourseInfoMainWrapper,
  CourseInfoWindowWrapper,
  CourseLabel,
  ContentWrapper,
  LastUpdateText,
  TopWrapper,
  CourseTitle,
  CourseKeywordsWrapper,
  Keyword,
  GeneralInfoWrapper,
  IconTextBlockWrapper,
  ShortDescription,
  CheckmarkSectionWrapper,
  RoundedImage,
  LastWrapper,
}
