import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FolderIcon from '../../../../public/static/icons/folder-icon'
import styles from './styles.module.scss'
import PopUpCenter from '@components/organisms/PopUpCenter'

type FileUploaderProps = {
  children: JSX.Element | JSX.Element[]
  onUpload: (data: any) => Promise<any>
  hideDropzone?: boolean
}
const Dropzone = ({
  children,
  hideDropzone = false,
  onUpload,
}: FileUploaderProps) => {
  const dropzone = useRef<HTMLDivElement>(null)
  const [showDropzone, setShowDropzone] = useState<boolean>(false)
  const [showPopUp, setShowPopUp] = useState<boolean>(false)
  const [response] = useState<Array<any>>([])

  useEffect(() => {
    setShowPopUp(hideDropzone)
  }, [hideDropzone])

  useEffect(() => {
    //const element = dropzone?.current;
    // if (element) {
    //     element.addEventListener('dragover', (event: DragEvent) => handleDrag(event));
    //     element.addEventListener('dragleave', (event: DragEvent) => handleDrag(event));
    //     element.addEventListener('drop', handleOver);
    //
    //     return () => {
    //         element.removeEventListener('dragover', (event: DragEvent) => handleDrag(event));
    //         element.removeEventListener('dragleave', (event: DragEvent) => handleDrag(event));
    //         element.removeEventListener('drop', handleOver);
    //     }
    // }
  }, [dropzone])

  // const handleDrag = (event: DragEvent) => {
  //     event.preventDefault();
  //     setShowDropzone(event.type === 'dragover');
  // }
  // const handleOver = async (event: DragEvent) => {
  //     event.preventDefault();
  //     const response: any = await readDroppedItems(event.dataTransfer);
  //     if (response) {
  //         setResponse(response);
  //         setShowPopUp(true);
  //     }
  //     return false;
  // }

  const handleUpload = async () => {
    setShowPopUp(false)
    onUpload(response).then((e: any) => {
      console.log(e)
    })
  }

  return (
    <div className={styles.main_container} ref={dropzone}>
      <AnimatePresence mode="wait">
        {showDropzone && (
          <motion.div
            className={styles.dropzone}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, type: 'tween' }}
            onClick={() => setShowDropzone(false)}
          >
            <div className={styles.dropzone_inner}>
              <motion.div
                className={styles.dropzone_content_wrapper}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.6 }}
                transition={{ duration: 0.5, type: 'tween' }}
              >
                <div className={styles.dropzone_content}>
                  <FolderIcon width="90px" height="90px" />
                  <span>Drop your files or folders here</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <PopUpCenter
        showPopUp={showPopUp}
        centerNotification={{
          title: 'Trying to upload a folder?',
          message:
            'Seems like you are trying to upload a folder, we will automatically create Sections and Lectures for you based on the folders and files uploaded',
          firstBtn: {
            title: 'Confirm',
            actionType: 'confirm',
            action: handleUpload,
          },
          secondBtn: {
            title: 'Cancel',
            actionType: 'cancel',
            action: () => {
              setShowPopUp(false)
              setShowDropzone(false)
            },
          },
        }}
      />
      <div className={styles.content_container}>{children}</div>
    </div>
  )
}

export default Dropzone
