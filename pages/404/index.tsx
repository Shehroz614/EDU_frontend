import React from 'react'
import type { NextPage } from 'next'
import { PageContainer } from '@styled_components/404/styled.components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', '404'])),
    },
  }
}

const NotFound: NextPage = () => {
  return <PageContainer>404 | Not Found</PageContainer>
}

export default NotFound
