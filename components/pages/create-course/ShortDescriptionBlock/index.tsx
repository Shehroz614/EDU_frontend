import React, { FormEvent, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import TextArea from 'components/atoms/TextArea'
import Button from 'components/atoms/Button'
import { colors, fontFamilies } from 'configs/styles/config'
import { courseShortDescriptionTextLimit } from 'configs/constants/textLimits'
import { useTranslation } from 'react-i18next'

type ShortDescriptionBlockProps = {
  shortDescription: string
  editShortDescription: (newShortDescription: string) => Promise<boolean>
  setBottomNotification: Function
  disabled?: boolean
}

const ShortDescriptionBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e4e4e4;
  border-radius: 15px;
  padding: 2rem;
`
const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  align-items: flex-end;
`

const ShortDescriptionBlock: React.FC<ShortDescriptionBlockProps> = (props) => {
  const {
    shortDescription,
    editShortDescription,
    setBottomNotification,
    disabled,
  } = props
  const [value, setValue] = useState<string>('')
  const [shortDescriptionHasChanged, setShortDescriptionHasChanged] =
    useState<boolean>(false)

  const aboutAuthorHandler = (e: FormEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value
    if (newValue !== '' || newValue !== undefined) {
      setValue(newValue)
      if (newValue !== shortDescription) {
        setShortDescriptionHasChanged(true)
      } else {
        setShortDescriptionHasChanged(false)
      }
    }
  }

  useEffect(() => {
    if (
      shortDescription !== undefined &&
      shortDescription !== '' &&
      shortDescription !== value
    ) {
      setValue(shortDescription)
    }
  }, [shortDescription])

  const submitEditAboutAuthorHandler = () => {
    if (shortDescriptionHasChanged) {
      console.log('debug', value)
      editShortDescription(value)
        .then((success) => {
          if (success) {
            setShortDescriptionHasChanged(false)
            setBottomNotification({
              message: 'Short Description has been updated!',
              actionType: 'success',
              duration: 7,
            })
          }
        })
        .catch((err) => {
          setBottomNotification({
            message: err,
            actionType: 'error',
            duration: 7,
          })
        })
    }
  }

  const { t } = useTranslation(['common', 'createCourse'])

  return (
    <ShortDescriptionBlockWrapper>
      <EditorWrapper>
        <TextArea
          value={value}
          onChange={aboutAuthorHandler}
          placeholder={t('placeholders.Type short description', {
            ns: 'createCourse',
          })}
          width="100%"
          height="7rem"
          backgroundColor="#ffffff"
          padding="1rem 2rem"
          borderRadius="25px"
          maxLength={courseShortDescriptionTextLimit}
          disabled={disabled}
        />
        <ButtonsWrapper>
          <Button
            backgroundColor={colors.uguBlue}
            width="13rem"
            height="2.9rem"
            color="#1A1E3D"
            text={t('buttons.Save')}
            fontFamily={fontFamilies.bold}
            fontSize="0.9rem"
            marginLeft="2rem"
            disabled={disabled || !shortDescriptionHasChanged}
            onClick={submitEditAboutAuthorHandler}
          />
        </ButtonsWrapper>
      </EditorWrapper>
    </ShortDescriptionBlockWrapper>
  )
}

export default ShortDescriptionBlock
