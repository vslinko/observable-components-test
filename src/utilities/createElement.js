import React from 'react'
import createObservableComponent from './createObservableComponent'

export default function createElement(element, ...args) {
  var type

  if (typeof element === 'function' && !element.prototype.render) {
    if (!element.ReactComponent) {
      element.ReactComponent = createObservableComponent(element)
    }

    type = element.ReactComponent
  } else {
    type = element
  }

  return React.createElement(type, ...args)
}
