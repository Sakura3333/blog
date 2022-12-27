<template>
    <div class="h-100 d-flex flex-column">
        <div class="shadow-sm p-2 position-relative" style="max-height: 50%;">
            <glass-vue></glass-vue>
            <search-box-vue :source="globalState?.articleInfoList" :search-fields="state.searchFields" placeholder="搜索文章...">
                <template #searchResult="{ result }">
                    <template v-for="item,index in result">
                        <article-link-vue :class="{'border-bottom': index < result.length - 1}" :article-title="item.articleTitle" :article-file-id="item.articleFileId">
                            <template #append>
                                <div class="text-truncate"><small>{{ item.articleBrief }}</small></div>
                                <div class="text-muted d-flex align-items-center">
                                    <div class="text-truncate flex-fill">
                                        <span class="badge text-dark"><i class="bi bi-tag-fill"></i>{{ item.articleTag }}</span>
                                    </div>
                                    <small class="badge text-muted">{{ item.articleCreateTime }}</small>
                                </div>
                            </template>
                        </article-link-vue>
                    </template>
                </template>
                <template #default="{ search }">
                    <div>
                        <template v-for="tag in globalState?.articleTagList">
                            <a href="" class="badge text-dark text-decoration-none" @click.prevent="search(tag.tagName)">
                                <i class="bi bi-tag-fill me-1"></i>
                                {{ tag.tagName }}（{{ tag.tagCount }}）
                            </a>
                        </template>
                    </div>
                </template>
            </search-box-vue>
        </div>
        <div class="shadow-sm p-2 mt-2 position-relative" style="max-height: 50%;">
            <glass-vue></glass-vue>
            <div class="p-2 h-100 d-flex flex-column">
                <div class="fw-bold">归档</div>
                <div class="flex-fill overflow-auto">
                    <ul class="list-group">
                        <li class="list-group-item bg-transparent border-0" v-for="filing in globalState?.filingList">
                            <a href="" class="text-decoration-none d-flex justify-content-between align-items-center">
                                <span>{{ filing.filingTime }}</span>
                                <span>{{ filing.filingCount }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { inject, reactive } from 'vue';
import glassVue from '../basic/glass.vue';
import searchBoxVue from '../basic/searchBox.vue';
import articleLinkVue from '../basic/articleLink.vue';
import pixiVue from '../basic/pixi.vue';

import { GlobalState } from '../../model/model';

const globalState:GlobalState | undefined = inject('globalState');
const state = reactive<{
    searchFields: string[]
}>({
    searchFields: ['articleTitle', 'articleTag', 'articleBrief']
})

</script>
<style scoped>

</style>