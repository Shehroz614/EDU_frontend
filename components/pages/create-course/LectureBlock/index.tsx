import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from '@emotion/styled'
import uniqid from 'uniqid'
import Button from 'components/atoms/Button'
import { colors, fontFamilies } from 'configs/styles/config'
import TextInput from 'components/atoms/TextInput'
import VideoSection from '@pages_components/create-course/UploadVideoBlock'
import AttachResourcesSection from 'components/atoms/AttachResourcesSection'
import TextContent from '@pages_components/create-course/TextContent'
import QuizSection from 'components/atoms/QuizSection'
import RoundButton from 'components/atoms/RoundButton'
import VideoSectionIcon from 'public/static/icons/video-section-icon'
import TextSectionIcon from 'public/static/icons/text-section-icon'
import AttachResourcesIcon from 'public/static/icons/attach-resources-icon'
import {
  CenterNotification,
  Content,
  ContentType,
  Lecture,
  Resource,
  Section,
  UploadedFile,
} from '@ugu/types'
import Checkmark from 'components/atoms/Checkmark'
import Axios from 'axios'
import axios, { CancelTokenSource } from 'axios'

import {
  confirmLectureTextContentChange,
  confirmLectureVideoContentChange,
  confirmResourceDeletion,
  confirmVideoContentDeletion,
} from 'configs/constants/labels/modal-labels'
import UploadedResource from '../UploadedResource'
import {
  fileAlreadyExistsLabel,
  invalidFileLabel,
  invalidResourceSizeLabel,
  invalidResourceTypeLabel,
} from 'configs/constants/labels/create-course-labels'
import getCourseLectureContent from '@services/api/course/getCourseLectureContent'
import linkCourseLectureWithResources from '@services/api/course/linkCourseLectureWithResources'
import deleteCourseLectureResource from '@services/api/course/deleteCourseLectureResource'
import { Tooltip } from '@nextui-org/react'
import getResourceURL from '@services/api/course/getResourceURL'
import createCourseResourceContent from '@services/api/course/createCourseResourceContent'
import { courseMaterialsTitleTextLimit } from '@configs/constants/textLimits'
import PopUpCenter from '@components/organisms/PopUpCenter'
import deleteCourseLectureVideo from '@services/api/course/deleteCourseLectureVideo'

type NewLectureProps = {
  section: Section
  lecture?: Lecture
  newLecture: boolean
  courseId: string
  courseVersion: number
  createBtnDisabled: boolean
  addNewLecture: (
    sectionId: string,
    title: string,
    preview: boolean,
    contentType: ContentType,
    content: any,
    resources: Resource[],
    duration: number
  ) => void
  editLecture: (
    section: Section,
    lecture: Lecture,
    title: string,
    preview: boolean,
    contentType: ContentType,
    content: any,
    resources?: Resource[]
  ) => void
  cancel: () => void
  setBottomNotification: Function
  abortControllers: {
    [key: string]: AbortController
  }
  addAbortController: (name: string, controller: AbortController) => void
  removeAbortController: (name: string) => void
  onImageUpload?: (blob: Blob) => Promise<any>
}

//to cancel Resource uploading
type CancelResource = {
  cancelToken: CancelTokenSource
  resourceId: string
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 4rem;
`

const FirstRowWrapper = styled.div<{
  justifyContent?: string
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : ''};
  align-items: center;
`
const RoundButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const AddContentWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  width: 100%;
`
const AddResourcesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  border: 1px solid #e4e4e4;
  border-radius: 16px;
  padding: 1rem 2rem;
`
const ResourceTitle = styled.div`
  display: flex;
  font-size: 1rem;
  font-family: ${fontFamilies.regular};
  /* margin-bottom: 0.25rem; */
  font-weight: bold;
`

const ResourceDescription = styled.div`
  display: flex;
  font-size: 0.875rem;
  font-family: ${fontFamilies.light};
  margin-bottom: 0.5rem;
`
const ExistingResourcesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const InfoWrapper = styled.div<{
  marginTop?: string
  marginLeft?: string
}>`
  display: flex;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0.8rem')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0.5rem')};
`

export const WhiteCircul = styled.div<{
  marginLeft?: string
  marginTop?: string
}>`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #ffffff;
  border-radius: 16px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0.5rem')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '20.5rem')};
  justify-content: center;
  align-items: center;
`

const AddButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
`

const AdditionalInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
`

const OptionalLectureWrapper = styled.div`
  display: flex;
  border: 1px solid #e4e4e4;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  align-items: center;
  margin-left: auto;
`

const PreviewLecture = styled.div`
  font-size: 0.9rem;
  font-family: ${fontFamilies.bold};
  text-decoration: underline;
  cursor: help;
`

//Description:
//All the content variables will be set to the default value
//when the component is launched, but they will be inititalized using
//useEffect and component has separate useEffect when contentType has changed
//to fetch appropriate content.
//We have 'text' variable that stores Content object
//but we also have videoContent, textContent to store just content(Url for video, string for textContent)

//TODO:
//Separate business logic to useLectureBlock hook
//And keep here only logic responsible for UI rendering
const MAX_RESOURCE_FILE_SIZE = 20480000 //20MB
const allowedResourceTypes: string[] = [
  'jpeg',
  'png',
  'pdf',
  'zip',
  'doc',
  'docx',
  'vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const NewSection = forwardRef(
  (props: NewLectureProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      lecture,
      cancel,
      newLecture = true,
      courseId,
      courseVersion,
      section,
      addNewLecture,
      editLecture,
      createBtnDisabled,
      setBottomNotification,
      abortControllers,
      addAbortController,
      removeAbortController,
      onImageUpload,
    } = props

    let totalResolved = 0
    let totalPromises = 0

    //but this should be corrected as existed lecture cannot have empty title
    const [title, setTitle] = useState(
      newLecture ? '' : lecture?.title ? lecture.title : ''
    )
    //content object will be set if there is content linked with
    //the lecture on the load of the LectureBlock
    const [content, setContent] = useState<Content>()
    const [centerNotification, setCenterNotification] =
      useState<CenterNotification>()
    //mb create for each content its own variable, or think how you can manage it better using one variable.
    const [videoContent, setVideoContent] = useState<Content | undefined>(
      newLecture ? undefined : lecture && lecture.content
    )
    // const [quizSection, setQuizSection] = useState(false)
    // const [doneSection, setDoneSection] = useState(false)
    const [attachmentSection, setAttachmentSection] = useState(
      lecture && lecture.resources && lecture.resources?.length > 0
        ? true
        : false
    )
    const [resources, setResources] = useState<Resource[]>(
      lecture && lecture.resources && lecture.resources.length > 0
        ? lecture.resources
        : []
    )
    const [contentType, setContentType] = useState<ContentType>(
      newLecture
        ? 'video'
        : lecture && lecture.content.type
        ? lecture.content.type
        : 'video'
    ) // this should be changed based on what content is selected OR updated to lecture.content.type
    const [textContent, setTextContent] = useState<string>('')
    //will be implemented later with tests - commented for now
    // const [testContent, setTestContent] = useState()
    const [preview, setPreview] = useState(
      newLecture ? false : lecture?.preview ? lecture?.preview : false
    )
    //show PopUpCenter
    const [showPopUp, setShowPopUp] = useState(true)
    //show PopUpBottom
    //const [showBottomPopUp, setShowBottomPopUp] = useState(false)
    //uploadedFiles include files that are uploaded and being uploaded
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
    const [_progress, setProgress] = useState<number>(0) //from 0-100
    //const [showProgress, setShowProgress] = useState(false) //
    const FILE_CHUNK_SIZE = 10_000_000 //

    const cancelTokens = useRef<CancelResource[]>([])

    //check if it's existed lecture
    //if so - load its content
    useEffect(() => {
      if (!newLecture && lecture) {
        //show load spinner
        if (contentType === 'text' && lecture.content.type === 'text') {
          console.log('Lecture obj: ', lecture)
          getCourseLectureContent(
            courseId,
            courseVersion,
            section._id!,
            lecture._id,
            lecture.content._id
          )
            .then((textContent) => {
              console.log('Received content: ', textContent)
              setContent(textContent)
              setTextContent(textContent.content)
              //hide load spinner
            })
            .catch((err) => {
              console.log('Error fetching content occured: ', err)
              setBottomNotification({
                message: ('Error fetching content: ' + err) as string,
                actionType: 'error',
                duration: 10,
              })
              //hide load spinner
            })
        } else if (
          contentType === 'video' &&
          lecture.content.type === 'video'
        ) {
          getCourseLectureContent(
            courseId,
            courseVersion,
            section._id!,
            lecture._id,
            lecture.content._id,
            true //if true - upload public
          )
            .then((videoContent) => {
              console.log('Received content: ', videoContent)
              setContent(videoContent)
              setVideoContent(videoContent)
              //hide load spinner
            })
            .catch((err) => {
              console.log('Error fetching content occured: ', err)
              setBottomNotification({
                message: ('Error fetching content: ' + err) as string,
                actionType: 'error',
                duration: 10,
              })
              //hide load spinner
            })
        }
      }
    }, [contentType])

    //variables to prevent creating/editing lecture if video is uploading
    const [isVideoUploading, setIsVideoUploading] = useState(false)

    //ANCHOR: Change handlers:

    const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
      const newTitle = e.currentTarget.value
      if (newTitle !== '' || newTitle !== undefined) {
        setTitle(newTitle)
      }
    }

    const handleTextContentChange = (content: string) => {
      console.log('Text content has been changed. New content: ', content)
      setTextContent(content)
    }

    const addNewLectureHandler = () => {
      //check if video is not uploading at the moment
      if (readyForCreation() && checkIfResourcesUploaded()) {
        //Here should be a lot of options
        const resourcesToLink = uploadedFiles.map(
          (uploadedFile) => uploadedFile.resource!
        )

        console.log('resourcesToLink', resourcesToLink)

        if (contentType === 'text') {
          addNewLecture(
            section._id,
            title,
            preview,
            contentType,
            textContent,
            resourcesToLink,
            120
          )
        } else if (contentType === 'video') {
          addNewLecture(
            section._id,
            title,
            preview,
            contentType,
            videoContent,
            resourcesToLink,
            videoContent?.duration as number
          )
        } else {
          //should show up bottom block error stating the same!
          console.log('Please upload or select video!')
          setBottomNotification({
            message: 'Please upload or select video!',
            actionType: 'notification',
            duration: 10,
          })
        }
      }
    }

    const confirmResourceDeletionHandler = (
      resourceId: string,
      isAttached: boolean
    ) => {
      setShowPopUp(true)
      setCenterNotification({
        title: confirmResourceDeletion.title,
        message: confirmResourceDeletion.message,
        firstBtn: {
          title: confirmResourceDeletion.firstBtn.title,
          actionType: confirmResourceDeletion.firstBtn.actionType,
          action: () => {
            deleteResourceHandler(resourceId, isAttached, false)
            setShowPopUp(false)
          },
        },
        secondBtn: {
          title: confirmResourceDeletion.secondBtn.title,
          actionType: confirmResourceDeletion.secondBtn.actionType,
          action: () => {
            setShowPopUp(false)
          },
        },
      })
    }

    //checks what has been changed on a Lecture
    //on Lecture content, contentType, title, resources could change
    //and shows pop-ups
    //BUT this is logic so it should be transfered to separate hook
    //but for now keep it here
    const checkLectureBeforeEditingHandler = () => {
      //check if everything is ready for update
      if (readyForCreation() && checkIfResourcesUploaded()) {
        //check if content existed before - it must exist as it is imposible to have a lecture without content
        if (content) {
          //check if lectureType has changed(compare to content object)
          if (contentType !== content.type) {
            //contentType has changed
            //if contentType has changed - check previous contentType
            if (content.type === 'text') {
              //show pop-up to confirm update
              setShowPopUp(true)
              setCenterNotification({
                title: confirmLectureTextContentChange.title,
                message: confirmLectureTextContentChange.message,
                firstBtn: {
                  title: confirmLectureTextContentChange.firstBtn.title,
                  actionType:
                    confirmLectureTextContentChange.firstBtn.actionType,
                  action: () => {
                    //- if confirmed - should delete textContent but it should be done not here
                    // deleteLectureContentHelper(content._id)
                    //   .then(() => {
                    //     setBottomNotification({
                    //       message: 'Text content has been deleted.',
                    //       actionType: 'success',
                    //       duration: 7,
                    //     })
                    //   })
                    //   .catch((err) => {
                    //     setBottomNotification({
                    //       message:
                    //         'Error occured while deleting Text content: ' + err,
                    //       actionType: 'error',
                    //       duration: 7,
                    //     })
                    //   })
                    //editLecture:
                    setShowPopUp(false)
                    // const combinedResources = getCombinedResources()
                    editLectureHandler()
                  },
                },
                secondBtn: {
                  title: confirmLectureTextContentChange.secondBtn.title,
                  actionType:
                    confirmLectureTextContentChange.secondBtn.actionType,
                  action: () => {
                    setShowPopUp(false)
                  },
                },
              })
              //delete textContent
            } else if (content.type === 'video') {
              //show pop-up
              setShowPopUp(true)
              setCenterNotification({
                title: confirmLectureVideoContentChange.title,
                message: confirmLectureVideoContentChange.message,
                firstBtn: {
                  title: confirmLectureVideoContentChange.firstBtn.title,
                  actionType:
                    confirmLectureVideoContentChange.firstBtn.actionType,
                  action: () => {
                    //- if confirmed - just update
                    setShowPopUp(false)
                    // const combinedResources = getCombinedResources()
                    editLectureHandler()
                  },
                },
                secondBtn: {
                  title: confirmLectureVideoContentChange.secondBtn.title,
                  actionType:
                    confirmLectureVideoContentChange.secondBtn.actionType,
                  action: () => {
                    setShowPopUp(false)
                  },
                },
              })
            }
          } else {
            //contentType hasn't changed
            //if contentType didn't changed, but videoContent id is different then
            //it means that new video has been uploaded and we need to also show a pop-up to confirm
            if (contentType === 'video') {
              if (videoContent?._id !== content._id) {
                //video has changed - show pop-up to confirm
                setShowPopUp(true)
                setCenterNotification({
                  title: confirmLectureVideoContentChange.title,
                  message: confirmLectureVideoContentChange.message,
                  firstBtn: {
                    title: confirmLectureVideoContentChange.firstBtn.title,
                    actionType:
                      confirmLectureVideoContentChange.firstBtn.actionType,
                    action: () => {
                      //- if confirmed - just update
                      setShowPopUp(false)
                      // const combinedResources = getCombinedResources()
                      editLectureHandler()
                    },
                  },
                  secondBtn: {
                    title: confirmLectureVideoContentChange.secondBtn.title,
                    actionType:
                      confirmLectureVideoContentChange.secondBtn.actionType,
                    action: () => {
                      setShowPopUp(false)
                    },
                  },
                })
              } else {
                //ready to be updated
                // const combinedResources = getCombinedResources()
                editLectureHandler()
              }
            } else if (contentType === 'text') {
              //ready to be updated
              // const combinedResources = getCombinedResources()
              editLectureHandler()
            } else if (contentType === 'test') {
              //for the future
            }
          }
        } else {
          //!!!This block means we don't have content - so we cannot edit such lecture!!!
          //there was no content available
          //ready to be updated
          // const combinedResources = getCombinedResources()
          //this call needs to be commented as we are not allowing for the lecture to be without content
          // editLectureHandler()
        }
      }
    }

    //Last update: Aug 10 2021
    //Handles editLecture: it passes existing/updated title, preview,
    //contentType, content & combinedResources(existing + just uploaded)
    const editLectureHandler = () => {
      if (contentType === 'text') {
        /* posible bug here
      content that we have after loading component doens't have id property,
      it loads content by taking this id lecture.content?._id in useEffect
      so we should use lecture.content?._id to link if new content wasn't created
      and we should use updated content object if it was
      but check this
      if that's the case we should rewrite this function and combine it with
      checkLectureBeforeEditingHandler function to send different content objects
      depending on the case that we have: content has changed vs content hasn't

      Ok, when component is loaded we have lecture.content - that has id, type, duration
      Then we load content and set it for videoContent and for textContent
      So if content didn't changed we need to act in different way and don't check if id
      has changed
      */

        const combinedResources = getCombinedResources()

        lecture &&
          editLecture(
            section,
            lecture,
            title,
            preview,
            contentType,
            textContent,
            combinedResources
          )
      } else if (contentType === 'video') {
        console.log('Video content to edit Lecture: ', content)
        const combinedResources = getCombinedResources()

        lecture &&
          editLecture(
            section,
            lecture,
            title,
            preview,
            contentType,
            videoContent,
            combinedResources
          )
      }
    }

    const checkTitle = () => {
      if (title && title !== '') {
        return true
      } else {
        //set title textField in red
        //show bottom pop-up stating:
        //'Title shouldn't be empty'
        console.log('Please fill title before creating a Lecture')
        setBottomNotification({
          message: 'Title cannot be empty! Please give lecture a title.',
          actionType: 'notification',
          duration: 5,
        })
        return false
      }
    }
    const checkIfResourcesUploaded = () => {
      console.log('uploaded files', uploadedFiles)
      if (
        uploadedFiles.length > 0 &&
        uploadedFiles.find(
          (uploadedFile) => uploadedFile.uploaded === false
        ) === undefined &&
        uploadedFiles.find(
          (uplodedFile) => uplodedFile.resource === undefined
        ) === undefined
      ) {
        return true
      } else if (uploadedFiles.length <= 0) {
        //there is no uploading files
        return true
      } else {
        setBottomNotification({
          message: 'Resources are still uploading, please wait...',
          actionType: 'notification',
        })
        return false
      }
    }

    const readyForCreation = () => {
      //check if all the resources uploaded

      //check if video is uploaded
      if (!isVideoUploading) {
        if (checkTitle()) {
          switch (contentType) {
            //check if text content is not empty
            case 'text':
              console.log(
                'meow',
                textContent,
                textContent.length,
                textContent.length != 0
              )
              if (textContent.length != 0) {
                return true
              } else {
                //set bottom pop-up with text below:
                console.log(
                  'Text content cannot be empty! Please add some content.'
                )
                console.log('sadsdas', textContent)
                setBottomNotification({
                  message:
                    'Text content cannot be empty! Please add some content.',
                  actionType: 'notification',
                })
                return false
              }
            //check if video content exists
            case 'video':
              if (videoContent) {
                return true
              } else {
                //set video block in red and add bottom pop-up with text below:
                console.log('Please upload video before creating a lecture!')
                setBottomNotification({
                  message: 'Please upload video before creating a lecture!',
                  actionType: 'notification',
                })
                return false
              }
            //check if test content exists
            case 'test':
              //ANCHOR this should be updated once test functionality is available
              return false
            default:
              return false
          }
        }
      } else {
        //ANCHOR should show pop-up
        console.log('Video is uplaoding')
        setBottomNotification({
          message: 'Video is uploading. Please wait until video is uploaded.',
          actionType: 'notification',
          duration: 10,
        })
        return false
      }
    }

    // type ValidatedFile = {
    //   type: string
    //   src: string
    // }
    //function validates: file, type, size
    //and shows appropriate error messages to user
    const validateFile = (
      file: File,
      allowedTypes: string[],
      maxSize: number,
      wrongFormatMessage: string,
      wrongSizeMessage: string
    ): boolean => {
      if (file) {
        //get file type:
        const type = file.type.substring(file?.type.indexOf('/') + 1)
        //check if type is allowed:
        if (allowedTypes.includes(type)) {
          //check if size is allowed:
          if (file.size < maxSize) {
            return true
          } else {
            setBottomNotification({
              message: wrongSizeMessage,
              actionType: 'error',
            })
            return false
          }
        } else {
          setBottomNotification({
            message:
              wrongFormatMessage +
              allowedTypes
                .filter(
                  (s) =>
                    s !==
                    'vnd.openxmlformats-officedocument.wordprocessingml.document'
                )
                .map((value) => ' ' + value),
            actionType: 'error',
          })
          return false
        }
      } else {
        setBottomNotification({
          message: invalidFileLabel,
          actionType: 'error',
        })
        return false
      }
    }

    //validate files by type, size
    const validateFiles = (files: FileList): boolean => {
      let isValid = true
      for (let i = 0; i < files.length && isValid; i++) {
        console.log('File:', files.item(i))
        //call method upload file
        const file = files.item(i)
        if (file) {
          isValid = validateFile(
            file,
            allowedResourceTypes,
            MAX_RESOURCE_FILE_SIZE,
            invalidResourceTypeLabel,
            invalidResourceSizeLabel
          )
        }
      }
      return isValid
    }

    //function adds file to uploadedFiles[]
    //and handles the upload of the file to AWS
    const uploadFilesHandler = (files: FileList) => {
      //add new file
      //move to validateFile block down
      // const newUploadingFiles = [...uploadedFiles, file]
      // setUploadedFiles(newUploadingFiles)

      // console.log('file added', file)

      //1. Validate Files
      if (validateFiles(files)) {
        console.log('Validated!')
        //2. Transform file[] to UploadFiles[] &
        const uploadFilesTemp: UploadedFile[] = []
        for (let i = 0; i < files.length; i++) {
          const file = files.item(i)
          if (file) {
            //check if file doesn't already exist:
            if (
              //check if exist in temp
              uploadFilesTemp.find(
                (uploadedFile) =>
                  uploadedFile.file.name === file.name &&
                  uploadedFile.file.size === file.size
              ) === undefined &&
              //check if exist in downloaded
              uploadedFiles.find(
                (uploadedFile) =>
                  uploadedFile.file.name === file.name &&
                  uploadedFile.file.size === file.size
              ) === undefined
            ) {
              const uploadedFile: UploadedFile = {
                _id: uniqid(),
                file: file,
                uploaded: false,
                uploadedPercent: 0,
              }
              console.log('uploadedFile locally created: ', uploadedFile)
              uploadFilesTemp.push(uploadedFile)
            } else {
              //file already exists in the array
              //show error to the user
              setBottomNotification({
                message: fileAlreadyExistsLabel(file.name),
                actionType: 'error',
              })
            }
          }
        }
        //3. Update state to present UploadFile card
        let newUploadingFiles = [...uploadedFiles, ...uploadFilesTemp]
        setUploadedFiles(newUploadingFiles)

        //4. Start uploading files
        uploadFilesTemp.forEach((uploadFile) => {
          //create cancelToken
          const cancelToken = axios.CancelToken.source()
          const cancelResourceObj: CancelResource = {
            cancelToken: cancelToken,
            resourceId: uploadFile._id,
          }
          cancelTokens.current.push(cancelResourceObj)

          uploadFile.file?.name.substring(
            uploadFile.file?.name.lastIndexOf('.') + 1
          )
          //get upload link to AWS
          //!This could be canceled if Cancel btn pressed
          const parts =
            uploadFile.file && Math.ceil(uploadFile.file?.size / 10_000_000)
          getResourceURL(
            courseId,
            courseVersion,
            parts,
            uploadFile.file.name
          ).then((res) => {
            console.log('Response from getPublicContentLinksHelper: ' + res)

            uploadParts(uploadFile.file, res.urls).then((parts) => {
              //create video content on the backend
              createCourseResourceContent(
                courseId,
                courseVersion,
                parts,
                uploadFile.file.name,
                res.file,
                res.uploadId,
                0
              )
                .then((resourceContent) => {
                  //finish upload
                  // setVideoContent(videoContent)
                  // setIsVideoUploading(false)
                  setBottomNotification({
                    message: 'Resource has been uploaded successfully!',
                    actionType: 'success',
                  })
                  // resolve(videoContent)
                  const updatedFile: UploadedFile = { ...uploadFile }
                  updatedFile.uploaded = true
                  updatedFile.uploadedPercent = 100
                  updatedFile.resource = resourceContent
                  // console.log('file', file)
                  console.log('updatedFile', updatedFile)

                  //update uploadedFiles
                  newUploadingFiles = newUploadingFiles.map((file) => {
                    return file.file.name === updatedFile.file.name
                      ? updatedFile
                      : file
                  })
                  console.log('newUploadedFiles: ', newUploadingFiles)
                  setUploadedFiles(newUploadingFiles)

                  !newLecture &&
                    lecture &&
                    linkCourseLectureWithResources(
                      courseId,
                      courseVersion,
                      section._id,
                      lecture?._id || '',
                      resourceContent._id,
                      cancelToken
                    ).then(() => {
                      //clear cancelToken
                      cancelTokens.current = cancelTokens.current.filter(
                        (cancelToken) => {
                          cancelToken.resourceId !== uploadFile._id
                        }
                      )
                    })
                  console.log(
                    'Resource was uploaded successfuly',
                    resourceContent
                  )
                })
                .catch((err) => {
                  console.log('Error creating resource content: ', err)
                  // setIsVideoUploading(false)
                  setBottomNotification({
                    message: ('Error creating resource content: ' +
                      err) as string,
                    actionType: 'error',
                  })
                  throw err
                })
            })

            //upload to AWS
            // uploadPublicFileToAWS(uploadFile.file, res.data, cancelToken).then(
            // Object.values(res.urls).forEach((url) => {
            //   uploadPublicFileToOracle(uploadFile.file, url).then((oracleRes) => {
            //     if (oracleRes !== undefined) {
            //       // const keyUnedited = awsRes.data.fields.key as string
            //       console.log("aws res", oracleRes);
            //       // console.log('keyUnedited', keyUnedited)
            //       // console.log('keyUnedited', keyUnedited)
            //       // console.log('awsRes', awsRes)
            //       // const fileName = keyUnedited.substring(
            //       //   keyUnedited.lastIndexOf('/') + 1
            //       // )
            //       // const fileName = keyUnedited.substr(
            //       //   keyUnedited.lastIndexOf('/')
            //       // )

            //       let fileName = "";

            //       console.log('Resource has been uploaded!')
            //       console.log('Resource fileName: ', fileName)
            //       //create Resource
            //       createCourseLectureResource(
            //         courseId,
            //         courseVersion,
            //         fileName,
            //         uploadFile.file.name,
            //         cancelToken
            //       ).then((createdResource: Resource) => {
            //         console.log('createdResource', createdResource)

            //         //add Resource and update uploadedFile
            //         const updatedFile: UploadedFile = { ...uploadFile }
            //         updatedFile.uploaded = true
            //         updatedFile.uploadedPercent = 100
            //         updatedFile.resource = createdResource
            //         // console.log('file', file)
            //         console.log('updatedFile', updatedFile)

            //         //update uploadedFiles
            //         newUploadingFiles = newUploadingFiles.map((file) => {
            //           return file.file.name === updatedFile.file.name
            //             ? updatedFile
            //             : file
            //         })
            //         console.log('newUploadedFiles: ', newUploadingFiles)
            //         setUploadedFiles(newUploadingFiles)
            //         //link Resource with current Lecture
            //         !newLecture &&
            //           lecture &&
            //           linkCourseLectureWithResources(
            //             courseId,
            //             courseVersion,
            //             section._id,
            //             lecture._id,
            //             createdResource._id,
            //             cancelToken
            //           ).then(() => {
            //             //clear cancelToken
            //             cancelTokens.current = cancelTokens.current.filter(
            //               (cancelToken) => {
            //                 cancelToken.resourceId !== uploadFile._id
            //               }
            //             )
            //           })
            //       })
            //     }
            //   })
            // })
          })
        })
      }

      const uploadParts = async (file: File, urls: string[]) => {
        const axios = Axios.create()
        console.log('Converted file received:', file)
        console.log('Urls received:', urls)

        const keys = Object.keys(urls)

        const promises: any[] = []
        totalPromises = keys.length

        for (const indexStr of keys) {
          const index = parseInt(indexStr) - 1
          const start = index * FILE_CHUNK_SIZE
          const end = (index + 1) * FILE_CHUNK_SIZE
          const blob =
            index < keys.length && file
              ? file.slice(start, end, file.type)
              : file.slice(start)

          console.log(urls[index + 1], blob)
          promises.push(axios.put(urls[index + 1], blob))
        }
        const resParts = await Promise.all(promises.map(getProgress))
        return resParts.map((part, index) => {
          const etag = part.headers.etag.replaceAll('"', '')
          return {
            etag: etag,
            partNum: index + 1,
          }
        })
      }

      const getProgress = (promise: Promise<any>) => {
        promise.then(() => {
          totalResolved = totalResolved + 1
          console.log('Total resolved: ', totalResolved, '/', totalPromises)
          console.log('Progress: ', (totalResolved / totalPromises) * 100, '%')
          setProgress(Math.round((totalResolved / totalPromises) * 100))
        })
        return promise
      }

      // getPublicContentLinksHelper(courseId, validatedFile.type).then(
      //   (res) => {
      //     console.log(
      //       'Response from getPublicContentLinksHelper: ' + res.data
      //     )
      //     uploadPublicFileToAWS(file.file, res.data).then((awsRes) => {
      //       if (awsRes !== undefined) {
      //         const keyUnedited = res.data.fields.key as string
      //         // const fileName = keyUnedited.substr(
      //         //   keyUnedited.lastIndexOf('/') + 1
      //         // )
      //         console.log('keyUnedited', keyUnedited)
      //         console.log('awsRes', awsRes)
      //         const fileName = keyUnedited.substring(
      //           keyUnedited.lastIndexOf('/') + 1
      //         )
      //         console.log('Resource has been uploaded!')
      //         console.log('Resource fileName: ', fileName)

      //         createResourceHelper(courseId, fileName, file.file.name).then(
      //           (createdResource: Resource) => {
      //             console.log('createdResource', createdResource)

      //             linkLectureWithResourceHelper(
      //               courseId,
      //               section._id,
      //               lecture._id,
      //               createdResource._id
      //             ).then(() => {
      //               //add resource to being uploaded
      //               const updatedFile: UploadedFile = { ...file }
      //               updatedFile.uploaded = true
      //               updatedFile.uploadedPercent = 100
      //               updatedFile.resource = createdResource
      //               console.log('file', file)
      //               console.log('updatedFile', updatedFile)
      //               const newUploadedFiles = newUploadingFiles.map(
      //                 (file) => {
      //                   return file.file.name === updatedFile.file.name
      //                     ? updatedFile
      //                     : file
      //                 }
      //               )
      //               console.log('newUploadedFiles: ', newUploadedFiles)
      //               setUploadedFiles(newUploadedFiles)
      //             })
      //           }
      //         )

      //create presentational image on the backend
      // createPresentationalImageHelper(courseId, fileName)
      //   .then((res) => {
      //     setProgress(100)
      //     setIsVideoUploading(false)
      //     setShowProgress(false)
      //     console.log(
      //       'Presentational image res: ',
      //       res.presentationalImage
      //     )
      //     setImage(res.presentationalImage)
      //     setIsVideoUploading(false)
      //     setBottomNotification({
      //       message:
      //         'Presentational Image has been uploaded successfully!',
      //       actionType: 'success',
      //     })
      //   })
      //   .catch((err) => {
      //     console.log(
      //       'Error creating Presentational Image content: ',
      //       err
      //     )
      //     setIsVideoUploading(false)
      //     setBottomNotification({
      //       message: ('Error creating Presentational Image content: ' +
      //         err) as string,
      //       actionType: 'error',
      //     })
      //     throw err
      //   })
    }

    //move this method to helpers from everywhere of the app
    // const uploadPublicFileToOracle = async (file: File, url: any) => {
    //   // if(data){
    //   //   const formData = new FormData()
    //   //   // Object.keys(data.fields).forEach((key) =>
    //   //   //   formData.append(key, data.fields[key])
    //   //   // )
    //   //   formData.append('file', file)

    //   //   const response = await fetch(data.url, {
    //   //     method: 'POST',
    //   //     body: formData,
    //   //   })
    //   //   console.log('Response: ', response)
    //   //   if (response.ok === true) {
    //   //     return response
    //   //   } else {
    //   //     return undefined
    //   //   }
    //   // }
    //   const response = await axios.put(url, file)
    //   console.log('axios', response)
    //   return response.status === 200
    // }

    //move this method to helpers from everywhere of the app
    // const uploadPublicFileToAWS = (
    //   file: File,
    //   data: any,
    //   cancelToken: CancelTokenSource
    // ): Promise<Response> => {
    //   return new Promise((resolve, reject) => {
    //     const formData = new FormData()
    //     Object.keys(data.fields).forEach((key) =>
    //       formData.append(key, data.fields[key])
    //     )
    //     formData.append('file', file)

    //     const body = formData

    //     const config = {
    //       cancelToken: cancelToken.token,
    //     }
    //     axios
    //       .post(data.url, body, config)
    //       .then((res) => {
    //         console.log('Get link response: ', res)
    //         resolve(res.data)
    //       })
    //       .catch((err) => {
    //         console.log('Error uploading to AWS: ', err)
    //         reject(err)
    //       })

    //     // const response = await fetch(data.url, {
    //     //   method: 'POST',
    //     //   body: formData,
    //     // })
    //     // console.log('Response: ', response)
    //     // if (response.ok === true) {
    //     //   return response
    //     // } else {
    //     //   return undefined
    //     // }
    //   })
    // }

    //Delete resource if user clicks delete
    //OR if user clicks Cancel on adding those resources
    const deleteResourceHandler = (
      resourceId: string,
      isAttached: boolean,
      isTriggeredByCancel?: boolean
    ) => {
      //delete resource
      deleteCourseLectureResource(courseId, courseVersion, resourceId).then(
        () => {
          if (isAttached) {
            const newResources = resources.filter(
              (resource) => resource._id !== resourceId
            )
            setResources(newResources)
            //show success message: Resource was deleted
          } else {
            if (!isTriggeredByCancel) {
              const newUploadedFiles = uploadedFiles.filter((uploadedFile) => {
                if (uploadedFile.resource) {
                  return uploadedFile.resource._id !== resourceId
                }
              })
              setUploadedFiles(newUploadedFiles)
            }
          }
        }
      )
    }
    const cancelResourceUpload = (resourceId: string) => {
      const cancelAction = cancelTokens.current.find((cancelResource) => {
        return cancelResource.resourceId === resourceId
      })
      if (cancelAction) {
        cancelAction.cancelToken.cancel()
        console.log('API call was cancelled')
        const newUploadedFiles = uploadedFiles.filter(
          (uploadedFile) => uploadedFile._id !== resourceId
        )
        setUploadedFiles(newUploadedFiles)
      }
      //IMPORTANT: we need some sort of id, to keep track of what
      //resource must be cancelled from being uploaded
      //delete resource
    }

    //need to be commented - we do not use it anymore
    //at least for now

    // const changeLectureType = (newType: ContentType) => {
    //   if (newType !== contentType) {
    //     if (videoContent || textContent === '' || content) {
    //       setShowPopUp(true)
    //       setCenterNotification({
    //         title: confirmLectureTypeChange.title,
    //         message: confirmLectureTypeChange.message,
    //         firstBtn: {
    //           title: confirmLectureTypeChange.firstBtn.title,
    //           actionType: confirmLectureTypeChange.firstBtn.actionType,
    //           action: () => {
    //             //reset contents
    //             if (contentType === 'text' && content) {
    //               deleteLectureContentHelper(content._id)
    //                 .then(() => {
    //                   setBottomNotification({
    //                     message: 'Text content has been deleted.',
    //                     actionType: 'success',
    //                     duration: 7,
    //                   })
    //                   setTextContent('')
    //                   setContent(undefined)
    //                 })
    //                 .catch((err) => {
    //                   setBottomNotification({
    //                     message:
    //                       'Error occured while deleting Text content: ' + err,
    //                     actionType: 'error',
    //                     duration: 7,
    //                   })
    //                 })
    //             } else if (contentType === 'video' && content) {
    //               setVideoContent(undefined)
    //               setContent(undefined)
    //             }

    //             //setTestContent to undefined
    //             setContentType(newType)
    //             setShowPopUp(false)
    //           },
    //         },
    //         secondBtn: {
    //           title: confirmLectureTypeChange.secondBtn.title,
    //           actionType: confirmLectureTypeChange.secondBtn.actionType,
    //           action: () => {
    //             setShowPopUp(false)
    //           },
    //         },
    //       })
    //     }
    //   } else {
    //     setContentType(newType)
    //   }
    // }

    //returns combined Exsisting & Uploaded Resources
    //isCancel - boolean that shows if Action was initiated by Cancel btn
    //in such case uploaded items will not be added
    const getCombinedResources = (isCancel?: boolean) => {
      let combinedResources: Resource[] = []
      if (resources.length > 0) {
        combinedResources = [...resources]
      }
      if (uploadedFiles.length > 0 && checkIfResourcesUploaded() && !isCancel) {
        const uploadedResources = uploadedFiles.map(
          (uploadedFile) => uploadedFile.resource!
        )
        combinedResources = [...combinedResources, ...uploadedResources]
      }
      return combinedResources
    }

    console.log(uploadedFiles)
    const cancelPreHandler = () => {
      try {
        if (cancelTokens.current.length > 0) {
          cancelTokens.current.forEach((cancelToken) => {
            cancelResourceUpload(cancelToken.resourceId)
          })
        }

        // Delete non-existing resources (newly added/unsaved)
        if (uploadedFiles.length > 0) {
          uploadedFiles.forEach((uploadedFile) => {
            if (uploadedFile.resource) {
              deleteResourceHandler(uploadedFile.resource._id, false, true)
            }
          })
        }
        // Delete Video if lecture is new
        if (!lecture?._id && videoContent) {
          setCenterNotification({
            title: confirmVideoContentDeletion.title,
            message: confirmVideoContentDeletion.message,
            firstBtn: {
              title: confirmVideoContentDeletion.firstBtn.title,
              actionType: confirmVideoContentDeletion.firstBtn.actionType,
              action: () => {
                deleteCourseLectureVideo(
                  courseId,
                  courseVersion,
                  videoContent.name
                ).then(() => {
                  setBottomNotification({
                    message: 'Video has been deleted',
                    actionType: 'success',
                  })
                  cancelPostHandler()
                })
                setShowPopUp(false)
              },
            },
            secondBtn: {
              title: confirmVideoContentDeletion.secondBtn.title,
              actionType: confirmVideoContentDeletion.secondBtn.actionType,
              action: () => {
                setShowPopUp(false)
                cancelPostHandler()
              },
            },
          })
          return
        }
        Object.keys(abortControllers).forEach((key) => {
          if (key.includes('UploadVideo/')) {
            abortControllers[key]?.abort('User cancelled')
          }
        })
        cancelPostHandler()
      } catch (err) {}
    }
    const cancelPostHandler = () => {
      //get updated resources
      const combinedResources = getCombinedResources(true)

      //update Existing Lecture with unchanged values,
      //except for potentially deleted resources
      lecture &&
        !newLecture &&
        editLecture(
          section,
          lecture,
          lecture.title,
          lecture.preview,
          lecture.content.type,
          lecture.content,
          combinedResources
        )
      cancel()
    }

    return (
      <MainWrapper ref={ref}>
        <FirstRowWrapper>
          <TextInput
            placeholder="Lecture Title"
            width="100%"
            height="2.8rem"
            backgroundColor="#ffffff"
            padding="1rem 2rem"
            value={title}
            onChange={handleTitleChange}
            maxLength={courseMaterialsTitleTextLimit}
          />
          <RoundButtonsContainer>
            <RoundButton
              width="3rem"
              height="3rem"
              marginLeft="2.5rem"
              border={contentType == 'video' ? '1px solid #E4BA42' : ''}
              onClick={() => {
                // setVideoSection(!videoSection)
                setContentType('video')
              }}
              justifyContent="center"
            >
              <Tooltip content={'Add Video Lecture'} color="invert">
                <VideoSectionIcon width="1.2rem" height="1.2rem" />
              </Tooltip>
            </RoundButton>
            <RoundButton
              width="3rem"
              height="3rem"
              marginLeft="0.5rem"
              color="#EEEEEE"
              border={contentType == 'text' ? '1px solid #E4BA42' : ''}
              onClick={() => {
                // setAddTextSection(!addTextSection)
                setContentType('text')
              }}
            >
              <Tooltip content={'Add Text Lecture'} color="invert">
                <TextSectionIcon width="1.2rem" height="1.2rem" />
              </Tooltip>
            </RoundButton>
            {/* <RoundButton
              width="3rem"
              height="3rem"
              marginLeft="0.5rem"
              color="#EEEEEE"
              border={contentType == 'test' ? '1px solid #E4BA42' : ''}
              onClick={() => {
                setContentType('test')
              }}
          >
            <QuizSectionIcon width="1.2rem" height="1.2rem" />
          </RoundButton> */}
            <RoundButton
              width="3rem"
              height="3rem"
              marginLeft="0.5rem"
              color="#EEEEEE"
              border={attachmentSection ? '1px solid #E4BA42' : ''}
              onClick={() => {
                if (resources.length > 0 || uploadedFiles.length > 0) {
                } else {
                  setAttachmentSection(!attachmentSection)
                }
              }}
            >
              <Tooltip content={'Add Attachment'} color="invert">
                <AttachResourcesIcon width="1.2rem" height="1.2rem" />
              </Tooltip>
            </RoundButton>
          </RoundButtonsContainer>
        </FirstRowWrapper>
        <AddContentWrapper>
          {contentType == 'video' && (
            <VideoSection
              courseId={courseId}
              courseVersion={courseVersion}
              videoContent={videoContent}
              setVideoContent={setVideoContent}
              isVideoUploading={isVideoUploading}
              setIsVideoUploading={setIsVideoUploading}
              setBottomNotification={setBottomNotification}
              abortControllers={abortControllers}
              addAbortController={addAbortController}
              removeAbortController={removeAbortController}
            />
          )}
          {contentType == 'text' && (
            <TextContent
              content={textContent}
              onChange={handleTextContentChange}
              onImageUpload={onImageUpload}
            />
          )}
          {contentType == 'test' && <QuizSection />}
        </AddContentWrapper>
        {attachmentSection && (
          <AddResourcesWrapper>
            {resources.length > 0 && (
              <ResourceTitle>Attached files</ResourceTitle>
            )}
            {resources.length > 0 && (
              <ResourceDescription>
                Files and assets that have been attached to this lecture
              </ResourceDescription>
            )}
            <ExistingResourcesWrapper>
              {resources.length > 0 &&
                resources.map((resource: Resource) => {
                  return (
                    <UploadedResource
                      key={resource._id}
                      title={resource.name}
                      uploaded={true}
                      uploadedPercent={100}
                      deleteBtnPressed={() => {
                        confirmResourceDeletionHandler(resource._id, true)
                      }}
                    />
                  )
                })}
            </ExistingResourcesWrapper>
            {uploadedFiles && uploadedFiles.length > 0 && (
              <ResourceTitle>Uploaded files</ResourceTitle>
            )}
            {uploadedFiles && uploadedFiles.length > 0 && (
              <ResourceDescription>
                Files and assets that have been uploaded but not yet linked to
                this lecture
              </ResourceDescription>
            )}
            <ExistingResourcesWrapper>
              {uploadedFiles.length > 0 &&
                uploadedFiles.map((file) => {
                  return (
                    <UploadedResource
                      key={file._id}
                      title={file.file.name}
                      uploaded={file.uploaded}
                      uploadedPercent={file.uploadedPercent}
                      deleteBtnPressed={() => {
                        //button stops the upload or deletes already created resource
                        file.uploaded && file.resource
                          ? confirmResourceDeletionHandler(
                              file.resource?._id,
                              false
                            )
                          : cancelResourceUpload(file._id)
                      }}
                    />
                  )
                })}
            </ExistingResourcesWrapper>
            <AttachResourcesSection
              courseId={courseId}
              onFilesSelected={(files: FileList) => {
                uploadFilesHandler(files)
              }}
            />
          </AddResourcesWrapper>
        )}
        <AdditionalInfoWrapper>
          <OptionalLectureWrapper>
            <Checkmark
              marginRight="0.5rem"
              onClick={setPreview}
              value={preview}
            />
            <PreviewLecture>Preview</PreviewLecture>
          </OptionalLectureWrapper>
        </AdditionalInfoWrapper>
        <AddButtonWrapper>
          <Button
            width="13rem"
            height="3rem"
            text={'Cancel'}
            fontFamily={fontFamilies.bold}
            backgroundColor={colors.uguPurple}
            color={colors.uguWhite}
            marginLeft="auto"
            marginRight="1.5rem"
            fontSize="0.9rem"
            fontWeight="bold"
            marginBottom="2rem"
            //disabled={}
            onClick={cancelPreHandler}
          />
          <Button
            width="13rem"
            height="3rem"
            text={newLecture ? 'Add' : 'Save'}
            fontFamily={fontFamilies.bold}
            backgroundColor={colors.uguYellow}
            color={colors.uguPurple}
            fontSize="0.9rem"
            fontWeight="bold"
            marginBottom="2rem"
            disabled={createBtnDisabled}
            onClick={() =>
              newLecture
                ? addNewLectureHandler()
                : checkLectureBeforeEditingHandler()
            }
          />
        </AddButtonWrapper>
        {centerNotification && (
          <PopUpCenter
            centerNotification={centerNotification}
            showPopUp={showPopUp}
          />
        )}
      </MainWrapper>
    )
  }
)

NewSection.displayName = 'NewSection'
export default NewSection
