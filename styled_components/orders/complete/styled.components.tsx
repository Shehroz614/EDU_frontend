import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
`
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10rem;
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
    height: 12rem;
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
const IFrameContainer = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  width: calc(100vw - 80px);
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`

const Card = styled.div`
  height: 100%;
  border-radius: 15px;
  background: white;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.1);
  position: relative;
`
const Row = styled.div<{ isSmall: boolean }>`
  display: flex;
  flex-direction: row;
  width: ${(props) => (props.isSmall ? '500px' : '100%')};
  @media (max-width: 767px) {
    flex-direction: column;
  }
`
const OrderDetailsSection = styled.div`
  min-width: 60%;
  padding: 60px;
  @media (max-width: 767px) {
    width: 100%;
  }
`
const OrderItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 60px;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    width: 100%;
  }
`
const OrderNoteText = styled.div`
  color: black;
  font-size: 32px;
`
const OrderMessageWrapper = styled.div`
  margin: 40px 0;
  position: relative;
  ::after {
    content: '';
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`
const OrderMessageText = styled.div`
  min-height: 300px;
`
const OrderIconWrapper = styled.div`
  width: 255px;
  height: 255px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const AnimationContainer = styled.div`
  padding: 40px;
  padding-top: 20px;
`
const StatusText = styled.div`
  font-size: 32px;
  line-height: 38px;
  color: ${colors.uguPurple};
  text-align: center;
`
const StatusSubText = styled.div`
  font-family: ${fontFamilies.regular};
  font-size: 1.1rem;
  color: ${colors.uguPurple};
  text-align: center;
  margin-top: 5px;
`
const OrderItemsWrapper = styled.div`
  margin: 40px 0;
`
const OrderItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`
const ItemImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
`
const ItemDetails = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const ItemTitle = styled.div`
  font-size: 20px;
  line-height: 23px;
  color: #1a1e3d;
`
const ItemAuthor = styled.div`
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #1a1e3d;
`
const EmailText = styled.div`
  color: ${colors.uguPurple};
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  margin-bottom: 30px;
`
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  button {
    width: calc(50% - 10px);
  }
`
const Button = styled.button`
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  background: #ffffff;
  border: 1px solid #1a1e3d;
  border-radius: 37.5px;
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  svg {
    margin-right: 10px;
  }
`
const ButtonAlt = styled.button`
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  border: 1px solid ${colors.uguPurple};
  border-radius: 37.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: ${colors.uguPurple};
  color: #ffffff;
  text-align: center;
  justify-content: center;
`

export {
  PageContainer,
  PageHeader,
  PageHeaderTitle,
  PageContent,
  LoaderContainer,
  IFrameContainer,
  Iframe,
  Card,
  Row,
  OrderDetailsSection,
  OrderItemsSection,
  OrderNoteText,
  OrderMessageWrapper,
  OrderMessageText,
  OrderIconWrapper,
  StatusText,
  StatusSubText,
  AnimationContainer,
  OrderItemsWrapper,
  OrderItem,
  ItemImage,
  ItemDetails,
  ItemTitle,
  ItemAuthor,
  EmailText,
  ButtonsWrapper,
  Button,
  ButtonAlt,
}
