import React, { ReactNode } from 'react'
import styled from '@emotion/styled'

type Props = {
  active?: boolean
  icon: ReactNode
  text: string
  backgroundColor?: string
  border?: boolean
  width?: string
  textLight?: boolean
}

const ButtonWithIconContainer = styled.button<{ border: boolean }>`
  display: flex;
  height: 3rem;
  border-radius: 7px;
  align-items: center;
  border: ${(props) =>
    props.border ? '1px solid #65677c' : '0px solid #65677c'};
  margin-right: 2rem;
  padding: 0 15px;
  justify-content: flex-start;
  cursor: pointer;
  margin-bottom: 10px;
`

const Icon = styled.div`
  display: flex;
  width: 1.2rem;
  height: 1.2rem;
  /* padding-bottom: 5px; */
  vertical-align: center;
`
const Text = styled.text`
  font-size: 1rem;
  opacity: 0.5;
  color: #1a1e3d;
  margin-left: 1rem;
  vertical-align: center;
  white-space: nowrap;
  word-wrap: break-word;
  width: inherit;
`

const ButtonWithIcon: React.FunctionComponent<Props> = (props) => {
  const { icon, text, backgroundColor, border, width, textLight = true } = props

  return (
    <ButtonWithIconContainer
      style={{
        backgroundColor: backgroundColor,
        width: width,
        borderColor: textLight ? '#65677c' : '#ccc',
        padding: textLight ? '0 15px' : '10px 15px',
      }}
      border={border || false}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon>{icon}</Icon>
        <Text style={{ opacity: textLight ? 0.5 : 1 }}>{text}</Text>
      </div>
    </ButtonWithIconContainer>
  )
}

export default ButtonWithIcon
