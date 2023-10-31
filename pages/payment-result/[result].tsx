import React, { useEffect } from 'react'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'
import Lottie from 'react-lottie'
import animationDataSuccess from '@public/static/images/134369-sucess.json'
import animationDatFail from '@public/static/images/97670-tomato-error.json'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { NextPage } from 'next'
import { useMyCourses } from '@contexts/MyCoursesContext'

const UpperBlock = styled.div`
  width: 100vw;
  background-color: rgba(181, 181, 181, 0.15);
  display: flex;
  align-self: center;
  flex-wrap: nowrap;
  padding: 3rem 9rem;
`

const UpperText = styled.div`
  font-family: ${fontFamilies.medium};
  font-size: 2rem;
`

const ResultContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 1px 3px 25px -10px rgba(0, 0, 0, 0.56);
  box-shadow: 1px 3px 25px -10px rgba(0, 0, 0, 0.56);
  border-radius: 12px;
  margin: 4rem auto;
  /* max-width: max-content; */
  width: 34rem;
  align-items: center;
  justify-content: center;
`
// const ContentWrapper = styled.div`
//   display: flex;

//   align-items: center;
// `

const AnimationContainer = styled.div`
  max-width: 8rem;
`

const ResultText = styled.div`
  font-family: ${fontFamilies.medium};
  font-size: 1.5rem;
  color: ${colors.uguPurple};
  margin-bottom: 1rem;
`

const YourCourse = styled.div`
  font-family: ${fontFamilies.regular};
  font-size: 1.1rem;
  color: ${colors.uguPurple};
  text-align: center;
  max-width: 25rem;
`
// const BoldText = styled.span`
//   font-family: ${fontFamilies.bold};
// `

const EmailText = styled.div`
  font-family: ${fontFamilies.light};
  font-size: 0.8rem;
  margin-top: 0.5rem;

  color: ${colors.uguPurple};
`
const HappyLearning = styled.div`
  font-family: ${fontFamilies.medium};
  margin-top: 1rem;
  font-size: 1.2rem;
  color: ${colors.uguPurple};
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 2rem;
`
const GoHome = styled.div`
  font-family: ${fontFamilies.light};
  font-size: 1rem;
  color: ${colors.uguPurple};
  border: 1px solid ${colors.uguPurple};
  padding: 1rem 2rem;
  border-radius: 30px;
  margin-right: 1rem;
  cursor: pointer;
  text-align: center;
`

const GoToMyCourses = styled.div`
  font-family: ${fontFamilies.light};
  font-size: 1rem;
  color: white;
  padding: 1rem 2rem;
  background-color: ${colors.uguPurple};
  border-radius: 30px;
  cursor: pointer;
  text-align: center;
`

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'courses',
        'footer',
      ])),
    },
  }
}

const PaymentResult: NextPage = () => {
  const router = useRouter()
  const { result } = router.query
  const { refreshMyCourses } = useMyCourses()
  //refresh my courses from api
  useEffect(() => {
    if (result == 'success') refreshMyCourses()
  }, [])
  return (
    <Layout>
      <UpperBlock>
        <UpperText>Cart</UpperText>
      </UpperBlock>
      <ResultContainer>
        <AnimationContainer>
          <Lottie
            options={{
              loop: false,
              autoplay: true,
              animationData:
                result === 'success' ? animationDataSuccess : animationDatFail,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
          />
        </AnimationContainer>
        <ResultText>
          {result === 'success' ? 'Payment Successful' : 'Payment Failed'}
        </ResultText>
        {result === 'success' ? (
          <YourCourse>
            Your Course(s){' '}
            {/* <BoldText>
              How to Become Pro in Web & Mobile Development in 2023 with OpenAI
              Chat{' '}
            </BoldText> */}
            have been purchased successfully.
          </YourCourse>
        ) : (
          <YourCourse>
            Your Payment has failed{' '}
            {/* <BoldText>insufficient funds/err.</BoldText>{' '} */}
          </YourCourse>
        )}
        {result === 'success' ? (
          <>
            <EmailText>
              {"We've sent you the reciept to the provided email."}
            </EmailText>
          </>
        ) : null}
        <HappyLearning>
          {result == 'success' ? 'Happy Learning!' : 'Please try again.'}
        </HappyLearning>
        <ButtonContainer>
          <GoHome
            onClick={() => {
              if (result === 'success') {
                window.location.replace('/')
              }
            }}
          >
            {result === 'success' ? 'Go to Home' : 'Report and issue'}
          </GoHome>
          <GoToMyCourses
            onClick={() => {
              if (result === 'success') {
                window.location.replace('/my-courses')
              } else {
                window.location.replace('/cart')
              }
            }}
          >
            {result === 'success' ? 'Go to My Courses' : 'Try Again'}
          </GoToMyCourses>
        </ButtonContainer>
      </ResultContainer>
    </Layout>
  )
}

export default PaymentResult
