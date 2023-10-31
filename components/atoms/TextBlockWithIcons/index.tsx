import React from 'react'
import styled from '@emotion/styled'
import TextArea from '../../../components/atoms/TextArea'
import TextIcon from 'public/static/icons/text-icon'
import DiscussIcon from 'public/static/icons/discuss-icon'
import CutIcon from 'public/static/icons/cut-icon'
import FormartColumnWithTitleIcon from 'public/static/icons/format-column-with-title-icon'
import TextDeleteIcon from 'public/static/icons/text-delete-icon'
import CopyTextIcon from 'public/static/icons/copy-text-icon'
import NoteTextIcon from 'public/static/icons/note-text-icon'
import WidthTextIcon from 'public/static/icons/width-text-icon'

type Props = {
  width?: string
  height?: string
  fontSize?: string
  opacity?: string
  marginLeft?: string
  marginRight?: string
  marginTop?: string
  marginBottom?: string
  padding?: string
  paddingBottom?: string
  placeholder?: string
}

const Container = styled.div<{
  marginLeft?: string
  marginBottom?: string
  width?: string
  height?: string
}>`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: ${(props) => (props.width ? props.width : '70rem')};
  height: ${(props) => (props.height ? props.height : '14.4rem')};
  background-color: #ffffff;
  margin-top: 1rem;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
`
const RowSection = styled.div`
  display: flex;
  flex-direction: row;
  height: 3rem;
  padding: 1.5rem 3rem;
`
const Icon = styled.div`
  display: flex;
  color: #000000;
  opacity: 0.15;
  font-size: 0.9rem;
  margin-right: 1.5rem;
  width: 0.9rem;
  height: 0.9rem;
`

const TextBlockWithIcons: React.FunctionComponent<Props> = (props) => {
  const {
    opacity = '',
    width = '',
    height = '',
    fontSize = '',
    marginLeft = '',
    marginBottom = '',
    placeholder = '',
    paddingBottom = '',
  } = props
  return (
    <Container
      marginLeft={marginLeft}
      marginBottom={marginBottom}
      width={width}
      height={height}
    >
      <RowSection>
        <Icon>
          <TextIcon />
        </Icon>
        <Icon>
          <DiscussIcon />
        </Icon>
        <Icon>
          <CutIcon />
        </Icon>
        <Icon>
          <FormartColumnWithTitleIcon />
        </Icon>
        <Icon>
          <TextDeleteIcon />
        </Icon>
        <Icon>
          <CopyTextIcon />
        </Icon>
        <Icon>
          <NoteTextIcon />
        </Icon>
        <Icon>📰</Icon>
        <Icon>🗨️</Icon>
        <Icon>📃</Icon>
        <Icon>📰</Icon>
        <Icon>
          <WidthTextIcon />
        </Icon>
        <Icon>📰</Icon>
      </RowSection>
      <TextArea
        height="10rem"
        placeholder={placeholder}
        fontSize={fontSize}
        paddingBottom={paddingBottom}
        width={width}
        opacity={opacity}
        padding="0 2rem"
        borderColor="#ffffff"
        value=""
      />
    </Container>
  )
}

export default TextBlockWithIcons
