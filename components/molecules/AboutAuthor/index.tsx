import React from 'react'
import styled from '@emotion/styled'
import IconText from '../../atoms/IconText'
// import Rating from '../Rating'
import { StudentQtyIcon } from '../../../public/static/icons/students-qty-icon'
import LecturesQtyIcon from '../../../public/static/icons/lectures-qty-icon'
import TinyEditor from '../TinyEditor'
import { useTranslation } from 'react-i18next'
import UserIcon from '@public/static/icons/headerIcons/user-icon'
import Rating from '@components/atoms/Rating'
import { fontFamilies } from '@configs/styles/config'

type AboutAuthorProps = {
  /**
   * value of the rating
   */
  value: string
}

const AboutAuthorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  color: #1a1e3d;
  width: 100%;
`

const Title = styled.div`
  font-size: 1.25rem;
`

const AboutAuthorBlock = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  margin-top: 2rem;
  padding: 2rem;
  box-sizing: border-box;
  flex: 1;
  @media (max-width: 515px) {
    padding: 0;
  }
`

const UserIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.4rem;
  border-radius: 100%;
  width: 100%;
  max-width: 130px;
  padding: 1rem;
  aspect-ratio: 1;
  height: max-content;
  min-width: 65px;
  background-color: rgba(107, 181, 201, 0.25);
`
const AuthorInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  padding: 1rem;
  flex: 1;
`
const AuthorName = styled.div`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
`
const AuthorNumbersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  @media (max-width: 515px) {
    transform: scale(0.8);
    margin-left: -30px;
  }
`

const IconTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 0.7rem;
`
const EditorDesktop = styled.div`
  display: block;
  @media (max-width: 600px) {
    display: none;
  }
`

const EditorMobile = styled.div`
  display: block;
  @media (min-width: 601px) {
    display: none;
  }
`

const AboutAuthor: React.FunctionComponent<AboutAuthorProps> = (props) => {
  const { value } = props

  const { t } = useTranslation(['aboutAuthor'])

  return (
    <AboutAuthorWrapper>
      <Title>{t('aboutAuthor')}</Title>
      <AboutAuthorBlock>
        <UserIconWrapper>
          <UserIcon width="55%" />
        </UserIconWrapper>
        <AuthorInfoWrapper>
          <AuthorName>Henry Brown</AuthorName>
          <AuthorNumbersWrapper>
            <IconTextWrapper>
              <Rating
                value={4}
                showText={true}
                text="1,944"
                iconMargin="0.5rem"
              />
            </IconTextWrapper>
            <IconTextWrapper>
              <IconText
                icon={<StudentQtyIcon width="0.8rem" />}
                text="17,755 Students"
                fontFamily={fontFamilies.light}
                opacity={'1'}
              />
            </IconTextWrapper>
            <IconTextWrapper>
              <IconText
                icon={<LecturesQtyIcon />}
                text="8 Courses"
                fontFamily={fontFamilies.light}
                opacity={'1'}
              />
            </IconTextWrapper>
          </AuthorNumbersWrapper>
          <EditorDesktop>
            <TinyEditor readOnly={true} value={value} />
          </EditorDesktop>
        </AuthorInfoWrapper>
      </AboutAuthorBlock>
      <EditorMobile>
        <TinyEditor readOnly={true} value={value} />
      </EditorMobile>
    </AboutAuthorWrapper>
  )
}

export default AboutAuthor
