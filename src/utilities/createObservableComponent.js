import React, {Component} from 'react'

export default function createObservableComponent(render) {
  return class ObservableComponent extends Component {
    static displayName = render.name

    constructor() {
      super()
      this.subscribtion = null
      this.vtree = null
    }

    componentWillMount() {
      this.refreshSubscribtion(this.props)
    }

    componentWillReceiveProps(nextProps) {
      this.refreshSubscribtion(nextProps)
    }

    componentWillUnmount() {
      this.disposeSubscribtion()
    }

    refreshSubscribtion(props) {
      this.disposeSubscribtion()

      const vtreeOrObservable = render(props)

      if (vtreeOrObservable instanceof Rx.Observable) {
        this.vtree = null
        this.subscribtion = vtreeOrObservable
          .subscribe(vtree => {
            this.vtree = vtree
            this.forceUpdate()
          })
      } else {
        this.vtree = vtreeOrObservable
      }
    }

    disposeSubscribtion() {
      if (this.subscribtion) {
        this.subscribtion.dispose()
        this.subscribtion = null
      }
    }

    render() {
      return this.vtree
    }
  }
}
