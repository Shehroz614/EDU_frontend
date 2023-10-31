import React, { useState } from 'react'
import Select from '@components/atoms/Select'
import {
  LanguageSelectorInputContainer,
  LanguageSelectorInputWrapper,
  ExistingItemsWrapper,
  ExistingItem,
  ExistingItemText,
  SideButton,
} from './styled.components'
import languages from '@constants/languages'
import XIcon from '@public/static/icons/x-icon'

type LanguageSelector = {
  value: string[]
}
const LanguageSelector = ({ value }: LanguageSelector): JSX.Element => {
  const [currentValue, setCurrentValue] = useState<any>()
  const languagesList = Object.values(languages).map((item) => ({
    label: item.name,
    value: item.code,
  }))

  return (
    <>
      <LanguageSelectorInputContainer>
        <LanguageSelectorInputWrapper>
          <Select
            width="100%"
            height="3rem"
            options={languagesList}
            placeholder="Select Page Language"
            onChange={(option: any) => setCurrentValue(option)}
            renderItem={(option: any) => option.label}
            renderKey={(option: any) => option.value + 'key'}
            value={currentValue}
          />
        </LanguageSelectorInputWrapper>
      </LanguageSelectorInputContainer>
      <ExistingItemsWrapper>
        {value.map((language: string, index) => (
          <ExistingItem key={index}>
            <ExistingItemText>{languages[language].name}</ExistingItemText>
            <SideButton onClick={() => {}}>
              <XIcon />
            </SideButton>
          </ExistingItem>
        ))}
      </ExistingItemsWrapper>
    </>
  )
}

export default LanguageSelector
