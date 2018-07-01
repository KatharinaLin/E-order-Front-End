const Sgnin= { template: '<SignInShow></SignInShow>' }
const Sgnup = { template: '<SignUpShow></SignUpShow>' }
const con = { template: '<ContactShow></ContactShow>' }
const afterNavi = { template: '<AfterNavigation></AfterNavigation>' }
const beforeNavi = { template: '<BeforeNavigation></BeforeNavigation>' }
const order = { template: '<OrderList></OrderList>' }
const product = { template: '<ProductList></ProductList>' }
const settings = { template: '<Settings></Settings>' }
const editProduct = { template: '<EditProducts></EditProducts>' }
const msg = { template: '<Message></Message>' }

const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        NavigationBar: afterNavi,
        MainContent: settings,
        Messages:msg
      }
    },
    {
      path: '/signin',
      components: {
        NavigationBar: beforeNavi,
        MainContent: Sgnin,
        Messages:msg
      }
    },
    {
      path: '/signup',
      components: {
        NavigationBar: beforeNavi,
        MainContent: Sgnup,
        Messages:msg
      }
    },
    {
      path: '/contact',
      components: {
        NavigationBar: beforeNavi,
        MainContent: con,
        Messages:msg
      }
    },
    {
      path: '/manageOrder',
      components: {
        NavigationBar: afterNavi,
        MainContent: order,
        Messages: msg
      }
    },
    {
      path: '/manageProduct',
      components: {
        NavigationBar: afterNavi,
        MainContent: product,
        Messages: msg
      }
    },
    {
      path: '/manageSetting',
      components: {
        NavigationBar: afterNavi,
        MainContent: settings,
        Messages: msg
      }
    },
    {
      path: '/manageProduct/category/:type/:name',
      name: 'editProducts',
      components: {
        NavigationBar: afterNavi,
        MainContent: editProduct,
        Messages: msg
      }
    }
  ]
})
const store = new Vuex.Store({
    state: {
        userId:""
    },
    mutations: {
      UpdateUserId (state, str) {
        state.userId = str
      },
      ClearLogin (state) {
        state.userId = ""
      }
    }
})
new Vue({
  el: '#app',
  router,
  store
})

