<template>
    <page-layout-vue>
        <template #topbar>
            <span class="uppercase">moods{{ globalState.moodInfoList.length }}</span>
            <span>闇の炎に抱かれて消えろっ!</span>
        </template>
        <template #content>
            <div class="space-y-5 w-full max-w-3xl mx-auto">
                <template v-for="moodInfo in globalState.moodInfoList">
                    <div class="space-y-1">
                        <div>[ {{ moodInfo.moodCreateTime }} ]</div>
                        <div v-html="moodInfo.moodContentHtml"></div>
                        <div class="w-full overflow-auto h-32 p-1 flex space-x-2" v-if="moodInfo.moodImages.length">
                            <template v-for="img in moodInfo.moodImages">
                                <img :src="img" class="h-full ring-1 ring-offset-2 ring-gray-300" alt="">
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
    name: 'Mood'
}
</script>

<script setup lang="ts">
import pageLayoutVue from '../layout/page/default.vue';
import { inject, watch, getCurrentInstance } from 'vue';
import { GlobalState, MoodMapperRecord } from '../model/inerface';
import { getFileContentByFileId } from '../api/api';
import { Dir } from '../model/enum';

const proxy = getCurrentInstance()?.proxy as any;
const globalState: GlobalState = inject('globalState') as GlobalState;
const init = () => {
    globalState.moodInfoList.forEach((moodInfo: MoodMapperRecord) => {
        getFileContentByFileId(Dir.MOOD, moodInfo.moodFileId, (data: any) => {
            moodInfo.moodCreateTime
            moodInfo.moodContentHtml = proxy.marked.parse(data);
        });
    });
}

watch(() => globalState.moodInfoList, (val, oldval) => {
    if (oldval.length === 0 && val.length > 0) {
        init();
    }
})

init();
</script>

<style scoped>
</style>