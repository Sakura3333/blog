<template>
    <div class="card bg-transparent p-2 border-0 rounded-0">
        <img :src="articleInfo.articleCover" class="card-img-top" alt="">
        <div>
            <article-link-vue :article-title="articleInfo.articleTitle" :article-file-id="articleInfo.articleFileId">
                <template #append>
                    <div class="ps-2 pt-2 text-truncate" v-html="articleInfo.articleBrief"></div>
                </template>
            </article-link-vue>
            <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted fw-bold px-2 rounded-pill">
                    {{ articleInfo.articleCreateTime }}
                </small>
                <div class="px-2 rounded-pill">
                    <small class="text-dark">
                        <i class="bi bi-tag-fill me-1"></i>
                        <span class="mx-1" v-for="tag in articleInfo.articleTag">{{ tag }}</span>
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import articleLinkVue from '../basic/articleLink.vue';
import { ArticleInfo } from '../../model/model';

defineProps<{
    articleInfo: ArticleInfo
}>();
</script>
<style scoped>
.card-img-top {
    width: 100%;
    height: 16rem;
    max-height: 16rem;
    object-fit: cover;
}
</style>