import React from 'react'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  }
}
const OrdersPage = () => {
  return (
    <Layout>
      <div>my orders</div>
    </Layout>
  )
}
export default OrdersPage
