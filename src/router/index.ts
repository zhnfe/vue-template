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
        component: () => import('@/views/demo/BlackBox.vue'),
        meta: {
            documentTitle: '小黑盒 tab'
        }
    }]
})

router.beforeEach((guard) => {
    const documentTitle = guard.meta.documentTitle || 'Vue Template'
    if (documentTitle && typeof documentTitle === 'string') {
        document.title = documentTitle
    }
})
export default router
