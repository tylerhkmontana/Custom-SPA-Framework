export const routes = [
  {path: '/', title: 'Home', component: '/home.html'},
  {path: '/about', title: 'About', component: '/about.html'}
]

export const router = () => {
  let currRoute = routes.find(r => r.path === location.pathname)

  const routerView = document.querySelector('router-view')
  
  routerView.innerHTML = ''
  if(currRoute) {
    routerView.setAttribute('component', currRoute.component)
  } else {
    navigateTo('/')
  }
}

export const navigateTo = (path) => {
  if (!(path === location.pathname)) {
    window.history.pushState(null, null, path)
  }
  router()
}
