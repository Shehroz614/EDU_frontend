import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'
import Button from 'components/atoms/Button'
import { colors, fontFamilies } from 'configs/styles/config'
import TextArea from 'components/atoms/TextArea'
import CheckMarkIcon from 'public/static/icons/checkmark-icon'
import XIcon from 'public/static/icons/x-icon'
import EditIcon from 'public/static/icons/createCourseIcons/edit-icon'
import { BottomNotification, CenterNotification } from 'types/main'
import { confirmRequirementDeletion } from 'configs/constants/labels/modal-labels'
import PopUpCenter from 'components/organisms/PopUpCenter'
import PopUpBottom from 'components/organisms/PopUpBottom'
import { useTranslation } from 'react-i18next'

type AddRequirementsBlockProps = {
  items: string[]
  addItemPlaceholder: string
  addItemTitle: string
  editItemTitle: string
  existingItemsTitle: string
  emptyItemsTitle: string
  itemAddedMessage: string
  itemDeletedMessage: string
  itemEditedMessage: string
  itemEmptyMessage: string
  maxLength: number //amount of characters allowed to be entered
  addItemHandler: (newItem: string) => Promise<boolean>
  editItemHandler: (newItem: string, atIndex: number) => Promise<boolean>
  deleteItemHandler: (atIndex: number) => Promise<boolean>
  disabled?: boolean
  courseRequirementsMaxAmount: number
}

type ExistingItemProps = {
  item: string
  index: number
  editItemPressed: (index: number) => void
  deleteItemPressed: (index: number) => void
  disabled?: boolean
}

const AddRequirementsBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e4e4e4;
  border-radius: 15px;
  padding: 2rem;
`

const TitleWrapper = styled.div`
  display: flex;
  color: ${colors.uguPurple};
  opacity: 1;
  font-family: ${fontFamilies.light};
  font-size: 0.875rem;
  margin-left: 1rem;
`
const AddItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`
const ExistingItemsBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`

const ExistingItemsWrapper = styled.div`
  display: flex;
  width: 100%;
`

const ExistingItemsColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

const ExistingItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid transparent;
  border-radius: 30px;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  margin-top: 1rem;
  margin-left: 1rem;
  align-items: center;
  transition: all 0.2s linear;
  &:hover {
    border: 1px solid #e4e4e4;
  }
`

const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`

const IconWrapper = styled.div`
  display: flex;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`

const TextWrapper = styled.div<{
  hover: boolean
}>`
  display: flex;
  word-break: break-word;
  flex-grow: 1;
  font-size: 0.875rem;
  color: ${colors.uguPurple};
  opacity: ${(props) => (props.hover ? 1 : 0.5)};
`

const SideButtonsWrapper = styled.div`
  display: flex;
`

const SideButton = styled.div`
  display: flex;
  width: 1rem;
  height: 1rem;
  margin-left: 1rem;
  cursor: pointer;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 2rem;
`

const ExistingItem: React.FC<ExistingItemProps> = (props) => {
  const { item, index, editItemPressed, deleteItemPressed, disabled } = props
  const [hovered, setHovered] = useState<boolean>(false)

  return (
    <ExistingItemWrapper
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <IconTextWrapper>
        <IconWrapper>
          <CheckMarkIcon width="1rem" height="1rem" color={colors.uguBlue} />
        </IconWrapper>
        <TextWrapper hover={hovered}>{item}</TextWrapper>
      </IconTextWrapper>
      {!disabled && (
        <SideButtonsWrapper>
          <SideButton
            onClick={() => {
              editItemPressed(index)
            }}
          >
            {hovered && <EditIcon />}
          </SideButton>
          <SideButton
            onClick={() => {
              deleteItemPressed(index)
            }}
          >
            {hovered && <XIcon />}
          </SideButton>
        </SideButtonsWrapper>
      )}
    </ExistingItemWrapper>
  )
}

//1. User clicked Add or Edit
//2. Change disabled status to true
//3. Add Logic: call API
//4. Wait for API request to be done
//5. Change disable status to false

const AddRequirementsBlock: React.FC<AddRequirementsBlockProps> = (props) => {
  const {
    items,
    addItemPlaceholder = 'Type new Item',
    addItemTitle = 'Add Item',
    editItemTitle = 'Edit Item',
    existingItemsTitle = 'Existing Items',
    emptyItemsTitle = 'No items added - please add one',
    itemAddedMessage,
    itemDeletedMessage,
    itemEditedMessage,
    itemEmptyMessage,
    addItemHandler,
    editItemHandler,
    deleteItemHandler,
    maxLength,
    disabled = false,
    courseRequirementsMaxAmount,
  } = props
  const { t } = useTranslation('common')
  const editorRef = useRef<HTMLDivElement>(null)
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false)
  const [item, setItem] = useState<string>('')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editItemAtIndex, setEditItemAtIndex] = useState<number>()
  const [centerNotification, setCenterNotification] =
    useState<CenterNotification>()
  const [bottomNotification, setBottomNotification] =
    useState<BottomNotification>()
  //show PopUpCenter
  const [showPopUp, setShowPopUp] = useState(true)
  //show PopUpBottom
  const [showBottomPopUp, setShowBottomPopUp] = useState(false)

  const handleItemChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const newItem = e.currentTarget.value
    if (newItem !== '' || newItem !== undefined) {
      setItem(newItem)
    }
  }

  const checkIfReadyForCreation = () => {
    if (!item || item === '') {
      setBottomNotification({
        message: itemEmptyMessage,
        actionType: 'notification',
        duration: 7,
      })
      setShowBottomPopUp(true)
      return false
    } else {
      return true
    }
  }

  const submitBtnPressed = () => {
    if (checkIfReadyForCreation()) {
      setIsApiLoading(true)
      if (!editMode) {
        addItemHandler(item)
          .then((success) => {
            if (success) {
              setItem('')
              setBottomNotification({
                message: itemAddedMessage,
                actionType: 'success',
                duration: 7,
              })
              setShowBottomPopUp(true)
            }
          })
          .catch((err) => {
            setBottomNotification({
              message: err,
              actionType: 'error',
              duration: 7,
            })
            setShowBottomPopUp(true)
          })
          .finally(() => {
            setIsApiLoading(false)
          })
      } else {
        if (editItemAtIndex !== undefined) {
          editItemHandler(item, editItemAtIndex)
            .then((success) => {
              if (success) {
                setItem('')
                setEditMode(false)
                setBottomNotification({
                  message: itemEditedMessage,
                  actionType: 'success',
                  duration: 7,
                })
                setShowBottomPopUp(true)
              } else {
                setEditMode(false)
              }
            })
            .catch((err) => {
              setBottomNotification({
                message: err,
                actionType: 'error',
                duration: 7,
              })
              setShowBottomPopUp(true)
              setEditMode(false)
            })
            .finally(() => {
              setIsApiLoading(false)
            })
          setItem('')
          setEditMode(false)
        }
      }
    }
  }

  const getItems = () => {
    const firstColumn = items.map((item, index) => {
      if (index % 2 === 0) {
        return (
          <ExistingItem
            key={item?.substring(0, 5) + '_' + index}
            item={item}
            index={index}
            editItemPressed={editItemPressed}
            deleteItemPressed={deleteItemPressed}
            disabled={disabled}
          />
        )
      }
    })

    const secondColumn = items.map((item, index) => {
      if (index % 2 !== 0) {
        return (
          <ExistingItem
            key={item?.substring(0, 5) + '_' + index}
            item={item}
            index={index}
            editItemPressed={() => editItemPressed(index)}
            deleteItemPressed={deleteItemPressed}
            disabled={disabled}
          />
        )
      }
    })

    return (
      <>
        <ExistingItemsColumn>{firstColumn}</ExistingItemsColumn>
        <ExistingItemsColumn>{secondColumn}</ExistingItemsColumn>{' '}
      </>
    )
  }

  const editItemPressed = (index: number) => {
    editorRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    setEditMode(true)
    editorRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    setEditItemAtIndex(index)
    setItem(items[index])
  }

  const cancelEditPressed = () => {
    setEditMode(false)
    setEditItemAtIndex(undefined)
    setItem('')
  }

  const deleteItemPressed = (index: number) => {
    //show pop-up to confirm deletion
    setShowPopUp(true)
    setCenterNotification({
      title: confirmRequirementDeletion.title,
      message: confirmRequirementDeletion.message,
      firstBtn: {
        title: confirmRequirementDeletion.firstBtn.title,
        actionType: confirmRequirementDeletion.firstBtn.actionType,
        action: () => {
          deleteItemHandler(index)
            .then((success) => {
              if (success) {
                setBottomNotification({
                  message: itemDeletedMessage,
                  actionType: 'success',
                  duration: 7,
                })
                setShowBottomPopUp(true)
              }
            })
            .catch((err) => {
              setBottomNotification({
                message: err,
                actionType: 'error',
                duration: 7,
              })
              setShowBottomPopUp(true)
            })
          setEditMode(false)
          setShowPopUp(false)
        },
      },
      secondBtn: {
        title: confirmRequirementDeletion.secondBtn.title,
        actionType: confirmRequirementDeletion.secondBtn.actionType,
        action: () => {
          setShowPopUp(false)
        },
      },
    })
  }
  return (
    <AddRequirementsBlockWrapper>
      <TitleWrapper>
        {}
        {editMode
          ? editItemTitle + ' #' + (editItemAtIndex! + 1)
          : items.length +
            '/' +
            courseRequirementsMaxAmount +
            ' ' +
            addItemTitle}
      </TitleWrapper>
      <AddItemWrapper ref={editorRef}>
        <TextArea
          placeholder={addItemPlaceholder}
          width="100%"
          height="7rem"
          backgroundColor="#ffffff"
          padding="1rem 2rem"
          value={item}
          onChange={handleItemChange}
          borderRadius="25px"
          maxLength={maxLength}
          disabled={disabled || isApiLoading}
        />
        <ButtonsWrapper>
          {editMode && (
            <Button
              width="13rem"
              height="3rem"
              text={'Cancel'}
              fontFamily={fontFamilies.bold}
              backgroundColor={colors.uguPurple}
              color={colors.uguWhite}
              fontSize="0.9rem"
              fontWeight="bold"
              marginRight="1rem"
              onClick={() => cancelEditPressed()}
            />
          )}
          <Button
            width="13rem"
            height="3rem"
            text={!editMode ? t('buttons.Add') : t('buttons.Save')}
            fontFamily={fontFamilies.bold}
            backgroundColor={colors.uguYellow}
            color={colors.uguPurple}
            fontSize="0.9rem"
            fontWeight="bold"
            onClick={submitBtnPressed}
            disabled={
              disabled ||
              isApiLoading ||
              (!(items.length < courseRequirementsMaxAmount) && !editMode)
            }
          />
        </ButtonsWrapper>
      </AddItemWrapper>
      <ExistingItemsBlock>
        <TitleWrapper>
          {items.length > 0 ? existingItemsTitle : emptyItemsTitle}
        </TitleWrapper>
        <ExistingItemsWrapper>{getItems()}</ExistingItemsWrapper>
      </ExistingItemsBlock>
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
    </AddRequirementsBlockWrapper>
  )
}

export default AddRequirementsBlock
