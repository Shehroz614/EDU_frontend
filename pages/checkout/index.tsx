import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import STRIPE_PUBLIC_KEY from '@configs/stripe'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import { PageContainer } from '@styled_components/checkout/styled.components'
import { colors } from '@configs/styles/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CheckoutPageContent from '@components/pages/checkout/CheckoutPageContent'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'home',
        'authentication',
        'footer',
      ])),
    },
  }
}

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)
const Checkout = (): JSX.Element => {
  const { getPayableAmount } = useCartAndWishList()

  return (
    <Layout>
      <PageContainer>
        <Elements
          stripe={stripePromise}
          options={{
            // @ts-ignore
            mode: 'payment',
            amount: getPayableAmount() > 0 ? getPayableAmount() : 1000,
            currency: 'usd',
            appearance: {
              theme: 'none',
              variables: {
                borderRadius: '12px',
                colorPrimary: colors.uguPurple,
                colorBackground: 'transparent',
              },
              rules: {
                '.AccordionItem': {
                  backgroundColor: colors.uguLightLightGrey,
                  border: `solid 2px ${colors.uguLightLightGrey}`,
                },
                '.AccordionItem--selected': {
                  backgroundColor: 'transparent',
                  color: colors.uguPurple,
                  fill: colors.uguPurple,
                  //border: 'none'
                },
                '.Input': {
                  color: colors.uguPurple,
                  border: `solid 2px ${colors.uguLightLightGrey}`,
                },
                '.Input:focus': {
                  color: colors.uguPurple,
                  border: `solid 2px ${colors.uguPurple}`,
                },
              },
            },
          }}
        >
          <CheckoutPageContent />
        </Elements>
      </PageContainer>
    </Layout>
  )
}

export default Checkout
