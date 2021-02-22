import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import {
  getToken
} from '../utils/auth'
const Home = () => import('../views/Home/Home.vue')
const Login = () => import('../views/Login/Login.vue')
const Welcome = () => import('../views/Home/children/Welcome')
const Users = () => import('../views/Home/children/Users')
const XunWu = () => import('../views/Home/children/XunWu')
const ShiWu = () => import('../views/Home/children/ShiWu')
const AddAdmin = () => import('../views/Home/children/Users/AddAdmin')

Vue.use(Router)

const routes = [{
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: Login,
    component: Login
  },
  {
    path: '/home',
    // 当某个路由有子级路由时，父级路由需要一个默认的路由，
    // 所以父级路由不能定义name属性，
    // name: Home,
    component: Home,
    children: [{
        path: '',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        component: Welcome,
        name: 'welcome'
      },
      {
        path: '/users',
        component: Users,
        name: 'user',
      },
      {
        path: '/addAdmin',
        component: AddAdmin,
        name: 'addAdmin',
      },
      {
        path: '/xunwu',
        component: XunWu,
        name: 'xunwu'
      },
      {
        path: '/shiwu',
        component: ShiWu,
        name: 'shiwu'
      },
    ]
  },
]

const router = new Router({
  routes,
})

//挂载路由导航守卫
//路由白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  //to将要访问的路径
  //from从那个路径跳转而来
  //next 是一个函数 表示放行
  //  next()放行,next('/login')强制跳转
  // if (to.path === '/login') return next()
  // //获取token
  // const tokenStr =getToken()
  // if (!tokenStr) return next('/login')
  // next()
  if (getToken()) {
    if (to.path !== '/login') {
      store.dispatch('setPath', to.path)
    }
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router