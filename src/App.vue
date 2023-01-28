<template>
    <defalut-layout-vue>

        <!-- 左上，网站设置 -->
        <template #topLeft="{ panelState, switchPanel }">

            <div class="w-full h-full" :class="{ 'disable-event': !panelState.topLeft.maximized }">

                <!-- 当前路由视图 -->
                <router-view :route="!panelState.topLeft.maximized && panelState.topLeft.curRoute || undefined"
                    name="topLeft" #="{ Component }" :switchPanel="switchPanel">
                    <keep-alive :exclude="routerViewExclude">
                        <component :is="Component"></component>
                    </keep-alive>
                </router-view>
            </div>

        </template>

        <!-- 右上，页面工具栏 -->
        <template #topRight="{ panelState, switchPanel }">

            <div class="w-full h-full flex flex-col justify-between relative"
                :class="{ 'disable-event': panelState.topLeft.maximized || panelState.bottomLeft.maximized }">

                <div>

                    <!-- 当前路由视图 -->
                    <router-view :route="!panelState.topRight.maximized && panelState.topRight.curRoute || undefined"
                        name="topRight" #="{ Component }" :switchPanel="switchPanel">
                        <keep-alive :exclude="routerViewExclude">
                            <component :is="Component"></component>
                        </keep-alive>
                    </router-view>

                </div>

                <div class="flex justify-end space-x-2 px-2 z-10">
                    <button @click="switchPanel.maximizeTopRight(), $router.push('/editor')">
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                    </button>
                    <button @click="switchPanel.maximizeTopRight(), $router.push('/music')">
                        <font-awesome-icon icon="fa-solid fa-headphones-simple" />
                    </button>
                    <button @click="switchPanel.maximizeTopRight(), $router.push('/search')">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </button>
                    <a href="https://github.com/Sakura3333" target="_blank">
                        <font-awesome-icon icon="fa-brands fa-github" />
                    </a>
                </div>
            </div>

        </template>

        <!-- 左下，页面导航 -->
        <template #bottomLeft="{ panelState, switchPanel }">

            <div class="w-full h-full flex justify-between"
                :class="{ 'disable-event': panelState.topRight.maximized || panelState.topLeft.maximized }">

                <div :class="panelState.bottomLeft.maximized ? 'flex-grow' : 'flex-grow-0'">

                    <!-- 当前路由视图 -->
                    <router-view
                        :route="!panelState.bottomLeft.maximized && panelState.bottomLeft.curRoute || undefined"
                        name="bottomLeft" #="{ Component }" :switchPanel="switchPanel">
                        <keep-alive :exclude="routerViewExclude">
                            <component :is="Component"></component>
                        </keep-alive>
                        <div class="w-full h-full flex justify-center items-center">
                            默认内容
                        </div>
                    </router-view>

                </div>

                <ul class="pr-1 pt-5 text-right font-modul" :class="{ 'flex space-x-2': panelState.topLeft.maximized }">
                    <template v-for="route in $router.getRoutes()">
                        <template v-if="route.meta.show">
                            <li><router-link class="uppercase" :to="route.path">{{ route.name }}</router-link></li>
                        </template>
                    </template>
                </ul>

            </div>

        </template>

        <!-- 右下，页面主要内容 -->
        <template #bottomRight="{ panelState, switchPanel }">

            <div class="h-full overflow-hidden" :class="{ 'disable-event': !panelState.bottomRight.maximized }">

                <!-- 当前路由视图 -->
                <router-view :route="!panelState.bottomRight.maximized && panelState.bottomRight.curRoute || undefined"
                    name="bottomRight" #="{ Component }" :switchPanel="switchPanel">
                    <keep-alive :exclude="routerViewExclude">
                        <component :is="Component">
                            <template #valine>
                                <valine-vue></valine-vue>
                            </template>
                        </component>
                    </keep-alive>
                </router-view>

            </div>

        </template>
    </defalut-layout-vue>
</template>

<script lang="ts" setup>
import defalutLayoutVue from './layout/overall/defalut.vue';
import valineVue from './components/Valine.vue';

import { provide, reactive } from 'vue';
import { getConf } from './api/api';
import { GlobalState, GlobalConf } from './model/inerface';
import { Conf } from './model/enum';

// 带有评论功能的组件不进行缓存
const routerViewExclude = ['Article', 'Guestbook']

/**
 * 全局状态
 */
const globalState = reactive<GlobalState>({
    articleInfoList: [],                    // 文章数据
    articleTagList: [],                     // 文章标签
    searchInfoList: [],                     // 搜索结果
    moodInfoList: [],                       // 动态数据
    globalConf: null                        // 全局配置
});
// 获取全局配置
getConf(Conf.GLOBAL_CONF, (data: GlobalConf) => {
    globalState.globalConf = data;
});
// 获取文章映射
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
// 获取动态映射
getConf(Conf.MOOD_MAPPER, (data: any) => {
    globalState.moodInfoList = data;
});
// 共享全局状态
provide('globalState', globalState);

</script>