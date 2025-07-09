import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { documentTitle: 'Home' },
        children: [
            {
                path: '',
                name: 'homeDefault',
                component: () => import('@/views/HomeDefault.vue')
            },
            {
                path: 'demo',
                name: 'demo',
                component: () => import('@/views/DemoView.vue'),
                meta: { documentTitle: 'Demo' },
                children: [
                    {
                        path: '',
                        name: 'demoHome',
                        component: () => import('@/views/demo/Index.vue')
                    },
                    {
                        path: 'dynamic-form',
                        name: 'dynamicFormDemo',
                        component: () => import('@/views/demo/DynamicDemo.vue')
                    },
                    {
                        path: 'scroll-comment',
                        name: 'scrollComment',
                        component: () => import('@/views/demo/ScrollComment.vue'),
                        meta: { documentTitle: '不定高固定条数滚动' }
                    }
                ]
            }
        ]
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
