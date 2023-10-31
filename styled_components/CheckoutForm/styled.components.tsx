import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

const Form = styled.form``
const BillingAddressWrapper = styled.div`
  margin-bottom: 2rem;
`
const BillingAddressTitle = styled.h2`
  font-size: 1.3rem;
  line-height: 1.3rem;
  margin-bottom: 1rem;
`
const PaymentElementWrapper = styled.div`
  margin-bottom: 2rem;
`
const PaymentElementTitle = styled.div`
  font-size: 1.3rem;
  line-height: 1.3rem;
  margin-bottom: 1rem;
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
`

export {
  Form,
  BillingAddressWrapper,
  BillingAddressTitle,
  PaymentElementWrapper,
  PaymentElementTitle,
  PaymentButton,
}
