import createElement from './utilities/createElement'

import React from 'react'
import createRxAtom from './utilities/createRxAtom'
import combineStores from './utilities/combineStores'

import * as stores from './stores'

import App from './components/App'

function bootstrapApplication() {
  const atom = createRxAtom(combineStores(stores))

  React.render(<App atom={atom} />, document.getElementById('app'))
}

bootstrapApplication()
