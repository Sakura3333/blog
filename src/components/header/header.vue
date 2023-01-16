<template>
    <div class="w-100 h-100 position-relative d-flex justify-content-end align-items-center px-2">
        <div class="text-center">
            <button class="btn btn-light rounded-0 border-0"
                @click="state.curPanel = state.curPanel === state.panels[0] ? null : state.panels[0]"><i
                    class="bi bi-search"></i></button>
            <button class="btn btn-light rounded-0 border-0"
                @click="state.curPanel = state.curPanel === state.panels[1] ? null : state.panels[1]"><i
                    class="bi bi-vinyl"></i></button>
            <button class="btn btn-light rounded-0 border-0"
                @click="state.curPanel = state.curPanel === state.panels[1] ? null : state.panels[1]"><i
                    class="bi bi-github"></i></button>
        </div>
        <div class="header-panel-container w-100 position-absolute end-0 w-100 bg-light top-100">
            <!-- 搜索 -->
            <search-panel-vue 
                class="my-4"
                placeholder="搜索文章..." 
                :search-fields="state.searchFields"
                :source="globalState.articleInfoList"
                @search="onSearch"
                v-show="state.curPanel == state.panels[0]">
                <template #classify="{ search }">
                    <div class="d-flex">
                        <a href="" class="badge bg-dark rounded-0 text-decoration-none text-white"
                            v-for="tag in globalState.articleTagList"
                            @click.prevent="search(tag.tagName, ['articleTag'])">
                            {{ tag.tagName }}({{ tag.tagCount }})
                        </a>
                    </div>
                </template>
            </search-panel-vue>
        </div>
    </div>
</template>
<script setup lang="ts">
import searchPanelVue from './searchPanel.vue';
import MusicPlayer from '../basic/musicPlayer.vue';
import { inject, reactive } from 'vue';
import { Router, useRouter } from 'vue-router';
import { ArticleMapperRecord, GlobalState } from '../../model/inerface';

const globalState: GlobalState = inject('globalState') as GlobalState;
const router: Router = useRouter();
const state = reactive<{
    searchFields: string[],
    panels: any[],
    curPanel: any | null
}>({
    searchFields: ['articleTitle', 'articleTag', 'articleBrief'],
    panels: [searchPanelVue, MusicPlayer],
    curPanel: null
})
const onSearch = (results: ArticleMapperRecord[]) => {
    globalState.searchInfoList = results;
    router.push('/search');
}

</script>
<style scoped>

</style>