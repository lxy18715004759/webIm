import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)
const Login = () => import('@/views/Login')
const Dashboard = ()=>import("@/views/Dashboard")
const ErrorPage = ()=>import("@/views/ErrorPage")
const routes = [
    {
        path: "/login",
        component: Login,
    },
    {
        path:"/",
        component:Dashboard
    },
    {
        path:"*",
        component:ErrorPage
    }
]
export const createRoute = (routes) => new Router({
    mode: "history",
    routes,
})

const router = createRoute(routes)

export default router;

