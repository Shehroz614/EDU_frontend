import React, { ForwardedRef, forwardRef, useState } from 'react'
import styled from '@emotion/styled'
import { colors, fontFamilies } from 'configs/styles/config'
import Button from 'components/atoms/Button'
import InfoTextIcon from 'components/atoms/InfoTextIcon'
import TextInput from 'components/atoms/TextInput'
import TextArea from 'components/atoms/TextArea'
import { Section } from '@ugu/types'
import {
  courseMaterialsTitleTextLimit,
  courseSectionDescriptionTextLimit,
} from '@configs/constants/textLimits'
import { useTranslation } from 'next-i18next'
import { Popover } from '@nextui-org/react'
import {
  TooltipWrapper,
  PopoverContentWrapper,
} from '@styled_components/CreateCourse/styled.components'
import { getFragmentedText } from '@utils/getFragmentedText'

type NewSectionProps = {
  section?: Section
  newSection: boolean
  courseId: string
  cancel: () => void
  addNewSection: (title: string, description: string) => void
  editSection: (newTitle: string, sectionId: string) => void
}

const AddSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 4rem;
`

const SectionNameFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: -1.7rem;
`

const SectionDescriptionWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-right: -1.7rem;
  flex-wrap: nowrap;
  white-space: pre-wrap;
`
const AddButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
`

/*
We will pass the section here, OR if it's empty we will create new
We can create a variable new:boolean, which would determine this behavior.
From the existing category we will get title and shortDescription
We will change internal title and shortDesc and will update them on the category
only when 'Save' button is pressed. OR 'Add' button in case it's a new category
Also, if it's a new category we will need to get it back.
OK, I will create function which would return category on press, and that's how I will pass it up.
If it's new - we will simply add it to our Sections Array, but if it's existed one how should I update it?
I can simply use the spread operator or let me check.
Yes, I will use the spread operator and will check for the ID, because we know the id.
const newProjects = projects.map(p =>
  p.value === 'jquery-ui'
    ? { ...p, desc: 'new description' }
    : p
);

Other stuff we have to implement is so that it's not empty.
If it is - we would show error, but first let's implement the main functionality.
*/

const NewSection = forwardRef(
  (props: NewSectionProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      section,
      cancel,
      newSection = true,
      addNewSection,
      editSection,
    } = props

    const [isApiLoading, setIsApiLoading] = useState<boolean>(false)
    const [title, setTitle] = useState(section?.title || '')
    const [shortDescription, setShortDescription] = useState(
      section?.description || ''
    )

    const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }
    const handleShortDescriptionChange = (
      e: React.FormEvent<HTMLTextAreaElement>
    ) => {
      setShortDescription(e.currentTarget.value)
    }

    const addNewSectionHandler = async () => {
      setIsApiLoading(true)
      try {
        await addNewSection(title, shortDescription)
      } catch (err) {}
      setIsApiLoading(false)
    }

    const editSectionHandler = async () => {
      setIsApiLoading(true)
      try {
        if (section?.title !== title) {
          await editSection(title, section!._id)
        } else {
          cancel()
        }
      } catch (err) {}
      setIsApiLoading(false)
    }

    const { t } = useTranslation(['common', 'createCourse'])
    return (
      <AddSectionWrapper ref={ref}>
        <SectionNameFieldWrapper>
          <TextInput
            placeholder={t('placeholders.sectionTitle', { ns: 'createCourse' })}
            width="100%"
            height="2.8rem"
            backgroundColor="#ffffff"
            padding="1rem 2rem"
            marginRight="1rem"
            value={title}
            onChange={handleTitleChange}
            maxLength={courseMaterialsTitleTextLimit}
          />
          <Popover placement="top-right">
            <Popover.Trigger>
              <TooltipWrapper>
                <InfoTextIcon />
              </TooltipWrapper>
            </Popover.Trigger>
            <Popover.Content>
              <PopoverContentWrapper>
                {getFragmentedText(
                  t('tooltips.sectionTitle', { ns: 'createCourse' })
                )}
              </PopoverContentWrapper>
            </Popover.Content>
          </Popover>
        </SectionNameFieldWrapper>
        <SectionDescriptionWrapper>
          <TextArea
            placeholder={t('placeholders.sectionDescription', {
              ns: 'createCourse',
            })}
            width="100%"
            height="10rem"
            backgroundColor="#ffffff"
            padding="1rem 2rem"
            marginRight="1rem"
            borderRadius="25px"
            value={shortDescription}
            onChange={handleShortDescriptionChange}
            maxLength={courseSectionDescriptionTextLimit}
          />
          <Popover placement="top-right">
            <Popover.Trigger>
              <TooltipWrapper>
                <InfoTextIcon marginTop="1rem" />
              </TooltipWrapper>
            </Popover.Trigger>
            <Popover.Content>
              <PopoverContentWrapper>
                {getFragmentedText(
                  t('tooltips.sectionDescription', { ns: 'createCourse' })
                )}
              </PopoverContentWrapper>
            </Popover.Content>
          </Popover>
        </SectionDescriptionWrapper>
        <AddButtonWrapper>
          <Button
            width="13rem"
            height="3rem"
            text={t('buttons.Cancel', { ns: 'common' })}
            fontFamily={fontFamilies.bold}
            backgroundColor={colors.uguPurple}
            color={colors.uguWhite}
            marginLeft="auto"
            marginRight="1.5rem"
            fontSize="0.9rem"
            fontWeight="bold"
            marginBottom="2rem"
            disabled={isApiLoading}
            onClick={cancel}
          />
          <Button
            width="13rem"
            height="3rem"
            text={
              newSection
                ? t('buttons.Add', { ns: 'common' })
                : t('buttons.Save', { ns: 'common' })
            }
            fontFamily={fontFamilies.bold}
            backgroundColor={colors.uguYellow}
            color={colors.uguPurple}
            // marginLeft="auto"
            fontSize="0.9rem"
            fontWeight="bold"
            marginBottom="2rem"
            disabled={isApiLoading || !(title && shortDescription)}
            onClick={() =>
              newSection ? addNewSectionHandler() : editSectionHandler()
            }
          />
        </AddButtonWrapper>
      </AddSectionWrapper>
    )
  }
)

NewSection.displayName = 'NewSection'
export default NewSection
