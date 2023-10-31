// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useCreateCourse } from '@contexts/CreateCourse'
import {
  confirmMinPriceChangeForLiveCourse,
  confirmPolicyChangeForCourse,
  confirmPolicyChangeForLiveCourse,
  confirmPolicyDeleteForCourse,
  confirmPriceChangeForLiveCourse,
  overwritePricingPolicy,
} from '@configs/constants/labels/modal-labels'
import { useTranslation } from 'next-i18next'
import dayjs from 'dayjs'
import {
  getCoursePricingPolicies,
  createCoursePricingPolicy,
  updateCoursePricingPolicy,
  deleteCoursePricingPolicy,
} from '@services/api/course'
import getSetting from '@services/api/setting/getSetting'
import hasValueOtherThan from '@helpers/hasValueOtherThan'

type TUseStepFour = {}
const useStepFour = (): TUseStepFour => {
  const { t } = useTranslation(['createCourse', 'common'])
  const {
    course_id,
    course,
    saveChanges,
    updateChanges,
    setCenterNotification,
    setBottomNotification,
  } = useCreateCourse()

  const [isApiLoading, setIsApiLoading] = useState<boolean>(false)
  const [priceType, setPriceType] = useState(course.priceType || 'custom')
  const [basePrice, setBasePrice] = useState<number | string>(0)
  const [price, setPrice] = useState<number | string>(
    parseFloat(course?.price?.toString() || '') / 100 || null
  )
  const [minPrice, setMinPrice] = useState<number | string>(
    parseFloat(course?.minPrice?.toString() || '') / 100 || null
  )
  const [pricingPolicies, setPricingPolicies] = useState<any>([])
  const [activeEditPolicyId, setActiveEditPolicyId] = useState<string | null>()
  const [pricingPolicy, setPricingPolicy] = useState<{
    type: 'smartPrice' | 'discount' | 'override'
    code: string
    valueType: 'fixed' | 'percentage'
    value: string
    initialValue: string
    isAutoApplicable: boolean
    isActive: boolean
    allowCourseDiscounts: boolean
    allowDiscountsForGifts: boolean
    showOriginalPrice: boolean
    maxUsage: string
    startDate: Date | null
    expiryDate: Date | null
  }>({
    type: '',
    code: '',
    valueType: 'fixed',
    value: '',
    initialValue: (course?.price / 100) | '',
    isAutoApplicable: false,
    isActive: true,
    allowCourseDiscounts: false,
    allowDiscountsForGifts: false,
    showOriginalPrice: true,
    maxUsage: '',
    startDate: dayjs().format(),
    expiryDate: dayjs().add(1, 'months').format(),
  })

  useEffect(() => {
    getSetting('courseBasePrice').then((res) => {
      setBasePrice(parseFloat(res.value) / 100)
    })
    getCoursePricingPolicies(course_id, course?.version).then((res) => {
      setPricingPolicies(res)
    })
  }, [])

  useEffect(() => {
    if (priceType === 'smart') {
      handlePolicyInput('type', '')
    }
  }, [priceType])
  useEffect(() => {
    if (pricingPolicy.initialValue <= pricingPolicy.value) {
      handlePolicyInput('showOriginalPrice', false)
    }
  }, [pricingPolicy])

  const editPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^\d*\.?\d{0,2}$/
    const inputValue = e.target.value

    if (
      (regex.test(inputValue) && parseFloat(inputValue) < 1000000) ||
      inputValue === ''
    ) {
      setPrice(inputValue)
    }
  }
  const editMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^\d*\.?\d{0,2}$/
    const inputValue = e.target.value

    if (
      (regex.test(inputValue) && parseFloat(inputValue) < 1000000) ||
      inputValue === ''
    ) {
      setMinPrice(inputValue)
    }
  }
  const submitPriceHandler = () => {
    if (parseFloat(price) < basePrice || parseFloat(minPrice) < basePrice) {
      return
    }
    proceedWithPriceUpdate()
  }

  const updatePrice = async () => {
    try {
      const updateData = {
        priceType,
        price: parseFloat(price) * 100,
        minPrice: parseFloat(minPrice) * 100,
      }
      const response = await updateChanges(updateData)
      setPrice(parseFloat(response.price) / 100 || null)
      setMinPrice(parseFloat(response.minPrice || '') / 100 || null)
      saveChanges({
        ...course,
        ...updateData,
      })
      setBottomNotification({
        message: t('Price has been updated'),
        actionType: 'success',
        duration: 7,
      })
    } catch (err) {
      console.log(err)
      setBottomNotification({
        message: err.message || err,
        actionType: 'error',
        duration: 7,
      })
    }
  }
  const proceedWithPriceUpdate = () => {
    if (course?.status === 'online') {
      setCenterNotification({
        title: confirmPriceChangeForLiveCourse.title,
        message: confirmPriceChangeForLiveCourse.message,
        firstBtn: {
          title: confirmPriceChangeForLiveCourse.firstBtn.title,
          actionType: confirmPriceChangeForLiveCourse.firstBtn.actionType,
          action: () => {
            updatePrice()
            setCenterNotification(false)
          },
        },
        secondBtn: {
          title: confirmPriceChangeForLiveCourse.secondBtn.title,
          actionType: confirmPriceChangeForLiveCourse.secondBtn.actionType,
          action: () => {
            setCenterNotification(false)
          },
        },
      })
    } else updatePrice()
  }
  const handlePolicyInput = (key: string, value: string | number) => {
    setPricingPolicy((state) => ({
      ...state,
      [key]: value,
    }))
  }
  const addPricingPolicy = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const existingPolicy = pricingPolicies.find(
          (p) => p.code === pricingPolicy.code
        )
        if (existingPolicy) {
          setCenterNotification({
            title: overwritePricingPolicy.title,
            message: overwritePricingPolicy.message,
            firstBtn: {
              title: overwritePricingPolicy.firstBtn.title,
              actionType: overwritePricingPolicy.firstBtn.actionType,
              action: () => {
                updatePricingPolicy(existingPolicy._id)
                setCenterNotification(false)
              },
            },
            secondBtn: {
              title: overwritePricingPolicy.secondBtn.title,
              actionType: overwritePricingPolicy.secondBtn.actionType,
              action: () => {
                setCenterNotification(false)
              },
            },
          })
          return
        }
        setIsApiLoading(true)
        const response = await createCoursePricingPolicy(
          course_id,
          course?.version,
          pricingPolicy
        )
        if (response) {
          setPricingPolicies(response)
          setBottomNotification({
            message: t('Pricing Policy added'),
            actionType: 'success',
            duration: 7,
          })

          resetPricingPolicyForEdit()
          resolve()
        }
        setIsApiLoading(false)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }
  const setPricingPolicyForEdit = (policyId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        setActiveEditPolicyId(policyId)
        const activePolicy = pricingPolicies.find((p) => p._id === policyId)
        setPricingPolicy({
          type: activePolicy.type,
          code: activePolicy.code,
          valueType: activePolicy.valueType,
          value: activePolicy.value,
          initialValue: activePolicy.initialValue,
          isAutoApplicable: activePolicy.isAutoApplicable,
          isActive: activePolicy.isActive,
          allowCourseDiscounts: activePolicy.allowCourseDiscounts,
          allowDiscountsForGifts: activePolicy.allowDiscountsForGifts,
          showOriginalPrice: activePolicy.showOriginalPrice,
          maxUsage: activePolicy.maxUsage,
          startDate: activePolicy.startDate,
          expiryDate: activePolicy.expiryDate,
        })
        resolve()
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }
  const resetPricingPolicyForEdit = () => {
    setActiveEditPolicyId(null)
    setPricingPolicy({
      type: '',
      code: '',
      valueType: 'fixed',
      value: '',
      initialValue: (course?.price / 100) | '',
      isAutoApplicable: false,
      isActive: true,
      allowCourseDiscounts: false,
      allowDiscountsForGifts: false,
      showOriginalPrice: true,
      maxUsage: '',
      startDate: dayjs().format(),
      expiryDate: dayjs().add(1, 'months').format(),
    })
  }
  const handleUpdatePricingPolicy = (policyId: string) => {
    const policy = pricingPolicies.find((p) => p._id === policyId)
    if (
      course?.status === 'online' ||
      (policy.targetCourseVersion.length > 0 &&
        hasValueOtherThan(policy.targetCourseVersion, course.version))
    ) {
      setCenterNotification({
        title: confirmPolicyChangeForCourse.title,
        message: confirmPolicyChangeForCourse.message,
        firstBtn: {
          title: confirmPolicyChangeForCourse.firstBtn.title,
          actionType: confirmPolicyChangeForCourse.firstBtn.actionType,
          action: () => {
            updatePricingPolicy(policyId)
            setCenterNotification(false)
          },
        },
        secondBtn: {
          title: confirmPolicyChangeForCourse.secondBtn.title,
          actionType: confirmPolicyChangeForCourse.secondBtn.actionType,
          action: () => {
            setCenterNotification(false)
          },
        },
      })
      return
    }
    updatePricingPolicy(policyId)
  }
  const updatePricingPolicy = (policyId: string) => {
    return new Promise(async (resolve, reject) => {
      setIsApiLoading(true)
      try {
        const response = await updateCoursePricingPolicy(
          course_id,
          course?.version,
          policyId,
          pricingPolicy
        )
        if (response) {
          setPricingPolicies(response)
          setBottomNotification({
            message: t('Pricing Policy updated'),
            actionType: 'success',
            duration: 7,
          })
          resetPricingPolicyForEdit()
          resolve()
        }
      } catch (err) {
        reject(err)
      }
      setIsApiLoading(false)
    })
  }
  const handleDeletePricingPolicy = (policyId: string) => {
    const policy = pricingPolicies.find((p) => p._id === policyId)
    console.log(policy)
    if (
      course?.status === 'online' ||
      (policy.targetCourseVersion.length > 0 &&
        hasValueOtherThan(policy.targetCourseVersion, course.version))
    ) {
      setCenterNotification({
        title: confirmPolicyDeleteForCourse.title,
        message: confirmPolicyDeleteForCourse.message,
        firstBtn: {
          title: confirmPolicyDeleteForCourse.firstBtn.title,
          actionType: confirmPolicyDeleteForCourse.firstBtn.actionType,
          action: () => {
            deletePricingPolicy(policyId)
            setCenterNotification(false)
          },
        },
        secondBtn: {
          title: confirmPolicyDeleteForCourse.secondBtn.title,
          actionType: confirmPolicyDeleteForCourse.secondBtn.actionType,
          action: () => {
            setCenterNotification(false)
          },
        },
      })
      return
    }
    deletePricingPolicy(policyId)
  }
  const deletePricingPolicy = (policyId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await deleteCoursePricingPolicy(
          course_id,
          course?.version,
          policyId
        )
        if (response) {
          setPricingPolicies(response)
          setBottomNotification({
            message: t('Pricing Policy deleted'),
            actionType: 'success',
            duration: 7,
          })
          resolve()
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  return {
    isApiLoading,
    basePrice,
    priceType,
    setPriceType,
    price,
    minPrice,
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
  }
}

export default useStepFour
