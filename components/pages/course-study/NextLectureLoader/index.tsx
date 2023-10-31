import styled from '@emotion/styled'
import { colors } from 'configs/styles/config'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  position: absolute;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BackgroundLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #1e1e1e;
  border-radius: 15px;
  opacity: 0.9;
`
const ContentWrapper = styled.div`
  display: flex;
  z-index: 1;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  padding: 1rem;
`

const UpperPartWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const NextLabel = styled.div`
  font-size: 0.875rem;
`

const CircleWrapper = styled.div`
  border-radius: 50%;
  border: 1px solid ${colors.uguWhite};
  width: 1.5rem;
  height: 1.5rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* align-self: flex-start; */
  margin-right: 0.5rem;
`

const MiddlePartWrapper = styled.div`
  display: flex;
  font-size: 0.875rem;
`

const BottomPartWrapper = styled.div`
  display: flex;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`
const Button = styled.button`
  padding: 5px 10px;
  margin-right: 0.5rem;
  :hover {
    cursor: pointer;
  }
  /* border: 1px solid ${colors.uguDarkGrey}; */
  /* border-color: ${colors.uguLightGrey}; */
  border-radius: 7px;
`

type NextLectureLoaderProps = {
  seconds: number
  nextLectureTitle: string
  onCancelPress?: () => void
  onPlayPress?: () => void
}

const NextLectureLoader: React.FC<NextLectureLoaderProps> = (props) => {
  const { t } = useTranslation(['common'])

  const { seconds, nextLectureTitle, onCancelPress, onPlayPress } = props
  return (
    <Wrapper>
      <BackgroundLayer />
      <ContentWrapper>
        <UpperPartWrapper>
          <CircleWrapper>{seconds}</CircleWrapper>
          <NextLabel>{t('Next lecture:')} </NextLabel>
        </UpperPartWrapper>
        <MiddlePartWrapper>
          {nextLectureTitle ||
            '23. IMPORTANT! Preventing Unnecessary Re-Evaluations with React.memo() and other important Hooks.'}
        </MiddlePartWrapper>
        <BottomPartWrapper>
          <Button onClick={onCancelPress}>{t('buttons.Cancel')}</Button>
          <Button onClick={onPlayPress}>{t('buttons.Play')}</Button>
        </BottomPartWrapper>
      </ContentWrapper>
    </Wrapper>
  )
}

export default NextLectureLoader
