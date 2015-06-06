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
