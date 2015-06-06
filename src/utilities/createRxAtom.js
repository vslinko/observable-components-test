import Rx from 'rx'
import createAtom from './createAtom'

export default function createRxAtom(store) {
  const {subscribe, performAction} = createAtom(store)

  const observable = new Rx.Observable.create(observer => {
    const unsubscribe = subscribe(::observer.onNext)

    return unsubscribe
  })

  return {
    observable,
    performAction,
  }
}
