<template>
    <div class="overflow-x-hidden position-relative" style="min-height: calc(100% - 4.25rem); height: auto;">
        <div class="container-fluid">
            <div class="row m-0 d-lg-none">
                <article-search-vue class="mx-auto mt-3"></article-search-vue>
            </div>
            <div class="row m-0 d-lg-none">
                <div class="mx-auto d-flex flex-wrap py-2">
                    <template v-for="tag in globalState?.articleTagList">
                        <div class="m-1 badge bg-dark">
                            <article-tag-search-link-vue class="text-light">
                                <template #default="{ search }">
                                    <div @click.prevent="search(tag.tagName)">
                                        <span>{{ tag.tagName }}</span>
                                        <span>（{{ tag.tagCount }}）</span>
                                    </div>
                                </template>
                            </article-tag-search-link-vue>
                        </div>
                    </template>
                </div>
            </div>
            <div class="row m-0" v-if="globalState.searchInfoList.length > 0">
                <template v-for="articleInfo in globalState.searchInfoList">
                    <article-link-vue class="mt-2" :article-file-id="articleInfo.articleFileId">
                        <div class="fw-bold">{{ articleInfo.articleTitle }}</div>
                        <div>{{ articleInfo.articleBrief }}</div>
                        <div class="d-flex">
                            <span class="badge text-dark"><i class="bi bi-tag-fill"></i></span>
                            <template v-for="tagName in articleInfo.articleTag">
                                <span class="badge text-dark">
                                    {{ tagName }}
                                </span>
                            </template>
                        </div> 
                    </article-link-vue>
                </template>
            </div>
            <div class="row m-0" v-else>
                <div class="card bg-transparent col-12 p-2 border-0 rounded-0">
                    <div class="card-body text-muted text-center">
                        没有搜索到任何结果哦...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import articleLinkVue from '../components/basic/articleLink.vue';
import articleTagSearchLinkVue from '../components/composite/articleTag.vue';
import { inject } from 'vue';
import { GlobalState } from '../model/inerface';
const globalState: GlobalState = inject("globalState") as GlobalState;
    
</script>
<style scoped>
    
</style>