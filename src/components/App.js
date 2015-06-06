import createElement from '../utilities/createElement'

import {createNewItem, createNewItemAfterSecond} from '../actions/items'

import ItemsList from './ItemsList'

function render({atom, onCreateClick, onCreateWithDelayClick}) {
  return (
    <div>
      <h1>Hello World!</h1>
      <ItemsList atom={atom} />
      <button onClick={onCreateClick}>Add new</button>
      <button onClick={onCreateWithDelayClick}>Add new after one second</button>
    </div>
  )
}

export default function App({atom}) {
  const onCreateClick = () => {
    atom.performAction(createNewItem())
  }

  const onCreateWithDelayClick = () => {
    atom.performAction(createNewItemAfterSecond())
  }

  return render({atom, onCreateClick, onCreateWithDelayClick})
}
