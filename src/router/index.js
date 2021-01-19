import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import NavigationLinkage from './../components/NavigationLinkage/index.vue'
import Home from './../components/home.vue'
import VModel from './../components/VModel/index.vue'
import upDownPreview from './../components/upDownPreview/index.vue'
const routes = [
    {
       path: '/',
       component: Home
    },
    {
        path:'/liandong',
        component:NavigationLinkage
    },
    {
        path: '/vModel',
        component: VModel
    },
    {
        path: '/upDownPreview',
        component:upDownPreview
    },
    {
        path: '/direction',
        component: () => import('./../components/direction') // 路由懒加载
    },
    {
        path: '/vueRespon',
        component: () => import('./../views/vueRespon/respon.vue') // 路由懒加载
    },
    {
        path: '/vuexComponent',
        component: () => import('./../views/vuexComponent') // 路由懒加载
    },
    {
        path: '/preventReclick',
        component: () => import('./../views/preventReclick') // 路由懒加载
    },
    {
        path: '/qrCodeLearn',
        component: () => import('./../views/qrCodeLearn') // 路由懒加载
    },
    {
        path: '/UEditor',
        component: () => import('./../views/UEditor') // 路由懒加载
    },
    {
        path: '/websocket',
        component: () => import('./../views/websocket') // 路由懒加载
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})
export default router