<template>
    <div class="w-100 position-relative" :class="{'d-none': !show}">
        <glass-vue></glass-vue>
        <div id="article-vcomments"></div>
    </div>
</template>
<script setup lang="ts">
import Valine from 'valine';
import glassVue from '../basic/glass.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
withDefaults(defineProps<{
    show: boolean
}>(), {
    show: false
});

const route = useRoute();
const valine = ref<Valine>();

const initValine = () => {
    valine.value = new Valine({
        el: '#article-vcomments',
        path: route.path,
        appId: 'h41MTt4ewVQbanLRxOJJejkL-gzGzoHsz',
        appKey: 'BZ5bCdy980A29XKr7z5meW2J'
    });
}

watch(() => route.path, initValine);

onMounted(initValine);


</script>
<style scoped>
    
</style>