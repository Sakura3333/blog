import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import index from '../pages/Index.vue';
import article from "../pages/Article.vue";
import resume from '../pages/Resume.vue';
import guestbook from '../pages/Guestbook.vue';
import mood from '../pages/Mood.vue';
import archive from '../pages/Archive.vue';
import search from '../pages/Search.vue';
import music from '../pages/Music.vue';
import editor from '../pages/Editor.vue';

const routes: RouteRecordRaw[] = [
    {
        path: "/:pathMatch(.*)*",
        name: "not found",
        redirect: '/index'
    },{
        path: "/index",
        name: "index",
        components: {
            bottomRight: index
        },
        meta: {
            show: true,
            panel: 'bottomRight'
        }
    },{
        path: "/article/:fid",
        name: 'article', 
        components: {
            bottomRight: article
        },
        meta: {
            show: false,
            panel: 'bottomRight'
        }
    },{
        path: "/mood",
        name: 'mood',
        components: {
            bottomRight: mood
        },
        meta: {
            show: true,
            panel: 'bottomRight'
        }
    },{
        path: "/guestbook",
        name: 'guestbook',
        components: {
            bottomRight: guestbook
        },
        meta: {
            show: true,
            panel: 'bottomRight'
        }
    },{
        path: "/archive",
        name: 'archive',
        components: {
            bottomRight: archive
        },
        meta: {
            show: true,
            panel: 'bottomRight'
        }
    },{
        path: "/resume",
        name: 'resume',
        components: {
            bottomRight: resume
        },
        meta: {
            show: true,
            panel: 'bottomRight'
        }
    },{
        path: "/music",
        name: 'music',
        components: {
            topRight: music
        },
        meta: {
            show: false,
            panel: 'topRight'
        }
    },{
        path: "/search/:keywords?",
        name: 'search',
        components: {
            topRight: search
        },
        meta: {
            show: false,
            panel: 'topRight'
        }
    },{
        path: "/editor",
        name: 'editor',
        components: {
            topRight: editor
        },
        meta: {
            show: false,
            panel: 'topRight'
        }
    }
];

const router: Router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;