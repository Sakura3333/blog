<template>
    <div class="overflow-x-hidden position-relative" style="min-height: calc(100% - 4.25rem); height: auto;">
        <div class="container-fluid">
            <div class="row m-0" v-if="globalState.articleInfoList">
                <template v-for="articleInfo, i in globalState.articleInfoList">
                    <article-card-vue :article-info="articleInfo" class="col-12" :class="{'border-bottom': i != globalState.articleInfoList.length-1}"></article-card-vue>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import articleCardVue from '../components/composite/articleCard.vue';
import { inject } from 'vue';
import { GlobalState } from '../model/inerface';

const globalState:GlobalState = (inject('globalState') as GlobalState);

</script>

<style scoped>
</style>