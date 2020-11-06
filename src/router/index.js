import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Category from "@/components/dashboard/categories/Category";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/products',
    name: 'products',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Products.vue')
  },
  {
    path: '/products/nomenclature',
    name: 'nomenclature',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/products/Nomenclature.vue')
  },
  {
    path: '/products/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/products/Categories.vue'),
    children: [
      {
        path: '/products/categories/:id',
        meta: {layout: 'main', auth: true},
        components: {
          helper: Category
        }
      }
    ]
  },
  {
    path: '/products/properties',
    name: 'properties-products',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/products/PropertiesProducts.vue')
  },
  {
    path: '/products/characteristic',
    name: 'characteristic',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/products/CharacteristicProducts.vue')
  },
  {
    path: '/products/warehouses',
    name: 'Warehouses',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/products/Warehouses.vue')
  },
  {
    path: '/products/purchases',
    name: 'Purchases',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/products/Purchases.vue')
  },
  {
    path: '/products/suppliers',
    name: 'Suppliers',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/products/Suppliers.vue')
  },
  {
    path: '/products/import-export',
    name: 'ImportExport',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/products/ImportExport.vue')
  },
  {
    path: '/products/delivery',
    name: 'Delivery',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/products/Delivery.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)) {
    if (store.getters.isLoggedIn) {
      console.log('Login true')
      next()
      return
    }
    next('/login')
  } else {
    console.log('Login false')
    next()
  }
})

export default router