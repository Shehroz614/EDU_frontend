import React, { useState } from 'react'
import styled from '@emotion/styled'
import NotificationIcon from '../../../public/static/icons/headerIcons/notification-icon'
import MyCoursesIcon from '../../../public/static/icons/headerIcons/my-courses-icon'
import NotificationDropdownRow from '../../atoms/NotificationDropdownRow'
import DropdownEmptyRow from '../../atoms/DropdownEmptyRow'
import Button from '../../atoms/Button'
import DashedSeparator from 'components/atoms/DashedSeparator'
import { colors } from '@configs/styles/config'

type Props = {
  top?: string
  right?: string
}

const СartDropdownContainer = styled.div<{
  empty: boolean
  top: string
  right: string
}>`
  width: 19rem;
  display: flex;
  flex-direction: ${(props) => (props.empty ? 'row' : 'column')};
  top: 4.5rem;
  transform: translateX(-45%);
  position: absolute;
  background-color: #ffffff;
  border-radius: 18px 0px 18px 18px;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.08);
  padding: 1rem 1rem;
  z-index: 10;
`

const RowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 12rem;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`

const NotificationsDropdown: React.FC<Props> = (props) => {
  const { top = '', right = '' } = props
  const [isEmpty] = useState(false)

  return (
    <СartDropdownContainer empty={isEmpty} top={top} right={right}>
      {isEmpty ? (
        <DropdownEmptyRow
          icon={<NotificationIcon height="70%" color={'#1a1e3d'} />}
          text={'Список уведомлений пуст'}
        />
      ) : (
        <>
          <RowsWrapper>
            <NotificationDropdownRow
              text={
                "Добро пожаловать на УГУ. Мы дарим Вам -50% на первую покупку и желаем приятных покупок! Ваш промокод: 'BetterVersionOfMe2020'"
              }
            />
            <NotificationDropdownRow
              text={'Поздровляем с первой покупкой! Вы на правильном пути!'}
            />
            <NotificationDropdownRow
              text={
                "Вы изучили 10% курса 'Web Design for beginners'! Продолжайте в том же духе, но не забывайте делать короткие паузы для отдыха:)"
              }
              icon={<MyCoursesIcon height="50%" />}
            />
          </RowsWrapper>
          <DashedSeparator marginBottom="1rem" />
          <Button
            backgroundColor={colors.uguBlue}
            width="100%"
            height="2.25rem"
            text="Show All"
            fontFamily="RobotoBold"
            fontSize="0.7rem"
          />
        </>
      )}
    </СartDropdownContainer>
  )
}

export default NotificationsDropdown
