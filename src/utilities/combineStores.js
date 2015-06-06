export default function combineStores(stores) {
  return (state, action) => {
    return Object.keys(stores).reduce((acc, key) => {
      acc[key] = stores[key](state[key], action)
      return acc
    }, {})
  }
}
