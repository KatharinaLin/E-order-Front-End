const Sgnin= { template: '<signinshow></signinshow>' }
const Sgnup = { template: '<signupshow></signupshow>' }
const con = { template: '<contactshow></contactshow>' }
const routes = [
  { path: '/signin', component: Sgnin },
  { path: '/signup', component: Sgnup },
  { path: '/contact', component: con }
]


const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router
})

