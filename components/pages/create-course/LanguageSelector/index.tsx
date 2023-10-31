import React, { useState } from 'react'
import Select from '@components/atoms/Select'
import Button from '@components/atoms/Button'
import { colors, fontFamilies } from '@configs/styles/config'
import {
  LanguageSelectorWrapper,
  LanguageSelectorInputContainer,
  LanguageSelectorInputWrapper,
  ExistingItemsWrapper,
  ExistingItem,
  ExistingItemText,
  SideButton,
} from '@styled_components/LanguageSelector/styled.components'
import languages from '@constants/languages'
import XIcon from '@public/static/icons/x-icon'
import { useTranslation } from 'react-i18next'

type LanguageSelector = {
  value: string[]
  disabled: boolean
  addLanguage: Function
  deleteLanguage: Function
}
const LanguageSelector = ({
  value,
  disabled,
  addLanguage,
  deleteLanguage,
}: LanguageSelector): JSX.Element => {
  const [currentValue, setCurrentValue] = useState<any>()
  const [editMode] = useState<boolean>(false)
  const languagesList = Object.values(languages).map((item) => ({
    label: item.name,
    value: item.code,
  }))
  const handleSubmit = () => {
    addLanguage(currentValue.value).then(() => {
      setCurrentValue(null)
    })
  }

  const { t } = useTranslation('common')

  return (
    <LanguageSelectorWrapper>
      <LanguageSelectorInputContainer>
        <LanguageSelectorInputWrapper>
          <Select
            width="100%"
            options={languagesList}
            placeholder="Select Course Languages"
            onChange={(option: any) => setCurrentValue(option)}
            renderItem={(option: any) => option.label}
            renderKey={(option: any) => option.value + 'key'}
            disabled={disabled}
            value={currentValue}
            searchable={true}
          />
        </LanguageSelectorInputWrapper>
        <Button
          width="10rem"
          height="2.5rem"
          text={!editMode ? t('buttons.Add') : t('buttons.Save')}
          fontFamily={fontFamilies.bold}
          backgroundColor={colors.uguYellow}
          color={colors.uguPurple}
          fontSize="0.9rem"
          fontWeight="bold"
          onClick={handleSubmit}
          disabled={!currentValue}
        />
      </LanguageSelectorInputContainer>
      <ExistingItemsWrapper>
        {value.map((language: string, index) => (
          <ExistingItem key={index}>
            <ExistingItemText>{languages[language].name}</ExistingItemText>
            <SideButton
              onClick={() => {
                if (!disabled) deleteLanguage(index)
              }}
              style={{
                opacity: disabled ? 0.3 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            >
              <XIcon />
            </SideButton>
          </ExistingItem>
        ))}
      </ExistingItemsWrapper>
    </LanguageSelectorWrapper>
  )
}

export default LanguageSelector
