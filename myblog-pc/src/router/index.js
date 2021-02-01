import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Index from '../views/index.vue'
import BlogDetail from '../views/blogDetail.vue'
import Regist from '../views/Regist.vue'
import UserInfo from '../views/UserInfo.vue'
import SerachBlog from '../views/SerachBlog.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login
}, {
    path: '/',
    name: 'Index',
    component: Index
}, {
    path: '/blog/detail/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
}, {
    path: '/regist',
    name: 'Regist',
    component: Regist
}, {
    path: '/userInfo',
    name: 'UserInfo',
    component: UserInfo
}, {
    path: '/blog/serBlog',
    name: 'SerachBlog',
    component: SerachBlog
}, ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router