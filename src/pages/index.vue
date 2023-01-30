<template>
    <page-layout-vue>
        <template #topbar>
            <span class="uppercase">articles{{ globalData.articles.length }}</span>
            <span>闇の炎に抱かれて消えろっ!</span>
        </template>
        <template #content>
            <div class="flex flex-wrap justify-center items-center">
                <template v-for="article, i in globalData.articles.slice(page, pageSize * (1 + page))">
                    <div class="w-full md:w-1/2 2xl:w-1/3 p-0.5">
                        <div class="hover:backdrop-card border h-64 relative overflow-hidden">
                            <img :src="article.imgs[0]" class="w-full h-full object-cover object-center"
                                alt="">
                            <router-link :to="`/article/${article.fid}`" class="card-content relative">
                                {{ article.brief }}
                            </router-link>
                            <div class="absolute top-0 px-1 bg-gray-100 w-full flex flex-nowrap justify-between">
                                <span class="flex-shrink-0">{{ article.time }}</span>
                                <span class="flex-shrink-0 overflow-hidden">{{ article.title }}</span>
                            </div>
                            <div class="absolute bottom-0 px-1 bg-gray-100">
                                <template v-for="tagName, i in article.tags">
                                    <button class="uppercase text-xs" @click="switchPanel.maximizeTopRight(), $router.push(`/search/${tagName}`)">
                                        {{ tagName }} >>
                                    </button>
                                    <span class="px-3" v-if="i < article.tags.length - 1">|</span>
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
                    {{ page + 1 }} / {{ Math.ceil(globalData.articles.length / pageSize) }}
                </span>
                <button class="px-1"
                    @click="page < Math.ceil(globalData.articles.length / pageSize) - 1 ? page++ : null"><font-awesome-icon
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
import { DataSet } from '../model/conf';
defineProps<{
    switchPanel: any
}>();
const globalData: DataSet = inject('globalData') as DataSet;
const page = ref<number>(0);
const pageSize = ref<number>(10);

</script>