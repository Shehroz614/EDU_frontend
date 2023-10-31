import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'

const CourseContainer = styled.div<{
  marginLeft: string
  marginRight: string
  marginTop: string
  marginBottom: string
}>`
  display: flex;
  flex-direction: row;
  min-width: 14.5rem;
  flex: 1 1 0;
  justify-content: space-between;

  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  cursor: default;
`
const ImageContainer = styled.img`
  aspect-ratio: 303 / 180;
  width: 100%;
  background-color: rgba(107, 181, 201, 0.2);
  border-radius: 15px 15px 0 0;
  object-fit: cover;
`
const CourseInfoContainer = styled.div`
  height: 50%;
  border-radius: 0 0 15px 15px;
  padding: 1rem 11px;
  padding-bottom: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 1.5rem;
  /* justify-content: space-between; */
`
const CourseTitle = styled.text`
  color: ${colors.uguPurple};
  width: 100%;
  /* font-size: 0.9rem; */
  align-self: flex-start;
  max-height: 3.6rem;
  line-height: 1.2rem;
  height: 38px;
  font-family: ${fontFamilies.medium};
  /* margin-top: 8px; */
  display: -webkit-box;

  -webkit-line-clamp: 3; /* if you change this, make sure to change the fallback line-height and height */
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: break-word;
  font-size: 16px;
  text-overflow: ellipsis;
`
const AuthorReviewBlockWrapper = styled.div`
  display: flex;
  /* margin-top: 0.5rem; */
  height: 2.5rem;
  margin-top: 0.6rem;
  margin-bottom: 1rem;
  justify-content: space-between;
`
const CourseAuthor = styled.text`
  display: flex;
  width: 100%;
  color: rgba(26, 30, 61, 0.75);
  font-size: 13px;
  align-items: center;
  gap: 5px;
  font-family: ${fontFamilies.regular};
`
const BottomWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
`
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  z-index: 5;
`

const PriceWrapper = styled.div`
  display: flex;
  /* height: 15%; */
  flex-direction: column;
  justify-content: space-between;
`
const CoursePrice = styled.text`
  display: flex;
  align-items: flex-end;
  color: ${colors.uguPurple};
  font-family: ${fontFamilies.medium};
  height: 60%;
  font-size: 0.9rem;
`
const OriginalPrice = styled.text`
  display: flex;
  color: ${colors.uguPurple};
  height: 40%;
  font-size: 0.7rem;
  font-family: ${fontFamilies.light};
  text-decoration: line-through;
`
const EditWindow = styled.div`
  display: flex;
  position: absolute;
  height: 21rem;
  min-width: 14.5rem;
  max-width: 14.5rem;
  border-radius: 15px;
  /* background-color: ${colors.uguPurple}; */
  background-color: rgb(26, 30, 61, 0.4);
  /* opacity: 0.95; */
  /* z-index: 1; */
  align-items: center;
  justify-content: center;
  z-index: 1;
`
const EditButtonsWrapper = styled.div`
  display: flex;
`
const BadgesOnImage = styled.div`
  position: absolute;
  display: flex;
  left: 4px;
`

const BadgeTop = styled.div`
  background: ${colors.uguPurple};
  color: white;
  border-radius: 12px;
  font-size: 11px;
  padding: 1px 8px;
  margin: 5px 2px;
  display: flex;
  font-family: ${fontFamilies.light};
  align-items: center;
`

const ColoredCircle = styled.div<{ colors: string }>`
  height: 7px;
  width: 7px;
  margin-right: 0.25rem;
  border-radius: 50%;
  background-color: ${(props) => props.colors};
`
const LoaderWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`
const CloseButton = styled.button`
  width: 22px;
  height: 22px;
  padding: 5px;
  border-radius: 50px;
  overflow: hidden;
  background: ${colors.uguLighterGrey};
  display: flex;
  border: none;
  outline: none;
  cursor: pointer;
`

const Price = styled.div<{ active?: boolean }>`
  font-weight: normal;
  font-size: 1.1rem;
  text-decoration: ${(props) => (props.active ? '' : 'line-through')};
  color: ${(props) => (props.active ? colors.uguPurple : colors.uguGrey)};
  margin-left: 5px;
`

export {
  CourseContainer,
  ImageContainer,
  CourseInfoContainer,
  CourseTitle,
  AuthorReviewBlockWrapper,
  CourseAuthor,
  CoursePrice,
  EditWindow,
  EditButtonsWrapper,
  BottomWrapper,
  ButtonsWrapper,
  PriceWrapper,
  OriginalPrice,
  BadgesOnImage,
  BadgeTop,
  ColoredCircle,
  LoaderWrapper,
  CloseButton,
  Price,
}
