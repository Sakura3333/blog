<template>
    <div class="flex-fill overflow-x-hidden">
        <div class="container p-2">
            <div class="row m-0">
                <div class="col-12 shadow-sm py-3 rounded position-relative overflow-hidden">
                    <glass-vue class="m-0"></glass-vue>
                    <div class="markdown-body p-3" v-html="state.articleHtml"></div>
                    <div class="col-12 p-0 mt-5">
                        <div class="row gx-2 justify-content-center">
                            <div class="col" :class="{ 'd-none': !state.preArticle }">
                                <article-link-vue
                                    class="shadow-sm p-2 rounded d-flex align-items-center position-relative overflow-hidden btn btn-outline-light border-0"
                                    :article-title="state.preArticle?.articleTitle"
                                    :article-file-id="state.preArticle?.articleFileId">
                                    <template #prepend>
                                        <glass-vue></glass-vue>
                                        <div class="flex-fill ps-2 d-flex justify-content-between align-items-end">
                                            <i class="bi bi-chevron-double-left"></i>
                                        </div>
                                    </template>
                                    <template #append>
                                        <div class="ps-2 d-flex justify-content-between align-items-end">
                                            <small class="text-truncate text-muted">{{ state.preArticle?.articleBrief }}</small>
                                        </div>
                                    </template>
                                </article-link-vue>
                            </div>
                            <div class="col" :class="{ 'd-none': !state.nextArticle }">
                                <article-link-vue
                                    class="shadow-sm p-2 rounded d-flex align-items-center position-relative overflow-hidden btn btn-outline-light border-0"
                                    :article-title="state.nextArticle?.articleTitle"
                                    :article-file-id="state.nextArticle?.articleFileId">
                                    <template #prepend>
                                        <glass-vue></glass-vue>
                                    </template>
                                    <template #append>
                                        <div class="flex-fill ps-2 d-flex justify-content-between align-items-end">
                                            <small class="text-truncate text-muted">{{ state.nextArticle?.articleBrief }}</small>
                                            <i class="bi bi-chevron-double-right"></i>
                                        </div>
                                    </template>
                                </article-link-vue>
                            </div>
                        </div>
                    </div>
                    <footer-card-vue class="mt-2" :="page.article.footerCard"></footer-card-vue>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '../css/mweb-smartblue.css';
import glassVue from '../components/basic/glass.vue';
import ArticleLinkVue from '../components/basic/articleLink.vue';
import FooterCardVue from '../components/basic/footerCard.vue';
import { reactive, getCurrentInstance, inject, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getAtricleByFileId } from '../api/api';
import { ArticleInfo, GlobalState, PageConfig } from '../model/model';
const proxy = getCurrentInstance()?.proxy;
const route = useRoute();
const globalState: GlobalState = (inject('globalState') as GlobalState);
const articleInfoList = globalState.articleInfoList;
const page: PageConfig = (globalState.page as PageConfig);

const state = reactive<{
    articleIndex: number,
    articleHtml: string,
    preArticle: ArticleInfo | null,
    nextArticle: ArticleInfo | null
}>({
    articleIndex: -1,
    articleHtml: '',
    preArticle: null,
    nextArticle: null
});

const init = () => {
    state.articleIndex = articleInfoList.findIndex(item => item.articleFileId === route.params.articleFileId);
    state.preArticle = state.articleIndex ? articleInfoList[state.articleIndex - 1] : null;
    state.nextArticle = state.articleIndex < articleInfoList.length ? articleInfoList[state.articleIndex + 1] : null;
    getAtricleByFileId(route.params.articleFileId, (data: any) => {
        state.articleHtml = proxy?.marked.parse(data);
    });
}

watch(() => route.params.articleFileId, init);

init();

</script>

<style scoped>
img {
    object-fit: cover;
    z-index: -1;
}
</style>