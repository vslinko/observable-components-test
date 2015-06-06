import Rx from 'rx'

export default function createAtom(store) {
  const observable = new Rx.BehaviorSubject({})
  let state = {}

  function dispatch(action) {
    state = store(state, action)
    observable.onNext(state)
  }

  function performAction(action) {
    if (typeof result === 'function') {
      return action(dispatch, state)
    } else {
      return dispatch(action)
    }
  }

  dispatch({type: undefined})

  return {
    observable,
    performAction
  }
}
