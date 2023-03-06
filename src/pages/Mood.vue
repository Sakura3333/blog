<template>
    <page-layout-vue>
        <template #topbar>
            <span class="uppercase space-x-1"><font-awesome-icon icon="fa-solid fa-paragraph" /><span>{{
                globalData.moods.length }}</span></span>
            <span>闇の炎に抱かれて消えろっ!</span>
        </template>
        <template #content>
            <div class="w-full max-w-3xl mx-auto py-2">
                <template v-for="item in moods">
                    <div class="flex">
                        <div class="break-words px-2 text-xs font-modul">
                            {{ item.date }}
                        </div>
                        <div class="py-12 space-y-6">
                            <template v-for="mood in item.data">
                                <div class="flex flex-col w-full relative pl-3">
                                    <span class="text-xs font-modul absolute left-0 px-2 -translate-x-full">{{ mood.time }}</span>
                                    <div class="flex-grow relative">
                                        <div class="h-full flex markdown-body" v-html="mood.brief"></div>
                                    </div>
                                    <div class="w-full overflow-auto h-32 p-1 flex space-x-2" v-if="mood.imgs.length">
                                        <template v-for="img in mood.imgs">
                                            <img :src="img" class="h-full ring-1 ring-offset-2 ring-gray-300" alt="">
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
    name: 'Mood'
}
</script>

<script setup lang="ts">
import pageLayoutVue from '../layout/page/default.vue';
import { inject, ref, watch, getCurrentInstance } from 'vue';
import { getMdContent } from '../api/api';
import { ContentMapperRecord, DataSet } from '../model/conf';
interface Mood {
    date: string,
    data: ContentMapperRecord[]
}
const proxy = getCurrentInstance()?.proxy as any;
const globalData: DataSet = inject('globalData') as DataSet;
const moods = ref<Mood[]>([]);
const init = () => {
    globalData.moods.forEach((mood: ContentMapperRecord) => {
        const moodArr = moods.value.filter(item => item.date == mood.date);
        if (moodArr.length > 0) {
            moodArr[0].data.push(mood);
        } else {
            moods.value.push({ date: mood.date, data: [] });
            moods.value[moods.value.length - 1].data.push(mood);
        }
        getMdContent(mood.date.split(/\\|\.|-/), mood.fid, (data: any) => {
            mood.brief = proxy.marked.parse(data);
        });
    });
    console.log(moods.value);
}

watch(() => globalData.moods.length, init, {
    deep: true
});

init();
</script>

<style scoped></style>