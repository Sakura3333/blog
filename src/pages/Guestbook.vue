<template>
    <page-layout-vue>
        <template #topbar>
            <span class="uppercase">message</span>
            <span>闇の炎に抱かれて消えろっ!</span>
        </template>
        <template #content>
            <div class="h-96 bg-black">

            </div>
            <div class="max-w-3xl mx-auto mt-5">
                <slot name="valine"></slot>
            </div>
        </template>
        <template #footbar>
            <span></span>
        </template>
    </page-layout-vue>
</template>
<script lang="ts">
export default {
    name: 'Guestbook'
}
</script>

<script setup lang="ts">
import pageLayoutVue from '../layout/page/default.vue';
</script>
<style scoped>
    
</style>