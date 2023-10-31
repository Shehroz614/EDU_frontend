import { NextPage } from 'next'
import React, { useCallback, useEffect, useState } from 'react'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import {
  AuthorVerifyWrapper,
  CollapseContentRowWrapper,
  CollapseContentRow,
  CollapseContentWrapper,
  IllustrationWrapper,
  LoaderContainer,
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderTitle,
  Select,
  VerifyStepsWrapper,
  VerifyStepWrapper,
} from '@styled_components/verification/styled.components'
import createAccountVerificationSession from '@services/api/user/createAccountVerificationSession'
import { useAuth } from '@hooks/useAuth'
import { useRouter } from 'next/router'
import Loader from '@components/organisms/Loader'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Collapse, Text, Badge, Button, Card } from '@nextui-org/react'
import countries from '@constants/stripeConnectSupportedCountries'
import getAccountVerificationStatus from '@services/api/user/getAccountVerificationStatus'
import {
  excludedRequirementsForDisplay,
  stripeRequirements,
} from '@constants/stripeRequirements'
import PopUpBottom from '@components/organisms/PopUpBottom'
import { BottomNotification } from '@type/main'
import requestAuthorVerification from '@services/api/user/requestAuthorVerification'
import VerifyAuthorIllustration from '@public/static/vectorIllustrations/verifyAuthorIllustration'
import { useTranslation } from 'react-i18next'
import resetAccountVerificationSession from '@services/api/user/resetAccountVerificationSession'

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'wishlist',
        'verification',
        'statusMessages',
        'footer',
      ])),
    },
  }
}

const VerificationPage: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  //const [isApiLoading, setIsApiLoading] = useState<boolean>(false)
  const [activeAccordion, setActiveAccordion] = useState<number>(0)
  const [selectedCountry, setSelectedCountry] = useState<any>('')
  const [accountStatus, setAccountStatus] = useState<any>({})
  const [bottomNotification, setBottomNotification] = useState<
    boolean | BottomNotification
  >(false)

  const {
    authState: { isAuthenticated, isLoading: isAuthLoading },
  } = useAuth()

  useEffect(() => {
    if (!isAuthenticated && !isAuthLoading) {
      router.push({ pathname: '/', query: { showAuth: 'true' } })
    }
  }, [isAuthLoading, isAuthenticated, router])

  useEffect(() => {
    fetchAccountVerificationStatus()
  }, [])

  const fetchAccountVerificationStatus = useCallback(async () => {
    try {
      const response = await getAccountVerificationStatus()
      setAccountStatus(response)
      if (!response.stripe.hasOwnProperty('country')) {
        setActiveAccordion(1)
      }
      if (response.stripe.hasOwnProperty('country')) {
        setSelectedCountry(response.stripe.country)
      }
      if (
        response.stripe.hasOwnProperty('country') &&
        response?.stripe?.requirements?.eventually_due.length !== 0 &&
        !response.edugram.submitted
      ) {
        setActiveAccordion(2)
      }

      if (
        response?.stripe?.requirements?.eventually_due.length === 0 ||
        response.edugram.submitted
      ) {
        setActiveAccordion(3)
      }
      if (response.edugram.verified) {
        setActiveAccordion(0)
      }
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      setBottomNotification({
        message: t('somethingWentWrongPleaseTryAgain', {
          ns: 'statusMessages',
        }),
        actionType: 'error',
      })
    }
  }, [t])

  const handleCountrySelect = ({ target }: any) => {
    try {
      setSelectedCountry(target.value)
      setActiveAccordion(2)
    } catch (err) {
      console.log(err)
    }
  }
  const handleVerificationSetupButton = async () => {
    try {
      setBottomNotification({
        message: t('pleaseWaitYouWillBeRedirected', {
          ns: 'statusMessages',
        }),
        actionType: 'success',
      })
      const response = await createAccountVerificationSession(selectedCountry)
      window.location.href = response.url as string
    } catch (err) {
      console.log(err)
      setBottomNotification({
        message: t('somethingWentWrongPleaseTryAgain', {
          ns: 'statusMessages',
        }),
        actionType: 'error',
      })
    }
  }

  const submitForVerification = async () => {
    try {
      const response = await requestAuthorVerification()
      if (response) {
        await fetchAccountVerificationStatus()
        setBottomNotification({
          message: t('requestSubmitted', { ns: 'verification' }),
          actionType: 'success',
        })
      }
    } catch (err) {
      setBottomNotification({
        message: t('somethingWentWrongPleaseTryAgain', {
          ns: 'statusMessages',
        }),
        actionType: 'error',
      })
    }
  }

  const handleResetCountry = async () => {
    try {
      await resetAccountVerificationSession()
      setAccountStatus({})
      setSelectedCountry('')
      setActiveAccordion(1)
    } catch (err) {
      console.log(err)
      setBottomNotification({
        message: 'Something went wrong, please try again later',
        actionType: 'error',
      })
    }
  }

  return (
    <Layout>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <PageContainer>
          <PageHeader>
            <PageHeaderTitle>
              {t('authorVerification', { ns: 'verification' })}
            </PageHeaderTitle>
          </PageHeader>
          <PageContent>
            <IllustrationWrapper>
              <VerifyAuthorIllustration width={'25rem'} height={'25rem'} />
            </IllustrationWrapper>
            <AuthorVerifyWrapper>
              <VerifyStepsWrapper>
                {accountStatus?.edugram?.verified && (
                  <Card
                    variant="flat"
                    style={{ background: '#17C964', marginBottom: 20 }}
                  >
                    <Card.Body style={{ padding: '20px 30px' }}>
                      <Text color="#FFF">
                        Congratulations! Your profile is now verified
                      </Text>
                    </Card.Body>
                  </Card>
                )}
                <VerifyStepWrapper>
                  <Collapse
                    bordered
                    title={t('selectYourCountry', { ns: 'verification' })}
                    subtitle={t('whereYouOrYourBusinessIsBased', {
                      ns: 'verification',
                    })}
                    expanded={activeAccordion === 1}
                    disabled={selectedCountry !== null}
                    arrowIcon={
                      selectedCountry !== null ? (
                        <Badge color="success" variant="dot" />
                      ) : null
                    }
                    style={{
                      width: '100%',
                    }}
                  >
                    <Select
                      onChange={handleCountrySelect}
                      defaultValue={selectedCountry}
                      value={selectedCountry}
                    >
                      <option value="">
                        {t('selectCountry', { ns: 'verification' })}
                      </option>
                      {Object.keys(countries).map((c) => (
                        <option key={c} value={c}>
                          {countries[c]}
                        </option>
                      ))}
                    </Select>
                  </Collapse>
                </VerifyStepWrapper>
                {selectedCountry &&
                  !(
                    accountStatus?.stripe?.requirements?.eventually_due
                      .length === 0 &&
                    accountStatus?.stripe?.requirements?.disabled_reason ===
                      null
                  ) && (
                    <VerifyStepWrapper>
                      <CollapseContentRow>
                        <CollapseContentRowWrapper style={{ paddingRight: 20 }}>
                          <Text>
                            {t('selectedCountry', {
                              ns: 'verification',
                              selectedCountry: selectedCountry,
                            })}
                          </Text>
                        </CollapseContentRowWrapper>
                        <CollapseContentRowWrapper>
                          <Button
                            color="warning"
                            disabled={
                              accountStatus?.stripe?.requirements
                                ?.eventually_due.length === 0 &&
                              accountStatus?.stripe?.requirements
                                ?.disabled_reason === null
                            }
                            onClick={handleResetCountry}
                          >
                            {t('changeCountry', {
                              ns: 'verification',
                            })}
                          </Button>
                        </CollapseContentRowWrapper>
                      </CollapseContentRow>
                    </VerifyStepWrapper>
                  )}
                <VerifyStepWrapper>
                  <Collapse
                    bordered
                    title={t('completeYourIdentityCheck', {
                      ns: 'verification',
                    })}
                    subtitle={t('provideLegalTaxBankingDetails', {
                      ns: 'verification',
                    })}
                    disabled={
                      !selectedCountry ||
                      (accountStatus?.stripe?.requirements?.eventually_due
                        .length === 0 &&
                        accountStatus?.stripe?.requirements?.disabled_reason ===
                          null)
                    }
                    expanded={activeAccordion === 2}
                    arrowIcon={
                      accountStatus?.stripe?.requirements?.eventually_due
                        .length === 0 &&
                      accountStatus?.stripe?.requirements?.disabled_reason ===
                        null ? (
                        <Badge color="success" variant="dot" />
                      ) : null
                    }
                    style={{
                      width: '100%',
                    }}
                  >
                    <CollapseContentWrapper>
                      {accountStatus?.stripe?.requirements ? (
                        <>
                          <CollapseContentRowWrapper>
                            <Text>
                              {t('pleaseProvideDetails', {
                                ns: 'verification',
                              })}
                            </Text>
                          </CollapseContentRowWrapper>
                          <CollapseContentRowWrapper>
                            <Text>
                              <ol>
                                {accountStatus?.stripe?.requirements?.eventually_due
                                  .filter(
                                    (i: string) =>
                                      !excludedRequirementsForDisplay.includes(
                                        i
                                      ) &&
                                      (!accountStatus?.stripe?.requirements?.eventually_due?.includes(
                                        'business_type'
                                      ) ||
                                        !i.startsWith('representative'))
                                  )
                                  .map((r: string) => {
                                    console.log(r)
                                    return (
                                      <li key={r}>{stripeRequirements[r]}</li>
                                    )
                                  })}
                              </ol>
                            </Text>
                          </CollapseContentRowWrapper>
                          <CollapseContentRowWrapper>
                            <Text>
                              {t('provideLegalTaxBankingDetails', {
                                ns: 'verification',
                              })}
                            </Text>
                          </CollapseContentRowWrapper>
                        </>
                      ) : (
                        <CollapseContentRowWrapper>
                          <Text>
                            {t('edugramRequiresTheseDetails', {
                              ns: 'verification',
                            })}
                          </Text>
                        </CollapseContentRowWrapper>
                      )}
                      <CollapseContentRowWrapper>
                        <Button onPress={handleVerificationSetupButton}>
                          {accountStatus?.stripe?.requirements
                            ? t('resumeVerification', {
                                ns: 'verification',
                              })
                            : t('startVerification', {
                                ns: 'verification',
                              })}
                        </Button>
                      </CollapseContentRowWrapper>
                    </CollapseContentWrapper>
                  </Collapse>
                </VerifyStepWrapper>
                <VerifyStepWrapper>
                  <Collapse
                    bordered
                    title={t('submitForReview', {
                      ns: 'verification',
                    })}
                    subtitle={t('oneStepAwayFromBeingVerified', {
                      ns: 'verification',
                    })}
                    disabled={
                      !selectedCountry ||
                      accountStatus?.stripe?.requirements?.eventually_due
                        ?.length !== 0 ||
                      accountStatus?.edugram?.verified
                    }
                    expanded={activeAccordion === 3}
                    arrowIcon={
                      accountStatus?.edugram?.submitted ||
                      accountStatus?.edugram?.verified ? (
                        <Badge color="success" variant="dot" />
                      ) : null
                    }
                    style={{
                      width: '100%',
                    }}
                  >
                    <CollapseContentWrapper>
                      <CollapseContentRowWrapper>
                        {accountStatus?.edugram?.submitted ? (
                          <Text>
                            {t('verificationSubmitted', {
                              ns: 'verification',
                            })}
                          </Text>
                        ) : (
                          <Text>
                            {t('congratulationMessage', {
                              ns: 'verification',
                            })}
                          </Text>
                        )}
                      </CollapseContentRowWrapper>
                      {!accountStatus?.edugram?.submitted && (
                        <CollapseContentRowWrapper>
                          <Button
                            color="success"
                            onPress={submitForVerification}
                          >
                            {t('submitForReview', {
                              ns: 'verification',
                            })}
                          </Button>
                        </CollapseContentRowWrapper>
                      )}
                    </CollapseContentWrapper>
                  </Collapse>
                </VerifyStepWrapper>
              </VerifyStepsWrapper>
            </AuthorVerifyWrapper>
            {bottomNotification && (
              <PopUpBottom
                bottomNotification={bottomNotification as BottomNotification}
                setShowPopUp={setBottomNotification}
              />
            )}
          </PageContent>
        </PageContainer>
      )}
    </Layout>
  )
}
export default VerificationPage
