import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import DropdownEmptyRow from 'components/atoms/DropdownEmptyRow'
import NotificationIcon from '../../../public/static/icons/headerIcons/notification-icon'

type Props = {
  icon?: ReactNode
  text?: string
  dateCreated?: string
  marginBottom?: string
  onClick?: () => {}
}

const WishlistDropdownRowWrapper = styled.div<{
  marginBottom: string
}>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '0.5rem'};
`
const DateCreated = styled.div`
  font-size: 0.75rem;
  margin-top: 0rem;
  margin-left: auto;
`

const CategoriesDropdownRow: React.FunctionComponent<Props> = (props) => {
  const { icon, text, dateCreated, marginBottom = '', onClick } = props
  return (
    <WishlistDropdownRowWrapper marginBottom={marginBottom} onClick={onClick}>
      <DropdownEmptyRow
        icon={icon ? icon : <NotificationIcon height="50%" />}
        text={
          text
            ? text
            : 'По своей сути рыбатекст является альтернативой традиционному lorem ipsum'
        }
      />
      <DateCreated>
        {dateCreated ? dateCreated : new Date().toISOString().slice(0, 10)}
      </DateCreated>
    </WishlistDropdownRowWrapper>
  )
}

export default CategoriesDropdownRow
