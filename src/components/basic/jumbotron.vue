<template>
    <div class="bg-light d-flex p-3 text-center flex-column justify-content-center align-items-center w-100 mb-3" :style="{height: height}">
        <h1>{{ title }}</h1>
        <figure>
            <blockquote class="blockquote">{{ content }}</blockquote>
            <figcaption class="blockquote-footer" v-show="quote">{{ quote }}</figcaption>
        </figure>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
    title: string,
    content: string,
    quote: string,
    height: string
}>(), {
    title: '',
    content: '',
    quote: '',
    height: '20rem'
});
</script>
<style scoped>
    
</style>