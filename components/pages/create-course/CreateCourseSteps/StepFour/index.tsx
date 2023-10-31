// @ts-nocheck
import React, { useEffect, useReducer, useRef, useState } from 'react'
import Button from 'components/atoms/Button'
import InfoTextIcon from 'components/atoms/InfoTextIcon'
import { colors, fontFamilies } from 'configs/styles/config'
import CreateCourseLabel from '../../CreateCourseLabel'
import { useTranslation } from 'next-i18next'
import { useCreateCourse } from '@contexts/CreateCourse'
import Coupon from '@components/atoms/Coupon'
import { PatchPriceHelper } from '@helpers/createCourseHelpers'
import {
  StepContainer,
  ButtonsWrapper,
  MainWrapper,
  InputWrapper,
  GeneralWrapper,
  LevelSelectorsWrapper,
  CouponWrapper,
  SetPriceInputHeader,
  InputBlock,
  TextFieldWrapper,
  InfoWrapper,
} from '@styled_components/StepFour/styled.components'
import CoursePriceSelector from '../../CoursePriceSelector'
import {
  Text,
  Grid,
  Input,
  FormElement,
  Checkbox,
  Row,
  Col,
  Button as NextUIButton,
  Collapse,
  Tooltip,
  Popover,
} from '@nextui-org/react'
import styled from '@emotion/styled'
import { addCoupon, getCoupon, deleteCouponHelper } from '@helpers/couponHelper'
import router from 'next/router'
import CollapseInfo from '@components/atoms/CollapseInfo/CollapseInfo'
import {
  confirmPriceChangeForLiveCourse,
  confirmCouponDeletion,
} from 'configs/constants/labels/modal-labels'
import { BottomNotification, CenterNotification } from 'types/main'
import PopUpCenter from 'components/organisms/PopUpCenter'
import PopUpBottom from 'components/organisms/PopUpBottom'
import { error } from 'console'
import DiscountIcon from '@public/static/icons/discountIcon/discountIcon'
import { IoCloseOutline } from 'react-icons/io5'
import useStepFour from '@hooks/CreateCourses/useStepFour'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { AnimatePresence, motion } from 'framer-motion'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import SimpleReactValidator from 'simple-react-validator'
import {
  PopoverContentWrapper,
  TooltipWrapper,
} from '@styled_components/CreateCourse/styled.components'
import { getFragmentedText } from '@utils/getFragmentedText'

const ThisCouponWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
  column-gap: 0.5rem;
`
const Select = styled.select<{ disabled?: boolean }>`
  width: 100%;
  padding: 10px 15px;
  border-radius: 9999px;
  border-color: ${(props) =>
    props.disabled ? colors.uguGrey : colors.uguPurple};
  color: ${(props) => (props.disabled ? colors.uguGrey : colors.uguPurple)};
`
const PolicyItem = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 10px 20px 10px 25px;
  border-radius: 50px;
  margin-right: 10px;
  align-items: center;
`
const PolicyItemDetails = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`
const PolicyItemButton = styled.button`
  background: ${colors.uguPurple};
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  margin-left: 15px;
  padding: 0;
  cursor: pointer;
`

const numberOrDotRegex = /^[0-9.]*$/

const StepFour: React.FC = () => {
  const { course_id } = router.query
  const {
    course,
    setActiveStep,
    centerNotification,
    setCenterNotification,
    bottomNotification,
    setBottomNotification,
  } = useCreateCourse()
  const {
    isApiLoading,
    basePrice,
    minPrice,
    priceType,
    setPriceType,
    price,
    editPrice,
    editMinPrice,
    submitPriceHandler,
    pricingPolicies,
    pricingPolicy,
    handlePolicyInput,
    activeEditPolicyId,
    addPricingPolicy,
    setPricingPolicyForEdit,
    resetPricingPolicyForEdit,
    handleUpdatePricingPolicy,
    handleDeletePricingPolicy,
  } = useStepFour()
  const { t } = useTranslation(['createCourse', 'common'])
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const simpleValidator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } })
  )

  const handleAddPolicy = () => {
    if (simpleValidator.current.allValid()) {
      if (activeEditPolicyId) {
        handleUpdatePricingPolicy(activeEditPolicyId)
      } else {
        addPricingPolicy()
      }
    } else {
      simpleValidator.current.showMessages()
      forceUpdate()
    }
  }

  return (
    <StepContainer>
      <MainWrapper>
        <InputBlock>
          <TextFieldWrapper>
            <CreateCourseLabel title={t('price.price')} />
            <Popover placement="top-left">
              <Popover.Trigger>
                <TooltipWrapper>
                  <InfoTextIcon style={{ marginLeft: '0.5rem' }} />
                </TooltipWrapper>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverContentWrapper>
                  {getFragmentedText(
                    t('tooltips.price', { ns: 'createCourse' })
                  )}
                </PopoverContentWrapper>
              </Popover.Content>
            </Popover>
          </TextFieldWrapper>
          <InputWrapper>
            <Grid.Container gap={2}>
              <Grid md={7}>
                <Grid.Container gap={1} direction="column">
                  <Grid>
                    <Grid.Container gap={1} style={{ padding: 0 }}>
                      <Grid>
                        <CoursePriceSelector
                          id={'smart'}
                          type="smart"
                          selected={priceType === 'smart'}
                          onClick={() => setPriceType('smart')}
                        />
                      </Grid>
                      <Grid>
                        <CoursePriceSelector
                          id={'custom'}
                          type="custom"
                          selected={priceType === 'custom'}
                          onClick={() => setPriceType('custom')}
                        />
                      </Grid>
                    </Grid.Container>
                  </Grid>
                  <Grid>
                    <Input
                      bordered
                      clearable
                      width="100%"
                      type="number"
                      contentLeft="$"
                      contentLeftStyling={true}
                      value={price}
                      shadow={false}
                      rounded={true}
                      animated={false}
                      borderWeight="light"
                      css={{ minWidth: '12rem' }}
                      color={
                        parseFloat(price) < basePrice ? 'error' : 'default'
                      }
                      label={
                        priceType === 'custom'
                          ? t('price.Custom Price')
                          : t('price.Desired Price')
                      }
                      placeholder={
                        priceType === 'custom'
                          ? t('price.Enter custom price')
                          : t('price.Enter desired price')
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key.length === 1 &&
                          !numberOrDotRegex.test(e.key)
                        ) {
                          e.preventDefault()
                        }
                      }}
                      onChange={editPrice}
                    />
                    {parseFloat(price) < basePrice && (
                      <Text color="error" size="10px">
                        {t(
                          'price.Error - Price cannot be lower than $basePrice USD',
                          {
                            basePrice: basePrice,
                          }
                        )}
                      </Text>
                    )}
                  </Grid>
                  <Grid>
                    <Input
                      bordered
                      type="text"
                      width="100%"
                      value={minPrice}
                      shadow={false}
                      rounded={true}
                      animated={false}
                      borderWeight="light"
                      clearable={true}
                      contentLeft="$"
                      contentLeftStyling={true}
                      css={{ minWidth: '12rem' }}
                      color={
                        parseFloat(minPrice) < basePrice ||
                        parseFloat(minPrice) > parseFloat(price)
                          ? 'error'
                          : 'default'
                      }
                      label={t('price.minimumPrice')}
                      placeholder={t('price.minimumPrice')}
                      onKeyDown={(e) => {
                        if (
                          e.key.length === 1 &&
                          !numberOrDotRegex.test(e.key)
                        ) {
                          e.preventDefault()
                        }
                      }}
                      onChange={editMinPrice}
                    />
                    {parseFloat(minPrice) < basePrice ? (
                      <Text color="error" size="10px">
                        {t(
                          'price.Error - Price cannot be lower than $basePrice USD',
                          {
                            basePrice: basePrice,
                          }
                        )}
                      </Text>
                    ) : (
                      parseFloat(minPrice) > parseFloat(price) && (
                        <Text color="error" size="10px">
                          {t(
                            'price.Error - Minimum price cannot be higher than $price USD',
                            {
                              price: price,
                            }
                          )}
                        </Text>
                      )
                    )}
                  </Grid>
                  <Grid>
                    <Button
                      width="100%"
                      height="2.6rem"
                      fontWeight="bold"
                      fontSize="0.9rem"
                      color={colors.uguPurple}
                      fontFamily={fontFamilies.bold}
                      style={{ alignSelf: 'flex-end' }}
                      backgroundColor={colors.uguYellow}
                      text={t('buttons.Submit', { ns: 'common' })}
                      onClick={submitPriceHandler}
                      disabled={
                        price === '' ||
                        (priceType === 'smart' && minPrice === '') ||
                        (price === parseFloat(course?.price) / 100 &&
                          minPrice === parseFloat(course?.minPrice) / 100 &&
                          priceType === course?.priceType) ||
                        parseFloat(price) < basePrice ||
                        parseFloat(minPrice) < basePrice ||
                        parseFloat(minPrice) > parseFloat(price)
                      }
                    />
                  </Grid>
                </Grid.Container>
              </Grid>
              <Grid xs={5}>
                <Grid.Container gap={2}>
                  <Grid style={{ width: '100%' }}>
                    <Collapse.Group bordered>
                      <Collapse title={t('price.What is Smart Price?')}>
                        <Text
                          style={{
                            fontSize: '0.8rem',
                          }}
                        >
                          {t(`price.Smart Price description`)}
                        </Text>
                      </Collapse>
                      <Collapse title={t('price.What is Custom Price?')}>
                        <Text
                          style={{
                            fontSize: '0.8rem',
                          }}
                        >
                          {t('price.Custom Price description')}
                        </Text>
                      </Collapse>
                      <Collapse title={t('price.What is Base Price?')}>
                        <Text
                          style={{
                            fontSize: '0.8rem',
                          }}
                        >
                          {t('price.Base Price description')}
                        </Text>
                      </Collapse>
                    </Collapse.Group>
                  </Grid>
                </Grid.Container>
              </Grid>
            </Grid.Container>
          </InputWrapper>
        </InputBlock>
        <InputBlock>
          <TextFieldWrapper>
            <CreateCourseLabel title={t('titles.advancedPricing')} />
            <Popover placement="top-left">
              <Popover.Trigger>
                <TooltipWrapper>
                  <InfoTextIcon style={{ marginLeft: '0.5rem' }} />
                </TooltipWrapper>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverContentWrapper>
                  {getFragmentedText(
                    t('tooltips.advancedPricing', { ns: 'createCourse' })
                  )}
                </PopoverContentWrapper>
              </Popover.Content>
            </Popover>
          </TextFieldWrapper>
          <Grid.Container>
            <CouponWrapper>
              <Collapse.Group bordered>
                <Collapse
                  title="Pricing Types"
                  expanded={pricingPolicy.type === ''}
                >
                  <Row style={{ paddingBottom: '10px' }}>
                    <Col>
                      {/* <Text>Pricing Type</Text> */}
                      <Select
                        value={pricingPolicy.type}
                        onChange={({
                          target,
                        }: FormDataEvent<HTMLSelectElement>) => {
                          handlePolicyInput('type', target.value)
                          if (target.value === 'override') {
                            handlePolicyInput('valueType', 'fixed')
                          }
                        }}
                      >
                        <option value="" selected={pricingPolicy.type === ''}>
                          {t('titles.selectPricingType')}
                        </option>
                        <option
                          value="override"
                          disabled={priceType === 'smart'}
                          selected={pricingPolicy.type === 'override'}
                        >
                          {t('titles.newPrice')}
                        </option>
                        <option
                          value="discount"
                          selected={pricingPolicy.type === 'discount'}
                        >
                          {t('titles.discount')}
                        </option>
                      </Select>
                    </Col>
                  </Row>
                </Collapse>
                <Collapse
                  title={
                    pricingPolicy.type
                      ? pricingPolicy.type === 'discount'
                        ? 'Discount Details'
                        : 'New Price Details'
                      : 'Pricing Details'
                  }
                  expanded={pricingPolicy.type !== ''}
                  disabled={pricingPolicy.type === ''}
                >
                  <Row
                    gap={2}
                    style={{
                      margin: '0 0 20px',
                    }}
                  >
                    <Col style={{ paddingLeft: 1 }}>
                      <Text
                        color={
                          simpleValidator.current.message(
                            'Code/Name',
                            pricingPolicy.code,
                            [
                              'required',
                              pricingPolicy.type === 'discount'
                                ? {
                                    regex:
                                      '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{6,}).*$',
                                  }
                                : '',
                            ]
                          )
                            ? 'error'
                            : pricingPolicy.type === ''
                            ? colors.uguGrey
                            : '#000'
                        }
                      >
                        {pricingPolicy.type === 'override'
                          ? t('Price Name')
                          : t('Coupon code')}
                      </Text>
                      <Input
                        bordered
                        type="text"
                        width="100%"
                        shadow={false}
                        rounded={true}
                        animated={false}
                        borderWeight="light"
                        value={pricingPolicy.code}
                        placeholder={
                          pricingPolicy.type === 'override'
                            ? t('price.newPricePlaceholder')
                            : t('Coupon code')
                        }
                        color={
                          simpleValidator.current.message(
                            'Code/Name',
                            pricingPolicy.code,
                            [
                              'required',
                              pricingPolicy.type === 'discount'
                                ? {
                                    regex:
                                      '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{6,}).*$',
                                  }
                                : '',
                            ]
                          )
                            ? 'error'
                            : 'default'
                        }
                        onChange={({ target }: any) =>
                          handlePolicyInput('code', target.value)
                        }
                        onBlur={() =>
                          simpleValidator.current.showMessageFor('Code/Name')
                        }
                      />
                      {simpleValidator.current.message(
                        'Code/Name',
                        pricingPolicy.code,
                        [
                          'required',
                          pricingPolicy.type === 'discount'
                            ? {
                                regex:
                                  '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{6,}).*$',
                              }
                            : '',
                        ]
                      ) && (
                        <Text color="error" size="10px">
                          {pricingPolicy.type === 'discount'
                            ? t(
                                '1 Upper, 1 lower, 1 number, 1 special character, min 6 characters.'
                              )
                            : t('Price Name is Required')}
                        </Text>
                      )}
                    </Col>
                    {pricingPolicy.type === 'discount' && (
                      <Col>
                        <Text
                          color={
                            pricingPolicy.type === 'override' ||
                            pricingPolicy.type === ''
                              ? colors.uguGrey
                              : '#000'
                          }
                        >
                          Select discount type
                        </Text>
                        <Select
                          onChange={({ target }: any) =>
                            handlePolicyInput('valueType', target.value)
                          }
                          disabled={
                            pricingPolicy.type === 'override' ||
                            pricingPolicy.type === ''
                          }
                        >
                          <option disabled={true}>Select Value Type</option>
                          <option
                            value="fixed"
                            selected={pricingPolicy.valueType === 'fixed'}
                          >
                            Fixed
                          </option>
                          <option
                            value="percentage"
                            selected={pricingPolicy.valueType === 'percentage'}
                          >
                            Percentage
                          </option>
                        </Select>
                      </Col>
                    )}

                    <Col
                      style={
                        pricingPolicy.type === 'override'
                          ? {}
                          : { paddingRight: 1 }
                      }
                    >
                      <Text
                        color={
                          simpleValidator.current.message(
                            'Value',
                            pricingPolicy.value,
                            [
                              'required',
                              pricingPolicy.type === 'override'
                                ? `min:${
                                    minPrice > basePrice ? minPrice : basePrice
                                  },num`
                                : pricingPolicy.type === 'discount' &&
                                  pricingPolicy.valueType === 'fixed'
                                ? `max:${price - minPrice},num`
                                : `max:${
                                    ((price - minPrice) / price) * 100
                                  },num`,
                            ]
                          )
                            ? 'error'
                            : 'default'
                        }
                      >
                        {pricingPolicy.type === 'override'
                          ? 'Price Amount'
                          : 'Discount Value'}
                      </Text>
                      <Input
                        bordered
                        type="text"
                        width="100%"
                        shadow={false}
                        rounded={true}
                        animated={false}
                        borderWeight="light"
                        value={pricingPolicy.value}
                        placeholder={
                          pricingPolicy.type === 'override'
                            ? t('Set New Price')
                            : t('Discount Value')
                        }
                        contentLeft={
                          pricingPolicy.valueType === 'fixed' ? '$' : '%'
                        }
                        contentLeftStyling={true}
                        color={
                          simpleValidator.current.message(
                            'Value',
                            pricingPolicy.value,
                            [
                              'required',
                              pricingPolicy.type === 'override'
                                ? `min:${
                                    minPrice > basePrice ? minPrice : basePrice
                                  },num`
                                : pricingPolicy.type === 'discount' &&
                                  pricingPolicy.valueType === 'fixed'
                                ? `max:${price - minPrice},num`
                                : `max:${
                                    ((price - minPrice) / price) * 100
                                  },num`,
                            ]
                          )
                            ? 'error'
                            : 'default'
                        }
                        onKeyDown={(e) => {
                          if (
                            e.key.length === 1 &&
                            !numberOrDotRegex.test(e.key)
                          ) {
                            e.preventDefault()
                          }
                        }}
                        onChange={({ target }: any) => {
                          handlePolicyInput('value', target.value)
                          simpleValidator.current.showMessageFor('Value')
                        }}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor('Value')
                        }
                      />
                      {simpleValidator.current.message(
                        'Value',
                        pricingPolicy.value,
                        [
                          'required',
                          pricingPolicy.type === 'override'
                            ? `min:${
                                minPrice > basePrice ? minPrice : basePrice
                              },num`
                            : pricingPolicy.type === 'discount' &&
                              pricingPolicy.valueType === 'fixed'
                            ? `max:${price - minPrice},num`
                            : `max:${((price - minPrice) / price) * 100},num`,
                        ]
                      ) && (
                        <Text color="error" size="10px">
                          {pricingPolicy.type === 'discount'
                            ? t(
                                'price.Error - Discount cannot be higher than $discountValue $discountType',
                                {
                                  discountValue:
                                    pricingPolicy.valueType === 'fixed'
                                      ? price - minPrice
                                      : ((price - minPrice) / price) * 100,
                                  discountType:
                                    pricingPolicy.valueType === 'fixed'
                                      ? 'USD'
                                      : '%',
                                }
                              )
                            : t(
                                'price.Error - Price cannot be lower than $basePrice USD',
                                {
                                  basePrice:
                                    minPrice > basePrice ? minPrice : basePrice,
                                }
                              )}
                        </Text>
                      )}
                    </Col>
                    {pricingPolicy.type === 'override' && (
                      <Col style={{ paddingRight: 1 }}>
                        <Text>Initial Value</Text>
                        <Input
                          bordered
                          type="number"
                          width="100%"
                          shadow={false}
                          rounded={true}
                          animated={false}
                          borderWeight="light"
                          value={pricingPolicy.initialValue}
                          placeholder={t('Initial Price')}
                          contentLeft="$"
                          contentLeftStyling={true}
                          onChange={({ target }: any) => {
                            const newValue = parseFloat(target.value)

                            // Check if the input is empty (backspace/delete key pressed)
                            if (
                              target.value === '' ||
                              (!isNaN(newValue) && newValue >= 0)
                            ) {
                              handlePolicyInput('initialValue', newValue)
                            }
                          }}
                        />
                      </Col>
                    )}
                  </Row>
                  <Row
                    gap={2}
                    style={{
                      margin: '0 0 20px',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Col style={{ paddingLeft: 1 }}>
                      <Text>Valid From</Text>
                      <Input
                        bordered
                        type="date"
                        width="100%"
                        value={dayjs(pricingPolicy.startDate).format(
                          'YYYY-MM-DD'
                        )}
                        min={dayjs().format('YYYY-MM-DD')}
                        shadow={false}
                        rounded={true}
                        animated={false}
                        borderWeight="light"
                        css={{ minWidth: '12rem' }}
                        placeholder={t('price.Valid Form')}
                        onChange={({ target }) =>
                          handlePolicyInput(
                            'startDate',
                            dayjs(target.value).format()
                          )
                        }
                      />
                    </Col>
                    <Col>
                      <Text>Expiry Date</Text>
                      <Input
                        bordered
                        type="date"
                        width="100%"
                        value={dayjs(pricingPolicy.expiryDate).format(
                          'YYYY-MM-DD'
                        )}
                        min={dayjs(pricingPolicy.startDate).format(
                          'YYYY-MM-DD'
                        )}
                        max={dayjs().add(6, 'month').format('YYYY-MM-DD')}
                        shadow={false}
                        rounded={true}
                        animated={false}
                        borderWeight="light"
                        css={{ minWidth: '12rem' }}
                        placeholder={t('price.Expiry Date')}
                        onChange={({ target }) =>
                          handlePolicyInput(
                            'expiryDate',
                            dayjs(target.value).format()
                          )
                        }
                      />
                    </Col>
                    <Col style={{ paddingRight: 1 }}>
                      <Checkbox
                        defaultSelected={pricingPolicy.isActive}
                        isSelected={pricingPolicy.isActive}
                        onChange={(e) => handlePolicyInput('isActive', e)}
                      >
                        <Text>
                          {pricingPolicy.type === 'override'
                            ? 'Enable Pricing Policy'
                            : 'Enable Discount Policy'}
                        </Text>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row
                    gap={2}
                    style={{ margin: '0 0 20px', alignItems: 'flex-end' }}
                  >
                    {pricingPolicy.type === 'discount' ? (
                      <>
                        <Col style={{ paddingLeft: 1 }}>
                          <Checkbox
                            defaultSelected={
                              pricingPolicy.allowDiscountsForGifts
                            }
                            isSelected={pricingPolicy.allowDiscountsForGifts}
                            onChange={(e) =>
                              handlePolicyInput('allowDiscountsForGifts', e)
                            }
                          >
                            <Text>Allow On Gift Purchase</Text>
                          </Checkbox>
                        </Col>
                        <Col>
                          <Checkbox
                            defaultSelected={pricingPolicy.isAutoApplicable}
                            isSelected={pricingPolicy.isAutoApplicable}
                            onChange={(e) =>
                              handlePolicyInput('isAutoApplicable', e)
                            }
                          >
                            <Text>Auto Applicable to cart</Text>
                          </Checkbox>
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col style={{ paddingLeft: 1 }}>
                          <Checkbox
                            defaultSelected={pricingPolicy.showOriginalPrice}
                            isSelected={pricingPolicy.showOriginalPrice}
                            onChange={(e) => {
                              if (
                                +pricingPolicy.value >
                                  +pricingPolicy.initialValue &&
                                e === true
                              ) {
                                handlePolicyInput('showOriginalPrice', false)
                                setBottomNotification({
                                  message: t(
                                    'Cannot show Initial Price if New price is lower than Initial Price'
                                  ),
                                  actionType: 'error',
                                })
                              } else {
                                handlePolicyInput('showOriginalPrice', e)
                              }
                            }}
                          >
                            <Text>Show Initial Price</Text>
                          </Checkbox>
                        </Col>
                        <Col>
                          <Checkbox
                            defaultSelected={pricingPolicy.allowCourseDiscounts}
                            isSelected={pricingPolicy.allowCourseDiscounts}
                            onChange={(e) =>
                              handlePolicyInput('allowCourseDiscounts', e)
                            }
                          >
                            <Text>Allow Course Discounts</Text>
                          </Checkbox>
                        </Col>
                      </>
                    )}
                    <Col style={{ paddingRight: 1 }}>
                      <Text>Max Usage</Text>
                      <Input
                        min={0}
                        bordered
                        type="number"
                        width="100%"
                        shadow={false}
                        rounded={true}
                        animated={false}
                        borderWeight="light"
                        placeholder={t('Max Usage')}
                        value={pricingPolicy.maxUsage}
                        onChange={({ target }: any) =>
                          handlePolicyInput('maxUsage', target.value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row style={{ margin: '0' }} gap={activeEditPolicyId ? 2 : 0}>
                    {activeEditPolicyId && (
                      <Col
                        style={{
                          paddingLeft: 0,
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <NextUIButton
                          auto
                          rounded
                          color="error"
                          style={{
                            width: '100%',
                          }}
                          onClick={resetPricingPolicyForEdit}
                        >
                          {t('Cancel')}
                        </NextUIButton>
                      </Col>
                    )}
                    <Col style={{ paddingRight: 0 }}>
                      <NextUIButton
                        auto
                        rounded
                        color="warning"
                        style={{
                          width: '100%',
                          color: '#000',
                        }}
                        disabled={
                          isApiLoading || !simpleValidator.current.allValid()
                        }
                        onClick={handleAddPolicy}
                      >
                        {activeEditPolicyId
                          ? t('Update Policy')
                          : t('Add Policy')}
                      </NextUIButton>
                    </Col>
                  </Row>
                </Collapse>
              </Collapse.Group>
            </CouponWrapper>
            <ThisCouponWrapper>
              {pricingPolicies?.length > 0
                ? pricingPolicies?.map((item: any, index) => (
                    <Tooltip
                      key={index}
                      content={`Type: ${
                        item.type === 'override'
                          ? 'Pricing Policy'
                          : 'Discount Policy'
                      }, ${
                        item.startDate &&
                        'Valid From: ' +
                          dayjs(item.startDate).format('DD/MM/YYYY') +
                          ', '
                      }Expiry: ${dayjs(item.expiryDate).format('DD/MM/YYYY')}`}
                    >
                      <PolicyItem>
                        <PolicyItemDetails
                          onClick={() => setPricingPolicyForEdit(item._id)}
                        >
                          <Text>{item.code}</Text>
                          <Text style={{ marginLeft: '20px' }}>
                            {item.valueType === 'fixed' && '$'}
                            {item.value}
                            {item.valueType === 'percentage' && '%'}
                          </Text>
                        </PolicyItemDetails>
                        <PolicyItemButton
                          onClick={() => handleDeletePricingPolicy(item._id)}
                        >
                          <IoCloseOutline size={14} />
                        </PolicyItemButton>
                      </PolicyItem>
                    </Tooltip>
                  ))
                : null}
            </ThisCouponWrapper>
          </Grid.Container>
        </InputBlock>
      </MainWrapper>
      <ButtonsWrapper>
        <Button
          width="15.2rem"
          height="2.9rem"
          color="#1A1E3D"
          fontSize="0.9rem"
          fontFamily={fontFamilies.bold}
          backgroundColor={colors.uguYellow}
          onClick={() => setActiveStep(5)}
          text={t('buttons.Review', { ns: 'common' })}
        />
      </ButtonsWrapper>
      {centerNotification && (
        <PopUpCenter
          showPopUp={centerNotification}
          centerNotification={centerNotification}
        />
      )}
      {bottomNotification && (
        <PopUpBottom
          setShowPopUp={setBottomNotification}
          bottomNotification={bottomNotification as BottomNotification}
        />
      )}
    </StepContainer>
  )
}

export default StepFour
