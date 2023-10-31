import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'

const StudyCourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const PlayerBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 1rem;
  /* box-shadow: 4px 10px 5px #f9f9f9; */
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  z-index: 2;
`
const TopBlockWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  align-items: center;
  height: 2.5rem;
`
const BottomBlockWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  @media (min-width: 1200px) {
    justify-content: space-between;
  }
`
const RightSide = styled.div`
  display: flex;
  width: 65%;
  /* max-width: 50rem; */
`
const TitleWrapper = styled.title`
  display: flex;
  font-family: ${fontFamilies.regular};
  font-size: 1.2rem;
  padding: 0.5rem 0;
  :hover {
    cursor: pointer;
    color: ${colors.uguBlue};
  }
`
const CourseMaterialsBtnWrapper = styled.button`
  display: none;
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media (min-width: 1200px) {
    display: flex;
    border-radius: 10px;
    /* border: 1px solid ${colors.uguPurple}; */
    background-color: rgba(151, 151, 151, 0.08);
    width: 34%;
    padding: 0.5rem;
    align-items: center;
    margin-left: 0.5rem;

    :hover {
      cursor: pointer;
    }
  }
`
const CourseMaterialsTextWrapper = styled.div`
  display: flex;
  margin-left: 1rem;
  align-items: center;
  font-size: 0.875rem;
`
const CourseMaterialsWrapper = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    width: 52%;
    height: 35rem;
    //cross browser commands to hide scrollbar, but allow scrolling
    overflow-y: scroll;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent; /* make scrollbar transparent Chrome */
    }
  }
`
const CourseMaterialsBottomWrapper = styled.div`
  display: flex;
  /* @media (max-width: 968px) {
    justify-content: center;
  } */
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
  @media (min-width: 1200px) {
    display: none;
  }
`
const CourseMaterialsSmallScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-right: 1rem; */
  /* min-width: 27rem; */
  height: 70vh;
  width: 100%;
  //cross browser commands to hide scrollbar, but allow scrolling
  overflow-y: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent Chrome */
  }
  @media (min-width: 968px) {
    width: 90%;
  }
`
const BelowPlayerArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`
const BelowMenuWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  width: 100%;
`
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: transparent; /* make scrollbar transparent */
  }
  background-image: linear-gradient(to right, white, white),
    linear-gradient(to right, white, white),
    linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0)),
    linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0));
  background-position: left center, right center, left center, right center;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 20px 100%, 20px 100%, 10px 100%, 10px 100%;
  background-attachment: local, local, scroll, scroll;
  @media (min-width: 1200px) {
    width: 70%;
  }
`
const ProgressWrapper = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: flex;
    /* flex-direction: row; */
    height: 3rem;
    border: 1px solid rgba(151, 151, 151, 0.12);
    width: 18rem;
    margin-left: auto;
    border-radius: 4px;
    align-items: center;
    padding: 0 1rem;
  }
`
const ProgressText = styled.div`
  font-weight: ${fontFamilies.bold};
  font-size: 0.875rem;
  margin-right: 1rem;
`
const SmallProgressText = styled.div`
  font-weight: ${fontFamilies.light};
  font-size: 0.7rem;
  /* margin-left: 0.5rem; */
`
const ProgressWrapperForSmallScreens = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1200px) {
    display: none;
  }
`
const CircularProgressBarWrapper = styled.div`
  display: flex;
  width: 2.5rem;
  justify-content: center;
  align-items: center;
`
const QuestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding-right: 4rem;
  align-self: flex-end;
`
const SectionIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  margin: 0.5rem 0;
  margin-left: 0.5rem;
`
//new changes from Oct 28
const CoursePlayerWrapper = styled.div`
  width: 100%;
  /* min-height: 40vh; */
  align-items: center;
  justify-content: center;
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media (min-width: 1200px) {
    /* width: 65%; */
    /* max-width: 50rem; */
    justify-content: center;
    align-items: center;
    /* background-color: black; */
  }
`

const LoaderWrapper = styled.div`
  /* position: absolute; */
  background-color: white;
  z-index: 2;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
`

export {
  StudyCourseWrapper,
  PlayerBlockWrapper,
  TopBlockWrapper,
  BottomBlockWrapper,
  RightSide,
  TitleWrapper,
  CourseMaterialsWrapper,
  CourseMaterialsBtnWrapper,
  CourseMaterialsTextWrapper,
  CourseMaterialsBottomWrapper,
  CourseMaterialsSmallScreenWrapper,
  CoursePlayerWrapper,
  BelowPlayerArea,
  BelowMenuWrapper,
  ButtonsWrapper,
  ProgressWrapper,
  ProgressText,
  SmallProgressText,
  ProgressWrapperForSmallScreens,
  CircularProgressBarWrapper,
  QuestionsWrapper,
  SectionIcon,
  LoaderWrapper,
}
