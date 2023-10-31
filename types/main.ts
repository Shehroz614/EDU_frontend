export type Category = {
  _id: string
  name: {
    [_key: string]: string
  }
  parent: string
  children: Category[]
}

export type Filters = {
  price: {
    min: number
    max: number
  }
  rating: number
  duration: {
    min: number
    max: any
  }
  category: string[]
  subCategory: string[]
  topic: string[]
  language: string[]
  difficulty: string[]
}

//is used to show success/error/notification in Bottom pop-up
export type BottomNotification = {
  message: string
  actionType: 'success' | 'error' | 'notification' // determines style
  duration?: number //how many seconds pop-up will be shown(in sec)
}

export type CenterNotification = {
  title: string
  message: string | JSX.Element
  firstBtn?: {
    actionType: 'confirm' | 'cancel' | 'skip' //determines btn style
    title: string
    action: () => void //action that will be fired onClick
  }
  secondBtn?: {
    actionType: 'confirm' | 'cancel' | 'skip' //determines btn style
    title: string
    action: () => void //action that will be fired onClick
  }
}
