import React from 'react'
import { Wrapper } from '@styled_components/author/styled.components'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useAuth } from '@hooks/useAuth'
import BecomeAuthor from '@components/pages/become-author'
import { Loading } from '@nextui-org/react'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'home',
        'author',
        'aboutAuthor',
        'courses',
        'footer',
        'home',
        'createCourse',
      ])),
    },
  }
}

const LoadingComponent = () => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '5rem',
      marginBottom: '5rem',
      gridColumnStart: 1,
      gridColumnEnd: -1,
    }}
  >
    <Loading />
  </div>
)

const Author = () => {
  const {
    authState: { isLoading },
  } = useAuth()

  return (
    <Layout>
      <Wrapper>{isLoading ? <LoadingComponent /> : <BecomeAuthor />}</Wrapper>
    </Layout>
  )
}

export default Author
