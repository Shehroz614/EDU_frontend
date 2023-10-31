import React from 'react'
import { parseSocialLink } from '@helpers/parseSocialLinkHelper'
import styled from '@emotion/styled'
import ExitIcon from '@public/static/icons/profile/exitIcon'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-right: 0.5rem;
`
const Link = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`
const UserNameContainer = styled.div``
const CrossContainer = styled.div`
  width: 1rem;
  cursor: pointer;
`

type AuthorSocialLinkProps = {
  link: string
  onDelete?: () => void
}

const AuthorSocialLink: React.FC<AuthorSocialLinkProps> = ({
  link,
  onDelete,
}) => {
  const profileInfo = parseSocialLink(link)

  return profileInfo ? (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      ></link>
      <Container>
        <Link href={link} target="_blank" rel="noopener noreferrer">
          <i
            className={`bi bi-${profileInfo.type}`}
            style={{ fontSize: '2rem' }}
          ></i>

          <UserNameContainer> {profileInfo.username} </UserNameContainer>
        </Link>
        {!!onDelete && (
          <CrossContainer onClick={onDelete}>
            <ExitIcon />
          </CrossContainer>
        )}
      </Container>
    </>
  ) : (
    <></>
  )
}

export default AuthorSocialLink
