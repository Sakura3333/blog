<template>
    <div class="overflow-x-hidden position-relative mt-1 shadow-sm" style="min-height: calc(100% - 4.25rem); height: auto;">
        <glass-vue></glass-vue>
        <div class="container p-0">
            <div class="row m-0">
                <jumbotron-vue class="mb-3" title="动态" content="失败才是我们活着的证明。" quote="《我的青春恋爱物语果然有问题》" background="https://s1.ax1x.com/2022/12/30/pS9it9s.jpg"></jumbotron-vue>
                <template v-for="moodInfo, i in state.moodInfoList">
                    <div class="col-12 bg-transparent card border-0">
                        <div class="card-body" :class="{'border-bottom': i != state.moodInfoList.length-1}">
                            <div class="mb-2"><small>{{ moodInfo.moodCreateTime }}</small></div>
                            <div class="markdown-body" v-html="moodInfo.moodContentHtml"></div>
                            <div class="d-flex flex-nowrap overflow-auto py-1" style="max-height: 10rem;" v-if="moodInfo.moodImages.length > 0">
                                <template v-for="moodImageURL in moodInfo.moodImages">
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
import '../css/mweb-smartblue.css';
import glassVue from '../components/basic/glass.vue';
import jumbotronVue from '../components/basic/jumbotron.vue';
import { reactive, getCurrentInstance } from 'vue';
import { MoodInfo } from '../model/model';
import { getMoodInfoList, getMoodByFileId } from '../api/api';
const proxy = getCurrentInstance()?.proxy;
const state = reactive<{
    moodInfoList: MoodInfo[]
}>({
    moodInfoList: []
});

getMoodInfoList((data: any) => {
    state.moodInfoList = data;
    state.moodInfoList.forEach(moodInfo => {
        getMoodByFileId(moodInfo.moodFileId, (data: any) => {
            moodInfo.moodContentHtml = proxy?.marked.parse(data);
        });
    });
});

</script>

<style scoped>
</style>