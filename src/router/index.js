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
    },
    {
        path: '/render',
        component: () => import('./../views/render') // 路由懒加载
    },
    {
        path: '/ddVueH5SaoMaDengLu',
        component: () => import('./../views/ddVueH5SaoMaDengLu') // 路由懒加载
    },
    {
        path: '/vueTree',
        component: () => import('./../views/vueTree') // 路由懒加载
    }
]
// 权限控制
// export const constantRouteMap = [ //都能访问路由
//     {
//         path: "/",
//         redirect: "/login",
//         hidden: true
//     },
//     {
//         path: "/login",
//         name: '登录页面'
//     }
// ]
// 声明权限为admin的路由---异步挂载的路由asyncRouterMap
// 异步挂载的路由
// 动态需要根据权限加载的路由表
// export const asyncRouterMap =[
//     {
        
//     }
// ]
const router = new VueRouter({
    routes,
    mode: 'history'
})
export default router