<template>
    <div class="h-full flex flex-col md:border">
        <div class="flex justify-between items-center px-2 bg-gray-100 z-50">
            <slot name="topbar"></slot>
        </div>
        <div ref="content" class="flex-grow w-full p-2 overflow-auto delay-300">
            <slot name="content"></slot>
        </div>
        <div class="w-full flex flex-row justify-between items-center px-2 bg-gray-100 relative z-50">
            <slot name="footbar"></slot>
            <button @click="backtop"><font-awesome-icon icon="fa-solid fa-chevron-up" /></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
// 返回顶部
const content = ref<HTMLElement>();
const backtop = () => {
    content.value?.scrollTo({
        top: 0
    });
}
</script>