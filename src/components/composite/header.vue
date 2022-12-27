<template>
    <div class="shadow-sm bg-gradient d-flex flex-column justify-content-between position-relative">
        <glass-vue></glass-vue>
        <div class="p-4 position-relative">
            <a href="#" class="d-block text-center">
                <img class="head-portrait shadow-sm border rounded-circle"
                    src="https://huyaimg.msstatic.com/avatar/1086/bf/fd6f69d69c0015eaface1f6024869e_180_135.jpg?1619540458&463812"
                    alt="">
            </a>
            <small class="d-block text-center mt-2"><i class="bi bi-journal-bookmark-fill me-2"></i>{{ articleCount }}</small>
            <div class=""></div>
            <div class="d-flex align-items-center justify-content-center start-0 bottom-0">
                <a href="https://github.com/Sakura3333" target="_blank" class="bi bi-github text-black fs-5 mx-1"></a>
                <a href="https://space.bilibili.com/74980245" target="_blank"><img style="width: 1.3rem;height: 1.3rem"
                        src="https://www.bilibili.com/favicon.ico?v=1" class="mx-1" alt=""></a>
            </div>
        </div>
        <div class="flex-fill px-1 pb-5 overflow-auto">
            <div class="container position-relative">
                <div class="row gy-1">
                    <template v-for="route in routes">
                        <div class="col-12" v-if="route.meta.show">
                            <router-link :to="route.path"
                                class="d-block text-center text-dark p-2 rounded-pill text-decoration-none fw-bold">
                                <i :class="route.meta.icon"></i>
                                {{ route.meta.title }}
                            </router-link>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import glassVue from '../basic/glass.vue';

withDefaults(defineProps<{
    articleCount: number | string
}>(), {
    articleCount: 0
});

const router = useRouter();

const routes = router.getRoutes();

</script>

<style scoped>
.head-portrait {
    height: 6rem;
    width: 6rem;
}

.router-link-active {
    background-color: var(--bs-dark) !important;
    color: var(--bs-white) !important;
}
</style>