<template>
    <div class="flex-fill overflow-x-hidden w-100">
        <div class="container">
            <div class="row gy-2 m-0" v-if="globalState.articleInfoList">
                <template v-for="articleInfo in globalState.articleInfoList">
                    <div class="card bg-transparent col-12 p-2 border-0 shadow-sm position-relative">
                        <glass-vue></glass-vue>
                        <img :src="articleInfo.articleCoverURL" class="card-img-top" alt="">
                        <div>
                            <article-link-vue :article-title="articleInfo.articleTitle" :article-file-id="articleInfo.articleFileId">
                                <template #append>
                                    <div class="ps-2 pt-2 text-truncate" v-html="articleInfo.articleBrief"></div>
                                </template>
                            </article-link-vue>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted fw-bold px-2 border rounded-pill">
                                    {{articleInfo.articleCreateTime}}
                                </small>
                                <div class="px-2 border rounded-pill">
                                    <small class="text-dark">
                                        <i class="bi bi-tag-fill me-1"></i>
                                        <span class="mx-1" v-for="tag in articleInfo.articleTag">{{ tag }}</span>
                                    </small>
                                </div>
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
import ArticleLinkVue from '../components/basic/articleLink.vue';
import { inject } from 'vue';
import { GlobalState } from '../model/model';

const globalState:GlobalState = (inject('globalState') as GlobalState);

</script>

<style scoped>
.card-img-top {
    width: 100%;
    height: 16rem;
    max-height: 16rem;
    object-fit: cover;
}
</style>