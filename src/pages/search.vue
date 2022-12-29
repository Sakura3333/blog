<template>
    <div class="overflow-x-hidden position-relative mt-1 shadow-sm" style="min-height: calc(100% - 4.25rem); height: auto;">
        <glass-vue></glass-vue>
        <div class="container p-0">
            <div class="row m-0 d-lg-none">
                <article-search-vue class="w-75 mx-auto"></article-search-vue>
            </div>
            <div class="row m-0 d-lg-none">
                <div class="w-75 mx-auto d-flex flex-wrap justify-content-center py-2">
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
            <div class="row m-0" v-if="globalState.articleInfoSearchResult.length > 0">
                <template v-for="articleInfo, i in globalState.articleInfoSearchResult">
                    <article-card-vue :article-info="articleInfo" class="col-12" :class="{'border-bottom': i != globalState.articleInfoSearchResult.length-1}"></article-card-vue>
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
import glassVue from '../components/basic/glass.vue';
import articleCardVue from '../components/composite/articleCard.vue';
import articleSearchVue from '../components/composite/articleSearch.vue';
import articleTagSearchLinkVue from '../components/composite/articleTagSearchLink.vue';
import { inject } from 'vue';
import { GlobalState } from '../model/model';
const globalState: GlobalState = inject("globalState") as GlobalState;
    
</script>
<style scoped>
    
</style>