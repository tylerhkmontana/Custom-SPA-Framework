import defaultComponent from './defaultComponent.mjs'

export default class extends defaultComponent {
  constructor() {
    super()
  }

  // Listents to given attribute name
  static get observedAttributes() {
    return ['component']
  }

  connectedCallback() {
    // Do not receive component file at the mount
  }

  // Called when router function changes its 'component' attribute
  attributeChangedCallback(name, oldValue, newValue) {
    this.componentPath = newValue // changed component filepath by the router

    // Send And Receive component file to&from the server
    this.socket.emit('req component', this.componentPath)

    this.socket.on('res component', component => {
      const template = document.createElement('template')
      template.innerHTML = component

      this.root.innerHTML = ''
      this.root.appendChild(template.content.cloneNode(true))
      this.mounted()
    })
  }
}