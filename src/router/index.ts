import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/demo',
        component: () => import('@/views/DemoView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((guard) => {
    const documentTitle = guard.meta.documentTitle || 'Vue Template'
    if (documentTitle && typeof documentTitle === 'string') {
        document.title = documentTitle
    }
})
export default router
