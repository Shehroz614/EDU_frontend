import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Button from 'components/atoms/Button'
import { colors, fontFamilies } from 'configs/styles/config'
import TinyEditor from '@components/molecules/TinyEditor'
import { useTranslation } from 'react-i18next'
import { courseDescriptionTextLimit } from '@configs/constants/textLimits'

type DescriptionBlockProps = {
  description: string
  editDescription: (newShortDescription: string) => Promise<boolean>
  setBottomNotification: Function
  disabled?: boolean
}

const DescriptionBlockWrapper = styled.div`
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

const DescriptionBlock: React.FC<DescriptionBlockProps> = (props) => {
  const { description, editDescription, setBottomNotification, disabled } =
    props
  const [value, setValue] = useState<string>('')
  const [descriptionHasChanged, setDescriptionHasChanged] =
    useState<boolean>(false)

  const aboutAuthorHandler = (content: string) => {
    const newValue = content
    if (newValue !== '' || newValue !== undefined) {
      setValue(newValue)
      if (newValue !== description) {
        setDescriptionHasChanged(true)
      } else {
        setDescriptionHasChanged(false)
      }
    }
  }

  useEffect(() => {
    if (
      description !== undefined &&
      description !== '' &&
      description !== value
    ) {
      setValue(description)
    }
  }, [description])

  const submitEditAboutAuthorHandler = () => {
    if (descriptionHasChanged) {
      console.log('debug', value)
      editDescription(value)
        .then((success) => {
          if (success) {
            setDescriptionHasChanged(false)
            setBottomNotification({
              message: 'Description has been updated!',
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
    <DescriptionBlockWrapper>
      <EditorWrapper>
        <TinyEditor
          width="100%"
          height="300px"
          type="textOnly"
          placeholder={t(
            'placeholders.Type some information about the Course',
            { ns: 'createCourse' }
          )}
          value={value}
          onChange={aboutAuthorHandler}
          readOnly={disabled}
          opacity={disabled ? '0.2' : '1'}
          maxLength={courseDescriptionTextLimit}
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
            disabled={disabled || !descriptionHasChanged}
            onClick={submitEditAboutAuthorHandler}
          />
        </ButtonsWrapper>
      </EditorWrapper>
    </DescriptionBlockWrapper>
  )
}

export default DescriptionBlock
