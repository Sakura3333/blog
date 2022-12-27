<template>
    <img class="position-fixed w-100 h-100 top-0 start-0"
        style="z-index: -2; object-fit: cover; object-position: top center;"
        :src="globalState.page?.background[Math.floor(Math.random() * globalState.page?.background.length)]" alt="">
    <defalut-layout-vue>
        <template #header>
            <header-vue :article-count="globalState.articleInfoList?.length"></header-vue>
        </template>
        <template #main>
            <mainbar-vue :title="globalState.title" :show-back-btn="globalState.showBackBtn">
                <weather-vue v-show="!globalState.inArticle"></weather-vue>
                <article-info-vue :="globalState.articleInfo" v-show="globalState.inArticle"></article-info-vue>
            </mainbar-vue>
            <router-view #default="{ Component }">
                <keep-alive>
                    <component :is="Component"></component>
                </keep-alive>
            </router-view>
        </template>
        <template #aside>
            <aside-vue></aside-vue>
        </template>
    </defalut-layout-vue>
    <!-- <div class="start-0 bottom-0 w-100">
        <div class="container">
            <div class="row">
                <div class="col py-2 text-dark text-center position-relative">
                    <glass-vue></glass-vue>
                    <small>LifeSeagull | 本站已运行：{{ runningTime }} 天</small>
                </div>
            </div>
        </div>
    </div> -->
</template>

<script lang="ts" setup>
import defalutLayoutVue from './layout/defalut-layout.vue';
import headerVue from './components/composite/header.vue';
import glassVue from './components/basic/glass.vue';
import asideVue from './components/composite/aside.vue';
import mainbarVue from './components/composite/mainbar.vue';
import weatherVue from './components/basic/weatherInfo.vue';
import articleInfoVue from './components/basic/articleInfo.vue';
import { useRoute } from 'vue-router';
import { provide, reactive, watch, ref } from 'vue';
import { getPageConf, getArticleInfoList, getFileBlob } from './api/api';
import { GlobalState, PageConfig } from './model/model';

const route = useRoute();

const runningTime = ref<string>('');

const globalState = reactive<GlobalState>({
    title: '首页',
    showBackBtn: false,
    inArticle: false,
    articleInfo: null,
    articleInfoList: [],
    articleTagList: [],
    filingList: [],
    page: null
});

getPageConf((data: PageConfig) => {
    globalState.page = data;
    setInterval(() => {
        runningTime.value = ((new Date().getTime() - new Date(data.startTime).getTime()) / (24 * 60 * 60 * 1000)).toFixed(2);
    }, 1000);
});

getArticleInfoList((data: any) => {
    globalState.articleInfoList = data;
    globalState.articleInfoList?.forEach(articleInfo => {
        getFileBlob(articleInfo.articleCover, (data: Blob) => {
            articleInfo.articleCoverURL = URL.createObjectURL(data);
        });
        let articleCreateDate = articleInfo.articleCreateTime.split(' ')[0];
        let filings = globalState.filingList.filter(filing => filing.filingTime == articleCreateDate);
        if (filings.length > 0) filings[0].filingCount++;
        else globalState.filingList.push({filingTime: articleCreateDate, filingCount: 1});
        articleInfo.articleTag.forEach(tagName => {
            let tags = globalState.articleTagList.filter(tag => tag.tagName == tagName);
            if (tags.length > 0) {
                tags[0].tagCount++;
            } else {
                globalState.articleTagList.push({
                    tagName,
                    tagCount: 1
                });
            }
        });
    });
});

provide('globalState', globalState);

watch(() => route.fullPath, () => {

    if (route.params.articleFileId) globalState.inArticle = true;
    else globalState.inArticle = false;

    if (!globalState.inArticle) globalState.title = route.meta.title + '';

    if (history.length > 0) globalState.showBackBtn = true;
    else globalState.showBackBtn = false;

});
</script>

<style>
code {
    border-radius: 5px;
}

html {
    font-size: 16px;
}

* {
    scrollbar-width: 10px;
    scrollbar-base-color: green;
    scrollbar-track-color: red;
    scrollbar-arrow-color: blue;
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-thumb {
    background: var(--bs-gray-300);
    border-radius: 5px;
}

.overflow-y-hidden {
    overflow-y: hidden;
}

.overflow-x-hidden {
    overflow-x: hidden;
}

.overflow-x-auto {
    overflow-x: auto;
}

.overflow-y-auto {
    overflow-y: auto;
}

.border-dashed-bottom {
    border-bottom: 2px dashed var(--bs-dark);
}

.border-dashed-top {
    border-top: 2px dashed var(--bs-dark);
}

.top-75 {
    top: 75% !important;
}

.top-25 {
    top: 25% !important;
}

.start-75 {
    left: 75% !important;
}

.start-25 {
    left: 25% !important;
}

.rounded-start-0 {
    border-top-left-radius: 0!important;
    border-bottom-left-radius: 0!important;
}
.rounded-end-0 {
    border-top-right-radius: 0!important;
    border-bottom-right-radius: 0!important;
}
.rounded-top-0 {
    border-top-right-radius: 0!important;
    border-top-left-radius: 0!important;
}
.rounded-bottom-0 {
    border-bottom-right-radius: 0!important;
    border-bottom-left-radius: 0!important;
}
</style>