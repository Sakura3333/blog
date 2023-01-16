<template>
    <div class="h-100 d-flex flex-column">
        <div class="shadow-sm position-relative mt-1">
            <glass-vue></glass-vue>
            <div class="p-2 h-100 d-flex flex-column">
                <div class="fw-bold">分类</div>
                <div class="flex-fill overflow-auto">
                </div>
            </div>
        </div>
        <div class="shadow-sm position-relative mt-1">
            <glass-vue></glass-vue>
            <div class="p-2 h-100 d-flex flex-column">
                <div class="fw-bold">最近</div>
                <div class="flex-fill overflow-auto">
                    <ul class="list-group">
                        <li class="list-group-item bg-transparent border-0" v-for="articleInfo in globalState?.articleInfoList.slice(0, 5)">
                            <article-link-vue :="{articleTitle: articleInfo.articleTitle, articleFileId: articleInfo.articleFileId}" class="fs-7" custom-class="fs-7">
                                <template #prepend>
                                    <span class="float-end">{{ articleInfo.articleCreateTime }}</span>
                                </template>
                                <template #append>
                                    <div class="d-flex w-100 justify-content-between align-items-center">
                                        <div class="rounded-pill">
                                            <small class="text-dark">
                                                <i class="bi bi-tag-fill me-1"></i>
                                                <span class="mx-1" v-for="tag in articleInfo.articleTag">{{ tag }}</span>
                                            </small>
                                        </div>
                                    </div>
                                </template>
                            </article-link-vue>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import glassVue from '../basic/glass.vue';
import articleLinkVue from '../basic/articleLink.vue';
import { inject } from 'vue';
import { GlobalState } from '../../model/inerface';
const globalState:GlobalState = inject('globalState') as GlobalState;

</script>
<style scoped>

</style>