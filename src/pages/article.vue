<template>
    <page-layout-vue>
        <template #topbar>
            <div class="space-x-2 flex-shrink-0">
                <span>WORDS{{ state.words }}</span>
                <span><font-awesome-icon icon="fa-regular fa-eye" /></span>
            </div>
            <div class="flex-grow overflow-hidden px-2 whitespace-nowrap text-ellipsis">
                <span>{{ state.title }}</span>
            </div>
            <router-link class="flex-shrink-0 -mr-2 px-2" to="/index">
                <font-awesome-icon icon="fa-solid fa-xmark" />
            </router-link>
        </template>
        <template #content>
            <div class="mx-auto max-w-3xl" v-html="state.html"></div>
        </template>
        <template #footbar>
            <div class="space-x-2">
                <button @click="state.showComments = !state.showComments"><font-awesome-icon
                        icon="fa-regular fa-comment" /></button>
                <button><font-awesome-icon icon="fa-brands fa-weixin" /></button>
                <button><font-awesome-icon icon="fa-brands fa-weibo" /></button>
                <button><font-awesome-icon icon="fa-brands fa-qq" /></button>
            </div>
            <div class="space-x-2">
                <router-link custom #="{ navigate }" :to="`/article/${state.preArticle?.fid}`">
                    <button :class="{ 'text-gray-500 pointer-events-none': state.preArticle == null }"
                        @click="navigate"><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
                </router-link>
                <router-link custom #="{ navigate }" :to="`/article/${state.nextArticle?.fid}`">
                    <button :class="{ 'text-gray-500 pointer-events-none': state.nextArticle == null }"
                        @click="navigate"><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
                </router-link>
            </div>
            <div :class="state.showComments ? 'top-0 -translate-y-full' : 'top-full'"
                class="bg-gray-100 flex flex-col overflow-auto absolute w-full max-w-xl h-96 left-0 duration-150">
                <slot name="valine"></slot>
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
import { reactive, getCurrentInstance, inject, watch } from 'vue';
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
    preArticle: ContentMapperRecord | null,
    nextArticle: ContentMapperRecord | null,
    showComments: boolean
}>({
    words: 0,
    title: '',
    index: -1,
    html: '',
    preArticle: null,
    nextArticle: null,
    showComments: false
});
// 初始化文章信息
const init = () => {
    if (route.params.fid && globalData.articles.length > 0) {
        for (let i = 0; i < globalData.articles.length; i++) {
            if (globalData.articles[i].fid === route.params.fid) {
                state.index = i;
                state.title = globalData.articles[i].title;
                break;
            }
        }
        state.preArticle = state.index ? globalData.articles[state.index - 1] : null;
        state.nextArticle = state.index < globalData.articles.length ? globalData.articles[state.index + 1] : null;
        getMdContent(route.params.fid as string, (data: string) => {
            state.html = proxy.marked.parse(data);
            state.words = data.length;
        });
    }
}
// 通过路由跳文章界面
watch([() => route.params.fid, () => globalData.articles], ([old1, old2], [val1, val2]) => {
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