import React from 'react'
import styled from '@emotion/styled'
import ChevronIcon from '@public/static/icons/chevronIcon'
import Link from 'next/link'
import UserAvatar from '@components/atoms/UserAvatar/UserAvatar'
import { useTranslation } from 'next-i18next'
import { fontFamilies } from '@configs/styles/config'

type AdaptiveSettingsMenuItemPropsType = {
  title: string
  description?: string
  icon?: React.ReactElement
  displayMode: 'mobile' | 'desktop'
  actionMode?: 'link' | 'edit' | 'dropDown'
  avatarEditMode?: boolean
  href?: string
  onClick?: () => void
  onEditButtonClick?: () => void
  hideDescription?: boolean
  dropDownAnimationSpeed?: string // can be used only if actionMode = "dropDown"
  isDropDownOpen?: boolean // can be used only if actionMode = "dropDown"
  WrapperStyle?: React.CSSProperties
  editButtonText?: string
  disabled?: boolean
}

const Title = styled.p`
  font-size: 1.125rem;
  font-family: ${fontFamilies.medium};

  line-height: normal;
`

const Description = styled.p`
  &[data-display-mode='desktop'] {
  }

  font-size: 0.8rem;
  font-family: ${fontFamilies.light};

  line-height: normal;
  padding-right: 25%;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`

type ItemWrapperProps = {
  dropDownToggle?: boolean
  dropDownAnimationSpeed?: string
}
const ItemWrapper = styled.div<ItemWrapperProps>`
  --padding: 0 1rem;
  --height: 3.1875rem;
  --flex-direction: row;

  --border-radius: 1rem;
  --align-items: center;
  --justify-content: space-between;
  --width: 100%;
  --background: ${(props) => (props.dropDownToggle ? '#F0f0f0' : '#ffffff')};

  &[data-display-mode='desktop'] {
    --padding: 1rem;
    --height: 9.75rem;
    --flex-direction: column;
    --box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.25);
    --border-radius: 0.75rem;
    --align-items: flex-start;
    --justify-content: space-between;
    --width: 20rem;
  }

  display: flex;
  width: var(--width);
  justify-content: var(--justify-content);
  align-items: var(--align-items);
  background: var(--background);

  padding: var(--padding);
  height: var(--height);
  flex-direction: var(--flex-direction);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  transition: background-color ${(props) => props.dropDownAnimationSpeed}
    ease-in-out;
`
const IconWrapper = styled.div`
  --size: 1.4rem;
  &[data-display-mode='desktop'] {
    --size: 2rem;
  }
  width: var(--size);
  height: var(--size);
  margin-right: 1rem;
  flex-shrink: 0;
`
const InfoWrapper = styled.div`
  --gap: 0;
  &[data-display-mode='desktop'] {
    --gap: 0.5rem;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--gap);
  width: 100%;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`
const EditButton = styled.div`
  font-size: 0.875rem;
  font-family: ${fontFamilies.bold};

  line-height: normal;
  text-decoration-line: underline;
  &:hover {
    cursor: pointer;
  }
`

const AdaptiveSettingsMenuItem: React.FC<AdaptiveSettingsMenuItemPropsType> = ({
  title,
  description = '',
  icon,
  displayMode,
  actionMode = 'link',
  avatarEditMode = false,
  href = '',
  onClick,
  onEditButtonClick,
  dropDownAnimationSpeed = '0.3s',
  isDropDownOpen = false,
  WrapperStyle = {},
  hideDescription = false,
  editButtonText = 'Edit',
  disabled = false,
}) => {
  const { t } = useTranslation(['common'])
  if (editButtonText === 'Edit') editButtonText = t('buttons.Edit')

  // cursor style is set to 'pointer' if a click handler is provided
  const cursorPointerStyle: React.CSSProperties = onClick
    ? { cursor: 'pointer' }
    : {}

  const disabledStyle: React.CSSProperties = disabled ? { opacity: '0.5' } : {}

  const onClickHandler = disabled ? undefined : onClick

  const editButtonClickHandler = disabled ? undefined : onEditButtonClick

  const content = (
    <ItemWrapper
      data-display-mode={displayMode}
      dropDownToggle={isDropDownOpen}
      dropDownAnimationSpeed={dropDownAnimationSpeed}
      style={{
        ...WrapperStyle,
        ...cursorPointerStyle,
        ...disabledStyle,
      }}
      onClick={onClickHandler}
    >
      {icon && (
        <IconWrapper data-display-mode={displayMode}> {icon}</IconWrapper>
      )}
      {avatarEditMode && <UserAvatar style={{ marginRight: '1rem' }} />}
      <InfoWrapper data-display-mode={displayMode}>
        <TitleWrapper>
          <Title>{title}</Title>
          {actionMode === 'edit' && (
            <EditButton
              onClick={editButtonClickHandler}
              style={disabled ? { cursor: 'not-allowed' } : {}}
            >
              {isDropDownOpen ? t('buttons.Cancel') : editButtonText}
            </EditButton>
          )}
        </TitleWrapper>

        {!hideDescription && description && (
          <Description>{description}</Description>
        )}
      </InfoWrapper>
      {displayMode === 'mobile' &&
        actionMode !== 'edit' &&
        (actionMode === 'dropDown' ? (
          <ChevronIcon
            height="1rem"
            width="1rem"
            style={{
              marginLeft: 'auto',
              transition: `transform ${dropDownAnimationSpeed}`,
            }}
            rotate={isDropDownOpen ? '270deg' : '90deg'}
          />
        ) : (
          <ChevronIcon
            height="1rem"
            width="1rem"
            style={{ marginLeft: 'auto' }}
          />
        ))}
    </ItemWrapper>
  )

  return href && !disabled ? (
    <Link style={{ width: '100%' }} href={href}>
      {content}
    </Link>
  ) : (
    content
  )
}
export default AdaptiveSettingsMenuItem
