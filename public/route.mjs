export const routes = [
  {path: '/', component: '/home.html'},
  {path: 'about', component: '/about.html', children: [
    {path: 'developers', component: '/portfolio.html', children: [
      {path: 'himchan', component: '/developer.html'}
    ]}
  ]}
]

export const router = () => {
  let pathArray = location.pathname === '/' ? ['/'] : location.pathname.split('/')
  pathArray = pathArray.filter(p => p !== '')

  const componentArray = confirmRoute(routes, pathArray, [])

  if (componentArray) {
    const routerView = document.querySelector('router-view')
    routerView.setAttribute('component', componentArray[0])
    componentArray.shift()
    routerView.setAttribute('children', componentArray)
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

function confirmRoute(routes, routeArray, componentArray) {
  if (routes) {
    const currMatch = routes.find(r => r.path === routeArray[0])

    if(currMatch) {
      const { children } = currMatch
      componentArray.push(currMatch.component)
      routeArray.shift()
      return routeArray.length === 0 ? componentArray : confirmRoute(children, routeArray, componentArray)
    } else {
      return false
    }
  } else {
    return false
  }
}