import React, { useState, ReactNode, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import DropdownIcon from 'public/static/icons/dropdown-icon'
import { Category } from 'types/main'
import { colors } from 'configs/styles/config'

type SelectSectionProps = {
  sections: Category[]
  placeholder: string
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  active?: boolean
  row?: ReactNode // custom row that can be passed, otherwise the default will be used
  onChange: Function
  value?: Category
  disabled?: boolean
}

const SelectContainerWrapper = styled.div<{ width?: string }>`
  display: flex;
  width: ${(props) => (props.width ? props.width : '36rem')};
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
  width: 100%;
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

const TitleWrapper = styled.div<{
  placeholderStyle: boolean
}>`
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

const Option = styled.div<{ active?: boolean }>`
  display: flex;
  font-size: 0.9rem;
  color: ${(props) => (props.active ? colors.uguBlue : '')};
  padding: 0.7rem;
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

const SelectSection: React.FunctionComponent<SelectSectionProps> = (props) => {
  const {
    width = '',
    placeholder = 'Select',
    sections,
    onChange,
    value,
    disabled = false,
  } = props
  const [showSections, setShowSections] = useState(false)
  // const [categoryName, setCategoryName] = useState(value.name)
  const numOfSections = sections.length

  const categoryName = value?.name?.en
  const node = useRef<HTMLDivElement>(null)

  const getSection = () => {
    return sections.map((section: Category, index: number) => {
      return (
        <>
          <Option
            active={value?._id === section._id}
            key={index}
            onClick={() => {
              onChange(section)
              setShowSections(false)
            }}
          >
            {section.name.en}
          </Option>
          {index != numOfSections - 1 && (
            <UnderLine active={index === numOfSections - 1} width={width} />
          )}
        </>
      )
    })
  }

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
      {sections && sections.length >= 0 && (
        <SelectContainerWrapper ref={node} width={width}>
          <SelectContainer
            onClick={() => (disabled ? {} : setShowSections(!showSections))}
            disabled={disabled}
          >
            <SelectedRowWrapper>
              <TitleWrapper placeholderStyle={!categoryName}>
                {categoryName || placeholder}
              </TitleWrapper>
              <IconWrapper>
                <DropdownIcon />
              </IconWrapper>
            </SelectedRowWrapper>
          </SelectContainer>
          {showSections && (
            <Dropdown>
              <Placeholder>{placeholder}</Placeholder>
              <ListWrapper>{getSection()}</ListWrapper>
            </Dropdown>
          )}
        </SelectContainerWrapper>
      )}
    </>
  )
}

export default SelectSection
