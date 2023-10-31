import React, { useState } from 'react'
import Button from 'components/atoms/Button'
import { colors, fontFamilies } from 'configs/styles/config'
import PopUpCenter from 'components/organisms/PopUpCenter'
import PopUpBottom from 'components/organisms/PopUpBottom'
import TextInput from 'components/atoms/TextInput'
import XIcon from 'public/static/icons/x-icon'
import { confirmKeywordDeletion } from 'configs/constants/labels/modal-labels'
import { BottomNotification, CenterNotification } from 'types/main'
import { useTranslation } from 'react-i18next'
import {
  AddKeywordsBlockWrapper,
  AddKeywordWrapper,
  ExistingKeywordsWrapper,
  KeywordWrapper,
  KeywordText,
  SideButton,
  TitleWrapper,
} from '@styled_components/AddKeywordsBlock/styled.components'
import {
  courseKeywordsMaxAmount,
  courseKeywordTextLimit,
} from '@configs/constants/textLimits'

type AddKeywordsBlockProps = {
  keywords: string[]
  addKeywordHandler: (newItem: string) => Promise<boolean>
  deleteKeywordHandler: (atIndex: number) => Promise<boolean>
  disabled?: boolean
}
type KeywordProps = {
  keyword: string
  index: number
  deleteKeywordHandler: (index: number) => void
  disabled?: boolean
}

const Keyword: React.FC<KeywordProps> = (props) => {
  const { keyword, index, deleteKeywordHandler, disabled } = props
  return (
    <KeywordWrapper>
      <KeywordText>{keyword}</KeywordText>
      {!disabled && (
        <SideButton
          onClick={() => {
            deleteKeywordHandler(index)
          }}
        >
          <XIcon />
        </SideButton>
      )}
    </KeywordWrapper>
  )
}

// TODO - Migrate to center bottom notification
const AddKeywordsBlock: React.FC<AddKeywordsBlockProps> = (props) => {
  const {
    keywords,
    addKeywordHandler,
    deleteKeywordHandler,
    disabled = false,
  } = props
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [centerNotification, setCenterNotification] =
    useState<CenterNotification>()
  const [bottomNotification, setBottomNotification] =
    useState<BottomNotification>()
  //show PopUpCenter
  const [showPopUp, setShowPopUp] = useState(true)
  //show PopUpBottom
  const [showBottomPopUp, setShowBottomPopUp] = useState(false)

  const handleKeywordChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newKeyword = e.currentTarget.value
    if (newKeyword !== '' || newKeyword !== undefined) {
      setValue(newKeyword)
    }
  }

  const checkIfReadyForCreation = () => {
    if (!value || value === '' || value === undefined) {
      setBottomNotification({
        message: 'Keyword cannot be empty!',
        actionType: 'notification',
        duration: 7,
      })
      setShowBottomPopUp(true)
      return false
    } else {
      return true
    }
  }

  //Add new keyword(will call to server)
  const submitBtnPressed = () => {
    if (checkIfReadyForCreation()) {
      setIsApiLoading(true)
      //also check if already exists
      addKeywordHandler(value)
        .then((success) => {
          if (success) {
            setValue('')
            setBottomNotification({
              message: 'Keyword has been added',
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
        .finally(() => {
          setIsApiLoading(false)
        })
    }
  }

  const deleteKeywordPressed = (index: number) => {
    //show pop-up to confirm deletion
    setShowPopUp(true)
    setCenterNotification({
      title: confirmKeywordDeletion.title,
      message: confirmKeywordDeletion.message,
      firstBtn: {
        title: confirmKeywordDeletion.firstBtn.title,
        actionType: confirmKeywordDeletion.firstBtn.actionType,
        action: () => {
          deleteKeywordHandler(index)
            .then((success) => {
              if (success) {
                setBottomNotification({
                  message: 'Keyword has been deleted',
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
        title: confirmKeywordDeletion.secondBtn.title,
        actionType: confirmKeywordDeletion.secondBtn.actionType,
        action: () => {
          setShowPopUp(false)
        },
      },
    })
  }

  const getKeywords = () => {
    const existingKeywords = keywords.map((item, index) => {
      return (
        <Keyword
          key={'keyword' + index}
          keyword={item}
          index={index}
          deleteKeywordHandler={deleteKeywordPressed}
          disabled={disabled}
        />
      )
    })

    return existingKeywords
  }

  const { t } = useTranslation(['common', 'createCourse'])

  return (
    <AddKeywordsBlockWrapper>
      <TitleWrapper>
        {keywords.length}/{courseKeywordsMaxAmount}{' '}
        {t('keywordsAdded', { ns: 'createCourse' })}{' '}
        {t('min3Required', { ns: 'createCourse' })}
      </TitleWrapper>
      <AddKeywordWrapper>
        <TextInput
          placeholder={t('placeholders.Type a new Keyword', {
            ns: 'createCourse',
          })}
          width="100%"
          height="2.8rem"
          backgroundColor="#ffffff"
          padding="1rem 2rem"
          value={value ? value : ''}
          onChange={handleKeywordChange}
          maxLength={courseKeywordTextLimit}
          disabled={disabled || isApiLoading}
        />
        <Button
          width="13rem"
          height="3rem"
          text={t('buttons.Add', { ns: 'common' })}
          fontFamily={fontFamilies.bold}
          backgroundColor={colors.uguYellow}
          color={colors.uguPurple}
          fontSize="0.9rem"
          fontWeight="bold"
          marginLeft="2rem"
          onClick={submitBtnPressed}
          disabled={
            disabled ||
            isApiLoading ||
            !(keywords.length < courseKeywordsMaxAmount)
          }
        />
      </AddKeywordWrapper>
      <ExistingKeywordsWrapper>{getKeywords()}</ExistingKeywordsWrapper>
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
    </AddKeywordsBlockWrapper>
  )
}

export default AddKeywordsBlock
