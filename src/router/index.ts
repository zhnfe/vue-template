import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/views/HomeView.vue'),
        meta: {
            documentTitle: 'Home'
        }
    },
    {
        path: '/demo',
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
