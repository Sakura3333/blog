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
import { getConf, Conf } from './api/api';
import { ContentMapperRecord, PageConf, DataSet } from './model/conf';

// 带有评论功能的组件不进行缓存
const routerViewExclude = ['Article', 'Guestbook']

/**
 * 全局数据
 */
const globalData = reactive<DataSet>({
    articles: [],
    moods: [],
    tagList: [],
});
// 获取网页配置
getConf(Conf.PAGE_CONF, (data: PageConf) => {
    globalData.pageConf = data;
});
// 获取内容映射
getConf(Conf.CONTENT_MAPPER, (data: ContentMapperRecord[]) => {
    for (let i = 0; i < data.length; i ++) {
        let contentMapperRecord = data[i];
        if (contentMapperRecord.schema === 1) globalData.articles.push(contentMapperRecord);
        else if (contentMapperRecord.schema === 2) globalData.moods.push(contentMapperRecord);
    }
    globalData.articles.forEach(article => {
        article.tags.forEach(name => {
            let tags = globalData.tagList.filter(tag => tag.name == name);
            if (tags.length > 0) tags[0].count++;
            else globalData.tagList.push({name, count: 1});
        });
    });
});
// 分发全局数据
provide('globalData', globalData);

</script>