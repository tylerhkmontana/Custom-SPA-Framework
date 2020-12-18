import { navigateTo } from '../route.mjs'
import componentClass from '../defaultComponent.mjs'

export default class extends componentClass {
  constructor() {
    super()
    this.componentPath = '/nav.html'
  }

  mounted() {
    const navBar = this.root.querySelector('#nav-bar')

    navBar.addEventListener('click', e => {
      if(e.target.className.includes('nav-button')) {
        e.preventDefault()
        const {pathname} = new URL(e.target.href)
        navigateTo(pathname)
      }
    }) 
  }
}