import React from 'react'
import { useRouter } from 'next/router'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import { colors } from '@configs/styles/config'
import CartIcon from '@public/static/icons/headerIcons/cart-icon'
import CartDropdownRow from '@components/atoms/CartDropdownRow'
import { Price } from '@components/atoms/CartDropdownRow/styled.components'
import DropdownEmptyRow from '@components/atoms/DropdownEmptyRow'
import Button from '@components/atoms/Button'
import DashedSeparator from 'components/atoms/DashedSeparator'
import {
  CartDropdownContainer,
  CoursesWrapper,
  TotalWrapper,
  TotalText,
} from './styled.components'

type Props = {
  top?: string
  right?: string
}

const CartDropdown: React.FC<Props> = (props) => {
  const { top = '', right = '' } = props
  const router = useRouter()
  const { cartItems, getCartTotal } = useCartAndWishList()

  return (
    <CartDropdownContainer
      empty={!(cartItems?.length > 0)}
      top={top}
      right={right}
    >
      {!(cartItems?.length > 0) ? (
        <DropdownEmptyRow
          icon={<CartIcon height="50%" />}
          text="There is no item in your cart"
        />
      ) : (
        <>
          <CoursesWrapper>
            {cartItems?.length > 0
              ? cartItems?.map((item, index) => (
                  <CartDropdownRow
                    key={index}
                    course={item}
                    marginBottom="1rem"
                  />
                ))
              : null}
          </CoursesWrapper>
          <DashedSeparator marginBottom="1rem" />
          <TotalWrapper>
            <TotalText>Total: </TotalText>
            <Price>{getCartTotal() / 100} USD</Price>
          </TotalWrapper>
          <Button
            backgroundColor={colors.uguYellow}
            width="100%"
            height="2.25rem"
            text="Go to Cart"
            fontFamily="RobotoBold"
            fontSize="0.7rem"
            onClick={() => router.push('/cart')}
          />
        </>
      )}
    </CartDropdownContainer>
  )
}

export default CartDropdown
