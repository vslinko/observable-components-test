import createElement from './utilities/createElement'

import React from 'react'
import createAtom from './utilities/createAtom'
import combineStores from './utilities/combineStores'

import * as stores from './stores'

import App from './components/App'

function bootstrapApplication() {
  const atom = createAtom(combineStores(stores))

  React.render(<App atom={atom} />, document.getElementById('app'))
}

bootstrapApplication()
