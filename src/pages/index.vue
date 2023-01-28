<template>
    <page-layout-vue>
        <template #topbar>
            <span class="uppercase">articles{{ globalState.articleInfoList.length }}</span>
            <span>闇の炎に抱かれて消えろっ!</span>
        </template>
        <template #content>
            <div class="flex flex-wrap justify-center items-center">
                <template v-for="articleInfo, i in globalState.articleInfoList.slice(page, pageSize * (1 + page))">
                    <div class="w-full md:w-1/2 2xl:w-1/3 p-0.5">
                        <div class="hover:backdrop-card border h-64 relative overflow-hidden">
                            <img :src="articleInfo.articleCover" class="w-full h-full object-cover object-center"
                                alt="">
                            <router-link :to="`/article/${articleInfo.articleFileId}`" class="card-content relative">
                                {{ articleInfo.articleBrief }}
                            </router-link>
                            <div class="absolute top-0 px-1 bg-gray-100 w-full flex flex-nowrap justify-between">
                                <span class="flex-shrink-0">{{ articleInfo.articleCreateTime }}</span>
                                <span class="flex-shrink-0 overflow-hidden">{{ articleInfo.articleTitle }}</span>
                            </div>
                            <div class="absolute bottom-0 px-1 bg-gray-100">
                                <template v-for="tagName, i in articleInfo.articleTag">
                                    <button class="uppercase text-xs" @click="switchPanel.maximizeTopRight(), $router.push(`/search/${tagName}`)">
                                        {{ tagName }} >>
                                    </button>
                                    <span class="px-3" v-if="i < articleInfo.articleTag.length - 1">|</span>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </template>
        <template #footbar>
            <div class="space-x-1 text-xs">
                <label>
                    <input type="number" step="1" min="1" max="30" class="outline-0 text-center bg-transparent"
                        v-model.lazy="pageSize">条/页
                </label>
                <button class="px-1" @click="page > 0 ? page-- : null"><font-awesome-icon
                        icon="fa-solid fa-chevron-left" /></button>
                <span>
                    {{ page + 1 }} / {{ Math.ceil(globalState.articleInfoList.length / pageSize) }}
                </span>
                <button class="px-1"
                    @click="page < Math.ceil(globalState.articleInfoList.length / pageSize) - 1 ? page++ : null"><font-awesome-icon
                        icon="fa-solid fa-chevron-right" /></button>
            </div>
        </template>
    </page-layout-vue>
</template>

<script lang="ts">
export default {
    name: 'Index'
}
</script>
<script setup lang="ts">
import pageLayoutVue from '../layout/page/default.vue';
import { inject, ref } from 'vue';
import { GlobalState } from '../model/inerface';
defineProps<{
    switchPanel: any
}>();
const globalState: GlobalState = (inject('globalState') as GlobalState);
const page = ref<number>(0);
const pageSize = ref<number>(10);

</script>