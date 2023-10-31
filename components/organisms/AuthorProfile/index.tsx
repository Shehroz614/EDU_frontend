import React, { useState } from 'react'
import RoundedButton from 'components/atoms/Button'
import {
  RowContainer,
  RightContainer,
  TextContainer,
} from 'components/organisms/StudentProfile'
import TextInput from 'components/atoms/TextInput'
import * as Styles from 'configs/styles/config'
import WriteIcon from 'public/static/icons/write-icon-for-input'
import CheckMarkIcon from 'public/static/icons/checkmark-icon'
import styled from '@emotion/styled'
import { colors } from 'configs/styles/config'
import { useTranslation } from 'react-i18next'

const RoundedItem = styled.div`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 25px;
  background-color: #e5e5e5;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
`

const CheckAnswearIcon = styled.div`
  display: flex;
  width: 1.1rem;
  height: 1.1rem;
  font-size: 0.5rem;
  font-weight: bold;
  background-color: ${colors.uguYellow};
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`

// export async function getServerSideProps({ locale }: { locale: string }) {
//   return {
//       props: {
//           ...(await serverSideTranslations(locale, ['common'])),
//       },
//   }
// }

const AuthorProfile = () => {
  const [check, setCheck] = useState(true)

  const { t } = useTranslation(['common'])
  return (
    <RightContainer>
      <TextInput
        icon={<WriteIcon />}
        width="26.35rem"
        height="3rem"
        border="1px solid #d8d8d8"
        marginLeft="1rem"
        marginBottom="1.8rem"
        value="www.website.com"
        fontSize="0.9rem"
        padding="0 1rem 0 2rem"
      />
      <TextInput
        icon={<WriteIcon />}
        width="26.35rem"
        height="3rem"
        border="1px solid #d8d8d8"
        marginLeft="1rem"
        marginBottom="1.8rem"
        value="Facebook"
        fontSize="0.9rem"
        padding="0 1rem 0 2rem"
      />
      <RowContainer>
        <RoundedItem
          onClick={() => {
            setCheck(!check)
          }}
        >
          {check && (
            <CheckAnswearIcon>
              <CheckMarkIcon width="0.5rem" height="0.5rem" color="#ffffff" />
            </CheckAnswearIcon>
          )}
        </RoundedItem>
        <TextContainer>
          {t('strings.Display on my profile courses I m taking')}
        </TextContainer>
      </RowContainer>
      <RoundedButton
        width="15.2rem"
        height="3rem"
        fontWeight="bold"
        fontSize="0.9rem"
        backgroundColor={Styles.colors.uguYellow}
        text="Save"
        marginTop="2.55rem"
        marginLeft="1rem"
      />
    </RightContainer>
  )
}

export default AuthorProfile
