<template>
    <page-layout-vue>
        <template #topbar>
            <div class="space-x-3 flex-shrink-0">
                <span class="space-x-1"><font-awesome-icon icon="fa-solid fa-w" /><span>{{ state.words }}</span></span>
                <span :id="$route.path" class="leancloud_visitors space-x-1" data-flag-title="Your Article Title">
                    <font-awesome-icon icon="fa-regular fa-eye" />
                    <i class="leancloud-visitors-count"></i>
                </span>
            </div>
            <div class="flex-grow overflow-hidden px-3 whitespace-nowrap text-ellipsis">
                <span>{{ state.title }}</span>
            </div>
            <router-link class="flex-shrink-0 -mr-2 px-2" to="/index">
                <font-awesome-icon icon="fa-solid fa-xmark" />
            </router-link>
        </template>
        <template #content>
            <div class="!mx-auto max-w-3xl mb-5 rounded overflow-hidden border">
                <img class="aspect-video" :src="state.curArticle?.imgs[0]" alt="">
            </div>
            <markdown-view class="!mx-auto max-w-3xl markdown-body !text-sm !leading-6" :html="state.html"></markdown-view>
            <div class="!mx-auto max-w-3xl mt-5">
                <slot name="valine"></slot>
            </div>
        </template>
        <template #footbar>
            <div class="space-x-2">
                <button><font-awesome-icon icon="fa-brands fa-weixin" /></button>
                <button><font-awesome-icon icon="fa-brands fa-weibo" /></button>
                <button><font-awesome-icon icon="fa-brands fa-qq" /></button>
            </div>
            <div class="space-x-2">
                <router-link custom #="{ navigate }" :to="`/article/${state.preArticle?.date}/${state.preArticle?.fid}`">
                    <button :class="{ 'text-gray-500 pointer-events-none': state.preArticle == null }"
                        @click="navigate"><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
                </router-link>
                <router-link custom #="{ navigate }" :to="`/article/${state.nextArticle?.date}/${state.nextArticle?.fid}`">
                    <button :class="{ 'text-gray-500 pointer-events-none': state.nextArticle == null }"
                        @click="navigate"><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
                </router-link>
            </div>
        </template>
    </page-layout-vue>
</template>
<script lang="ts">
export default {
    name: 'Article'
}
</script>

<script setup lang="ts">
import pageLayoutVue from '../layout/page/default.vue';
import markdownView from '../components/MarkdownView.vue';
import { reactive, ref, getCurrentInstance, onMounted, inject, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getMdContent } from '../api/api';
import { ContentMapperRecord, DataSet } from '../model/conf';

const proxy = getCurrentInstance()?.proxy as any;
const route = useRoute();
const globalData: DataSet = inject('globalData') as DataSet;
const state = reactive<{
    words: number,
    title: string,
    index: number,
    html: string,
    curArticle: ContentMapperRecord | null,
    preArticle: ContentMapperRecord | null,
    nextArticle: ContentMapperRecord | null,
}>({
    words: 0,
    title: '',
    index: -1,
    html: '',
    curArticle: null,
    preArticle: null,
    nextArticle: null,
});
// 初始化文章信息
const init = () => {
    if (route.params.fid && globalData.articles.length > 0) {
        for (let i = 0; i < globalData.articles.length; i++) {
            if (globalData.articles[i].fid === route.params.fid) {
                state.curArticle = globalData.articles[i];
                state.index = i;
                state.title = globalData.articles[i].title;
                break;
            }
        }
        state.preArticle = state.index ? globalData.articles[state.index - 1] : null;
        state.nextArticle = state.index < globalData.articles.length ? globalData.articles[state.index + 1] : null;
        getMdContent(route.params.date as Array<string>, route.params.fid as string, (data: string) => {
            state.html = proxy.marked.parse(data);
            state.words = data.length;
        });
    }
}
// 通过路由跳文章界面
watch([() => route.params.fid, () => route.params.date, () => globalData.articles], () => {
    console.log(route.params);
    if (globalData.articles.length > 0) init();
}, {
    deep: true
});

init();

</script>

<style scoped>
img {
    object-fit: cover;
    z-index: -1;
}
</style>