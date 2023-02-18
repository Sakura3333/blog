<template>
    <defalut-layout-vue>

        <!-- 侧边栏 -->
        <template #bodyPanelNav="{ switchPanel }">
            <ul class="pr-1 text-center font-modul h-full flex flex-col justify-center bg-transparent">
                <template v-for="route in $router.getRoutes()">
                    <template v-if="route.meta.show">
                        <li><router-link class="uppercase" :to="route.path" @click="switchPanel.maximizeBodyPanel()">{{ route.name }}</router-link></li>
                    </template>
                </template>
            </ul>
        </template>

        <!-- HeadPanel -->
        <template #headPanel="{ panelState, switchPanel }">
            <!-- 当前路由视图 -->
            <router-view
                :route="!panelState[Panel.HEADPANEL].maximized && panelState[Panel.HEADPANEL].curRoute || undefined"
                :name="Panel.HEADPANEL" #="{ Component }" :switchPanel="switchPanel">
                <keep-alive :exclude="routerViewExclude">
                    <component :is="Component"></component>
                </keep-alive>
            </router-view>
        </template>
        <!-- HeadPanelNav -->
        <template #headPanelNav="{ switchPanel }">
            <div class="w-full h-full flex justify-end">
                <div class="max-w-full h-full flex justify-start items-stretch overflow-auto hide-scrollbar">
                    <button class="aspect-suqare px-3" @click="switchPanel.maximizeHeadPanel(), $router.push('/music1')">
                        <font-awesome-icon icon="fa-solid fa-headphones-simple" />
                    </button>
                    <button class="aspect-suqare px-3" @click="switchPanel.maximizeHeadPanel(), $router.push('/search')">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </button>
                    <a class="flex items-center text-center aspect-suqare px-3" href="https://github.com/Sakura3333" target="_blank">
                        <font-awesome-icon icon="fa-brands fa-github" />
                    </a>
                </div> 
            </div>      
        </template>

        <!-- 页面主要内容 -->
        <template #bodyPanel="{ panelState, switchPanel }">
            <div class="h-full overflow-hidden" :class="{ 'disable-event': !panelState[Panel.BODYPANEL].maximized }">
                <!-- 当前路由视图 -->
                <router-view :route="!panelState[Panel.BODYPANEL].maximized && panelState[Panel.BODYPANEL].curRoute || undefined"
                    :name="Panel.BODYPANEL" #="{ Component }" :switchPanel="switchPanel">
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

import { Panel } from "./model/panel";
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