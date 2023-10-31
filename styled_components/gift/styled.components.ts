import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

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
const GiftDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  padding: 80px;
  @media (max-width: 800px) {
    max-width: 100%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (max-width: 200px) {
    padding: 10px;
  }
`
const GiftItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 80px;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    width: 100%;
  }
`
const GiftNoteText = styled.div`
  color: black;
  font-size: 32px;
`
const GiftMessageWrapper = styled.div`
  flex-grow: 1;
  /* margin: 40px 0; */
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
const GiftMessageText = styled.div`
  min-height: 300px;
`
const GiftedByText = styled.div`
  color: black;
  font-size: 20px;
  line-height: 23.5px;
`
const GiftIconWrapper = styled.div`
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
  padding-top: 0;
`
const RecipientText = styled.div`
  font-size: 32px;
  line-height: 38px;
  color: black;
  text-align: center;
`
const GiftItemsWrapper = styled.div`
  margin: 40px 0;
`
const GiftItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
`
const ItemImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
`
const ItemDetails = styled.div`
  margin-left: 20px;
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
const RedeemButton = styled.button`
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  background: #ffffff;
  border: 1px solid #1a1e3d;
  border-radius: 37.5px;
  padding: 15px 45px;
  cursor: pointer;
`
const Notice = styled.div`
  background: ${colors.uguRed};
  color: white;
  text-transform: uppercase;
  margin: 20px;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  margin-bottom: 0;
`

export {
  PageContainer,
  PageHeader,
  PageHeaderTitle,
  PageContent,
  Card,
  Row,
  GiftDetailsSection,
  GiftItemsSection,
  GiftNoteText,
  GiftMessageWrapper,
  GiftMessageText,
  GiftedByText,
  GiftIconWrapper,
  AnimationContainer,
  RecipientText,
  GiftItemsWrapper,
  GiftItem,
  ItemImage,
  ItemDetails,
  ItemTitle,
  ItemAuthor,
  RedeemButton,
  Notice,
}
