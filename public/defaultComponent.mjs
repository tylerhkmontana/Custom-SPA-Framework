export default class extends HTMLElement {
  static socket
  static componentPath
  static body

  constructor() {
    super()
    // Create Socket Connection to the server
    this.socket = io()
    // Set component file path
    this.componentPath = this.dataset.component
    // Creates and Set shadowDOM of this component
    this.root = this.attachShadow({mode: 'open'})
  }

  mounted() {
    // Called after connectedCallback
  }

  unmounted() {
    // Called after disconnectedCallback
  }

  // Called when this element is mounted
  connectedCallback() {    
    // Request corresponding component file to the server
    this.socket.emit('req component', this.componentPath)

    // Receives corresponding component file from the server
    this.socket.on('res component', component => {
      // Create template and store component file from the server
      const template = document.createElement('template')
      template.innerHTML = component

      // Add the template to the root
      this.root.appendChild(template.content.cloneNode(true))
      this.mounted()
    })
  }
  
  // Called when this element is unmounted
  disconnectedCallback() {
    // Destroy socket connection with the server
    this.socket.destroy()
    this.unmounted()
  }
}