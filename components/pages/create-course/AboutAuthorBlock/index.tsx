import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import TinyEditor from 'components/molecules/TinyEditor'
import Button from 'components/atoms/Button'
import { colors, fontFamilies } from 'configs/styles/config'
import { courseAboutAuthorTextLimit } from '@configs/constants/textLimits'
import { useTranslation } from 'react-i18next'

type AboutAuthorBlockProps = {
  aboutAuthor: string
  editAboutAuthor: (newAboutAuthor: string) => Promise<boolean>
  setBottomNotification: Function
  disabled?: boolean
}

const AboutAuthorBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e4e4e4;
  border-radius: 15px;
  padding: 1rem;
`
const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  align-items: flex-end;
`

const AboutAuthorBlock: React.FC<AboutAuthorBlockProps> = (props) => {
  const { aboutAuthor, editAboutAuthor, setBottomNotification, disabled } =
    props
  const [value, setValue] = useState<string>('')
  const [aboutAuthorHasChanged, setAboutAuthorHasChanged] =
    useState<boolean>(false)

  const aboutAuthorHandler = (content: string) => {
    const newValue = content
    if (newValue !== '' || newValue !== undefined) {
      setValue(newValue)
      if (newValue !== aboutAuthor) {
        setAboutAuthorHasChanged(true)
      } else {
        setAboutAuthorHasChanged(false)
      }
    }
  }

  useEffect(() => {
    if (
      aboutAuthor !== undefined &&
      aboutAuthor !== '' &&
      aboutAuthor !== value
    ) {
      setValue(aboutAuthor)
    }
  }, [aboutAuthor])

  const submitEditAboutAuthorHandler = () => {
    if (aboutAuthorHasChanged) {
      editAboutAuthor(value)
        .then((success) => {
          if (success) {
            setAboutAuthorHasChanged(false)
            setBottomNotification({
              message: 'Information About Author has been updated!',
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
    <AboutAuthorBlockWrapper>
      <EditorWrapper>
        <TinyEditor
          width="100%"
          height="300px"
          type="textOnly"
          placeholder={t('placeholders.typeSomeInformationAboutAuthor', {
            ns: 'createCourse',
          })}
          value={value}
          onChange={aboutAuthorHandler}
          readOnly={disabled}
          opacity={disabled ? '0.2' : '1'}
          maxLength={courseAboutAuthorTextLimit}
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
            disabled={disabled || !aboutAuthorHasChanged}
            onClick={submitEditAboutAuthorHandler}
          />
        </ButtonsWrapper>
      </EditorWrapper>
    </AboutAuthorBlockWrapper>
  )
}

export default AboutAuthorBlock
