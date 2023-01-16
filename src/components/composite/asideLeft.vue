<template>
    <div class="container-fluid position-relative p-0 d-flex flex-column align-items-center fs-7">
        <div class="p-2 w-100">
            <div class="ratio ratio-1x1 w-50 position-relative mx-auto">
                <div class="position-absolute mx-auto rounded-circle overflow-hidden">
                    <img :src="globalState.globalConf?.header.headPhoto" alt="" class="w-100 h-100" style="object-fit: cover;">
                </div>
            </div>
        </div>
        <div class="w-100 p-2">
            <div class="px-2"><i class="bi bi-journal-richtext"></i><span class="ms-3">文章 {{ globalState.articleInfoList.length }}</span></div>
            <div class="px-2"><i class="bi bi-tag"></i><span class="ms-3">分类 {{ globalState.articleTagList.length }}</span></div>
        </div>
        <div class="w-100 p-2">
            <span class="text-muted">导航</span>
            <template v-for="route in routes">
                <div v-if="route.meta.show" class="w-100">
                    <router-link :to="route.path"
                        class="d-flex text-dark px-2 py-1 mt-1 rounded text-decoration-none fw-bold">
                        <i :class="route.meta.icon"></i>
                        <span class="ms-3">
                            {{ route.meta.title }}
                        </span>
                    </router-link>
                </div>
            </template>
        </div>
        <div class="w-100 p-2">
            <span class="text-muted">分类</span>
            <ul class="list-group">
                <template v-for="tag in globalState?.articleTagList">
                    <li class="list-group-item px-2 py-1 bg-transparent border-0">
                        <article-tag-search-link-vue class="text-dark d-flex">
                            <template #default="{ search }">
                                <i class="bi bi-tag-fill"></i>
                                <div class="ms-3 flex-fill d-flex justify-content-between fw-normal" @click.prevent="search(tag.tagName)">
                                    <span>{{ tag.tagName }}</span>
                                    <span>{{ tag.tagCount }}</span>
                                </div>
                            </template>
                        </article-tag-search-link-vue>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import articleTagSearchLinkVue from './articleTag.vue';
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { GlobalState } from '../../model/inerface';

const globalState: GlobalState = inject('globalState') as GlobalState;

const router = useRouter();

const routes = router.getRoutes();

</script>

<style scoped>
.router-link-active {
    background-color: var(--bs-dark) !important;
    color: var(--bs-white) !important;
}
</style>