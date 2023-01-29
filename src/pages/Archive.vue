<template>
    <page-layout-vue>
        <template #topbar>
            <span class="uppercase">message</span>
            <span>闇の炎に抱かれて消えろっ!</span>
        </template>
        <template #content>
            <div class="h-full w-full max-w-3xl mx-auto space-y-5">
                <template v-for="archive in state.archives">
                    <div class="space-y-2">
                        <div>[ {{ archive.exergue }} ]</div>
                        <template v-for="article in archive.data">
                            <div>
                                [ {{ article.day }} ]
                                <router-link :to="'/article/' + article.fid">
                                    <span>{{ article.title }}</span>
                                    <span class="text-gray-300">{{ article.brief }}</span>
                                </router-link>
                            </div>
                        </template>
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
        data: any[]
    }[]
}>({
    archives: []
})

const init = () => {
    globalData.articles.forEach(article => {
        let timeSplitArr = article.time.split(' ')[0].split(/\/|-|\./);
        let exergue = timeSplitArr[0] + '/' + timeSplitArr[1];
        let archives = state.archives.filter(archive => archive.exergue == exergue);
        if (archives.length > 0) {
            archives[0].data.push({...article, day: timeSplitArr[2]});
        } else {
            state.archives.push({
                exergue,
                data: [{...article, day: timeSplitArr[2]}]
            });
        }
    })
}

watch(() => globalData.articles, init, {deep: true});

init();

</script>
<style scoped>
    
</style>