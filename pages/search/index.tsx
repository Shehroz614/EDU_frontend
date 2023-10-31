import React from 'react'
import type { NextPage } from 'next'
import { PageContainer } from '@styled_components/search/styled.components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { useTranslation } from 'react-i18next'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', '404'])),
    },
  }
}

const Search: NextPage = () => {
  const { t } = useTranslation(['common'])
  return (
    <Layout>
      <PageContainer>{t('Search')}</PageContainer>
    </Layout>
  )
}

export default Search
