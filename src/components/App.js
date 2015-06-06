import createElement from '../utilities/createElement'

import {createNewItem} from '../actions/items'

import ItemsList from './ItemsList'

function render({atom, onCreateClick}) {
  return (
    <div>
      <h1>Hello World!</h1>
      <ItemsList atom={atom} />
      <button onClick={onCreateClick}>Add new</button>
    </div>
  )
}

export default function App({atom}) {
  const onCreateClick = () => {
    atom.performAction(createNewItem())
  }

  return render({atom, onCreateClick})
}
