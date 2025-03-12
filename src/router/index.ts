import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/NotFound.vue')
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
            documentTitle: 'Home'
        }
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('@/views/DemoView.vue'),
        meta: {
            documentTitle: 'Demo'
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(guard => {
    const metaTitle = guard.meta.documentTitle
    if (metaTitle) {
        document.title = `${metaTitle} \| ${import.meta.env.VITE_DOCUMENT_TITLE}`
    }
})
export default router
