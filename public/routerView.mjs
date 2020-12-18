import defaultComponent from './defaultComponent.mjs'

export default class extends defaultComponent {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['component']
  }

  connectedCallback() {
    
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.componentPath = newValue
    this.socket.emit('req component', this.componentPath)

    this.socket.on('res component', component => {
      const template = document.createElement('template')
      template.innerHTML = component

      this.shadowRoot.innerHTML = ''
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.mounted()
    })
  }
}