<template>
    <div class="flex-fill overflow-x-hidden">
        <div class="container">
            <div class="row gy-2 m-0">
                <template v-for="moodInfo in state.moodInfoList">
                    <div class="col bg-transparent card p-2 rounded shadow-sm border-0 position-relative">
                        <glass-vue></glass-vue>
                        <div class="card-body">
                            <div class="mb-2"><small>{{ moodInfo.moodCreateTime }}</small></div>
                            <p class="card-text" v-html="moodInfo.moodContentHtml"></p>
                            <div class="d-flex flex-nowrap overflow-auto py-1" style="height: 10rem;">
                                <template v-for="moodImageURL in moodInfo.moodImageURLList">
                                    <img :src="moodImageURL" class="img-fluid rounded mx-1" alt="">
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import glassVue from '../components/basic/glass.vue';
import { reactive, getCurrentInstance } from 'vue';
import { MoodInfo } from '../model/model';
import { getMoodInfoList, getMoodByFileId, getFileBlob } from '../api/api';
const proxy = getCurrentInstance()?.proxy;
const state = reactive<{
    moodInfoList: MoodInfo[]
}>({
    moodInfoList: []
});

getMoodInfoList((data: any) => {
    state.moodInfoList = data;
    state.moodInfoList.forEach(moodInfo => {
        moodInfo.moodImageURLList = [];
        moodInfo.moodImages.forEach(moodImage => {
            getFileBlob(moodImage, (data: any) => {
                moodInfo.moodImageURLList.push(URL.createObjectURL(data));
            });
        });
        getMoodByFileId(moodInfo.moodFileId, (data: any) => {
            moodInfo.moodContentHtml = proxy?.marked.parse(data);
        });
    });
});

</script>

<style scoped>
</style>