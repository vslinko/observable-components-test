import {
  NEW_ITEM,
} from '../constants'

const initialState = []

export default function items(state = initialState, action) {
  switch (action.type) {
    case NEW_ITEM:
      return state.concat(action.item)

    default:
      return state
  }
}
