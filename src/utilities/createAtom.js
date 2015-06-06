export default function createAtom(store) {
  let state = {}
  let listeners = []

  function subscribe(listener) {
    listeners.push(listener)

    listener(state)

    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  function dispatch(action) {
    state = store(state, action)

    listeners.forEach(listener => listener(state))
  }

  function performAction(action) {
    if (typeof action === 'function') {
      return action(performAction, state)
    } else {
      return dispatch(action)
    }
  }

  dispatch({type: undefined})

  return {
    subscribe,
    performAction
  }
}
