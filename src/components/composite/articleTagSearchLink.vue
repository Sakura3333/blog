<template>
    <a href="" class="w-100 d-block fw-bold fs-7 text-decoration-none">
        <slot :search="searchClassify"></slot>
    </a>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { GlobalState, ArticleInfo } from '../../model/model';
import { Router, useRouter } from 'vue-router';

const globalState: GlobalState = inject("globalState") as GlobalState;
const router: Router = useRouter();
const searchClassify = (_articleTag: string) => {
    globalState.articleInfoSearchResult = [];
    globalState.articleInfoList.forEach((articleInfo: ArticleInfo) => {
        let articleTag = articleInfo.articleTag.filter(articleTag => articleTag === _articleTag);
        if (articleTag.length > 0) {
            globalState.articleInfoSearchResult.push(articleInfo);
        }
    });
    console.log(globalState.articleInfoSearchResult);
    router.push('/search');
}
</script>
<style scoped>
    
</style>