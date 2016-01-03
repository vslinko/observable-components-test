/* @flow */

type State = Object

type Action = {type: string | void}
type AsyncAction = (performAction: FluxPerformFunction, state: State) => void
type ActionCreator = () => Action | AsyncAction

type StoreFunction = (state: State, action: Action) => State

type StoreDefinition = {name: string, store: StoreFunction}
type CombineStoresFunction = (stores: Array<StoreDefinition>) => StoreFunction

type FluxListener = (state: State) => void
type FluxUnsubscribe = () => void
type FluxHydro = {state: State, listeners: Array<FluxListener>}
type FluxDehydrateFunction = () => FluxHydro
type FluxHydrateFuntion = (hydro: FluxHydro) => void
type FluxSubscribeFunction = (listener: FluxListener) => FluxUnsubscribe
type FluxPerformFunction = (action: Action | AsyncAction) => void
type Flux = {subscribe: FluxSubscribeFunction, perform: FluxPerformFunction, dehydrate: FluxDehydrateFunction, hydrate: FluxHydrateFuntion}
type FluxCreator = (store: StoreFunction) => Flux

function syncActionCreator(): Action {
  return {
    type: 'ACTION_TYPE'
  }
}

function asyncActionCreator(): AsyncAction {
  return function asyncAction(performAction: FluxPerformFunction, state: State): void {
    performAction(syncActionCreator())
  }
}

function itemsStore(state: State = {}, action: Action): State {
  switch (action.type) {
    default:
      return state
  }
}

function combineStores(stores: Array<StoreDefinition>): StoreFunction {
  return function combinedStore(state: State, action: Action): State {
    return stores.reduce((acc, storeDefinition) => {
      acc[storeDefinition.name] = storeDefinition.store(state[storeDefinition.name], action)
      return acc
    }, {})
  }
}

function createFlux(store: StoreFunction): Flux {
  var state: State = store({}, {type: undefined})
  var listeners: Array<FluxListener> = []

  function subscribe(listener: FluxListener): function {
    listeners.push(listener)

    listener(state)

    return function() {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  function perform(action: Action | AsyncAction): void {
    state = store(state, action)

    listeners.forEach(listener => listener(state))
  }

  function dehydrate() {
    var hydro = {state, listeners}
    state = {}
    listeners = []
    return hydro
  }

  function hydrate(hydro = {}) {
    state = hydro.state || {}
    listeners = hydro.listeners || []
  }

  return {
    subscribe,
    perform,
    hydrate,
    dehydrate,
  }
}

var combinedStore = combineStores([
  {name: 'items', store: itemsStore},
])
var flux = createFlux(combinedStore)

flux.perform(asyncActionCreator())

var unsubscribe = flux.subscribe(state => {
  console.log(state)
})

unsubscribe()

var hydro = flux.dehydrate()
flux.hydrate(hydro)
