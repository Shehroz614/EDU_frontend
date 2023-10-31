import React from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Loader from '@components/organisms/Loader'

// Import the CreateGift component (adjust the path as needed)
const CreateGift = dynamic(
  () => import('@pages_components/create-gift/create-gift'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          paddingTop: '49vh',
        }}
      >
        <Loader />
      </div>
    ),
  }
)

const CreateGiftPage = (): JSX.Element => {
  return <CreateGift />
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'home',
        'createCourse',
        'courseMaterials',
        'footer',
      ])),
    },
  }
}

export default CreateGiftPage
