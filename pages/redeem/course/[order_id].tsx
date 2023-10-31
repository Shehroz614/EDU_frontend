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
import { redeemGift } from '@services/api/gift'
import animationDataSuccess from '@public/static/images/134369-sucess.json'
import giftAnimation from '@public/static/images/40465-christmas-gift.json'
import Lottie from 'react-lottie'
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
  GiftIconWrapper,
  RecipientText,
  GiftItem,
  GiftItemsWrapper,
  ItemImage,
  ItemDetails,
  ItemAuthor,
  ItemTitle,
  Notice,
  AnimationContainer,
} from '@styled_components/gift/styled.components'
import { useAuth } from '@hooks/useAuth'
import LoginModal from '@components/organisms/LoginModal'
import PopUpBottom from '@components/organisms/PopUpBottom'

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
  const [giftDetails, setGiftDetails] = useState<any>()
  const [isRedeemed, setIsRedeemed] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false)
  const [bottomNotification, setBottomNotification] = useState<
    boolean | BottomNotification
  >(false)

  useEffect(() => {
    if (router.isReady && router.query?.order_id) {
      fetchGiftDetails(router.query.order_id as string)
    }
  }, [router])

  const fetchGiftDetails = async (order_id: string) => {
    setIsApiLoading(true)
    try {
      const giftDetails = await getGiftDetails(order_id)
      setGiftDetails(giftDetails)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
    setIsApiLoading(false)
  }
  const redeemGiftItems = async () => {
    try {
      if (authState?.isAuthenticated) {
        setIsApiLoading(true)
        const order_id = router.query?.order_id as string
        await redeemGift(order_id)
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
  const startCourse = () => {
    try {
      const course = giftDetails.items[0]
      router.push(`/study-course/${course._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Edugram.io - Gifted Course</title>
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
          <PageHeaderTitle>Redeem Gifted Course</PageHeaderTitle>
        </PageHeader>
        {isLoadingLocal ? (
          <LoaderContainer>
            <Loader size="large" />
          </LoaderContainer>
        ) : (
          <PageContent>
            <Card>
              {!isRedeemed && giftDetails.redeemedAt && (
                <Notice>THIS COURSE HAS BEEN ALREADY REDEEMED</Notice>
              )}
              <Row
                isSmall={
                  isRedeemed || giftDetails.redeemedAt || !giftDetails.message
                }
              >
                {!isRedeemed &&
                  !giftDetails.redeemedAt &&
                  giftDetails.message && (
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
                  <GiftIconWrapper>
                    <AnimationContainer>
                      <Lottie
                        options={{
                          loop: false,
                          autoplay: true,
                          animationData:
                            isRedeemed || giftDetails.redeemedAt
                              ? animationDataSuccess
                              : giftAnimation,
                          rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice',
                          },
                        }}
                      />
                    </AnimationContainer>
                  </GiftIconWrapper>
                  <RecipientText>
                    {isRedeemed || giftDetails.redeemedAt
                      ? 'Congratulations! Your course gift has been successfully redeemed.'
                      : `Congratulations ${giftDetails.recipient.name}! You've
                    received a gifted course!`}
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
                    <Button ghost rounded size="lg" onClick={startCourse}>
                      Start Course
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
