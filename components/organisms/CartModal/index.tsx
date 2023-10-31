import React from 'react'
import Button from '@components/atoms/Button'
import Modal from '@components/molecules/Modal'
import CartDropdownRow from '@components/atoms/CartDropdownRow'
import { Price } from '@components/atoms/CartDropdownRow/styled.components'
import {
  TotalWrapper,
  TotalText,
} from '@components/molecules/CartDropdown/styled.components'
import DashedSeparator from 'components/atoms/DashedSeparator'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import { colors } from '@configs/styles/config'
import { useTranslation } from 'react-i18next'
import CloseIcon from '@public/static/icons/close-icon'
import { useRouter } from 'next/router'
import {
  ContentContainer,
  CartInfoWrapper,
  ButtonWrapper,
  PriceWrapper,
  CartContainer,
  RemoveButton,
} from './styled.components'

type CartModalProps = {
  onClose?: () => void
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const router = useRouter()
  const { cartItems, removeFromCart, getCartTotal } = useCartAndWishList()

  const { t } = useTranslation(['common', 'cartModal'])

  let orignialCartSum = 0

  cartItems.forEach((item) => {
    if (item?.price > (item?.salePrice || 0)) orignialCartSum += item?.price
    else orignialCartSum += item?.salePrice || 0
  })

  return (
    <Modal
      onClose={onClose || (() => {})}
      blurredBackground
      headerText="Course has been added to the Cart"
    >
      <ContentContainer>
        <CartInfoWrapper>
          {cartItems?.length > 0
            ? cartItems?.map((cartItem) => (
                <>
                  <CartContainer>
                    <CartDropdownRow course={cartItem} />
                    <RemoveButton onClick={() => removeFromCart(cartItem?._id)}>
                      <CloseIcon
                        color="#000000"
                        backgroundColor={colors.uguLightLightGrey}
                      />
                    </RemoveButton>
                  </CartContainer>
                  <DashedSeparator marginTop="1rem" marginBottom="1rem" />
                </>
              ))
            : null}
          <TotalWrapper>
            <TotalText>{t('Total', { ns: 'cartModal' })}</TotalText>
            <PriceWrapper>
              <Price>
                {(getCartTotal() / 100).toFixed(2).replace(/\.00$/, '')} USD
              </Price>
              {orignialCartSum > getCartTotal() && (
                <Price>
                  <s style={{ color: '#888' }}>
                    {(orignialCartSum / 100).toFixed(2).replace(/\.00$/, '')}{' '}
                    USD
                  </s>
                </Price>
              )}
            </PriceWrapper>
          </TotalWrapper>
          {/* <AdditionalText>{t('Frequently bought together:',{ns: 'cartModal'})}</AdditionalText>
          <VerticalTotalCoursesWrapper>
            <VerticalCoursesWrapper>
              <VerticalCourse />
            </VerticalCoursesWrapper>
            <VerticalCoursesWrapper>
              <VerticalCourse />
            </VerticalCoursesWrapper>
          </VerticalTotalCoursesWrapper> */}
        </CartInfoWrapper>
        <ButtonWrapper>
          <Button
            backgroundColor={colors.uguYellow}
            height="2.5rem"
            width="11rem"
            fontSize="0.75rem"
            fontFamily="RobotoBold"
            text={t('buttons.Go To Cart')}
            onClick={() => router.push('/cart')}
          />
        </ButtonWrapper>
      </ContentContainer>
    </Modal>
  )
}

export default CartModal
