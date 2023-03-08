<template>
    <div ref="content" v-html="html" @click="clickHandler($event)"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{
    html: string
}>();
const content = ref<HTMLElement>();
const clickHandler = (e: MouseEvent) => {
    const target = e.target as HTMLAnchorElement;
    const targetHref = target.attributes.getNamedItem('href')?.nodeValue;
    if (targetHref?.startsWith("#")) {
        e.preventDefault();
        const section = document.querySelector(targetHref) as HTMLElement;
        content.value?.parentElement?.scrollTo({
            top: section?.offsetTop,
            behavior: 'smooth'
        });
    }
}
onMounted(() => {
    const observer = new MutationObserver((mutationsList, observer) => {
        if (mutationsList[0].type === 'childList') {
            const links = content.value?.querySelectorAll("a");
            links?.forEach(link => {
                if (!link.attributes.getNamedItem('href')?.nodeValue?.startsWith("#")) {
                    link.target = "__blank";
                }
            });
        }
    });
    observer.observe(content.value as Node, {childList: true});
});
</script>