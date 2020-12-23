import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Foods from '../views/Foods.vue'
import FoodDetail from '../views/FoodDetail.vue'
import Cart from '../views/Cart.vue'
import OrderSuccess from '../views/OrderSuccess.vue'
import NotFound from '../views/NotFound.vue'
import UnderMaintenance from '../views/UnderMaintenance.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Skills - MyApp' } // <- I would to use this one
  },
  {
    path: '/foods',
    name: 'Foods',
    component: Foods
  },
  {
    path: '/foods/:id',
    name: 'FoodDetail',
    component: FoodDetail
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: OrderSuccess
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  },
  {
    path: '/undermaintenance',
    name: 'Not Found',
    component: UnderMaintenance
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router