import defaultComponent from './defaultComponent.mjs'

export default class extends defaultComponent {
  constructor() {
    super()
  }

  // Listents to given attribute name
  static get observedAttributes() {
    return ['component']
  }

  mounted() {
    let childComponents = this.getAttribute('children')

    if(childComponents) {
      childComponents = childComponents.split(',')
      const childRouterView = document.querySelector('[role=child]')
      if(childRouterView) {
        childRouterView.removeAttribute('role')
        childRouterView.setAttribute('component', childComponents[0])
        childComponents.shift()
        childRouterView.setAttribute('children', childComponents)
      }
    }
  }

  connectedCallback() {
    // Do not receive component file at the mount
  }

  // Called when router function changes its 'component' attribute
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'component') {
      this.socket.emit('req component', newValue)
    } 
  }
}