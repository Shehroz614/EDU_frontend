import { useEffect, useRef, useState } from 'react'
import { CenterNotification } from 'types/main'
import { confirmVideoChange } from 'configs/constants/labels/modal-labels'
import getPublicContentURL from '@services/api/course/getPublicContentURL'
import updateCoursePresentationalImage from '@services/api/course/updateCoursePresentationalImage'
import axios from 'axios'

type ValidatedImage = {
  type: string
  src: string
}

//TODO
//Check format and allow only some picture formats
//Make sure the file size is not bigger than 10MB

const useUploadPublicImage = (
  courseId: string,
  courseVersion: number,
  image: string | undefined,
  setImage: Function,
  _isVideoUploading: Boolean,
  setIsVideoUploading: Function,
  isPresentationalPhoto: boolean,
  setBottomNotification: Function
) => {
  //   const { videoContent, setIsVideoUploading, courseId, setVideoContent } = props
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const MAX_FILE_SIZE = 10_000_000
  const [centerNotification, setCenterNotification] =
    useState<CenterNotification>()
  //show PopUpCenter
  const [showPopUp, setShowPopUp] = useState(false)

  //upload video ref
  const inputFileRef = useRef<HTMLInputElement>(null)

  //test if content is not empty
  useEffect(() => {
    console.log('Image for editing: ', image)
  }, [])

  const validateFile = (file: any): Promise<ValidatedImage> => {
    return new Promise((resolve, reject) => {
      if (file) {
        const allowedTypes: string[] = ['jpeg', 'png']
        const maxSize = MAX_FILE_SIZE
        const type = file?.type.substring(file?.type.indexOf('/') + 1)
        console.log('Image type: ', type)
        //check if type is allowed
        if (allowedTypes.includes(type)) {
          //check the size
          if (file.size < maxSize) {
            const validatedFile: ValidatedImage = {
              type: type,
              src: URL.createObjectURL(file),
            }
            resolve(validatedFile)
          } else {
            reject(new Error(`Image cannot be bigger than 10MB.`))
            setBottomNotification({
              message: 'File too large! Image cannot be bigger than 10MB.',
              actionType: 'error',
            })
          }
        } else {
          reject(new Error(`Invalid image type!`))
          setBottomNotification({
            message:
              'Invalid image type! Image must be of type: ' +
              allowedTypes.map((value) => value),
            actionType: 'error',
          })
        }
      } else {
        reject(new Error(`Invalid file`))
        setBottomNotification({
          message: 'Invalid file has been selected!',
          actionType: 'error',
        })
      }
    })
  }

  const onFileChange = () => {
    const inputElement = document.getElementById(
      'uploadImage'
    ) as HTMLInputElement
    const imageToUpload = inputElement.files && inputElement.files[0]
    console.log('Image: ', imageToUpload)
    if (imageToUpload) {
      if (isPresentationalPhoto) {
        setIsVideoUploading(true)
        validateFile(imageToUpload)
          .then((validatedFile: ValidatedImage) => {
            if (validatedFile) {
              console.log(
                'Image: ',
                imageToUpload,
                'image src: ' + validatedFile.src
              )

              // if (imageToUpload) {
              setShowProgress(true)
              getPublicContentURL(
                courseId,
                courseVersion,
                imageToUpload.name
              ).then((res) => {
                console.log('Response from getPublicContentLinksHelper: ', res)
                uploadPublicFileToOCI(imageToUpload, res.url).then(
                  (uploadRes) => {
                    if (uploadRes) {
                      console.log('upload success')
                      // const keyUnedited = res.data.fields.key as string
                      // const fileName = keyUnedited.substring(
                      //   keyUnedited.lastIndexOf('/') + 1
                      // )
                      // console.log('fileName: ', fileName)
                      //
                      // //create presentational image on the backend
                      updateCoursePresentationalImage(
                        courseId,
                        courseVersion,
                        res.file
                      )
                        .then((res) => {
                          setProgress(100)
                          setIsVideoUploading(false)
                          setShowProgress(false)
                          console.log(
                            'Presentational image res: ',
                            res.presentationalImage
                          )
                          setImage(res.presentationalImage)
                          setIsVideoUploading(false)
                          setBottomNotification({
                            message:
                              'Presentational Image has been uploaded successfully!',
                            actionType: 'success',
                          })
                        })
                        .catch((err) => {
                          console.log(
                            'Error creating Presentational Image content: ',
                            err
                          )
                          setIsVideoUploading(false)
                          setBottomNotification({
                            message:
                              ('Error creating Presentational Image content: ' +
                                err) as string,
                            actionType: 'error',
                          })
                          throw err
                        })
                    }
                  }
                )
              })
            }
          })
          .catch((err) => {
            console.log('Validation failed: ' + err)
            // setBottomNotification({
            //   message: ('Error while validating video has occurred: ' +
            //     err) as string,
            //   actionType: 'error',
            // })
            setIsVideoUploading(false)
          })
      }
    }
  }

  const uploadPublicFileToOCI = async (file: File, url: string) => {
    const response = await axios.put(url, file)
    console.log('axios', response)
    return response.status === 200
  }

  //handlers:
  const uploadBtnHandler = () => {
    if (image !== '' && image !== undefined) {
      //show pop-up to ask if User wants to change video
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
    }
    // } else if (isVideoUploading) {
    //   setBottomNotification({
    //     message: 'Video is uploading...',
    //     actionType: 'notification',
    //   })
    // }
    else {
      inputFileRef.current?.click()
    }
  }

  return {
    inputFileRef,
    onFileChange,
    uploadBtnHandler,
    showProgress,
    progress,
    centerNotification,
    showPopUp,
  }
}

export default useUploadPublicImage
