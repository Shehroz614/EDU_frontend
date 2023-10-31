import styled from '@emotion/styled'
import CartDropdownRow from 'components/atoms/CartDropdownRow'
import Button from 'components/atoms/Button'
import { colors } from '@configs/styles/config'
import { ShortCourse } from '@type/course'

type Props = {
  course: ShortCourse
  marginBottom?: string
  addToCart: (course: ShortCourse) => void
}

const WishlistDropdownRowWrapper = styled.div<{
  marginBottom: string
}>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.75rem 0rem;
`

const CategoriesDropdownRow: React.FunctionComponent<Props> = ({
  course,
  marginBottom = '',
  addToCart,
}) => {
  return (
    <WishlistDropdownRowWrapper marginBottom={marginBottom}>
      <CartDropdownRow course={course} />
      <ButtonWrapper>
        <Button
          text={'Add to Cart'}
          backgroundColor={colors.uguYellow}
          width="8rem"
          height="2.25rem"
          fontFamily="RobotoBold"
          fontSize="0.7rem"
          onClick={() => addToCart(course)}
        />
      </ButtonWrapper>
    </WishlistDropdownRowWrapper>
  )
}

export default CategoriesDropdownRow
