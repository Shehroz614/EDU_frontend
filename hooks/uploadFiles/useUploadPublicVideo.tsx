import { useRef, useState } from 'react'
import { BottomNotification, CenterNotification } from 'types/main'
import { confirmVideoChange } from 'configs/constants/labels/modal-labels'
import { Content } from 'types/course'

// import getPublicContentURL from '../../services/api/course/getPublicContentURL'
// import updateCoursePresentationalVideo from '../../services/api/course/updateCoursePresentationalVideo'

// type ValidatedVideo = {
//   duration: number
//   type: string
// }

//TODO
//We will need to add option here to upload
//different public files

const useUploadPublicVideo = (
  _courseId: string,
  _courseVersion: number,
  videoContent: Content | undefined,
  _setVideoContent: Function,
  isVideoUploading: Boolean,
  _setIsVideoUploading: Function,
  _isPresentationalVideo: boolean
) => {
  //   const { videoContent, setIsVideoUploading, courseId, setVideoContent } = props
  const [progress] = useState(0)
  const [showProgress] = useState(false)
  //const FILE_CHUNK_SIZE = 10_000_000
  const [bottomNotification, setBottomNotification] =
    useState<BottomNotification>()
  const [showBottomPopUp, setShowBottomPopUp] = useState(false)
  const [centerNotification, setCenterNotification] =
    useState<CenterNotification>()
  //show PopUpCenter
  const [showPopUp, setShowPopUp] = useState(false)

  //upload video ref
  const inputFileRef = useRef<HTMLInputElement>(null)

  // const validateFile = (file: any): Promise<ValidatedVideo> => {
  //   return new Promise((resolve, reject) => {
  //     var video = document.createElement('video')
  //     video.preload = 'metadata'
  //     const allowedTypes: string[] = ['mp4', 'mov', 'avi', 'flv', 'wmv']
  //     const type = file?.name.substring(file?.name.lastIndexOf('.') + 1)

  //     video.onloadedmetadata = () => {
  //       if (video.duration < 1 && allowedTypes.includes(type)) {
  //         reject(new Error(`Invalid Video! video is less than 1 second`))
  //         setBottomNotification({
  //           message: 'Invalid Video! Video is less than 1 second',
  //           actionType: 'error',
  //         })
  //         setShowBottomPopUp(true)
  //       }
  //       const validatedFile: ValidatedVideo = {
  //         type: type,
  //         duration: video.duration,
  //       }
  //       resolve(validatedFile)
  //     }

  //     video.onerror = () => {
  //       reject(new Error(`Error happened! Invalid Video!`))
  //       setBottomNotification({
  //         message: 'Error happened! Invalid Video!',
  //         actionType: 'error',
  //       })
  //       setShowBottomPopUp(true)
  //     }

  //     video.src = URL.createObjectURL(file)
  //   })
  // }

  // const onPublicFileChange = () => {
  //   const inputElement = document.getElementById(
  //     'uploadVideo'
  //   ) as HTMLInputElement
  //   const video = inputElement.files && inputElement.files[0]
  //   if (video) {
  //     if (isPresentationalVideo) {
  //       setIsVideoUploading(true)
  //       validateFile(video)
  //         .then((validatedFile) => {
  //           if (validatedFile) {
  //             console.log(
  //               'Video: ',
  //               video,
  //               'video type: ' + validatedFile.type,
  //               'duration: ' + validatedFile.duration
  //             )
  //             if (video) {
  //               setShowProgress(true)
  //               getPublicContentURL(
  //                 courseId,
  //                 courseVersion,
  //                 validatedFile.type
  //               ).then((res) => {
  //                 console.log(
  //                   'Response from getPublicContentLinksHelper: ',
  //                   res
  //                 )
  //                 uploadPublicFileToOCI(video, res.url).then((uploadRes) => {
  //                   if (uploadRes) {
  //                     console.log('upload success')
  //                     updateCoursePresentationalVideo(
  //                       courseId,
  //                       courseVersion,
  //                       video.name,
  //                       res.key,
  //                       validatedFile.duration
  //                     )
  //                       //create presentational video on the backend
  //                       .then((presentationalVideoRes) => {
  //                         setProgress(100)
  //                         console.log(
  //                           'Presentational video res: ',
  //                           presentationalVideoRes
  //                         )
  //                         setVideoContent(presentationalVideoRes)
  //                         setIsVideoUploading(false)
  //                         setBottomNotification({
  //                           message:
  //                             'Presentational Video has been uploaded successfully!',
  //                           actionType: 'success',
  //                         })
  //                         setShowBottomPopUp(true)
  //                       })
  //                       .catch((err) => {
  //                         console.log(
  //                           'Error creating Presentational Video content: ',
  //                           err
  //                         )
  //                         setIsVideoUploading(false)
  //                         setBottomNotification({
  //                           message:
  //                             ('Error creating Presentational Video content: ' +
  //                               err) as string,
  //                           actionType: 'error',
  //                         })
  //                         setShowBottomPopUp(true)
  //                         throw err
  //                       })
  //                   }
  //                 })
  //               })
  //             }
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //           setBottomNotification({
  //             message: ('Error while validating video has occured: ' +
  //               err) as string,
  //             actionType: 'error',
  //           })
  //           setShowBottomPopUp(true)
  //           setIsVideoUploading(false)
  //         })
  //     }
  //   }

  //   //OK, here I will call API and will request urls for the parts, will store that array,
  //   // after that I will call uploadParts, will pass video and urls array
  //   // the progress bar will be updated, but, I should prevent this function from being updated
  //   // as it is still working, only UI should be updated
  //   //once done I'll send the response of uploadParts back to server using another API
  //   //once that done I will change the status of the video to uploaded
  //   //once that done I will wait to get video processed(different formats to be created)
  // }

  //   const formData = new FormData();
  // formData.append("Content-Type", file.type);
  // Object.entries(data.fields).forEach(([k, v]) => {
  // 	formData.append(k, v);
  // });
  // formData.append("file", file);

  //   await fetch(data.url, {
  //     method: 'POST',
  //     body: formData,
  //   })

  // const uploadPublicFileToOCI = async (file: File, url: any) => {
  //   const formData = new FormData()
  //   formData.append('file', file)

  //   const response = await fetch(url, {
  //     method: 'PUT',
  //     body: formData,
  //   })
  //   return response.ok
  // }

  // const uploadParts = async (file: File, urls: string[]) => {
  //   const axios = Axios.create()

  //   console.log('Converted file received:', file)
  //   console.log('Urls received:', urls)

  //   const keys = Object.keys(urls)

  //   const promises = []
  //   totalPromises = keys.length

  //   for (const indexStr of keys) {
  //     const index = parseInt(indexStr) - 1
  //     const start = index * FILE_CHUNK_SIZE
  //     const end = (index + 1) * FILE_CHUNK_SIZE
  //     const blob =
  //       index < keys.length && file
  //         ? file.slice(start, end, file.type)
  //         : file.slice(start)

  //     promises.push(axios.put(urls[index + 1], blob))
  //   }

  //   const resParts = await Promise.all(promises.map(getProgress))

  //   return resParts.map((part, index) => {
  //     const etag = part.headers.etag.replaceAll('"', '')
  //     return {
  //       ETag: etag,
  //       PartNumber: index + 1,
  //     }
  //   })
  // }

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
      setShowBottomPopUp(true)
    } else {
      inputFileRef.current?.click()
    }
  }

  return {
    inputFileRef,
    uploadBtnHandler,
    showProgress,
    progress,
    showBottomPopUp,
    bottomNotification,
    setShowBottomPopUp,
    centerNotification,
    showPopUp,
  }
}

export default useUploadPublicVideo
