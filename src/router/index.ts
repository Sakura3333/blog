import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import index from '../pages/index.vue';
import article from "../pages/article.vue";
import resume from '../pages/resume.vue';
import message from '../pages/message.vue';
import mood from '../pages/mood.vue';
import filing from '../pages/filing.vue';
import search from '../pages/search.vue';

const routes: RouteRecordRaw[] = [
    {
        path: "/:pathMatch(.*)*",
        name: "not found",
        redirect: '/'
    },{
        path: "/",
        component: index,
        meta: {
            icon: 'bi bi-house-fill',
            title: '首页',
            show: true,
            showValine: false
        }
    },{
        path: "/article/:articleFileId",
        component: article,
        meta: {
            icon: 'bi bi-house-fill',
            title: '文章',
            show: false,
            showValine: true
        }
    },{
        path: "/mood",
        component: mood,
        meta: {
            icon: 'bi bi-emoji-sunglasses-fill',
            title: '动态',
            show: true,
            showValine: false
        }
    },{
        path: "/message",
        component: message,
        meta: {
            icon: 'bi bi-chat-dots-fill',
            title: '留言',
            show: true,
            showValine: true
        }
    },{
        path: "/filing",
        component: filing,
        meta: {
            icon: 'bi bi-book-fill',
            title: '归档',
            show: true,
            showValine: false
        }
    },{
        path: "/resume",
        component: resume,
        meta: {
            icon: 'bi bi-file-person-fill',
            title: '简历',
            show: true,
            showValine: false
        }
    },{
        path: "/search",
        component: search,
        meta: {
            icon: 'bi bi-search',
            title: '搜索',
            show: false,
            showValine: false
        }
    }
];

const router: Router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;