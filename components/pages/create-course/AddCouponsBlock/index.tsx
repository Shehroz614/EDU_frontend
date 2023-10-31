import React, { useState } from 'react'
import styled from '@emotion/styled'
import Button from 'components/atoms/Button'
import { colors, fontFamilies } from 'configs/styles/config'
import PopUpCenter from 'components/organisms/PopUpCenter'
import PopUpBottom from 'components/organisms/PopUpBottom'
import TextInput from 'components/atoms/TextInput'
import XIcon from 'public/static/icons/x-icon'
import { BottomNotification, CenterNotification } from 'types/main'
import { confirmDiscountDeletion } from 'configs/constants/labels/modal-labels'
import { AiOutlinePercentage } from 'react-icons/ai'
import { CouponType } from 'types/course'
import { useTranslation } from 'react-i18next'

type AddCouponBlockProps = {
  items: CouponType[]
  addItemHandler: (newCoupon: CouponType) => Promise<boolean>
  deleteItemHandler: (_id: string) => Promise<boolean>
  disabled?: boolean
}

type CouponProps = {
  coupon: CouponType
  deleteItemHandler: (_id: string) => void
}

const AddDiscountBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e4e4e4;
  border-radius: 15px;
  padding: 2rem;
`

const AddDiscountWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ExistingDiscountsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  width: 100%;
`

const DiscountWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #efefef;
  height: 3rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  border-radius: 28px;
  padding: 0.5rem 1.5rem;
`
const DiscountText = styled.text`
  display: flex;
  color: ${colors.uguPurple};
  opacity: 0.5;
  align-items: center;
  margin-right: 1rem;
`

const SideButton = styled.div`
  display: flex;
  width: 0.75rem;
  height: 0.75rem;
  /* margin-left: 1rem; */
  cursor: pointer;
`

const Coupon: React.FC<CouponProps> = (props) => {
  const { coupon, deleteItemHandler } = props
  return (
    <DiscountWrapper>
      <DiscountText>{coupon.code}</DiscountText>
      <DiscountText>{'-' + coupon.discount + '%'}</DiscountText>
      <SideButton
        onClick={() => {
          deleteItemHandler(coupon._id!)
        }}
      >
        <XIcon />
      </SideButton>
    </DiscountWrapper>
  )
}

const AddCouponBlock: React.FC<AddCouponBlockProps> = (props) => {
  const { items, addItemHandler, deleteItemHandler, disabled = false } = props
  const [couponCode, setCouponCode] = useState<string>('')
  const [couponDiscount, setCouponDiscount] = useState<number>(0)
  const [centerNotification, setCenterNotification] =
    useState<CenterNotification>()
  const [bottomNotification, setBottomNotification] =
    useState<BottomNotification>()
  //show PopUpCenter
  const [showPopUp, setShowPopUp] = useState(true)
  //show PopUpBottom
  const [showBottomPopUp, setShowBottomPopUp] = useState(false)

  const handleCouponNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newDiscountCode = e.currentTarget.value
    if (newDiscountCode !== '' || newDiscountCode !== undefined) {
      setCouponCode(newDiscountCode)
    }
  }

  const isValidDiscount = (number: number) => {
    //check if number
    return !isNaN(number) && number < 100
  }

  const handleCouponDiscountChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newDiscountValue = Number(e.currentTarget.value)
    if (isValidDiscount(newDiscountValue)) {
      setCouponDiscount(newDiscountValue)
    }
  }

  const checkIfReadyForCreation = () => {
    if (!couponCode || couponCode === '' || couponCode === undefined) {
      setBottomNotification({
        message: 'Coupon cannot be empty!',
        actionType: 'notification',
        duration: 7,
      })
      setShowBottomPopUp(true)
      return false
    } else {
      if (!isValidDiscount(couponDiscount)) {
        setBottomNotification({
          message: 'Coupon cannot be empty!',
          actionType: 'notification',
          duration: 7,
        })
        setShowBottomPopUp(true)
        return false
      } else {
        return true
      }
    }
  }

  //Add new keyword(will call to server)
  const submitBtnPressed = () => {
    if (checkIfReadyForCreation()) {
      //also check if already exists
      const newDiscount: CouponType = {
        code: couponCode,
        type: 'fixed',
        discount: couponDiscount,
      }
      addItemHandler(newDiscount)
        .then((success) => {
          if (success) {
            setCouponCode('')
            setCouponDiscount(0)
            setBottomNotification({
              message: 'Coupon has been added',
              actionType: 'success',
              duration: 7,
            })
            setShowBottomPopUp(true)
          }
        })
        .catch((err) => {
          setBottomNotification({
            message: err.message,
            actionType: 'error',
            duration: 7,
          })
          setShowBottomPopUp(true)
        })
    }
  }

  const deleteItemPressed = (_id: string) => {
    //show pop-up to confirm deletion
    setShowPopUp(true)
    setCenterNotification({
      title: confirmDiscountDeletion.title,
      message: confirmDiscountDeletion.message,
      firstBtn: {
        title: confirmDiscountDeletion.firstBtn.title,
        actionType: confirmDiscountDeletion.firstBtn.actionType,
        action: () => {
          deleteItemHandler(_id)
            .then((success) => {
              if (success) {
                setBottomNotification({
                  message: 'Coupon has been deleted',
                  actionType: 'success',
                  duration: 7,
                })
                setShowBottomPopUp(true)
              }
            })
            .catch((err) => {
              setBottomNotification({
                message: err.message || err,
                actionType: 'error',
                duration: 7,
              })
              setShowBottomPopUp(true)
            })
          setShowPopUp(false)
        },
      },
      secondBtn: {
        title: confirmDiscountDeletion.secondBtn.title,
        actionType: confirmDiscountDeletion.secondBtn.actionType,
        action: () => {
          setShowPopUp(false)
        },
      },
    })
  }

  const getKeywords = () => {
    const existingKeywords = items.map((item, index) => {
      return (
        <Coupon
          coupon={item}
          key={index}
          deleteItemHandler={deleteItemPressed}
        />
      )
    })

    return existingKeywords
  }

  const { t } = useTranslation(['common', 'createCourse'])

  return (
    <AddDiscountBlockWrapper>
      <AddDiscountWrapper>
        <TextInput
          placeholder={t('placeholders.Type a Coupon code', {
            ns: 'createCourse',
          })}
          width="100%"
          height="2.8rem"
          backgroundColor="#ffffff"
          padding="1rem 2rem"
          value={couponCode || ''}
          onChange={handleCouponNameChange}
          maxLength={30}
          marginRight="1rem"
          disabled={disabled}
        />
        <TextInput
          placeholder={t('placeholders.Discount', { ns: 'createCourse' })}
          width="10rem"
          inputWidth="7rem"
          textAlign="center"
          height="2.8rem"
          backgroundColor="#ffffff"
          padding="1rem 2rem 1rem 0.5rem"
          value={couponDiscount === 0 ? '' : String(couponDiscount)}
          onChange={handleCouponDiscountChange}
          inputMode="numeric"
          icon={<AiOutlinePercentage />}
          disabled={disabled}
        />
        <Button
          width="13rem"
          height="3rem"
          text={'Add'}
          fontFamily={fontFamilies.bold}
          backgroundColor={colors.uguYellow}
          color={colors.uguPurple}
          fontSize="0.9rem"
          fontWeight="bold"
          marginLeft="2rem"
          onClick={submitBtnPressed}
          disabled={disabled}
        />
      </AddDiscountWrapper>
      <ExistingDiscountsWrapper>{getKeywords()}</ExistingDiscountsWrapper>
      {centerNotification && (
        <PopUpCenter
          centerNotification={centerNotification}
          showPopUp={showPopUp}
        />
      )}
      {showBottomPopUp && bottomNotification && (
        <PopUpBottom
          bottomNotification={bottomNotification}
          showPopUp={showBottomPopUp}
          setShowPopUp={setShowBottomPopUp}
        />
      )}
    </AddDiscountBlockWrapper>
  )
}

export default AddCouponBlock
