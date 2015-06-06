import {
  NEW_ITEM,
} from '../constants'

export function createNewItem() {
  return {
    type: NEW_ITEM,

    item: {
      title: String(Math.random())
    }
  }
}

export function createNewItemWithDelay(delay) {
  return (performAction, state) => {
    setTimeout(() => {
      performAction(createNewItem())
    }, delay)
  }
}

export function createNewItemAfterSecond() {
  return (performAction, state) => {
    performAction(createNewItemWithDelay(1000))
  }
}
