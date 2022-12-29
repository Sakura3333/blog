<template>
    <a href="#" class="d-block py-2 text-decoration-none text-dark" @click.prevent="gotoArticle">
        <slot name="prepend"></slot>
        <h6 class="m-0 fw-bold text-truncate" :class="customClass">{{ articleTitle }}</h6>
        <slot name="append"></slot>
    </a>
</template>
<script setup lang="ts">
import { Router, useRouter } from 'vue-router';
const props = withDefaults(defineProps<{
    articleTitle: string,
    articleFileId: string,
    customClass?: string | null
}>(), {
    articleTitle: "",
    articleFileId: "",
    customClass: ""
});

const router: Router = useRouter();

const gotoArticle = () => {
    router.push(`/article/${props.articleFileId}`);
}

</script>
<style scoped>
    
</style>