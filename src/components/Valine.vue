<template>
    <div id="vcomments"></div>
</template>
<script setup lang="ts">
import Valine from 'valine';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const valine = ref<Valine>();
const initValine = () => {
    valine.value = new Valine({
        el: '#vcomments',
        path: route.path,
        appId: 'pDEVG0gjKlnWIJYEyMCoCRfl-gzGzoHsz',
        appKey: 'cCjERroUEaFKu1ZD5SW8Wx6f',
        visitor: true
    });
}

watch(() => route.path, initValine);
onMounted(initValine);


</script>
<style scoped>
    
</style>