import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Loader from '@components/organisms/Loader'
import { useRouter } from 'next/router'
import { useAuth } from '@hooks/useAuth'

// Import the CreateGiftProvider component
const CreateGiftProvider = dynamic(
  async () => (await import('@contexts/createGift')).CreateGiftProvider,
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
  const [isMyGift, setIsMyGift] = useState(false)
  const router = useRouter()
  const { authState } = useAuth()

  const checkPermissions = async () => {
    const hasPermission = true

    if (hasPermission) {
      setIsMyGift(true)
    } else {
      setIsMyGift(false)
      router.push('/')
    }
  }

  useEffect(() => {
    checkPermissions()
  }, [])

  useEffect(() => {
    if (!authState.isAuthenticated && !authState.isLoading) {
      setIsMyGift(false)
      router.push('/')
    }
  }, [authState.isLoading])

  return <CreateGiftProvider>{isMyGift && <CreateGift />}</CreateGiftProvider>
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
