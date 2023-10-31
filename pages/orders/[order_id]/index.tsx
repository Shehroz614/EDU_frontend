import React from 'react'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
const OrderPage = () => {
  return (
    <Layout>
      <div>Single Order</div>
    </Layout>
  )
}
export default OrderPage
