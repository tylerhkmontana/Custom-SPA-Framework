import { router } from './route.mjs'
// Basic Components
import defaultComponent from './defaultComponent.mjs'
import routerView from './routerView.mjs'
import navigateTo from './navigateTo.mjs'

document.addEventListener('DOMContentLoaded', () => {
  router()
})

window.addEventListener('popstate', router)

// Adding Custom Element to Custom Element Registry
customElements.define('default-component', defaultComponent)
customElements.define('router-view', routerView)
customElements.define('navigate-to', navigateTo)