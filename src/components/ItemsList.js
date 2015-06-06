import createElement from '../utilities/createElement'

import Item from './Item'

function render({atom, items}) {
  return (
    <div>
      {items.map((item, index) =>
        <Item key={index} atom={atom} item={item} />)}
    </div>
  )
}

export default function ItemsList({atom}) {
  return atom.observable
    .map(appState => ({
      atom: atom,
      items: appState.items
    }))
    .map(render)
}
