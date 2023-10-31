import React, { useReducer, useRef, useState } from 'react'
import {
  CartItem,
  CartItemDetails,
  CartItemImgWrapper,
  Divider,
  PageContent,
  DiscountItemsWrapper,
  DiscountItem,
  DiscountItemRemoveButton,
} from '@styled_components/checkout/styled.components'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Button, Card, Image, Input, Loading, Text } from '@nextui-org/react'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import { colors } from '@configs/styles/config'
import CheckoutForm from '@components/pages/checkout/CheckoutForm'
import trimmedText from '@helpers/trimmedText'
import LoginModal from '@components/organisms/LoginModal'
import PopUpBottom from '@components/organisms/PopUpBottom'
import { BottomNotification, CenterNotification } from '@type/main'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@hooks/useAuth'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import SimpleReactValidator from 'simple-react-validator'
import { createOrder } from '@services/api/order'
import { checkout as checkoutHelper } from '@services/api/payment'
import { IoCloseOutline } from 'react-icons/io5'
import PopUpCenter from '@components/organisms/PopUpCenter'

const CheckoutPageContent = () => {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const { t } = useTranslation(['common', 'checkout', 'footer'])
  const {
    authState: { isAuthenticated, isLoading: isAuthLoading },
  } = useAuth()

  const {
    cartItems: contextCartItems,
    instantCheckoutItem,
    getCartTotal,
    getCartTotalDiscount,
    getPayableAmount,
    giftDetails,
    discounts,
    checkDiscount,
    addDiscounts,
    removeDiscount,
    replaceDiscount,
    inactiveCartItems,
  } = useCartAndWishList()
  const cartItems = instantCheckoutItem
    ? [instantCheckoutItem]
    : contextCartItems
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false)
  const [guestCheckoutDetails, setGuestCheckoutDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
  })
  const [discountCode, setDiscountCode] = useState<string>()
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [stripeErrorMessage, setStripeErrorMessage] = useState<any>('')
  const [centerNotification, setCenterNotification] = useState<
    boolean | CenterNotification
  >(false)
  const [bottomNotification, setBottomNotification] = useState<
    boolean | BottomNotification
  >(false)
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const simpleValidator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } })
  )

  const doesDiscountExists = (discount) => {
    if (discount.courses) {
      const newCourseIds = discount.courses
      const discountExistsWithSameCourse = discounts.find(
        (discount) =>
          discount.courses &&
          newCourseIds.some((courseId) => discount.courses.includes(courseId))
      )
      if (discountExistsWithSameCourse) {
        console.log(`A discount with one or more course IDs already exists.`)
        return discountExistsWithSameCourse
      }
    }
    return false
  }
  const handleDiscountCode = async () => {
    try {
      if (!discountCode) {
        setBottomNotification({
          message: 'Please enter a coupon code',
          actionType: 'error',
        })
        return
      }
      if (discounts.find((c) => c.code === discountCode)) {
        setBottomNotification({
          message: 'Coupon code already applied',
          actionType: 'error',
        })
        return
      }

      setIsApiLoading(true)
      const discountDetails = await checkDiscount(discountCode)
      const existingDiscount = doesDiscountExists(discountDetails)
      if (existingDiscount) {
        setCenterNotification({
          title: 'Do you want to replace existing discount',
          message:
            'A discount is already applied to the item that you are trying to apply for, do you wish you replace the already applied discount with the new one',
          firstBtn: {
            title: 'Replace',
            actionType: 'confirm',
            action: () => {
              handleReplaceDiscount(existingDiscount.code, discountDetails)
              setCenterNotification(false)
            },
          },
          secondBtn: {
            title: 'Cancel',
            actionType: 'cancel',
            action: () => {
              setCenterNotification(false)
              setIsApiLoading(false)
            },
          },
        })
        return
      }
      await addDiscounts(discountCode)
      setDiscountCode('')
      setIsApiLoading(false)
    } catch (err: any) {
      setIsApiLoading(false)
      setBottomNotification({
        message: err?.response?.data?.message || 'Something went wrong!',
        actionType: 'error',
      })
    }
  }
  const handleReplaceDiscount = async (
    discountCode: string,
    discountDetails: any
  ) => {
    try {
      await replaceDiscount(discountCode, discountDetails)
      setBottomNotification({
        message: 'Discount replaced successfully',
        actionType: 'success',
      })
      setDiscountCode('')
      setIsApiLoading(false)
    } catch (err: any) {
      setIsApiLoading(false)
      setBottomNotification({
        message: err?.response?.data?.message || 'Something went wrong!',
        actionType: 'error',
      })
    }
  }
  const handleRemoveDiscount = async (code: string) => {
    try {
      await removeDiscount(code)
      setBottomNotification({
        message: 'Discount removed successfully',
        actionType: 'success',
      })
    } catch (err: any) {
      setBottomNotification({
        message: err?.response?.data?.message || 'Failed to remove discount!',
        actionType: 'error',
      })
    }
  }

  const handleCheckout = async (formEvent?: any) => {
    const total = getPayableAmount()
    if (formEvent && formEvent.hasOwnProperty('preventDefault')) {
      formEvent.preventDefault()
    }
    if (simpleValidator.current.allValid()) {
      setIsApiLoading(true)
      try {
        if (total > 0) {
          // @ts-ignore
          const { error: submitError } = await elements.submit()
          console.log(submitError)
          if (submitError) {
            setIsApiLoading(false)
            setStripeErrorMessage(submitError)
            return
          }
        }

        const items = cartItems
          .filter((c) => !inactiveCartItems.includes(c._id))
          .map((i) => i._id)
        const discountItems = discounts.map((d) => d._id)
        const order = await createOrder(
          items,
          'Course',
          giftDetails as any,
          !isAuthenticated,
          guestCheckoutDetails
        )
        const checkout = await checkoutHelper(
          items,
          discountItems,
          'Course',
          order._id as string,
          guestCheckoutDetails
        )
        // @ts-ignore
        if (checkout.hasOwnProperty('status') && checkout.status === 201) {
          router.push({
            pathname: `${location.origin}/orders/${order._id}/complete`,
            query: { redirect_status: 'succeeded' },
          })
        } else {
          const { client_secret: clientSecret } = checkout as {
            client_secret: string
          }
          // @ts-ignore
          const { error: confirmError } = await stripe.confirmPayment({
            // @ts-ignore
            elements,
            clientSecret,
            confirmParams: {
              return_url: `${location.origin}/orders/${order._id}/complete`,
            },
          })
          if (confirmError) {
            setIsApiLoading(false)
            setStripeErrorMessage(confirmError)
            return
          }
        }
      } catch (err: any) {
        console.log(err)
        setBottomNotification({
          message: err?.response?.data?.message || 'Something went wrong!',
          actionType: 'error',
        })
      }
      setIsApiLoading(false)
    } else {
      simpleValidator.current.showMessages()
      forceUpdate()
    }
  }
  const handleGuestDetailsInput = (key: string, value: string) => {
    setGuestCheckoutDetails((state) => ({
      ...state,
      [key]: value,
    }))
  }

  return (
    <>
      <PageContent>
        <Row>
          <Col xs={12} md={6} lg={8} style={{ marginBottom: '20px' }}>
            <Row>
              <Col xs={12}>
                <Text h1>{t('Checkout', { ns: 'checkout' })}</Text>
              </Col>
              {!isAuthLoading && !isAuthenticated && (
                <Col
                  xs={12}
                  style={{
                    marginBottom: '20px',
                  }}
                >
                  <Row>
                    <Col xs={6}>
                      <Text h4>{t('Checkout as Guest')}</Text>
                    </Col>
                    <Col xs={6}>
                      <Text
                        css={{ textAlign: 'right !important' }}
                        h5
                        weight="normal"
                      >
                        {t('Already have an Account ? ')}{' '}
                        <a
                          style={{ textDecoration: 'underline' }}
                          href="#"
                          onClick={() => setShowLoginModal(true)}
                        >
                          Login
                        </a>
                      </Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Row>
                        <Col xs={6}>
                          <Text>First Name</Text>
                          <Input
                            bordered
                            width="100%"
                            color="primary"
                            animated={false}
                            placeholder={t('First Name')}
                            value={guestCheckoutDetails.first_name}
                            onChange={(e) =>
                              handleGuestDetailsInput(
                                'first_name',
                                e.target.value
                              )
                            }
                            onBlur={() =>
                              simpleValidator.current.showMessageFor(
                                'firstName'
                              )
                            }
                            status={
                              simpleValidator.current.message(
                                'firstName',
                                guestCheckoutDetails.first_name,
                                'required|string'
                              )
                                ? 'error'
                                : 'default'
                            }
                          />
                          <Text color="error" size="$xs">
                            {simpleValidator.current.message(
                              'firstName',
                              guestCheckoutDetails.first_name,
                              'required|string'
                            )}
                          </Text>
                        </Col>
                        <Col xs={6}>
                          <Text>Last Name</Text>
                          <Input
                            bordered
                            width="100%"
                            color="primary"
                            animated={false}
                            placeholder={t('Last Name')}
                            value={guestCheckoutDetails.last_name}
                            onChange={(e) =>
                              handleGuestDetailsInput(
                                'last_name',
                                e.target.value
                              )
                            }
                            onBlur={() =>
                              simpleValidator.current.showMessageFor('lastName')
                            }
                            status={
                              simpleValidator.current.message(
                                'lastName',
                                guestCheckoutDetails.last_name,
                                'required|string'
                              )
                                ? 'error'
                                : 'default'
                            }
                          />
                          <Text color="error" size="$xs">
                            {simpleValidator.current.message(
                              'lastName',
                              guestCheckoutDetails.last_name,
                              'required|string'
                            )}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={12}>
                      <Row>
                        <Col xs={12}>
                          <Text>Email Address</Text>
                          <Input
                            bordered
                            width="100%"
                            color="primary"
                            animated={false}
                            placeholder={t('Email Address')}
                            value={guestCheckoutDetails.email}
                            onChange={(e) =>
                              handleGuestDetailsInput('email', e.target.value)
                            }
                            onBlur={() =>
                              simpleValidator.current.showMessageFor('email')
                            }
                            status={
                              simpleValidator.current.message(
                                'email',
                                guestCheckoutDetails.email,
                                'required|email'
                              )
                                ? 'error'
                                : 'default'
                            }
                          />
                          <Text color="error" size="$xs">
                            {simpleValidator.current.message(
                              'email',
                              guestCheckoutDetails.email,
                              'required|string'
                            )}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              )}
              <Col xs={12}>
                {getCartTotal() > 0 ? (
                  <CheckoutForm
                    stripe={stripe}
                    isLoading={isApiLoading}
                    onSubmit={handleCheckout}
                    errorMessage={stripeErrorMessage}
                  />
                ) : (
                  <Row>
                    <Col xs={12}>
                      <Text size="$xl">Payment details is not required</Text>
                    </Col>
                    <Col xs={12}>
                      <Text h4 color={colors.uguLightBlack}>
                        You cart&apos;s total is $0, no need to provide any
                        payment details for the transaction, please complete the
                        checkout and <br /> Happy learning!
                      </Text>
                    </Col>
                    <Col xs={12}>
                      <Button
                        css={{ width: '100% !important' }}
                        onClick={handleCheckout}
                        disabled={isApiLoading}
                      >
                        {isApiLoading ? (
                          <Loading
                            type="points-opacity"
                            color="currentColor"
                            size="sm"
                          />
                        ) : (
                          t('Complete Checkout')
                        )}
                      </Button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card variant="bordered" style={{ display: 'inline-block' }}>
              <Card.Body css={{ padding: '30px !important' }}>
                <Row>
                  <Col xs={12} style={{ marginBottom: '10px' }}>
                    <Row>
                      {cartItems
                        .filter((c) => !inactiveCartItems.includes(c._id))
                        .map((item, index) => (
                          <Col xs={12} key={index}>
                            <CartItem key={item._id}>
                              <CartItemImgWrapper>
                                <Image
                                  css={{
                                    width: '100% !important',
                                    height: '100% !important',
                                  }}
                                  showSkeleton
                                  maxDelay={10000}
                                  src={item.presentationalImage}
                                  objectFit="cover"
                                  alt=""
                                />
                              </CartItemImgWrapper>
                              <CartItemDetails>
                                <Text>{trimmedText(item.title || '', 30)}</Text>
                                <Text color={colors.uguDarkGrey}>
                                  {t('Author', { ns: 'checkout' })}
                                </Text>
                                <Text h4>
                                  {(item.salePrice || item.price) == 0
                                    ? 'Free'
                                    : `$ ${
                                        (item.salePrice || item.price) / 100
                                      }`}
                                </Text>
                              </CartItemDetails>
                            </CartItem>
                          </Col>
                        ))}
                    </Row>
                  </Col>
                  <Divider />
                  <Col
                    xs={12}
                    style={{ marginBottom: '20px', marginTop: '10px' }}
                  >
                    <Row>
                      <Col xs>
                        <Input
                          bordered
                          clearable
                          width="100%"
                          color="primary"
                          value={discountCode}
                          animated={false}
                          placeholder={t('Coupon Code')}
                          disabled={getCartTotal() === 0}
                          onChange={(e) => setDiscountCode(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Button
                          auto
                          ghost
                          css={{ width: '100% !important' }}
                          onClick={handleDiscountCode}
                          disabled={
                            getCartTotal() === 0 ||
                            !discountCode ||
                            isApiLoading
                          }
                          style={{ minWidth: '83px' }}
                        >
                          {isApiLoading ? (
                            <Loading
                              type="points-opacity"
                              color="currentColor"
                              size="sm"
                            />
                          ) : (
                            t('Apply')
                          )}
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs>
                        {discounts?.length > 0 && (
                          <DiscountItemsWrapper>
                            {discounts.map((item, index) => (
                              <DiscountItem key={index}>
                                <Text
                                  color="primary"
                                  style={{ flexGrow: 1, marginRight: '20px' }}
                                >
                                  {item.code}
                                </Text>
                                <Text color="primary">
                                  {item.value}
                                  {item.valueType === 'percentage'
                                    ? '%'
                                    : t('courseInfo.currency', {
                                        ns: 'home',
                                      })}
                                </Text>
                                <DiscountItemRemoveButton
                                  onClick={() =>
                                    handleRemoveDiscount(item.code)
                                  }
                                >
                                  <IoCloseOutline
                                    size={14}
                                    color={colors.uguWhite}
                                  />
                                </DiscountItemRemoveButton>
                              </DiscountItem>
                            ))}
                          </DiscountItemsWrapper>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Divider />
                  <Col xs={12}>
                    <Row>
                      <Col xs={6}>
                        <Text h4 color={colors.uguGrey}>
                          {t('Subtotal')}
                        </Text>
                      </Col>
                      <Col xs={6}>
                        <Text h4 css={{ textAlign: 'right !important' }}>
                          {getCartTotal() / 100} USD
                        </Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Text h4 color={colors.uguGrey}>
                          {t('Discount')}
                        </Text>
                      </Col>
                      <Col xs={6}>
                        <Text h4 css={{ textAlign: 'right !important' }}>
                          {getCartTotalDiscount() / 100} USD
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Divider />
                  <Col xs={12} style={{ marginBottom: '20px' }}>
                    <Row>
                      <Col xs={6}>
                        <Text h4>{t('Grand Total')}</Text>
                      </Col>
                      <Col xs={6}>
                        <Text h4 b css={{ textAlign: 'right !important' }}>
                          {getPayableAmount() / 100} USD
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} style={{ marginBottom: '10px' }}>
                    <Row>
                      <Col xs={12}>
                        <Button
                          css={{ width: '100% !important' }}
                          disabled={isApiLoading}
                          onClick={handleCheckout}
                        >
                          {isApiLoading ? (
                            <Loading
                              type="points-opacity"
                              color="currentColor"
                              size="sm"
                            />
                          ) : (
                            t('Proceed To Payment')
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12}>
                    <Row>
                      <Col xs={12}>
                        <Text css={{ textAlign: 'center !important' }}>
                          {t('30 days money back guarantee')}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </PageContent>
      {showLoginModal && (
        <LoginModal
          onClose={() => {
            setShowLoginModal(false)
          }}
        />
      )}
      {centerNotification && (
        <PopUpCenter
          showPopUp={centerNotification as boolean}
          centerNotification={centerNotification as CenterNotification}
        />
      )}
      {bottomNotification && (
        <PopUpBottom
          bottomNotification={bottomNotification as BottomNotification}
          setShowPopUp={setBottomNotification}
        />
      )}
    </>
  )
}
export default CheckoutPageContent
