import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

const Body = styled.div`
  display: flex;
  flex-direction: column;
`

const TitleBackground = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 8rem;
  position: absolute;
  background-color: #f8f8f8;
  top: 4rem;
  left: 0;
  z-index: 1;
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

const CartArea = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10rem;
`
const FixedArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 49rem;
`
const TotalCoursesQty = styled.div`
  font-weight: bold;
  margin-bottom: 2rem;
  font-size: 1.125rem;
`
const TotalView = styled.div<{ promosQty: number }>`
  display: flex;
  flex-direction: column;
  height: ${(props) =>
    props.promosQty ? 23 + props.promosQty * 2 + 'rem' : '25rem'};
  position: sticky;
  top: 2rem;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: -1rem 1rem 30px 5px rgba(0, 0, 0, 0.05);
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 0 1.5rem 2rem;
  margin-left: 4rem;
`
const TotalText = styled.div`
  margin: 1rem 3rem 1rem 1rem;
  font-size: 12px;
  opacity: 0.5;
  width: 20rem;
`
const TotalPrice = styled.div`
  margin: 0 0 0 1rem;
  font-size: 3rem;
  font-weight: bold;
  align-items: center;
`
const TotalDiscountBlock = styled.div`
  display: flex;
  flex-direction: row;
`
const TotalDiscountSum = styled.div`
  margin: 0rem 1rem 1rem 1rem;
  font-size: 1.5rem;
  opacity: 0.5;
  text-decoration: line-through;
`
const TotalDiscountText = styled.div`
  margin: 0 1rem;
  font-size: 1.5rem;
  opacity: 0.5;
`
const PromoCodeArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1rem 0;
  width: 100%;
`
const PromoCodeInputField = styled.div`
  display: flex;
  margin-bottom: 1rem;
  font-size: 12px;
  width: 100%;
  height: 3rem;
  border-radius: 30px;
  background-color: #f8f8f8;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  overflow: hidden;
  padding: 0.2rem;
`
const InputField = styled.input`
  font-size: 0.875rem;
  height: 100%;
  flex-grow: 1;
  border: 0 !important;
  outline: 0 !important;
  background-color: transparent;
  padding: 1rem;
`
const BackgroundColorFixed = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 18vh;
  position: absolute;
  background-color: #f8f8f8;
  top: 4rem;
  left: 0;
  padding: 0 5vw;
`

const ErrorMessage = styled.div`
  margin-left: 1.2rem;
  color: #f31260;
  font-weight: 500;
`

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
`
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  width: 100%;
  margin-left: 0rem;
  flex-direction: column;
  max-width: 1424px;
  z-index: 1;
  height: 8rem;
  justify-content: space-around;
  background-color: #f8f8f8;
  margin-bottom: 1.5rem;
  &::before {
    content: '';
    display: flex;
    justify-content: center;
    width: 100vw;
    height: inherit;
    background-color: #f8f8f8;
    position: absolute;
    left: 0;
    z-index: 1;
  }
  @media (min-width: 768px) {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 8rem;
    padding: 0;
    margin-left: 0.5rem;
  }
`
const PageHeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2rem;
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
const Divider = styled.div`
  width: 100%;
  border-top: solid 1px ${colors.uguLighterGrey};
  margin-top: 10px;
  margin-bottom: 20px;
`

const DiscountItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  //width: 100%;
`
const DiscountItem = styled.div`
  display: flex;
  flex-direction: row;
  background: ${colors.uguWhite};
  padding: 10px 20px 10px 25px;
  border-radius: 12px;
  align-items: center;
  float: none;
  border: solid 1px ${colors.uguPurple};
  margin-right: 10px;
  &:last-child {
    margin-right: 0px;
    margin-top: 5px;
  }
`
const DiscountItemRemoveButton = styled.button`
  background: ${colors.uguPurple};
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  margin-left: 15px;
  padding: 0;
  cursor: pointer;
`
const CheckboxWrapper = styled.div`
  display: flex;
  height: 100%;
  //justify-content: center;
  align-items: center;
`

export {
  Body,
  TitleBackground,
  InnerWrapper,
  Title,
  CartArea,
  FixedArea,
  TotalCoursesQty,
  TotalView,
  TotalText,
  TotalPrice,
  TotalDiscountBlock,
  TotalDiscountSum,
  TotalDiscountText,
  PromoCodeArea,
  PromoCodeInputField,
  InputField,
  BackgroundColorFixed,
  ErrorMessage,
  PageContainer,
  PageHeader,
  PageHeaderTitle,
  PageContent,
  LoaderContainer,
  Divider,
  DiscountItemsWrapper,
  DiscountItem,
  DiscountItemRemoveButton,
  CheckboxWrapper,
}
