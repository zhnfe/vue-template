import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        component: () => import('@/views/HomeView.vue')
    }, {
        path: '/demo',
        component: () => import('@/views/demo/DemoView.vue')
    }, {
        path: '/black-box-tab',
        component: () => import('@/views/demo/BlackBox.vue')
    }]
})

export default router
