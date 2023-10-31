import React from 'react'
import { AddressElement, PaymentElement } from '@stripe/react-stripe-js'
import {
  Form,
  BillingAddressWrapper,
  PaymentElementWrapper,
} from '@styled_components/CheckoutForm/styled.components'
import { Text, Button, Loading } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'

const CheckoutForm: React.FC<{
  stripe: any
  isLoading: boolean
  onSubmit: (e: any) => void
  errorMessage: any
}> = ({ stripe, isLoading, onSubmit, errorMessage }) => {
  const { t } = useTranslation(['common', 'checkout', 'footer'])

  return (
    <Form onSubmit={onSubmit}>
      <BillingAddressWrapper>
        <Text h4>Billing Address</Text>
        <AddressElement options={{ mode: 'billing' }} />
      </BillingAddressWrapper>
      <PaymentElementWrapper>
        <Text h4>Payment Details</Text>
        <PaymentElement
          options={{
            layout: {
              type: 'accordion',
              defaultCollapsed: false,
              radios: false,
              spacedAccordionItems: true,
            },
          }}
        />
      </PaymentElementWrapper>
      {errorMessage && (
        <Text color="error" style={{ margin: '20px 0' }}>
          {errorMessage.message}
        </Text>
      )}
      <Button
        css={{ width: '100% !important' }}
        disabled={!stripe || isLoading}
        onClick={onSubmit}
      >
        {isLoading ? (
          <Loading type="points-opacity" color="currentColor" size="sm" />
        ) : (
          t('Proceed To Payment')
        )}
      </Button>
    </Form>
  )
}

export default CheckoutForm
