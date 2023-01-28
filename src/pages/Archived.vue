<template>
    <page-layout-vue>
        <template #topbar>
            <span class="uppercase">message</span>
            <span>闇の炎に抱かれて消えろっ!</span>
        </template>
        <template #content>
            <div class="h-full w-full space-y-5">
                <template v-for="filing in state.filings">
                    <div class="space-y-2">
                        <div>[ {{ filing.time }} ]</div>
                        <template v-for="articleInfo in filing.data">
                            <div>
                                [ {{ articleInfo.timeSplit[2] }} ]
                                <router-link :to="'/article/' + articleInfo.articleFileId">
                                    <span>{{ articleInfo.articleTitle }}</span>
                                    <span class="text-gray-300">{{ articleInfo.articleBrief }}</span>
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
import { GlobalState, ArticleMapperRecord } from '../model/inerface';

const globalState: GlobalState = (inject("globalState") as GlobalState);
const state = reactive<{
    filings: {
        time: string,
        data: any[]
    }[]
}>({
    filings: []
})

const init = () => {
    globalState.articleInfoList.forEach((articleInfo: ArticleMapperRecord) => {
        let articleCreateTimeSplitArr = articleInfo.articleCreateTime.split(' ')[0].split(/\/|-|\./);
        let articleCreateDate = articleCreateTimeSplitArr[0] + '/' + articleCreateTimeSplitArr[1];
        let filingList = state.filings.filter(filing => filing.time == articleCreateDate);
        if (filingList.length > 0) {
            filingList[0].data.push({...articleInfo, timeSplit: articleCreateTimeSplitArr});
        } else {
            state.filings.push({
                time: articleCreateDate,
                data: [{...articleInfo, timeSplit: articleCreateTimeSplitArr}]
            });
        }
    })
}

watch(() => globalState.articleInfoList, init);

init();

</script>
<style scoped>
    
</style>