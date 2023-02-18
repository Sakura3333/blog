<template>
    <page-layout-vue>
        <template #topbar>
            <span class="uppercase space-x-1"><font-awesome-icon icon="fa-solid fa-paragraph" /><span>{{ globalData.moods.length }}</span></span>
            <span>闇の炎に抱かれて消えろっ!</span>
        </template>
        <template #content>
            <div class="space-y-5 w-full max-w-3xl mx-auto">
                <template v-for="mood in globalData.moods">
                    <div class="space-y-1">
                        <div>[ {{ mood.time }} ]</div>
                        <div v-html="mood.brief"></div>
                        <div class="w-full overflow-auto h-32 p-1 flex space-x-2" v-if="mood.imgs.length">
                            <template v-for="img in mood.imgs">
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
import { getMdContent } from '../api/api';
import { ContentMapperRecord, DataSet } from '../model/conf';

const proxy = getCurrentInstance()?.proxy as any;
const globalData: DataSet = inject('globalData') as DataSet;
const init = () => {
    globalData.moods.forEach((mood: ContentMapperRecord) => {
        getMdContent(mood.fid, (data: any) => {
            mood.brief = proxy.marked.parse(data);
        });
    });
}

watch(() => globalData.moods, init, {
    deep: true
});

init();
</script>

<style scoped>
</style>