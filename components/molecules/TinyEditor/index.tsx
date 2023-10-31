import React, { useCallback, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import PopUpCenter from '@components/organisms/PopUpCenter'
import { BottomNotification, CenterNotification } from '@type/main'
import {
  failedFileDrop,
  unsupportedFileDrop,
  uploadInProgress,
} from '@configs/constants/labels/modal-labels'
import {
  EditorWrapper,
  CharCountWrapper,
  LoaderWrapper,
} from './styled.components'
import PopUpBottom from '@components/organisms/PopUpBottom'
import { Loading, Text } from '@nextui-org/react'

type TinyEditorProps = {
  type?: 'textOnly' | 'page'
  value?: string
  placeholder?: string
  onChange?: (content: string) => void
  onImageUpload?: (blob: Blob, onProgress: (e: any) => void) => Promise<any>
  readOnly?: boolean //if true editor cannot be editable
  height?: string
  width?: string
  init?: Function
  opacity?: string
  maxLength?: number
}

const TinyEditor: React.FC<TinyEditorProps> = (props) => {
  const {
    type,
    value,
    placeholder,
    onChange,
    onImageUpload,
    readOnly,
    height,
    width,
    opacity = '1',
    maxLength = null,
  } = props

  const [centerNotification, setCenterNotification] = useState<
    boolean | CenterNotification
  >(false)
  const [bottomNotification, setBottomNotification] = useState<
    boolean | BottomNotification
  >(false)

  const getOptions = useCallback(() => {
    switch (type) {
      case 'textOnly':
        return 'undo redo | bold italic underline strikethrough'
      case 'page':
        return 'undo redo | bold italic underline strikethrough |\
          fontselect fontsizeselect formatselect |\
           alignleft aligncenter alignright alignjustify |\
            outdent indent |  numlist bullist checklist |\
             forecolor backcolor casechange removeformat |\
              pagebreak | charmap emoticons | fullscreen  preview |\
               image link anchor codesample |\
                a11ycheck ltr rtl | showcomments addcomment'

      default:
        return ''
    }
  }, [type])

  const handleEditorChange = (content: string) => {
    if (!readOnly) {
      if (onChange) {
        if (maxLength && content.length > maxLength) {
          return
        }
        onChange(content)
      }
    }
  }

  const imageUploadHandler: any = async (blobInfo: any) => {
    return new Promise((resolve, reject) => {
      if (onImageUpload) {
        setCenterNotification({
          title: uploadInProgress.title,
          message: (
            <LoaderWrapper>
              <Text style={{ margin: 20, marginTop: 0 }}>
                {uploadInProgress.message}
              </Text>
              <Loading type="default" />
            </LoaderWrapper>
          ),
        })
        onImageUpload(blobInfo.blob(), () => {})
          .then((res) => {
            setCenterNotification(false)
            resolve(res)
          })
          .catch(() => {
            setCenterNotification(false)
            setCenterNotification({
              title: failedFileDrop.title,
              message: failedFileDrop.message,
              firstBtn: {
                title: failedFileDrop.firstBtn.title,
                actionType: failedFileDrop.firstBtn.actionType,
                action: () => {
                  setCenterNotification(false)
                },
              },
            })
            reject({
              message: 'Media upload failed',
              remove: true,
            })
          })
      } else {
        reject({
          message: 'Media upload failed',
          remove: true,
        })
      }
    })
  }

  return (
    <div style={{ height: '100%', width: width, opacity: opacity }}>
      <EditorWrapper>
        <Editor
          disabled={readOnly}
          value={value ? value : ''}
          onEditorChange={handleEditorChange}
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          init={{
            placeholder: placeholder,
            skin: 'edugram',
            skin_url: '/tinymce/skins/ui/edugram',
            editor_css: '/style.css',
            height: height ? height : '100%',
            width: width ? width : '100%',
            content_style: 'img {max-width: 100%;}',
            menubar: false,
            smart_paste: false,
            block_unsupported_drop: false,
            plugins: !readOnly
              ? [
                  'preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons',
                ]
              : ['autoresize'],
            toolbar: readOnly ? false : getOptions(),
            statusbar: !readOnly,
            branding: false,
            //images_upload_url: '/upload-image', // Specify the server endpoint for image uploads
            images_upload_handler: imageUploadHandler,
            setup: (editor) => {
              editor.on('drop', function (e) {
                const file = e?.dataTransfer?.files[0]
                if (file) {
                  if (type === 'textOnly') {
                    setCenterNotification({
                      title: unsupportedFileDrop.title,
                      message: unsupportedFileDrop.message,
                      firstBtn: {
                        title: unsupportedFileDrop.firstBtn.title,
                        actionType: unsupportedFileDrop.firstBtn.actionType,
                        action: () => {
                          setCenterNotification(false)
                        },
                      },
                    })
                    e.preventDefault()
                  }
                }
              })
              editor.on('PastePreProcess', (e) => {
                const pastedText =
                  new DOMParser().parseFromString(e.content, 'text/html')
                    ?.documentElement?.textContent || ''
                const currentContent = editor.getContent({ format: 'text' })

                if (maxLength) {
                  const remainingSpace = maxLength - currentContent.length
                  if (remainingSpace <= 0) {
                    e.preventDefault()
                    e.stopPropagation()
                  } else if (pastedText.length > remainingSpace) {
                    const truncatedText = pastedText.substring(
                      0,
                      remainingSpace
                    )
                    const newContent = currentContent + truncatedText
                    editor.setContent(newContent)

                    e.preventDefault()
                    e.stopPropagation()
                  }
                }
              })
            },
          }}
        />
        {maxLength && (
          <CharCountWrapper>
            {value?.length}/{maxLength}
          </CharCountWrapper>
        )}
      </EditorWrapper>
      {centerNotification && (
        <PopUpCenter
          showPopUp={centerNotification as boolean}
          centerNotification={centerNotification as CenterNotification}
        />
      )}
      {bottomNotification && (
        <PopUpBottom
          setShowPopUp={setBottomNotification}
          bottomNotification={bottomNotification as BottomNotification}
        />
      )}
    </div>
  )
}

export default TinyEditor
