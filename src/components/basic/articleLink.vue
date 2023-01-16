<template>
    <a href="#" class="d-block text-decoration-none text-dark article-link" @click.prevent="gotoArticle">
        <slot></slot>
    </a>
</template>
<script setup lang="ts">
import { Router, useRouter } from 'vue-router';
const props = withDefaults(defineProps<{
    articleFileId: string
}>(), {
    articleFileId: ""
});

const router: Router = useRouter();

const gotoArticle = () => {
    router.push(`/article/${props.articleFileId}`);
}

</script>
<style scoped>
    
</style>