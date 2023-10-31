import React from 'react'
import styled from '@emotion/styled'

interface AvatarContainerProps {
  avatarSize: string
}

const AvatarContainer = styled.div<AvatarContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.avatarSize};
  width: ${(props) => props.avatarSize};
  border-radius: 999rem;
  background-color: hsl(0deg 0% 94%);
  box-shadow: 2px 1px 10px 1px #f6f6f6;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
`

const AvatarImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 999rem;
  object-fit: cover;
`

interface AvatarProps {
  src?: string
  username?: string
  style?: React.CSSProperties
  size?: string
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  username,
  style,
  size = '3rem',
}) => {
  return (
    <AvatarContainer style={style} avatarSize={size}>
      {src ? (
        <AvatarImage src={src} alt={username} />
      ) : (
        username && username.charAt(0).toUpperCase()
      )}
    </AvatarContainer>
  )
}

export default Avatar
