import Head from 'next/head'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LoaderContainer } from '@styled_components/checkout/styled.components'
import Loader from '@components/organisms/Loader'
import getGiftDetails from '@services/api/gift/getGiftDetails'
import { BottomNotification, ShortCourse } from '@ugu/types'

import { Button, Loading } from '@nextui-org/react'
import {
  PageContainer,
  PageHeader,
  PageHeaderTitle,
  PageContent,
  Card,
  Row,
  GiftDetailsSection,
  GiftItemsSection,
  GiftedByText,
  GiftMessageWrapper,
  GiftMessageText,
  GiftNoteText,
  RecipientText,
  GiftItem,
  GiftItemsWrapper,
  ItemImage,
  ItemDetails,
  ItemAuthor,
  ItemTitle,
  Notice,
} from '@styled_components/gift/styled.components'
import { useAuth } from '@hooks/useAuth'
import LoginModal from '@components/organisms/LoginModal'
import PopUpBottom from '@components/organisms/PopUpBottom'

import GiftCard from '@components/pages/create-gift/giftCard'

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  }
}
const GiftDetailsPage: NextPage = () => {
  const { authState } = useAuth()

  const router = useRouter()
  const [isLoadingLocal, setIsLoading] = useState<boolean>(true)
  const [giftDetails] = useState<any>({
    message:
      "Happy Birthday! 🎉🎈On this special day, I wanted to take a moment to wish you the most incredible birthday filled with joy, love, and wonderful memories. May this year bring you endless opportunities, success, and happiness in every aspect of your life. Andrew, you are such an amazing person, and I feel privileged to know you. Your warm personality, kindness, and genuine friendship have always been a source of inspiration for those around you. Your ability to make everyone feel valued and appreciated is truly remarkable, and it's a testament to the incredible person you are.As we celebrate your birthday, I hope you take a moment to reflect on the past year and recognize all the achievements and growth you have experienced. Each step you take brings you closer to your dreams, and I have no doubt that you will continue to reach new heights in the coming year.Remember to take some time for yourself today and indulge in the things that bring you happiness. Surround yourself with the people you love, share laughter, and create beautiful memories that will last a lifetime.Once again, Andrew, I wish you the happiest of birthdays. May this day mark the beginning of a new chapter in your life, filled with love, success, and endless blessings. May your journey ahead be filled with exciting adventures and ",
    isAnonymous: true,
    redeemedAt: null,
  })
  const [isRedeemed, setIsRedeemed] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false)
  const [bottomNotification, setBottomNotification] = useState<
    boolean | BottomNotification
  >(false)

  useEffect(() => {
    if (router.isReady && router.query?.gift_id) {
      fetchGiftDetails(router.query.gift_id as string)
    }
  }, [router])

  const fetchGiftDetails = async (giftId: string) => {
    setIsApiLoading(true)
    try {
      const giftDetails = await getGiftDetails(giftId)
      console.log(giftDetails)
      // setGiftDetails(giftDetails)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
    setIsApiLoading(false)
  }
  const redeemGiftItems = async () => {
    try {
      if (authState?.isAuthenticated) {
        setIsRedeemed(true)
      } else {
        setShowLoginModal(true)
      }
    } catch (err: any) {
      console.log(err)
      setBottomNotification({
        message: err?.response?.data?.message || 'Something went wrong!',
        actionType: 'error',
      })
    }
    setIsApiLoading(false)
  }
  // const startCourse = () => {
  //   try {
  //     const course = giftDetails.items[0]
  //     router.push(`/study-course/${course._id}`)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Edugram.io - Gift Card</title>
        <meta
          name="description"
          content="You have recieved gifted course(s) on edugram.io"
        />
        <meta itemProp="image" content="/static/images/banner.png" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Edugram.io - Gifted Course" />
        <meta
          property="og:description"
          content="You have recieved gifted course(s) on edugram.io"
        />
        <meta property="og:image" content="/static/images/banner.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Edugram.io - Gifted Course" />
        <meta
          name="twitter:description"
          content="You have recieved gifted course(s) on edugram.io"
        />
        <meta name="twitter:image" content="/static/images/banner.png" />
      </Head>
      <PageContainer>
        <PageHeader>
          <PageHeaderTitle>Redeem Gifted Card</PageHeaderTitle>
        </PageHeader>
        {isLoadingLocal ? (
          <LoaderContainer>
            <Loader size="large" />
          </LoaderContainer>
        ) : (
          <PageContent>
            <Card>
              {!isRedeemed && giftDetails.redeemedAt && (
                <Notice>THIS CARD HAS BEEN ALREADY REDEEMED</Notice>
              )}
              <Row
                isSmall={
                  isRedeemed || giftDetails.redeemedAt || !giftDetails.message
                }
              >
                {!isRedeemed && (
                  <GiftDetailsSection>
                    <GiftNoteText>Gift Note:</GiftNoteText>
                    <GiftMessageWrapper>
                      <GiftMessageText>{giftDetails.message}</GiftMessageText>
                    </GiftMessageWrapper>
                    <GiftedByText>
                      {giftDetails.isAnonymous
                        ? 'Gifted to You Anonymously 🙈'
                        : `Gifted By: ${giftDetails.senderDetails.name}`}
                    </GiftedByText>
                  </GiftDetailsSection>
                )}
                <GiftItemsSection>
                  <GiftCard amount={500} />
                  <RecipientText>
                    {isRedeemed || giftDetails.redeemedAt
                      ? 'Congratulations! Your course gift has been successfully redeemed.'
                      : `Congratulations ${giftDetails?.recipient?.name}! You've
                    received a gift card!`}
                  </RecipientText>
                  <GiftItemsWrapper>
                    {giftDetails.items?.map(
                      (item: ShortCourse, index: number) => (
                        <GiftItem key={index}>
                          <ItemImage src={item.presentationalImage} />
                          <ItemDetails>
                            <ItemTitle>{item.title}</ItemTitle>
                            <ItemAuthor>
                              {item.author?.first_name} {item.author?.last_name}
                            </ItemAuthor>
                          </ItemDetails>
                        </GiftItem>
                      )
                    )}
                  </GiftItemsWrapper>
                  {!isRedeemed && !giftDetails.redeemedAt && (
                    <Button
                      ghost
                      rounded
                      size="lg"
                      disabled={isApiLoading}
                      onClick={redeemGiftItems}
                    >
                      {isApiLoading ? (
                        <Loading
                          type="points-opacity"
                          color="currentColor"
                          size="sm"
                        />
                      ) : (
                        'Redeem'
                      )}
                    </Button>
                  )}
                  {isRedeemed && (
                    <Button
                      ghost
                      rounded
                      size="lg"
                      onClick={() => {
                        console.log('herlo')
                      }}
                    >
                      Start Browsing
                    </Button>
                  )}
                </GiftItemsSection>
              </Row>
            </Card>
          </PageContent>
        )}
        {showLoginModal && (
          <LoginModal
            onClose={() => {
              setShowLoginModal(false)
            }}
          />
        )}
        {bottomNotification && (
          <PopUpBottom
            bottomNotification={bottomNotification as BottomNotification}
            setShowPopUp={setBottomNotification}
          />
        )}
      </PageContainer>
    </Layout>
  )
}

export default GiftDetailsPage
