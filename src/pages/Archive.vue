<template>
    <page-layout-vue>
        <template #topbar>
            <span class="uppercase space-x-1"><font-awesome-icon icon="fa-solid fa-feather" /><span>{{ globalData.articles.length }}</span></span>
            <span>闇の炎に抱かれて消えろっ!</span>
        </template>
        <template #content>
            <div class="w-full max-w-3xl mx-auto py-2">
                <template v-for="item in state.archives">
                    <div class="flex">
                        <div class="break-words px-2 text-xs font-modul">
                            {{ item.exergue }}
                        </div>
                        <div class="py-12 space-y-6">
                            <template v-for="archive in item.data">
                                <div class="flex flex-col w-full relative pl-3">
                                    <span class="text-xs font-modul absolute left-0 px-2 -translate-x-full">{{ archive.day }}</span>
                                    <div class="flex flex-col space-y-2">
                                        <template v-for="article, i in archive.articles">
                                            <router-link :to="`/article/${article.date}/${article.fid}`" class="hover:bg-gray-200">
                                                {{ article.title }}
                                                <span class="text-sm text-gray-500">{{ article.brief }}</span>
                                            </router-link>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </template>
        <template #footbar>
            <span></span>
        </template>
    </page-layout-vue>
</template>
<script lang="ts">
export default {
    name: 'Archived'
}
</script>
<script setup lang="ts">
import pageLayoutVue from '../layout/page/default.vue';
import { inject, reactive, watch } from 'vue';
import { DataSet } from '../model/conf';

const globalData: DataSet = inject("globalData") as DataSet;
const state = reactive<{
    archives: {
        exergue: string,
        data: {day: string, articles: any[]}[]
    }[]
}>({
    archives: []
})

const init = () => {
    globalData.articles.forEach(article => {
        const dateArr = article.date.split(/\/|-|\./);
        const exergue = dateArr[0] + '/' + dateArr[1];
        const archives = state.archives.filter(archive => archive.exergue == exergue);
        if (archives.length > 0) {
            const item = archives[0].data.filter(item => item.day == dateArr[2]);
            if (item.length > 0) {
                item[0].articles.push(article);
            } else {
                archives[0].data.push({articles: [article], day: dateArr[2]});
            }
        } else {
            state.archives.push({
                exergue,
                data: [{articles: [article], day: dateArr[2]}]
            });
        }
    })
    console.log(state.archives);
}

watch(() => globalData.articles, init, {deep: true});

init();

</script>
<style scoped>
    
</style>