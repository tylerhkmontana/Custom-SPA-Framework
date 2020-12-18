export default class extends HTMLElement {
  static socket
  static componentPath

  constructor() {
    super()
    this.socket = io()
    this.componentPath = this.dataset.component
    this.attachShadow({mode: 'open'})
  }

  mounted() {
    // Called after connectedCallback
  }

  unmounted() {
    // Called after disconnectedCallback
  }

  connectedCallback() {    
    this.socket.emit('req component', this.componentPath)

    this.socket.on('res component', component => {
      const template = document.createElement('template')
      template.innerHTML = component
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.mounted()
    })
  }
  
  disconnectedCallback() {
    this.socket.destroy()
    this.unmounted()
  }
}