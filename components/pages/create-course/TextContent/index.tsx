import React from 'react'
import styled from '@emotion/styled'
import TinyEditor from 'components/molecules/TinyEditor'

type TextContentProps = {
  content?: string
  onChange: (content: string) => void
  onImageUpload?: (blob: Blob) => Promise<any>
}

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 25rem;
  margin-bottom: 1.5rem;
`

const TextContent: React.FC<TextContentProps> = (props) => {
  const { content, onChange, onImageUpload } = props

  const handleContentChange = (newContent: string) => {
    console.log('TextContent: ', newContent)
    onChange(newContent)
  }

  return (
    <RowContainer>
      <Wrapper>
        <TinyEditor
          width="100%"
          type="page"
          value={content}
          onChange={handleContentChange}
          onImageUpload={onImageUpload}
        />
      </Wrapper>
    </RowContainer>
  )
}

export default TextContent
