import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import DropdownIcon from 'public/static/icons/dropdown-icon'
import { colors } from 'configs/styles/config'
import TextInput from '../TextInput'

type Option = {
  value: any
  label: string
}

type SelectSectionProps = {
  options: Option[]
  placeholder: string
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  active?: boolean
  onChange: (item: Option) => void
  value?: Option
  renderItem?: (option: Option) => any
  renderKey?: (option: Option, key: number) => string
  disabled?: boolean
  searchable?: boolean
}

const SelectContainerWrapper = styled.div`
  display: flex;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
`

const SelectContainer = styled.div<{
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  marginLeft?: string
  marginRight?: string
  marginTop?: string
  marginBottom?: string
  disabled?: boolean
}>`
  display: flex;
  width: ${(props) => (props.width ? props.width : '36rem')};
  border: ${(props) =>
    props.border ? props.border : '1px solid ' + colors.uguLightGrey};
  height: ${(props) => (props.height ? props.height : '2.6rem')};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '1.5rem'};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
  align-items: center;
  background: ${(props) =>
    props.disabled ? colors.uguLightLightGrey : '#FFFFFF'};
  color: ${(props) =>
    props.disabled ? colors.uguLightGrey : colors.uguPurple};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`

const SelectedRowWrapper = styled.div`
  display: flex;
  margin: 0 1rem 0 2rem;
  width: 100%;
  align-items: center;
`

const TitleWrapper = styled.div<{ placeholderStyle: boolean }>`
  display: flex;
  font-size: 0.9rem;
  opacity: ${(props) => (props.placeholderStyle ? '0.7' : '1')};
`
const IconWrapper = styled.div`
  display: flex;
  width: 0.35rem;
  height: 0.35rem;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`
const Dropdown = styled.div<{
  width?: string
}>`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  width: ${(props) => (props.width ? props.width : '36rem')};
  height: 14rem;
  background-color: #ffffff;
  transform: translateY(25%);
  box-shadow: 0px 0px 10px 10px #f6f6f6;
  /* justify-content: center; */
  padding: 1rem;
  z-index: 1;
  position: absolute;
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`

const Option = styled.option<{ active?: boolean }>`
  display: flex;
  font-size: 0.9rem;
  padding: 0.7rem;
  color: ${(props) => (props.active ? colors.uguBlue : '')};
  cursor: pointer;
`

const Placeholder = styled.div`
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.5rem;
  margin-bottom: 0.3rem;
  padding: 0 0.7rem;
  opacity: 0.5;
`
const UnderLine = styled.div<{
  active?: boolean
  width?: string
}>`
  display: flex;
  border: 1px solid #979797;
  width: ${(props) => (props.width ? props.width : '31.5rem')};
  opacity: 0.15;
  margin-left: 0.8rem;
`

const renderItemDefault = (option: any) => {
  return option
}
const renderKeyDefault = (_: any, key: number) => {
  return key
}

const Select: React.FC<SelectSectionProps> = (props) => {
  const {
    width,
    borderRadius = '',
    placeholder = 'Select',
    options,
    onChange,
    value,
    renderItem = renderItemDefault,
    renderKey = renderKeyDefault,
    disabled = false,
    searchable = false,
  } = props
  const [showSections, setShowSections] = useState(false)
  const numOfItems = options.length
  const [searchInput, setSearchInput] = useState<string>('')

  const node = useRef<HTMLDivElement>(null)

  const renderOptions = useCallback(
    (searchInput?: string) => {
      let filteredResults = [...options]

      if (searchInput && searchable) {
        filteredResults = filteredResults.filter((str) =>
          str.label.toLowerCase().startsWith(searchInput.toLowerCase())
        )
      }

      return filteredResults.map(
        (option: { value: string; label: string }, index: number) => {
          return (
            <div key={index}>
              <Option
                active={value?.value === option.value}
                key={renderKey(option, index)}
                onClick={() => {
                  onChange(option)
                  setShowSections(false)
                }}
              >
                {renderItem(option)}
              </Option>
              {index != numOfItems - 1 && (
                <UnderLine active={index === numOfItems - 1} width={width} />
              )}
            </div>
          )
        }
      )
    },
    [
      numOfItems,
      onChange,
      options,
      renderItem,
      renderKey,
      searchable,
      value?.value,
      width,
    ]
  )
  // clear value searchInput after close dropdown
  useEffect(() => {
    setSearchInput('')
  }, [showSections])

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick)
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const handleClick = (e: MouseEvent): void => {
    if (node!.current!.contains(e.target as Node)) {
      // inside click
      return
    }
    // outside click

    setShowSections(false)
  }

  return (
    <>
      {options && options.length >= 0 && (
        <SelectContainerWrapper ref={node}>
          <SelectContainer
            width={width}
            onClick={() => {
              disabled ? {} : setShowSections(!showSections)
            }}
            borderRadius={borderRadius}
            disabled={disabled}
          >
            <SelectedRowWrapper>
              <TitleWrapper placeholderStyle={!value}>
                {value?.label || placeholder}
              </TitleWrapper>
              <IconWrapper>
                <DropdownIcon />
              </IconWrapper>
            </SelectedRowWrapper>
          </SelectContainer>
          {showSections && (
            <Dropdown>
              <Placeholder>{placeholder}</Placeholder>
              {searchable && (
                <TextInput
                  value={searchInput || ''}
                  onChange={(e) => setSearchInput(e.currentTarget.value)}
                  border={'1px solid' + colors.uguLightGrey}
                  marginLeft="0,5rem"
                  padding="0.25rem 1rem"
                  placeholder="Search Language"
                  marginBottom="0.5rem"
                  height="2rem"
                />
              )}
              <ListWrapper>
                {renderOptions(searchable ? searchInput : undefined)}
              </ListWrapper>
            </Dropdown>
          )}
        </SelectContainerWrapper>
      )}
    </>
  )
}

export default Select
