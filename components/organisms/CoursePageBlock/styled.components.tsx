import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'

const Body = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  z-index: 1;
  position: relative;
`
const FixedPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  max-width: 900px;
  @media (max-width: 1040px) {
    width: 100%;
  }
`
const BackgroundColorFixed = styled.div<{ url: string }>`
  display: flex;
  position: absolute;
  width: 100vw;
  /* background-image: url(${(props) => props.url}); */
  background-color: ${colors.uguLightLightGrey};
  top: 4rem;
  left: 0;
  align-items: center;
  height: 20rem;
  z-index: 1;
  /* padding: 0 5vw; */
  /* margin-left: 35vw; //this fixes a bug */
`
const CourseInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 49rem;
  background-color: transparent;
  padding-top: 1rem;
  z-index: 2;
  margin-bottom: 1.5rem;
`
const CourseTitle = styled.div`
  font-size: 1.5rem;
  margin-top: 10px;
  word-wrap: break-word;
`
const AuthorName = styled.div`
  font-size: 0.8rem;
  opacity: 0.99;
  margin-top: 0.5rem;
  color: #1a1e3d;
`
const NumbersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
`
const ShortDescriptionFlex = styled.div`
  opacity: 0.8;
  font-size: 0.875rem;
  margin-top: 1rem;
  color: #1a1e3d;
  overflow: hidden;
  transition: 0.9s;
`
const ButtonsFlex = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`
const ReportBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`
const FloatingPart = styled.div`
  position: relative;
  padding-top: 2rem;
  padding-left: 2rem;
  width: 35%;
  max-width: 25rem;
  margin-left: 20px;
  margin-right: 20px;
`

const TopContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  padding-bottom: 40px;
`
const DescriptionHeader = styled.div`
  font-size: 21px;
  margin-top: 10px;
`

const ShowMore = styled.div`
  display: flex;
  margin-top: 25px;
  justify-content: space-around;
  align-items: center;
`

const ShowMoreLine = styled.div`
  border-bottom: 1px solid black;
  flex: 1;
  margin: 0 3%;
`
const ShowMoreButton = styled.div`
  padding: 3px 25px;
  border: 1px black solid;
  display: flex;
  justify-content: space-around;
  border-radius: 20px;
  cursor: pointer;
`

const TopBg = styled.div`
  position: absolute;
  background-color: rgb(248, 248, 248);
  width: 100%;
  height: 100px;
  z-index: 0;
  left: 0px;
  top: 89px;
  @media (max-width: 650px) {
    top: 170px;
  }
`

const VideoPlayerWrapper = styled.div`
  width: 100%;
  height: 12rem;
  border-radius: 10px;
  position: relative;
  height: auto;
`
const PlayIconContainer = styled.div`
  display: flex;
  border-radius: 100%;
  width: 2.8rem;
  height: 2.8rem;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.3);
`
const PlayIconWrapper = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  position: relative;
  display: flex;
  :hover {
    cursor: pointer;
  }
`

const CoursePosterImage = styled.img`
  width: 100%;
  border-radius: 10px;
  background-color: rgba(107, 181, 201, 0.3);
  object-fit: contain;
`

const FixedBuyBlock = styled.div`
  position: fixed;
  width: 100%;
  background-color: #f6f6f6;
  z-index: 10;
  padding: 0.8rem 1rem;
  box-shadow: 0 -2px 4px rgb(0 0 0 / 8%), 0 -4px 12px rgb(0 0 0 / 16%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 60px;
  gap: 1rem;
  flex-wrap: wrap;
  @media (min-width: 1040px) {
    display: none;
  }
  @media (min-width: 651px) {
    bottom: 0;
  }
`

const ShareHeader = styled.div`
  font-family: ${fontFamilies.regular};
  font-size: 1.5rem;
`

const ShareModalWrapper = styled.div`
  padding: 2rem;
  padding-top: 5px;
`

const InfoWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  gap: 0.5rem;
  margin-bottom: 15px;
  align-items: center;
  flex-wrap: wrap;
`

const ShareBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 4%;
`

const ButtonWrapper = styled.div`
  flex: 1;
  min-width: 175px;
`

const InfoText = styled.div`
  font-family: ${fontFamilies.light};
  font-size: 15px;
  color: #555;
  display: flex;
  align-items: center;
`

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 1rem;
  align-self: flex-end;
`

const Price = styled.div<{ active?: boolean }>`
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  font-size: 1.5rem;
  text-decoration: ${(props) => (props.active ? '' : 'line-through')};
  color: ${(props) => (props.active ? colors.uguPurple : colors.uguGrey)};
  margin-left: 5px;
`

export {
  Body,
  FixedPart,
  BackgroundColorFixed,
  CourseInfoContainer,
  CourseTitle,
  AuthorName,
  NumbersContainer,
  ShortDescriptionFlex,
  ButtonsFlex,
  ReportBlock,
  FloatingPart,
  TopContainer,
  DescriptionHeader,
  ShowMore,
  ShowMoreLine,
  ShowMoreButton,
  TopBg,
  VideoPlayerWrapper,
  PlayIconContainer,
  PlayIconWrapper,
  CoursePosterImage,
  FixedBuyBlock,
  ShareHeader,
  ShareModalWrapper,
  InfoWrapper,
  ShareBlock,
  ButtonWrapper,
  InfoText,
  PriceWrapper,
  Price,
}
