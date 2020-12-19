import { navigateTo } from '../route.mjs'

export default class extends HTMLElement {
  static targetRoute
  constructor() {
    super()
    this.targetRoute = this.getAttribute('to')
    // this.componentPath = '/navigateTo.html'
    this.addEventListener('click', e => {
      navigateTo(this.targetRoute)
    })
  }
}