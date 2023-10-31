import React from 'react'
import styled from '@emotion/styled'
import TextBlockWithIcons from 'components/atoms/TextBlockWithIcons'
import InfoTextIcon from 'components/atoms/InfoTextIcon'

type Props = {
  numOfBlocks?: number
}

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const TextField = styled.div<{
  opacity?: string
  marginTop?: string
  marginLeft?: string
}>`
  display: flex;
  color: #1a1e3d;
  opacity: ${(props) => (props.opacity ? props.opacity : '0.5')};
  font-size: 0.9rem;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '6.2rem')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '1.5rem')};
`
const InfoWrapper = styled.div<{
  marginTop?: string
  marginLeft?: string
}>`
  display: flex;
  margin-left: 0.8rem;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '3.7rem')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '1.2rem')};
`
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TextBlock: React.FunctionComponent<Props> = (props) => {
  const { numOfBlocks = 0 } = props

  const getBlocks = () => {
    return [...Array(numOfBlocks)].map((_, index) => {
      index === numOfBlocks
      return (
        <ColumnWrapper key={index}>
          <RowWrapper>
            <TextField>What will you learn?</TextField>
            <InfoWrapper marginTop="1.6rem" marginLeft="57.8rem">
              <InfoTextIcon />
            </InfoWrapper>
          </RowWrapper>
          <TextBlockWithIcons
            marginLeft="5.8rem"
            marginBottom="1rem"
            width="68rem"
          />
        </ColumnWrapper>
      )
    })
  }

  return <ColumnWrapper>{getBlocks()}</ColumnWrapper>
}

export default TextBlock
