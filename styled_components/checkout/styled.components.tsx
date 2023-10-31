import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
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
const PageContent = styled.div`
  display: flex;
  padding-top: 2rem;
  min-height: 32rem;
  flex-direction: column;
`
const PageHeader = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: solid 1px ${colors.uguLightLightGrey};
  display: flex;
`
const MainSection = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
const SideSection = styled.div`
  width: 35%;
  margin-left: 2rem;
  border-radius: 1rem;
  padding: 2rem;
  background: ${colors.uguLightLightGrey};
`
const PaymentButton = styled.button`
  outline: 0 !important;
  border: 0 !important;
  color: #ffffff;
  background-color: ${colors.uguPurple};
  padding: 1.2rem;
  width: 100%;
  border-radius: 0.5rem;
  font-size: 1rem;
  line-height: 1rem;
  margin-top: 2rem;
`
const CartItems = styled.div``
const CartItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  align-items: center;
  &:last-child {
    margin-bottom: 0;
  }
`
const CartItemImgWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 5px;
  object-fit: cover;
  overflow: hidden;
`
const CartItemDetails = styled.div`
  flex-grow: 1;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const CartItemTitle = styled.h2`
  font-size: 1rem;
  line-height: 1rem;
  color: #212121;
  margin-bottom: 0.5rem;
  font-weight: normal;
`
const CartItemAuthor = styled.div`
  font-size: 0.8rem;
  line-height: 0.8rem;
  color: ${colors.uguDarkGrey};
  margin-bottom: 0.5rem;
`
const CartItemPrice = styled.h4`
  font-size: 1rem;
  font-weight: normal;
  color: #212121;
`
const PricingSection = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem 0;
  border-top: solid 1px ${colors.uguLightGrey};
  border-bottom: solid 1px ${colors.uguLightGrey};
`
const Pricing = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const PricingText = styled.div`
  font-size: 0.9rem;
  font-weight: normal;
  color: ${colors.uguDarkGrey};
`
const PricingAmount = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #000000;
`
const TotalPriceSection = styled.div``
const CheckoutButton = styled.button<{ disabled: boolean }>`
  background: ${colors.uguPurple};
  color: #ffffff;
  width: 100%;
  padding: 15px 15px;
  border-radius: 10px;
  margin-top: auto;
  opacity: ${(props) => (props.disabled ? '0.3' : '1')};
  cursor: pointer;
`
const NoPaymentDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
const NoPaymentDetailsText = styled.h2`
  color: ${colors.uguPurple};
  font-size: 1rem;
  font-weight: 400;
`
const NoPaymentDetailsSubText = styled.h3`
  margin-top: 0.5rem;
  color: ${colors.uguLightBlack};
  font-weight: 700;
  font-size: 1.2rem;
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
  margin-right: 5px;
  margin-top: 5px;
  &:last-child {
    margin-right: 0px;
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

export {
  PageContainer,
  LoaderContainer,
  PageContent,
  PageHeader,
  MainSection,
  SideSection,
  PaymentButton,
  CartItems,
  CartItem,
  CartItemImgWrapper,
  CartItemDetails,
  CartItemTitle,
  CartItemAuthor,
  CartItemPrice,
  PricingSection,
  PricingText,
  PricingAmount,
  TotalPriceSection,
  Pricing,
  CheckoutButton,
  NoPaymentDetailsContainer,
  NoPaymentDetailsText,
  NoPaymentDetailsSubText,
  Divider,
  DiscountItemsWrapper,
  DiscountItem,
  DiscountItemRemoveButton,
}
