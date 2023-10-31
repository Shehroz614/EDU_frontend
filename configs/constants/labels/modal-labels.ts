//Below are labels for Pop-ups:

export type CenterNotificationLabel = {
  title: string
  message: string
  firstBtn: {
    actionType: 'confirm' | 'cancel' | 'skip' //determines btn style
    title: string
  }
  secondBtn: {
    actionType: 'confirm' | 'cancel' | 'skip' //determines btn style
    title: string
  }
}
//When Author is about to change already existed
//video on the Lecture to another one
//pop-up with text below will show up

export const confirmVideoChange: CenterNotificationLabel = {
  title: 'Select file',
  message:
    'There is already an uploaded video. Do you want to upload a new video?',
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Select file',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const confirmLectureTypeChange: CenterNotificationLabel = {
  title: 'Confirm changes',
  message:
    'Changing Lecture type will delete the existed content linked with the Lecture. Do you want to change Lecture type?',
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Confirm',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const confirmLectureTextContentChange: CenterNotificationLabel = {
  title: 'Confirm changes',
  message:
    'Lecture content has changed, previous content will be deleted. Please confirm.',
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Confirm',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const confirmLectureVideoContentChange: CenterNotificationLabel = {
  title: 'Confirm changes',
  message:
    'Lecture content has changed, previous content will be replaced with a new one. \n' +
    'An old video will be available under Uploaded video. Please confirm.',
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Confirm',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const confirmLectureDeletion: CenterNotificationLabel = {
  title: 'Delete Lecture',
  message: 'Are you sure you want to delete this Lecture?',
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Delete',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const confirmSectionDeletion: CenterNotificationLabel = {
  title: 'Delete Section',
  message: 'Are you sure you want to delete a Section? \n',
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Delete',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const confirmRequirementDeletion: CenterNotificationLabel = {
  title: 'Delete Requirement',
  message: 'Are you sure you want to delete a Requirement?',
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Confirm',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const confirmKeywordDeletion: CenterNotificationLabel = {
  title: 'Delete Keyword',
  message: 'Are you sure you want to delete a Keyword?',
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Delete',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const confirmDiscountDeletion: CenterNotificationLabel = {
  title: 'Delete Coupon',
  message: 'Are you sure you want to delete a Coupon?',
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Delete',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const confirmResourceDeletion: CenterNotificationLabel = {
  title: 'Delete Resource',
  message:
    "Are you sure you want to delete a Resource? You can't undo this action.",
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Delete',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}
export const confirmVideoContentDeletion: CenterNotificationLabel = {
  title: 'Delete Video',
  message:
    "Are you sure you want to delete the uploaded video? You can't undo this action.",
  firstBtn: {
    actionType: 'confirm',
    title: 'Delete',
  },
  secondBtn: {
    actionType: 'cancel',
    title: 'Cancel',
  },
}

export const confirmPriceChangeForLiveCourse: CenterNotificationLabel = {
  title: 'Update Price for Active Course',
  message: `Are you sure you want to update the price information for a live course?
    By clicking 'Confirm', you will change the course price information.`,
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Confirm',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const confirmMinPriceChangeForLiveCourse: CenterNotificationLabel = {
  title: 'Update Minimum Price for Active Course',
  message: `Are you sure you want to update the minimum price for a live course?
    By clicking 'Confirm', you will change the course price.`,
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Confirm',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const confirmPolicyChangeForCourse: CenterNotificationLabel = {
  title: 'Update pricing policy for Active Course',
  message: `Are you sure you want to update the pricing policy for a live course?
    By clicking 'Confirm', you will change the course price information.`,
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Confirm',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const confirmPolicyDeleteForCourse: CenterNotificationLabel = {
  title: 'Delete pricing policy for Active Course',
  message: `Are you sure you want to delete the pricing policy for a live course?
    By clicking 'Confirm', you will change the course price information.`,
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Confirm',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const overwritePricingPolicy: CenterNotificationLabel = {
  title: 'Update existing Policy',
  message: `An existing policy exists with the same name/code, do you want to update the existing policy ?`,
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Confirm',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}
export const confirmCouponDeletion: CenterNotificationLabel = {
  title: 'Delete Coupon',
  message: `Are you sure you want to delete this coupon?
    Once deleted, it cannot be recovered and no one will be able to use it.`,
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Confirm',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}
export const unsupportedFileDrop: CenterNotificationLabel = {
  title: 'Unsupported file type',
  message:
    'Uploading or dropping images, videos, audio files, zip archives, or documents is not allowed.',
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Okay',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}
export const failedFileDrop: CenterNotificationLabel = {
  title: 'Unable to add File',
  message:
    'Something went wrong, we were unable to add your file at this moment, please try again later.',
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Okay',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}

export const uploadInProgress: CenterNotificationLabel = {
  title: 'Upload Media',
  message: 'Please wait while we process and upload your media file(s)',
  firstBtn: {
    actionType: 'confirm', //determines btn style
    title: 'Okay',
  },
  secondBtn: {
    actionType: 'cancel', //determines btn style
    title: 'Cancel',
  },
}
