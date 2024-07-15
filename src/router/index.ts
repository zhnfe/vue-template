import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        component: () => import('@/views/HomeView.vue')
    }, {
        path: '/demo',
        component: () => import('@/views/DemoView.vue')
    }]
})

export default router
