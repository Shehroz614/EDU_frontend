import React, { useState } from 'react'
import styled from '@emotion/styled'
import { RoundedItem, CheckAnswearIcon } from 'components/atoms/CheckAnswear'
// import CheckMarkIcon from 'assets/icons/checkmark-icon'
import RoundedButton from 'components/atoms/Button'
import * as Styles from 'configs/styles/config'
import CheckMarkIcon from 'public/static/icons/checkmark-icon'
import { useTranslation } from 'react-i18next'

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`
export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 11.7rem;
  margin-left: 3.1rem;
`
export const TextContainer = styled.div`
  display: flex;
  width: 17.85rem;
  height: 2.1rem;
  font-size: 0.9rem;
  margin-left: 1.4rem;
`

// export async function getServerSideProps({ locale }: { locale: string }) {
//   return {
//       props: {
//           ...(await serverSideTranslations(locale, ['common'])),
//       },
//   }
// }

const StudentProfile = () => {
  const [check, setCheck] = useState(true)

  const { t } = useTranslation(['common'])

  return (
    <RightContainer>
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
        // title={t('buttons.Apply')}
        marginTop="12.4rem"
        marginLeft="1rem"
      />
    </RightContainer>
  )
}

export default StudentProfile
