import React, { useEffect, useMemo, useState } from 'react'
import { Input } from '@nextui-org/react'
import Fuse from 'fuse.js'
import styled from '@emotion/styled'
import { useTranslation } from 'next-i18next'

type CountrySelectorProps = {
  locale?: string
  onSelect: (selectedCountry: any) => void
  initial?: string
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

const DropdownContainer = styled.div`
  position: relative;
`

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  margin-top: 0.5rem;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #e1e1e8;
  background-color: #fff;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`

const CountrySelector: React.FC<CountrySelectorProps> = ({
  locale = 'eng',
  onSelect,
  initial,
}) => {
  const { t } = useTranslation(['authorProfileSettings'])

  const [filteredCountries, setFilteredCountries] = useState<any[]>([])
  const [inputValue, setInputValue] = useState(initial ? initial : '')
  const [fuse, setFuse] = useState<Fuse<any> | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isCountriesLoaded, setIsCountriesLoaded] = useState(false)

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch countries')
        }
        return res.json()
      })
      .then((data) => {
        setFilteredCountries(data)
        const options = {
          keys: [
            'name.common',
            'name.official',
            ...Object.keys(data[0].translations).map(
              (lang) => `translations.${lang}.common`
            ),
            ...Object.keys(data[0].translations).map(
              (lang) => `translations.${lang}.official`
            ),
            'altSpellings',
            'cca2',
            'cca3',
            'cioc',
          ],
          threshold: 0.3,
        }
        setFuse(new Fuse(data, options))
        setIsCountriesLoaded(true)
      })
      .catch((error) => {
        console.error('Error fetching countries:', error)
      })
  }, [locale])

  const handleInputChange = (value: string) => {
    setInputValue(value)
    setIsOpen(true)
    if (fuse) {
      const results = fuse.search(value).slice(0, 6)
      setFilteredCountries(results.map((res) => res.item))
    }
  }

  const getCountryName = (country: any) => {
    if (country.translations && country.translations[locale]) {
      return country.translations[locale].common
    }
    return country.name.common
  }
  const validateInput = useMemo((): InputValidator => {
    isCountriesLoaded

    const exactMatch = filteredCountries.some(
      (country) =>
        getCountryName(country).toLowerCase() === inputValue.toLowerCase()
    )
    if (exactMatch) {
      onSelect(inputValue)
      return {
        text: '',
        color: 'success',
        isValid: true,
      }
    } else onSelect('')

    if (!inputValue.length || !isCountriesLoaded) {
      return {
        text: '',
        color: 'primary',
        isValid: false,
      }
    }
    if (!filteredCountries.length) {
      return {
        text: 'No match, please try again.',
        color: 'error',
        isValid: false,
      }
    }

    return {
      text: '',
      color: 'primary',
      isValid: false,
    }
  }, [inputValue, filteredCountries])

  return (
    <DropdownContainer>
      <Input
        bordered
        width="100%"
        placeholder={t('Select a country')}
        value={inputValue}
        helperText={validateInput.text}
        helperColor={validateInput.color}
        color={validateInput.color}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} // slight delay to allow for click event on dropdown item
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <DropdownMenu isOpen={isOpen && !!filteredCountries.length}>
        {filteredCountries.slice(0, 6).map((country) => (
          <DropdownItem
            key={country.cca3}
            onClick={() => {
              setInputValue(getCountryName(country))
              setIsOpen(false)
            }}
          >
            {getCountryName(country)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  )
}

export default CountrySelector
