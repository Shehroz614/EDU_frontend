import React, { useEffect, useState } from 'react'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import { getOrder } from '@services/api/order'
import {
  PageContainer,
  PageHeader,
  PageHeaderTitle,
  PageContent,
  LoaderContainer,
  Card,
  Row,
  OrderItemsSection,
  AnimationContainer,
  StatusText,
  StatusSubText,
  OrderItemsWrapper,
  OrderItem,
  ItemImage,
  ItemDetails,
  ItemTitle,
  ItemAuthor,
  OrderIconWrapper,
  EmailText,
  ButtonsWrapper,
  Button,
  ButtonAlt,
} from '@styled_components/orders/complete/styled.components'
import Loader from '@components/organisms/Loader'
import PopUpBottom from '@components/organisms/PopUpBottom'
import Lottie from 'react-lottie'
import animationDataSuccess from '@public/static/images/134369-sucess.json'
import animationDataFail from '@public/static/images/97670-tomato-error.json'
import { BottomNotification, ShortCourse } from '@ugu/types'
import CopyTextIcon from '@public/static/icons/copy-text-icon'
import { useMyCourses } from '@contexts/MyCoursesContext'
import { useAuth } from '@hooks/useAuth'

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  }
}

const OrderCompletedPage = () => {
  const router = useRouter()
  const {
    authState: { isAuthenticated },
  } = useAuth()
  const { refreshMyCourses } = useMyCourses()
  const [orderDetails, setOrderDetails] = useState<any>()
  const [isLoadingLocal, setIsLoadingLocal] = useState<boolean>(true)
  const {
    setGiftDetails,
    instantCheckoutItem,
    setInstantCheckoutItem,
    updateCartAndWishlistFromAPI,
  } = useCartAndWishList()
  const [bottomNotification, setBottomNotification] = useState<
    boolean | BottomNotification
  >(false)

  useEffect(() => {
    if (router.isReady && router.query?.order_id) {
      if (instantCheckoutItem) {
        setInstantCheckoutItem(null)
      }
      setGiftDetails(null)
      getOrder(router.query.order_id as string).then((res) => {
        setOrderDetails(res)
        setIsLoadingLocal(false)
        refreshMyCourses()
        updateCartAndWishlistFromAPI()
      })
    }
  }, [router, isAuthenticated])

  const copyGiftLink = () => {
    navigator.clipboard.writeText(
      `${location.origin}/gift/${router.query?.order_id}`
    )
    setBottomNotification({
      message: 'Gift link been copied to your clipboard',
      actionType: 'success',
    })
  }

  return (
    <Layout>
      <PageContainer>
        <PageHeader>
          <PageHeaderTitle>Order Complete</PageHeaderTitle>
        </PageHeader>
        {isLoadingLocal ? (
          <LoaderContainer>
            <Loader size="large" />
          </LoaderContainer>
        ) : (
          <PageContent>
            <Card>
              <Row isSmall={true}>
                <OrderItemsSection>
                  <OrderIconWrapper>
                    <AnimationContainer>
                      <Lottie
                        options={{
                          loop: false,
                          autoplay: true,
                          animationData:
                            router.query?.redirect_status === 'succeeded'
                              ? animationDataSuccess
                              : animationDataFail,
                          rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice',
                          },
                        }}
                      />
                    </AnimationContainer>
                  </OrderIconWrapper>
                  <StatusText>
                    {router.query?.redirect_status === 'succeeded'
                      ? orderDetails.giftDetails
                        ? 'Congratulations! Your course gift has been purchased successfully!'
                        : 'Payment Successful'
                      : 'Payment Failed'}
                  </StatusText>
                  {!orderDetails.giftDetails && (
                    <StatusSubText>
                      {router.query?.redirect_status === 'succeeded'
                        ? 'Your Course(s) have been purchased successfully.'
                        : 'Your Payment has failed'}
                    </StatusSubText>
                  )}
                  <OrderItemsWrapper>
                    {orderDetails.items?.map(
                      (item: ShortCourse, index: number) => (
                        <OrderItem key={index}>
                          <ItemImage src={item.presentationalImage} />
                          <ItemDetails>
                            <ItemTitle>{item.title}</ItemTitle>
                            <ItemAuthor>
                              {item.author?.first_name} {item.author?.last_name}
                            </ItemAuthor>
                          </ItemDetails>
                        </OrderItem>
                      )
                    )}
                  </OrderItemsWrapper>
                  <EmailText>
                    {router.query?.redirect_status === 'succeeded'
                      ? orderDetails.giftDetails
                        ? 'The email is on its way. Want to share more? Use this link to share the course'
                        : "We've sent you the receipt to the provided email."
                      : 'We were unable to process the transaction, please try again'}
                  </EmailText>

                  {orderDetails.giftDetails ? (
                    <Button onClick={copyGiftLink}>
                      <CopyTextIcon width="16" height="16" /> Copy Gift Link
                    </Button>
                  ) : (
                    <ButtonsWrapper>
                      <Button onClick={() => router.push('/')}>
                        Go to Home
                      </Button>
                      <ButtonAlt onClick={() => router.push('/my-courses')}>
                        Go to My Courses
                      </ButtonAlt>
                    </ButtonsWrapper>
                  )}
                </OrderItemsSection>
              </Row>
            </Card>
          </PageContent>
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
export default OrderCompletedPage
