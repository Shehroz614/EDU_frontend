import { colors, fontFamilies } from '@configs/styles/config'
import styled from '@emotion/styled'
import CloseIcon from '@public/static/icons/close-icon'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const PopUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const PopUpWHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 0.5rem 0;
  z-index: 1;
`
const PopUpWHeaderTitle = styled.div`
  display: flex;
  font-family: ${fontFamilies.bold};
  font-size: 1.25rem;
  align-self: center;
  margin-bottom: 0.5rem;
`
const PopUpWHeaderCloseButton = styled.div`
  display: flex;
  border: 1px solid ${colors.uguPurple};
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 1.15rem;
  height: 1.15rem;
  :hover {
    cursor: pointer;
  }
`
const PopUpBody = styled.div`
  display: flex;
  flex-direction: column;
`

const MessageWrapper = styled.div`
  font-size: 1rem;
  line-height: 1.15rem;
  font-family: ${fontFamilies.regular};
`

type LearnHowWeEstimatePopUpProps = {
  onClose: () => void
}

const LearnHowWeEstimatePopUp: React.FC<LearnHowWeEstimatePopUpProps> = (
  props
) => {
  const { onClose } = props
  const { t } = useTranslation()
  return (
    <PopUpWrapper>
      <PopUpWHeader>
        <PopUpWHeaderCloseButton onClick={() => onClose()}>
          <CloseIcon
            width="0.625rem"
            height="0.625rem"
            backgroundColor={'none'}
          />
        </PopUpWHeaderCloseButton>
      </PopUpWHeader>
      <PopUpBody>
        <PopUpWHeaderTitle>
          {t('howWeEstimateEarnings', { ns: 'aboutAuthor' })}
        </PopUpWHeaderTitle>
        <MessageWrapper>
          <p>
            {`To project your earnings on Edugram, we evaluate the past year's sales
          data from all courses on our platform, particularly focusing on those
          with the Smart Price option selected. This gives us a comprehensive
          dataset from which we determine the average course price, which we
          then multiply by your anticipated student enrollments. Additionally,
          we offer insights into the average number of students enrolled monthly
          for courses on Edugram, assuming they are consistently available.`}
          </p>
          <br />
          <p>
            {`Note: The earnings you see reflect the course price minus our average
          processing fee. Taxes and other costs aren't factored into this
          estimate.`}
          </p>
          <br />
          <p>
            {'\n' +
              `Actual earnings can differ due to course quality, demand, pricing, and
          your promotional strategies. For an optimal course hosting experience
          on Edugram, it's essential to align with our guidelines and any local
          regulations. To delve deeper into the metrics of success and
          understand associated costs, please explore our`}
            <Link href="/pricing" style={{ textDecoration: 'underline' }}>
              {' '}
              {'Edugram Fee'}
            </Link>
            {` section.
          Leveraging our platform's resources can be pivotal in enhancing your
          enrollment figures and revenue.`}
          </p>
        </MessageWrapper>
      </PopUpBody>
    </PopUpWrapper>
  )
}

export default LearnHowWeEstimatePopUp
