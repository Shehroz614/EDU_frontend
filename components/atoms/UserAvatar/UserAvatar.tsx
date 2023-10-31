import React from 'react'
import { useAuth } from '@hooks/useAuth'
import Avatar from '../Avatar/Avatar'

interface UserAvatarProps {
  style?: React.CSSProperties
  size?: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({ style, size }) => {
  const { authState } = useAuth()

  // get the user's full name if it exists, or default to an empty string
  const name = authState.user ? `${authState.user?.first_name}` : ''

  return (
    <Avatar
      username={name}
      src={authState.user?.avatar}
      style={style}
      size={size}
    />
  )
}

export default UserAvatar
