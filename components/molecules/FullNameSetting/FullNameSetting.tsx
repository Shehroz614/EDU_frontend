import React, { useState, useEffect, useMemo } from 'react'
import { Input, Button } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import { updateProfileInfo } from '@helpers/userHelpers'
import { useAuth } from '@hooks/useAuth'
import {
  InputLineContainer,
  SettingsContainer,
  ButtonContainer,
} from '@styled_components/account/accountStyledComponents'
import { nameAndLastNameTextLimit } from '@configs/constants/textLimits'
import XRegExp from 'xregexp'

type NameSettingsProps = {
  onClose: () => void
}

type InputValidator = {
  text: string
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | undefined
  isValid: boolean
}

const FullNameSetting: React.FC<NameSettingsProps> = ({ onClose }) => {
  // Hooks
  const { t } = useTranslation(['account'])
  const { authState, updateCurrentUserFromResponse } = useAuth()

  // States
  const [firstNameInput, setFirstNameInput] = useState(
    authState.user?.first_name || ''
  )
  const [lastNameInput, setLastNameInput] = useState(
    authState.user?.last_name || ''
  )

  // Ensure names are updated whenever authState changes
  useEffect(() => {
    setFirstNameInput(authState.user?.first_name || '')
    setLastNameInput(authState.user?.last_name || '')
  }, [authState])

  // Helper function to validate input length
  const isValidInput = (name) => {
    return name.length <= nameAndLastNameTextLimit
  }

  // Function to validate input based on various criteria
  const validateInput = (
    inputValue: string,
    initialInputValue: string,
    type: string
  ): InputValidator => {
    const regex = XRegExp(`^[\\p{L}\\s\'\\-]+$`)

    if (!inputValue.length) {
      return {
        text: '',
        color: 'primary',
        isValid: false,
      }
    }

    if (inputValue.trim() === initialInputValue) {
      return {
        text: '',
        color: 'primary',
        isValid: false,
      }
    }

    if (!regex.test(inputValue.trim())) {
      return {
        text: t('Do not use special symbols, numbers, or emojis.'),
        color: 'error',
        isValid: false,
      }
    }

    if (inputValue.length === nameAndLastNameTextLimit) {
      return {
        text: t('You have reached the length limit', { type: type }),
        color: 'primary',
        isValid: true,
      }
    }

    return {
      text: '',
      color: 'primary',
      isValid: true,
    }
  }

  // Validators for first and last names
  const firstNameValidator: InputValidator = useMemo(() => {
    return validateInput(
      firstNameInput,
      authState.user?.first_name || '',
      'name'
    )
  }, [firstNameInput, t, authState.user?.first_name])

  const lastNameValidator: InputValidator = useMemo(() => {
    return validateInput(
      lastNameInput,
      authState.user?.last_name || '',
      'last name'
    )
  }, [lastNameInput, t, authState.user?.last_name])

  // Function to handle saving of full name
  const handleFullNameSaving = () => {
    const userData: { first_name?: string; last_name?: string } = {}

    if (firstNameInput !== authState.user?.first_name) {
      userData.first_name = firstNameInput.trim()
    }
    if (lastNameInput !== authState.user?.last_name) {
      userData.last_name = lastNameInput.trim()
    }

    if (Object.keys(userData).length > 0) {
      updateProfileInfo(userData).then((rawUser) => {
        updateCurrentUserFromResponse(rawUser)
        onClose()
      })
    } else {
      console.log('No changes to save.')
    }
  }

  return (
    <SettingsContainer>
      <InputLineContainer>
        <Input
          bordered
          width="100%"
          label={t('Name')}
          placeholder={t('Name')}
          value={firstNameInput}
          onChange={(e) => {
            if (isValidInput(e.target.value)) setFirstNameInput(e.target.value)
          }}
          helperText={firstNameValidator.text}
          helperColor={firstNameValidator.color}
        />
      </InputLineContainer>
      <InputLineContainer>
        <Input
          bordered
          width="100%"
          label={t('Last name')}
          placeholder={t('Last name')}
          value={lastNameInput}
          onChange={(e) => {
            if (isValidInput(e.target.value)) setLastNameInput(e.target.value)
          }}
          helperText={lastNameValidator.text}
          helperColor={lastNameValidator.color}
        />
      </InputLineContainer>
      <ButtonContainer>
        <Button
          bordered
          onClick={handleFullNameSaving}
          disabled={
            (!firstNameValidator.isValid && !lastNameValidator.isValid) ||
            firstNameValidator.color === 'error' ||
            lastNameValidator.color === 'error'
          }
        >
          {t('Submit')}
        </Button>
      </ButtonContainer>
    </SettingsContainer>
  )
}

export default FullNameSetting
