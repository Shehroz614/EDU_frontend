import React from 'react'
import Button from '@components/atoms/Button'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import { useAuth } from '@hooks/useAuth'
import VerticalCourse from '@components/molecules/VerticalCourse'
import {
  Body,
  TitleBackground,
  InnerWrapper,
  Title,
  WishlistArea,
  GroupedButtons,
  TotalCoursesQty,
  CoursesWrapper,
  CoursesRow,
} from '@styled_components/wishlist/styled.components'

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'home',
        'wishlist',
        'footer',
      ])),
    },
  }
}

const Wishlist = () => {
  const { wishlistItems } = useCartAndWishList()

  const { authState } = useAuth()
  const { t } = useTranslation(['common', 'wishlist', 'footer'])

  return (
    <Layout>
      <Body>
        <TitleBackground>
          <InnerWrapper>
            <Title>{t('Wishlist', { ns: 'wishlist' })}</Title>
          </InnerWrapper>
        </TitleBackground>
        <WishlistArea>
          <GroupedButtons>
            {authState.isAuthenticated ? (
              <Link href="/my-courses">
                <Button opacity={0.24} padding="0 1rem" marginRight="1rem">
                  {t('My Courses', { ns: 'wishlist' })}
                </Button>
              </Link>
            ) : (
              <></>
            )}
            <Link href="/wishlist">
              <Button
                backgroundColor="rgba(107,181,201,0.07)"
                padding="0 1rem"
                marginRight="1rem"
              >
                {t('My Wishlist', { ns: 'wishlist' })}
              </Button>
            </Link>
          </GroupedButtons>
          <TotalCoursesQty>
            {wishlistItems?.length}{' '}
            {t('courses in Wishlist', { ns: 'wishlist' })}
          </TotalCoursesQty>
          <CoursesWrapper>
            <CoursesRow>
              {wishlistItems.length > 0 &&
                wishlistItems?.map((course) => (
                  <VerticalCourse course={course} key={course._id} />
                ))}
            </CoursesRow>
          </CoursesWrapper>
        </WishlistArea>
      </Body>
    </Layout>
  )
}

export default Wishlist
