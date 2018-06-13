const Sgnin= { template: '<signinshow></signinshow>' }
const Sgnup = { template: '<signupshow></signupshow>' }
const con = { template: '<contactshow></contactshow>' }
const afterNavi = { template: '<afterNavi></afterNavi>' }
const beforeNavi = { template: '<beforeNavi></beforeNavi>' }
const order = { template: '<orderList></orderList>' }
const product = { template: '<productList></productList>' }

const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        naviBar: beforeNavi,
        mainContent: Sgnin
      }
    },
    {
      path: '/signin',
      components: {
        naviBar: beforeNavi,
        mainContent: Sgnin
      }
    },
    {
      path: '/signup',
      components: {
        naviBar: beforeNavi,
        mainContent: Sgnup
      }
    },
    {
      path: '/contact',
      components: {
        naviBar: beforeNavi,
        mainContent: con
      }
    },
    {
      path: '/manageOrder',
      components: {
        naviBar: afterNavi,
        mainContent: order
      }
    },
    {
      path: '/manageProduct',
      components: {
        naviBar: afterNavi,
        mainContent: product
      }
    }
  ]
})

new Vue({
  el: '#app',
  router
})

