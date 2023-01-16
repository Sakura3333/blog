<template>
    <div class="overflow-x-hidden position-relative">
        <div class="container-fluid">
            <div class="row m-0">
                <div class="col-12 py-3 overflow-hidden">
                    <div class="markdown-body p-3" v-html="state.articleHtml"></div>
                    <div class="col-12 p-0 mt-5">
                        <div class="row gx-2 justify-content-center">
                            <div class="col" :class="{ 'd-none': !state.preArticle }">
                                <article-link-vue
                                    class="shadow-sm p-2 rounded d-flex align-items-center justify-content-between position-relative overflow-hidden btn btn-outline-light border-0"
                                    :article-title="state.preArticle?.articleTitle"
                                    :article-file-id="state.preArticle?.articleFileId">
                                    <template #prepend>
                                        <div class="ps-2">
                                            <i class="bi bi-chevron-double-left"></i>
                                        </div>
                                    </template>
                                    <template #append>
                                        <glass-vue></glass-vue>
                                    </template>
                                </article-link-vue>
                            </div>
                            <div class="col" :class="{ 'd-none': !state.nextArticle }">
                                <article-link-vue
                                    class="shadow-sm p-2 rounded d-flex align-items-center justify-content-between position-relative overflow-hidden btn btn-outline-light border-0"
                                    :article-title="state.nextArticle?.articleTitle"
                                    :article-file-id="state.nextArticle?.articleFileId">
                                    <template #prepend>
                                        <glass-vue></glass-vue>
                                    </template>
                                    <template #append>
                                        <div class="ps-2">
                                            <i class="bi bi-chevron-double-right"></i>
                                        </div>
                                    </template>
                                </article-link-vue>
                            </div>
                        </div>
                    </div>
                    <footer-card-vue v-if="globalState.globalConf" class="mt-2" :="globalState.globalConf.article.footerCard"></footer-card-vue>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-12 py-3 overflow-hidden">
                    <div id="article-vcomments"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import glassVue from '../components/basic/glass.vue';
import ArticleLinkVue from '../components/basic/articleLink.vue';
import FooterCardVue from '../components/basic/articleFooter.vue';
import { reactive, getCurrentInstance, inject, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getFileContentByFileId } from '../api/api';
import { ArticleMapperRecord, GlobalState } from '../model/inerface';
import { Dir } from '../model/enum';
const proxy = getCurrentInstance()?.proxy;
const route = useRoute();
const globalState: GlobalState = (inject('globalState') as GlobalState);
const state = reactive<{
    articleIndex: number,
    articleHtml: string,
    preArticle: ArticleMapperRecord | null,
    nextArticle: ArticleMapperRecord | null,
}>({
    articleIndex: -1,
    articleHtml: '',
    preArticle: null,
    nextArticle: null
});

const init = () => {
    if (route.params.articleFileId && globalState.articleInfoList.length > 0) {
        state.articleIndex = globalState.articleInfoList.findIndex(item => item.articleFileId === route.params.articleFileId);
        state.preArticle = state.articleIndex ? globalState.articleInfoList[state.articleIndex - 1] : null;
        state.nextArticle = state.articleIndex < globalState.articleInfoList.length ? globalState.articleInfoList[state.articleIndex + 1] : null;
        getFileContentByFileId(Dir.ARTICLE, route.params.articleFileId, (data: any) => {
            state.articleHtml = proxy?.marked.parse(data);
        });
        let articleInfo: ArticleMapperRecord = (globalState.articleInfoList.find(articleInfo => articleInfo.articleFileId === route.params.articleFileId) as ArticleMapperRecord);
        globalState.articleInfo = articleInfo;
        globalState.title = articleInfo?.articleTitle;
    }
}

watch([() => route.params.articleFileId, () => globalState.articleInfoList], ([old1, old2], [val1, val2]) => {
    if (old1 != val1 && old2.length > 0) {
        init();
    } else if (old2 != val2) {
        init();
    }
});

init();

</script>

<style scoped>
img {
    object-fit: cover;
    z-index: -1;
}
</style>