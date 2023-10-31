import { useRef, useState } from 'react'
import Axios from 'axios'
import { CenterNotification } from 'types/main'
import { confirmVideoChange } from 'configs/constants/labels/modal-labels'
import { Content } from 'types/course'
import getPublicContentURL from '@services/api/course/getPublicContentURL'
import updateCoursePresentationalVideo from '@services/api/course/updateCoursePresentationalVideo'
import getVideoContentURL from '@services/api/course/getVideoContentURL'
import createCourseVideoContent from '@services/api/course/createCourseVideoContent'
import axios from 'axios'

type ValidatedVideo = {
  duration: number
  type: string
}

type UseUploadVideoProps = {
  courseId: string
  courseVersion: number
  videoContent: Content | undefined
  setVideoContent: Function
  isVideoUploading: Boolean
  setIsVideoUploading: Function
  isPresentationalVideo: boolean
  setBottomNotification: Function
  abortControllers
  addAbortController
  removeAbortController
}
const useUploadVideo = ({
  courseId,
  courseVersion,
  videoContent,
  setVideoContent,
  isVideoUploading,
  setIsVideoUploading,
  isPresentationalVideo,
  setBottomNotification,
  abortControllers,
  addAbortController,
  removeAbortController,
}: UseUploadVideoProps) => {
  const FILE_CHUNK_SIZE = 10_000_000
  const inputFileRef = useRef<HTMLInputElement>(null)

  const [progress, setProgress] = useState<number>(0)
  const [showProgress, setShowProgress] = useState(false)
  const [centerNotification, setCenterNotification] =
    useState<CenterNotification>()
  const [showPopUp, setShowPopUp] = useState(false)

  const validateFile = (file: any): Promise<ValidatedVideo> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      const allowedTypes: string[] = ['mp4', 'mov', 'avi', 'flv', 'wmv']
      const type = file?.name.substring(file?.name.lastIndexOf('.') + 1)

      video.onloadedmetadata = () => {
        if (video.duration < 1 && allowedTypes.includes(type)) {
          reject(new Error(`Invalid Video! video is less than 1 second`))
          setBottomNotification({
            message: 'Invalid Video! Video is less than 1 second',
            actionType: 'error',
          })
        }
        const validatedFile: ValidatedVideo = {
          type: type,
          duration: video.duration,
        }
        resolve(validatedFile)
      }

      video.onerror = () => {
        reject(new Error(`Error happened! Invalid Video!`))
        setBottomNotification({
          message: 'Error happened! Invalid Video!',
          actionType: 'error',
        })
      }

      video.src = URL.createObjectURL(file)
    })
  }

  const onPrivateFileChange = (file?: File, nonNativeEvent = false) => {
    return new Promise(
      async (resolve: (videoContent: Content) => void, reject) => {
        try {
          const inputElement = document.getElementById(
            'uploadVideo'
          ) as HTMLInputElement
          const video = nonNativeEvent
            ? file
            : inputElement.files && inputElement.files[0]

          const parts = video && Math.ceil(video?.size / FILE_CHUNK_SIZE)
          if (!parts || !video) {
            setIsVideoUploading(false)
            reject()
          }
          // Initiate upload
          setIsVideoUploading(true)
          const validatedFile = await validateFile(video)
          if (!validatedFile) {
            setIsVideoUploading(false)
            reject()
          }
          setShowProgress(true)
          const getVideoContentURLAbortController = new AbortController()
          addAbortController(
            `UploadVideo/${video?.name}/getVideoContentURLAbortController`,
            getVideoContentURLAbortController
          )
          const signedURLRes = await getVideoContentURL(
            courseId,
            courseVersion,
            parts as number,
            video?.name as string,
            getVideoContentURLAbortController
          )
          removeAbortController(
            `UploadVideo/${video?.name}/getVideoContentURLAbortController`
          )

          // Upload actual file parts to Object storage
          const uploadedParts = await uploadParts(
            video as File,
            signedURLRes.urls
          )

          const createCourseVideoContentAbortController = new AbortController()
          addAbortController(
            `UploadVideo/${video?.name}/createCourseVideoContentAbortController`,
            createCourseVideoContentAbortController
          )
          const videoContent = await createCourseVideoContent(
            courseId,
            courseVersion,
            uploadedParts as any,
            video?.name as string,
            signedURLRes.file,
            signedURLRes.uploadId,
            validatedFile.duration,
            createCourseVideoContentAbortController
          )
          removeAbortController(
            `UploadVideo/${video?.name}/createCourseVideoContentAbortController`
          )

          //finish upload
          setVideoContent(videoContent)
          setIsVideoUploading(false)
          setBottomNotification({
            message: 'Video has been uploaded successfully!',
            actionType: 'success',
          })
          resolve(videoContent)
        } catch (err: any) {
          if (inputFileRef?.current?.value) {
            inputFileRef.current.value = ''
          }
          setIsVideoUploading(false)
          setShowProgress(false)
          setProgress(0)

          if (err?.code === 'ERR_CANCELED') {
            setBottomNotification({
              message: 'Video upload has been canceled',
              actionType: 'success',
            })
          } else {
            setBottomNotification({
              message: ('Error creating video content: ' + err) as string,
              actionType: 'error',
            })
          }
          //reject(err)
        }
      }
    )
  }

  const onPublicFileChange = () => {
    //extract video
    const inputElement = document.getElementById(
      'uploadVideo'
    ) as HTMLInputElement
    const video = inputElement.files && inputElement.files[0]
    if (video) {
      if (isPresentationalVideo) {
        console.warn('uploading presentational video')
        //initiate upload
        setIsVideoUploading(true)
        setProgress(0)
        validateFile(video)
          .then((validatedFile) => {
            if (validatedFile) {
              if (video) {
                setShowProgress(true)
                getPublicContentURL(courseId, courseVersion, video.name).then(
                  (res) => {
                    //upload to AWS
                    uploadPublicFileToOCI(video, res.url).then((uploadRes) => {
                      if (uploadRes) {
                        //create presentational video on the backend
                        updateCoursePresentationalVideo(
                          courseId,
                          courseVersion,
                          video.name,
                          res.file,
                          validatedFile.duration
                        )
                          .then((presentationalVideoRes) => {
                            //finish upload
                            setProgress(100)
                            setVideoContent(presentationalVideoRes)
                            setIsVideoUploading(false)
                            setBottomNotification({
                              message:
                                'Presentational Video has been uploaded successfully!',
                              actionType: 'success',
                            })
                          })
                          .catch((err) => {
                            console.log(
                              'Error creating Presentational Video content: ',
                              err
                            )
                            setIsVideoUploading(false)
                            setBottomNotification({
                              message:
                                ('Error creating Presentational Video content: ' +
                                  err) as string,
                              actionType: 'error',
                            })
                            throw err
                          })
                      }
                    })
                  }
                )
              }
            }
          })
          .catch((err) => {
            console.log(err)
            setBottomNotification({
              message: ('Error while validating video has occured: ' +
                err) as string,
              actionType: 'error',
            })
            setIsVideoUploading(false)
          })
      } else {
        //in case we need to upload any other public video
      }
    }
  }

  //upload public file
  const uploadPublicFileToOCI = async (file: File, url: string) => {
    const response = await axios.put(url, file, {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setProgress(percentCompleted)
        }
      },
    })
    console.log('axios', response)
    return response.status === 200
  }

  //upload private file
  const uploadParts = (file: File, urls: string[]) => {
    return new Promise(async (resolve, reject) => {
      try {
        const controller = new AbortController()
        const axios = Axios.create({
          signal: controller.signal,
        })
        const keys = Object.keys(urls)

        const promises: any[] = []
        const totalChunks = keys.length
        const progressArray = new Array(totalChunks).fill(0)

        for (const indexStr of keys) {
          const index = parseInt(indexStr) - 1
          const start = index * FILE_CHUNK_SIZE
          const end = (index + 1) * FILE_CHUNK_SIZE
          const blob =
            index < keys.length && file
              ? file.slice(start, end, file.type)
              : file.slice(start)

          addAbortController(
            `UploadVideo/${file.name}/multipart-${index}`,
            controller
          )
          promises.push(
            axios
              .put(urls[index + 1], blob, {
                onUploadProgress: (progressEvent) => {
                  if (progressEvent.total) {
                    const percentCompleted =
                      progressEvent.loaded / progressEvent.total

                    // Update the progress of the current chunk
                    progressArray[index] = percentCompleted

                    // Calculate the overall progress
                    const totalProgress = Math.round(
                      (progressArray.reduce((acc, curr) => acc + curr, 0) /
                        totalChunks) *
                        100
                    )
                    console.log('percentCompleted', percentCompleted)
                    console.log('totalProgress', totalProgress)
                    setProgress(totalProgress)
                  }
                },
              })
              //add onUploadTrigger here
              .catch((err) => reject(err))
              .finally(() => {
                removeAbortController(
                  `UploadVideo/${file.name}/multipart-${index}`
                )
              })
          )
        }
        const resParts = await Promise.all(promises)
        const formattedResParts = resParts?.map((part, index) => {
          const etag = part.headers.etag.replaceAll('"', '')
          return {
            etag: etag,
            partNum: index + 1,
          }
        })
        resolve(formattedResParts)
      } catch (err) {
        reject(err)
      }
    })
  }

  const cancelMultiPartUpload = async (fileName?: string) => {
    try {
      console.log(abortControllers)
      Object.keys(abortControllers).forEach((key) => {
        console.log(`UploadVideo/${fileName && fileName + '/'}`)
        if (key.includes(`UploadVideo/${fileName && fileName + '/'}`)) {
          abortControllers[key]?.abort('User cancelled')
        }
      })
    } catch (err) {}
  }

  //handlers:
  //show pop-up to ask if User wants to change video
  const uploadBtnHandler = () => {
    if (videoContent) {
      setShowPopUp(true)
      setCenterNotification({
        title: confirmVideoChange.title,
        message: confirmVideoChange.message,
        firstBtn: {
          title: confirmVideoChange.firstBtn.title,
          actionType: confirmVideoChange.firstBtn.actionType,
          action: () => {
            inputFileRef.current?.click()
            setShowPopUp(false)
          },
        },
        secondBtn: {
          title: confirmVideoChange.secondBtn.title,
          actionType: confirmVideoChange.secondBtn.actionType,
          action: () => {
            setShowPopUp(false)
          },
        },
      })
    } else if (isVideoUploading) {
      setBottomNotification({
        message: 'Video is uploading...',
        actionType: 'notification',
      })
    } else {
      inputFileRef.current?.click()
    }
  }

  return {
    inputFileRef,
    onPublicFileChange,
    onPrivateFileChange,
    uploadBtnHandler,
    showProgress,
    progress,
    centerNotification,
    showPopUp,
    cancelMultiPartUpload,
  }
}

export default useUploadVideo
