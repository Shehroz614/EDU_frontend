import { useEffect, useRef, useState } from 'react'
import axios, { CancelTokenSource } from 'axios'
import { BottomNotification } from 'types/main'
import {
  getAuthorIntroVideoUploadURL,
  updateAuthorIntroVideo,
} from '@services/api/author'
import { useAuth } from '@hooks/useAuth'
import { useTranslation } from 'next-i18next'

const useUploadAuthorIntroVideo = () => {
  // Hooks
  const { t } = useTranslation(['authorProfileSettings'])
  const { updateCurrentUserFromResponse } = useAuth()

  // State definitions
  const [notification, setNotification] = useState<BottomNotification>()
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadStage, setUploadStage] = useState<'idle' | 'uploading' | 'done'>(
    'idle'
  )
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null)
  const [fileSelected, setFileSelected] = useState<File | null>(null)
  const cancelUploadSourceRef = useRef<CancelTokenSource | null>(null)

  // Refs
  const inputFileRef = useRef<HTMLInputElement>(null)

  // Constants
  const SUPPORTED_FORMATS = ['video/mp4', 'video/webm']
  const MAX_FILE_SIZE = 300 * 1024 * 1024 // 300 MB

  // Auto-clear error notifications after a duration
  useEffect(() => {
    if (notification?.actionType === 'error') {
      const timer = setTimeout(() => setNotification(undefined), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Helper function to reset states
  const cleanStates = () => {
    setFileSelected(null)
    setUploadProgress(0)
    setVideoThumbnail(null)
    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }
  }

  // Helper function to validate and set the video file
  const validateAndSetFile = (file: File): void => {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      setNotification({
        message: t(
          'The selected file format is not supported. Please upload a video in MP4 or WEBM format.'
        ),
        actionType: 'error',
      })
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setNotification({
        message: t(
          'The selected video file is too large. Please ensure the video is under 300MB.'
        ),
        actionType: 'error',
      })
      return
    }

    setFileSelected(file)
    getVideoThumbnail(file).then((thumbnail) => {
      setVideoThumbnail(thumbnail)
    })
  }

  // Helper function to extract video thumbnail
  const getVideoThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement('video')
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      video.src = URL.createObjectURL(file)
      video.crossOrigin = 'anonymous'

      video.oncanplaythrough = () => {
        if (video.duration > 3) {
          video.currentTime = 3
        } else {
          video.currentTime = video.duration / 2
        }

        video.onseeked = () => {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          context?.drawImage(video, 0, 0, canvas.width, canvas.height)
          resolve(canvas.toDataURL())
        }
      }

      video.onerror = (e) => {
        console.error('Video Thumbnail error:', e)
      }
    })
  }

  // Function to handle video upload
  const uploadIntroVideo = (file: File) => {
    setUploadStage('uploading')

    const source = axios.CancelToken.source()
    cancelUploadSourceRef.current = source // Store the cancel function

    getAuthorIntroVideoUploadURL(file.name)
      .then((uploadURLResponse) => {
        return axios.put(uploadURLResponse.url, file, {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
              setUploadProgress(percentCompleted)
            }
          },
          cancelToken: source.token,
        })
      })
      .then(() => {
        return updateAuthorIntroVideo(file.name)
      })
      .then((res) => {
        updateCurrentUserFromResponse(res)
        setNotification({
          message: t('Author Intro Video has been uploaded successfully!'),
          actionType: 'success',
        })
        cleanStates()
        setUploadStage('done')
      })
      .catch((err) => {
        console.error('Error uploading intro video:', err)
        if (err.code !== 'ERR_CANCELED') {
          setNotification({
            message: t('There was an issue uploading your video.'),
            actionType: 'error',
          })
          setUploadStage('idle')
        }
      })
  }

  // Handlers
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  const triggerFileInput = () => {
    inputFileRef.current?.click()
  }

  const uploadHandler = () => {
    if (fileSelected) {
      uploadIntroVideo(fileSelected)
    }
  }

  const handleCancel = () => {
    cleanStates()
    setUploadStage('idle')
    setNotification(undefined)
  }

  // Function to abort the upload
  const abortUpload = () => {
    if (cancelUploadSourceRef.current) {
      cancelUploadSourceRef.current.cancel('Upload aborted by the user.')
      setNotification({
        message: t('Upload has been aborted!'),
        actionType: 'notification',
      })
      setUploadStage('idle')
    }
  }

  return {
    triggerFileInput,
    handleFileSelect,
    uploadIntroVideo,
    notification,
    inputFileRef,
    uploadProgress,
    uploadStage,
    videoThumbnail,
    fileSelected,
    uploadHandler,
    handleCancel,
    abortUpload,
  }
}

export default useUploadAuthorIntroVideo
