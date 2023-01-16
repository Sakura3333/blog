<template>
    <div class="bg-transparent d-flex px-2 text-center flex-column justify-content-center position-relative align-items-center w-100 ratio ratio-16x9">
        <img class="position-absolute top-0 start-0 h-100 w-100" style="z-index: -1;object-fit: cover;" :src="background" alt="" v-if="background">
        <div class="p-3 rounded w-75 h-75 mx-auto position-absolute top-50 start-50 translate-middle d-flex flex-column justify-content-center align-items-center" style="background: rgba(255, 255, 255, .5)">
            <h1>{{ title }}</h1>
            <figure>
                <blockquote class="blockquote">{{ content }}</blockquote>
                <figcaption class="blockquote-footer" v-show="quote">{{ quote }}</figcaption>
            </figure>
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
    title: string,
    content: string,
    quote: string,
    height?: string,
    background?: string | null
}>(), {
    title: '',
    content: '',
    quote: '',
    height: '16rem',
    background: null
});
</script>
<style scoped>
    
</style>