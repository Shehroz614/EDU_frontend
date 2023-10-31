import React from 'react'
import WishlistIcon from '../../../public/static/icons/headerIcons/wishlist-icon'
import WishlistDropdownRow from '../../atoms/WishlistDropdownRow'
import DropdownEmptyRow from '../../atoms/DropdownEmptyRow'
import Button from '../../atoms/Button'
import DashedSeparator from 'components/atoms/DashedSeparator'
import { colors } from '@configs/styles/config'
import { useTranslation } from 'react-i18next'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import { CartDropwdownContainer, RowsWrapper } from './styled.components'
import router from 'next/router'
import { ShortCourse } from '@ugu/types'

type CartDropdown = {
  top?: string
  right?: string
}
const CartDropdown: React.FC<CartDropdown> = (props) => {
  const { top = '', right = '' } = props

  const { t } = useTranslation(['wishlistDropdown'])

  const { addToCart, wishlistItems } = useCartAndWishList()

  const handleAddToCart = (item: ShortCourse) => {
    addToCart(item)
  }

  return (
    <CartDropwdownContainer
      empty={!(wishlistItems?.length > 0)}
      top={top}
      right={right}
    >
      {!(wishlistItems?.length > 0) ? (
        <DropdownEmptyRow
          icon={<WishlistIcon height="50%" color={'#1a1e3d'} />}
          text={t('Wishlist Is Empty')}
        />
      ) : (
        <>
          <RowsWrapper>
            {wishlistItems?.map((item, index) => (
              <WishlistDropdownRow
                key={index}
                course={item}
                addToCart={handleAddToCart}
              />
            ))}
          </RowsWrapper>
          <DashedSeparator marginBottom="1rem" />
          <Button
            backgroundColor={colors.uguBlue}
            width="100%"
            height="2.25rem"
            text={t('Go To Wishlist')}
            fontFamily="RobotoBold"
            fontSize="0.7rem"
            onClick={() => router.push('/wishlist')}
          />
        </>
      )}
    </CartDropwdownContainer>
  )
}

export default CartDropdown
