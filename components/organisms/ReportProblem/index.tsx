import React, { useState } from 'react'
import Button from '@components/atoms/Button'
import Modal from '@components/molecules/Modal'
import { colors, fontFamilies } from '@configs/styles/config'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'
import {
  Input,
  Grid,
  Textarea,
  Dropdown,
  FormElement,
  Text,
} from '@nextui-org/react'
import Lottie from 'react-lottie'
import contact from '@public/static/icons/contact.json'
import {
  problemTitleTextLimit,
  problemDescriptionTextLimit,
  contactEmailTextLimit,
  problemDescriptionTextMin,
} from 'configs/constants/textLimits'
import { reportProblemHelper } from '@helpers/reportProblem'

const ModalWrapper = styled.div`
  display: fixed;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  width: 100%;
  @media (min-width: 430px) {
    padding: 0 2rem;
  }
`

const ReportProblemHeader = styled.div`
  display: flex;
  font-size: large;
  font-weight: 500;
`

const SuccessHeader = styled.div`
  display: flex;
  font-size: x-large;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${colors.uguPurple};
`

const SuccessHeader2 = styled.div`
  display: flex;
  font-size: medium;
  font-weight: 400;
  text-align: center;
  margin-bottom: 2rem;
  color: ${colors.uguPurple};
`

const SuccessHeader3 = styled.div`
  display: flex;
  font-size: large;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${colors.uguPurple};
`

type ReportProblemProps = {
  onClose: () => void
  itemType?: 'course' | 'comment'
  itemId?: string
}

const ReportProblem: React.FC<ReportProblemProps> = (props) => {
  const { onClose, itemType = 'noType', itemId = 'noId' } = props
  const [problemType, setProblemType] = useState<
    ['default'] | ['legalConcern'] | ['featureRequest'] | ['uiUxProblems']
  >(['default'])
  const [problemTitle, setProblemTitle] = useState<string>('')
  const [problemDescription, setProblemDescription] = useState<string>('')
  const [isDescriptionFieldTouched, setIsDescriptionFieldTouched] =
    useState(false)
  const [problemContact, setProblemContact] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const { t } = useTranslation(['common', 'reportProblem'])

  const defaultOptions = {
    loop: 2,
    autoplay: true,
    animationData: contact,
  }

  const validateEmail = (value: string) => {
    return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)
  }

  const helper = React.useMemo(() => {
    if (!problemContact)
      return {
        text: '',
        color: '',
      }
    const isValid = validateEmail(problemContact)
    return {
      text: isValid ? '' : 'Enter a valid email',
      color: isValid ? 'success' : 'error',
      valid: isValid ? true : false,
    }
  }, [problemContact])

  const problemTypeLabel = React.useMemo(() => {
    switch (problemType[0]) {
      case 'legalConcern':
        return 'Report Legal Concerns'
      case 'featureRequest':
        return 'Request a New Feature'
      case 'uiUxProblems':
        return 'Report UI/UX Problem'
      case 'default':
        return 'Select Problem Type'
    }
  }, [problemType])

  const problemTypeHandler = (keys: any) => {
    const key = Array.from(keys).join(', ').replaceAll('_', ' ')
    setProblemType([key as 'default'])
  }

  const problemTitleHandler = (e: React.ChangeEvent<FormElement>) => {
    const inputValue: string = e.target.value
    setProblemTitle(inputValue)
  }

  const validateDescription = (value: string) => {
    return value.length > 50 || value.length === 0 ? true : false
  }

  const helperDescription = React.useMemo(() => {
    if (
      problemDescription.length >= 50 ||
      problemDescription.length === 0 ||
      !isDescriptionFieldTouched
    )
      return {
        text: '',
        color: '',
      }

    const isValid = validateDescription(problemDescription)
    return {
      text: isValid ? '' : 'Minimum 50 char is required',
      color: isValid ? 'success' : 'error',
    }
  }, [problemDescription, isDescriptionFieldTouched])

  const problemDescriptionHandler = (e: React.ChangeEvent<FormElement>) => {
    const inputValue: string = e.target.value
    setProblemDescription(inputValue)
  }

  const problemContactHandler = (e: React.ChangeEvent<FormElement>) => {
    const inputValue: string = e.target.value
    setProblemContact(inputValue)
  }

  const reportProblemHandler = () => {
    if (
      problemTitle !== '' &&
      // problemDescription.length > 50 &&
      problemType[0] !== 'default'
    ) {
      reportProblemHelper(problemTitle, problemDescription, problemType[0], {
        itemId: itemId,
        itemType: itemType,
      })
        .then(() => {
          //Report Problem has been created succesfully.
          console.log('Report Problem has been created succesfully.')
          setSuccess(true)
        })
        .catch((err) => {
          console.log(err)
          setError(true)
        })
    }
  }

  return (
    <Modal onClose={onClose} blurredBackground>
      <ModalWrapper>
        <Grid.Container
          gap={3.5}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: '15rem',
            margin: 'auto',
          }}
        >
          {success ? (
            <>
              <SuccessHeader>
                {t('Thanks for your help!', { ns: 'reportProblem' })}
              </SuccessHeader>
              <SuccessHeader2>
                {t('Your Problem submitted', { ns: 'reportProblem' })}
              </SuccessHeader2>
              <SuccessHeader3>
                {t('Report a problem', { ns: 'reportProblem' })}
                Have a nice day!
              </SuccessHeader3>

              <Button
                marginBottom="2rem"
                width="40%"
                height="3rem"
                text={t('Close', { ns: 'Close' })}
                fontWeight="light"
                fontFamily={fontFamilies.medium}
                backgroundColor={colors.uguWhite}
                border="1px solid"
                borderColor={colors.uguPurple}
                onClick={onClose}
              />
            </>
          ) : (
            <>
              <Grid
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Lottie options={defaultOptions} height={200} width={200} />
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  width: '100%',
                }}
              >
                <ReportProblemHeader>
                  {t('Report a problem', { ns: 'reportProblem' })}
                </ReportProblemHeader>
              </Grid>
              {error ? (
                <Text color="error">
                  {t('Something went wrong', { ns: 'reportProblem' })}
                </Text>
              ) : null}
              <Grid
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Dropdown>
                  <Dropdown.Button
                    rounded
                    bordered
                    light
                    style={{ width: '100%' }}
                  >
                    {problemTypeLabel}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    variant="light"
                    aria-label="Actions"
                    disallowEmptySelection
                    selectedKeys={problemType}
                    selectionMode="single"
                    onSelectionChange={(keys) => problemTypeHandler(keys)}
                  >
                    <Dropdown.Item key="legalConcern">
                      {t('Report Legal Concerns', { ns: 'reportProblem' })}
                    </Dropdown.Item>
                    <Dropdown.Item key="featureRequest">
                      {t('Request a New Feature', { ns: 'reportProblem' })}
                    </Dropdown.Item>
                    <Dropdown.Item key="uiUxProblems">
                      {t('Report UI/UX Problem', { ns: 'reportProblem' })}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Input
                  rounded
                  bordered
                  labelPlaceholder={t('Problem Title', { ns: 'reportProblem' })}
                  value={problemTitle}
                  onChange={(e) => problemTitleHandler(e)}
                  color="primary"
                  width="100%"
                  maxLength={problemTitleTextLimit}
                />
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Textarea
                  bordered
                  color="primary"
                  labelPlaceholder={t('Problem Description', {
                    ns: 'reportProblem',
                  })}
                  onChange={(e) => problemDescriptionHandler(e)}
                  status="default"
                  width="100%"
                  style={{ height: '5rem' }}
                  maxLength={problemDescriptionTextLimit}
                  minLength={problemDescriptionTextMin}
                  helperColor={
                    helperDescription.color as 'error' | 'success' | undefined
                  }
                  helperText={helperDescription.text}
                  onBlur={() => setIsDescriptionFieldTouched(true)}
                />
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Input
                  rounded
                  bordered
                  type="email"
                  labelPlaceholder={t('Contact Email', { ns: 'reportProblem' })}
                  value={problemContact}
                  onChange={(e) => problemContactHandler(e)}
                  color="primary"
                  helperColor={helper.color as 'error' | 'success' | undefined}
                  helperText={helper.text}
                  width="100%"
                  maxLength={contactEmailTextLimit}
                />
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Button
                  disabled={
                    problemTitle.length === 0 ||
                    problemDescription.length === 0 ||
                    problemDescription.length < 50 ||
                    !helper.valid ||
                    problemType[0] === 'default'
                  }
                  width="80%"
                  height="3rem"
                  text={t('Report a problem', { ns: 'reportProblem' })}
                  fontWeight="bold"
                  fontFamily={fontFamilies.medium}
                  backgroundColor={colors.uguYellow}
                  onClick={() => {
                    reportProblemHandler()
                  }}
                />
              </Grid>
            </>
          )}
        </Grid.Container>
      </ModalWrapper>
    </Modal>
  )
}

export default ReportProblem
