import { Panel } from '../model/panel';
import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import index from '../pages/Index.vue';
import article from "../pages/Article.vue";
import resume from '../pages/Resume.vue';
import guestbook from '../pages/Guestbook.vue';
import mood from '../pages/Mood.vue';
import archive from '../pages/Archive.vue';
import search from '../pages/Search.vue';
import music from '../pages/Music.vue';
import music1 from '../pages/music/Music1.vue';

const routes: RouteRecordRaw[] = [
    {
        path: "/:pathMatch(.*)*",
        name: "not found",
        redirect: '/index',
    },{
        path: "/index",
        name: "index",
        components: {
            [Panel.BODYPANEL]: index
        },
        meta: {
            // 是否显示router-link
            show: true,
            // 所属面板
            panel: Panel.BODYPANEL
        }
    },{
        path: "/article/:fid",
        name: 'article', 
        components: {
            [Panel.BODYPANEL]: article
        },
        meta: {
            show: false,
            panel: Panel.BODYPANEL
        }
    },{
        path: "/mood",
        name: 'mood',
        components: {
            [Panel.BODYPANEL]: mood
        },
        meta: {
            show: true,
            panel: Panel.BODYPANEL
        }
    },{
        path: "/guestbook",
        name: 'guestbook',
        components: {
            [Panel.BODYPANEL]: guestbook
        },
        meta: {
            show: true,
            panel: Panel.BODYPANEL
        }
    },{
        path: "/archive",
        name: 'archive',
        components: {
            [Panel.BODYPANEL]: archive
        },
        meta: {
            show: true,
            panel: Panel.BODYPANEL
        }
    },{
        path: "/resume",
        name: 'resume',
        components: {
            [Panel.BODYPANEL]: resume
        },
        meta: {
            show: true,
            panel: Panel.BODYPANEL
        }
    },{
        path: "/music",
        name: 'music',
        components: {
            [Panel.HEADPANEL]: music
        },
        meta: {
            show: false,
            panel: Panel.HEADPANEL
        }
    },{
        path: "/music1",
        name: 'music1',
        components: {
            [Panel.HEADPANEL]: music1
        },
        meta: {
            show: false,
            panel: Panel.HEADPANEL
        }
    },{
        path: "/search/:keywords?",
        name: 'search',
        components: {
            [Panel.HEADPANEL]: search
        },
        meta: {
            show: false,
            panel: Panel.HEADPANEL
        }
    }
];

const router: Router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;