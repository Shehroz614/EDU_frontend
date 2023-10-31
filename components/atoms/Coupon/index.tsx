import React from 'react'
import styled from '@emotion/styled'
import { AiFillTag } from 'react-icons/ai'
import { IoCloseOutline } from 'react-icons/io5'
import { colors, fontFamilies } from 'configs/styles/config'
import { Tooltip } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'

type CouponProps = {
  onClick?: () => void
  coupon: string
  discount: number
  expiryDate?: string
  isValid?: boolean
  small?: boolean
  hideCloseIcon?: boolean
  hideErrorText?: boolean
  style?: React.CSSProperties
}

const CouponWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  border: 0.5px solid ${colors.uguGrey};
  border-radius: 5rem;
  padding: 0.25rem 0.5rem;
  margin-right: 5px;
  font-family: ${fontFamilies.light};
  font-size: 1rem;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 0.25rem;
`

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 0.25rem;
`

const PercentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 0.25rem 0 2rem;
`

const CloseWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  margin: 0 0.25rem;
`
const ErrorText = styled.div`
  color: #f31260;
  font-size: 0.6rem;
  position: absolute;

  top: 100%;
  left: 0.5rem;
`

const Coupon: React.FC<CouponProps> = (props) => {
  const {
    coupon,
    discount,
    expiryDate,
    isValid = true,
    small = false,
    hideCloseIcon = false,
    hideErrorText = false,
    style,
  } = props
  const { t } = useTranslation(['createCourse'])

  const notValidCouponWrapperStyle: React.CSSProperties = isValid
    ? {}
    : { borderColor: '#f31260' }

  const smallCouponWrapperStyle: React.CSSProperties = small
    ? { padding: '0.1rem', fontSize: '0.9rem' }
    : {}

  return (
    <Tooltip
      isDisabled={expiryDate === undefined}
      content={t('price.Expiry date') + expiryDate}
      placement="bottom"
    >
      <CouponWrapper
        style={{
          ...smallCouponWrapperStyle,
          ...notValidCouponWrapperStyle,
          ...style,
        }}
      >
        <IconWrapper>
          <AiFillTag color={colors.uguBlue} />
        </IconWrapper>
        <TextWrapper>{coupon}</TextWrapper>
        <PercentWrapper style={small ? { margin: '0 0.25rem 0 1rem ' } : {}}>
          {discount}%
        </PercentWrapper>
        {hideCloseIcon || (
          <CloseWrapper onClick={props.onClick}>
            <IoCloseOutline size="1.25rem" />
          </CloseWrapper>
        )}
        {!isValid && !hideErrorText && (
          <ErrorText>
            {t('price.Coupon is not satisfying Base Price conditions')}
          </ErrorText>
        )}
      </CouponWrapper>
    </Tooltip>
  )
}

export default Coupon
