import React, { useEffect, useState } from 'react'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { Row, Col } from 'react-styled-flexboxgrid'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { colors } from '@configs/styles/config'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import {
  PageContainer,
  PageHeader,
  PageHeaderTitle,
  PageContent,
  Divider,
  DiscountItemsWrapper,
  DiscountItem,
  DiscountItemRemoveButton,
  CheckboxWrapper,
} from '@styled_components/cart/styled.components'
import { useRouter } from 'next/router'
import { Text, Button, Card, Input, Loading, Checkbox } from '@nextui-org/react'
import { BottomNotification, CenterNotification } from '@type/main'
import PopUpBottom from '@components/organisms/PopUpBottom'
import { IoCloseOutline } from 'react-icons/io5'
import PopUpCenter from '@components/organisms/PopUpCenter'
import VerticalCourseCard from '@components/molecules/VerticalCourse'
import HorizontalCourseCard from '@components/molecules/HorizontalCourse'

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'home',
        'wishlist',
        'footer',
        'cart',
      ])),
    },
  }
}

const Cart = (): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation(['cart', 'footer', 'common', 'home'])
  const {
    cartItems,
    getCartTotal,
    getCartTotalDiscount,
    getPayableAmount,
    discounts,
    checkDiscount,
    addDiscounts,
    removeDiscount,
    replaceDiscount,
    removeFromCart,
    inactiveCartItems,
    toggleAllCartItemsState,
    toggleCartItemState,
    setInstantCheckoutItem,
  } = useCartAndWishList()
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false)
  const [discountCode, setDiscountCode] = useState<string>()
  const [centerNotification, setCenterNotification] = useState<
    boolean | CenterNotification
  >(false)
  const [bottomNotification, setBottomNotification] = useState<
    boolean | BottomNotification
  >(false)

  useEffect(() => {
    setInstantCheckoutItem(null)
  }, [])

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
              handleReplaceDiscount(discountCode, discountDetails)
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

  return (
    <Layout>
      <PageContainer>
        <PageHeader>
          <PageHeaderTitle>{t('Cart')}</PageHeaderTitle>
        </PageHeader>
        <PageContent>
          <Row>
            <Col xs={12} md={8} style={{ marginBottom: '60px' }}>
              <Row>
                <Col xs>
                  <Row>
                    <Col xs>
                      <Row>
                        {isEditMode && (
                          <Col
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <Checkbox
                              defaultSelected={inactiveCartItems.length === 0}
                              isSelected={inactiveCartItems.length === 0}
                              onChange={toggleAllCartItemsState}
                            />
                          </Col>
                        )}
                        <Col xs>
                          <Text h3 css={{ margin: '0 !important' }}>
                            {cartItems?.length} {t('courses In Cart')}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col style={{ display: 'flex', alignItems: 'center' }}>
                      <Button
                        ghost
                        size="xs"
                        onClick={() => setIsEditMode((s) => !s)}
                      >
                        {isEditMode
                          ? t('buttons.Done', { ns: 'common' })
                          : t('buttons.Edit', { ns: 'common' })}
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Divider />
                <Col xs={12}>
                  {cartItems?.map((course, index) => (
                    <Row key={index} style={{ marginBottom: '20px' }}>
                      {isEditMode && (
                        <Col>
                          <CheckboxWrapper>
                            <Checkbox
                              defaultSelected={
                                !inactiveCartItems.includes(course._id)
                              }
                              isSelected={
                                !inactiveCartItems.includes(course._id)
                              }
                              onChange={() => toggleCartItemState(course._id)}
                            />
                          </CheckboxWrapper>
                        </Col>
                      )}
                      <Col
                        xs={false}
                        sm={true}
                        style={{
                          opacity: inactiveCartItems.includes(course._id)
                            ? 0.5
                            : 1,
                        }}
                      >
                        <HorizontalCourseCard
                          key={course._id}
                          course={course}
                          marginBottom="0"
                          variant="cart"
                          onClose={() => removeFromCart(course._id)}
                        />
                      </Col>
                      <Col
                        xs={true}
                        sm={false}
                        md={false}
                        style={{
                          opacity: inactiveCartItems.includes(course._id)
                            ? 0.5
                            : 1,
                        }}
                      >
                        <VerticalCourseCard
                          key={course._id}
                          course={course}
                          marginBottom="0"
                          variant="cart"
                          onClose={() => removeFromCart(course._id)}
                        />
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={4}>
              <Card variant="bordered">
                <Card.Body css={{ padding: '30px !important' }}>
                  <Row>
                    <Col xs={12} style={{ marginBottom: '20px' }}>
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
                            onChange={(e) => setDiscountCode(e.target.value)}
                          />
                        </Col>
                        <Col>
                          <Button
                            auto
                            ghost
                            onClick={handleDiscountCode}
                            disabled={
                              !discountCode ||
                              isApiLoading ||
                              inactiveCartItems.length === cartItems.length
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
                          <Text h4 weight="normal" color={colors.uguGrey}>
                            {t('Subtotal')}
                          </Text>
                        </Col>
                        <Col xs={6}>
                          <Text h4 b css={{ textAlign: 'right !important' }}>
                            {getCartTotal() / 100} USD
                          </Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={6}>
                          <Text h4 weight="normal" color={colors.uguGrey}>
                            {t('Discount')}
                          </Text>
                        </Col>
                        <Col xs={6}>
                          <Text h4 b css={{ textAlign: 'right !important' }}>
                            {getCartTotalDiscount() / 100} USD
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Divider />
                    <Col xs={12} style={{ marginBottom: '20px' }}>
                      <Row>
                        <Col xs={6}>
                          <Text h4 weight="normal">
                            {t('Grand Total')}
                          </Text>
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
                            disabled={
                              isApiLoading ||
                              inactiveCartItems.length === cartItems.length
                            }
                            onClick={() => router.push('/checkout')}
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
      </PageContainer>
    </Layout>
  )
}
export default Cart
