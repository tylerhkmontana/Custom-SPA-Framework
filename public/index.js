import { router } from './route.mjs'
// Basic Components
import defaultComponent from './defaultComponent.mjs'
import routerView from './routerView.mjs'
// Custom Components
import navClass from './components/nav.mjs'

jQuery(() => {
  router()
})

customElements.define('default-component', defaultComponent)
customElements.define('router-view', routerView)

customElements.define('component-nav', navClass)