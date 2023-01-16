<template>
    <!-- <img class="position-fixed w-100 h-100 top-0 start-0"
        style="z-index: -2; object-fit: cover; object-position: top center;"
        :src="globalState.globalConf?.background[Math.floor(Math.random() * globalState.globalConf?.background.length)]" alt=""> -->
    <defalut-layout-vue>
        <template #aside>
            <aside-left-vue></aside-left-vue>
        </template>
        <template #header>
            <header-vue></header-vue>
        </template>
        <template #mainLeft>
            <router-view #default="{ Component }" class="flex-fill">
                <keep-alive>
                    <component :is="Component"></component>
                </keep-alive>
            </router-view>
            <div class="container-fluid">
                <div class="row m-0">
                    <div class="col-12">
                        <valine-vue :show="globalState.showValine"></valine-vue>
                    </div>
                </div>
            </div>
        </template>
        <template #mainRight>
            <aside-right-vue></aside-right-vue>
        </template>
    </defalut-layout-vue>
    <backtop-vue></backtop-vue>
</template>

<script lang="ts" setup>
import defalutLayoutVue from './layout/defalut-layout.vue';
import asideLeftVue from './components/composite/asideLeft.vue';
import asideRightVue from './components/composite/asideRight.vue';
import headerVue from './components/header/header.vue';
import backtopVue from './components/basic/backtop.vue';
import valineVue from './components/composite/valine.vue';
import { useRoute } from 'vue-router';
import { provide, reactive, watch } from 'vue';
import { getConf } from './api/api';
import { GlobalState, GlobalConf } from './model/inerface';
import { Conf } from './model/enum';

const route = useRoute();

const globalState = reactive<GlobalState>({
    showValine: false,
    articleInfoList: [],
    articleTagList: [],
    searchInfoList: [],
    moodInfoList: [],
    globalConf: null
});

getConf(Conf.GLOBAL_CONF, (data: GlobalConf) => {
    globalState.globalConf = data;
});

getConf(Conf.ARTICLE_MAPPER, (data: any) => {
    globalState.articleInfoList = data;
    globalState.articleInfoList?.forEach(articleInfo => {
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

getConf(Conf.MOOD_MAPPER, (data: any) => {
    globalState.moodInfoList = data;
});

provide('globalState', globalState);

watch(() => route.fullPath, () => {
    globalState.showValine = route.meta.showValine as boolean;
});

</script>