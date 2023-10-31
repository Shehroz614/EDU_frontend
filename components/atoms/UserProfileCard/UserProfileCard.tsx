import React from 'react'
import styled from '@emotion/styled'
import { useAuth } from '@hooks/useAuth'
import UserAvatar from '../UserAvatar/UserAvatar'
import { fontFamilies } from '@configs/styles/config'

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
  border-radius: 2rem;
  width: 100%;
`

const UsernameText = styled.div`
  font-size: 1.125rem;
  font-family: ${fontFamilies.medium};
`

const EmailText = styled.div`
  font-size: 0.875rem;
  font-family: ${fontFamilies.light};
`

const UserInfo = styled.div`
  padding-left: 1rem;
  transition: 0.2s;
  text-decoration: none;
`

const UserProfileCard: React.FC = () => {
  const { authState } = useAuth()

  return (
    <UserProfileContainer>
      <UserAvatar />
      <UserInfo>
        <UsernameText>
          {authState.user?.first_name + ' ' + authState.user?.last_name}
        </UsernameText>
        <EmailText>{authState.user?.email}</EmailText>
      </UserInfo>
    </UserProfileContainer>
  )
}

export default UserProfileCard
