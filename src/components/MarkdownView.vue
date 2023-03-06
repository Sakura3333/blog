<template>
    <div ref="content" v-html="html"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{
    html: string
}>();
const content = ref<HTMLElement>();

onMounted(() => {
    content.value?.addEventListener("click", (e: MouseEvent) => {
        const target = e.target as HTMLAnchorElement;
        if (target.localName === 'a' && target.href && target.href.includes("#")) {
            e.preventDefault();
            const strArr = target.href.split("#")
            const id = strArr[strArr.length - 1];
            const section = document.getElementById(id);
            console.log(target.href)
            content.value?.parentElement?.scrollTo({
                top: section?.offsetTop,
                behavior: 'smooth'
            });
        }
    })
});
</script>