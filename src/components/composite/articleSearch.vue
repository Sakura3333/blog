<template>
    <search-box-vue :source="globalState?.articleInfoList" :search-fields="state.searchFields" placeholder="搜索文章..." @search="onSearch"></search-box-vue>
</template>
<script setup lang="ts">
import { inject, reactive } from 'vue';
import searchBoxVue from '../basic/searchBox.vue';
import { ArticleInfo, GlobalState } from '../../model/model';
import { Router, useRouter } from 'vue-router';

const globalState:GlobalState = inject('globalState') as GlobalState;
const router: Router = useRouter();
const state = reactive<{
    searchFields: string[]
}>({
    searchFields: ['articleTitle', 'articleTag', 'articleBrief']
})
const onSearch = (data: ArticleInfo[]) => {
    globalState.articleInfoSearchResult = data;
    router.push('/search');
}
</script>
<style scoped>
    
</style>