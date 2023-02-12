<template>
    <div class="h-full p-3">
        <div class="h-full flex flex-row flex-nowrap overflow-auto gap-x-6">
            <template v-for="accordionItem, i in accordionData">
                <div class="h-full border-dashed border-2" :class="!accordionItem.collapsed ? 'aspect-square':'aspect-2x7'">
                    <a href="" class="block h-full" @click.prevent="change(i)">
                        {{ accordionItem.title }}
                    </a>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const accordionData = ref([
    {
        title: 'test',
        collapsed: true
    },{
        title: 'test',
        collapsed: true
    },{
        title: 'test',
        collapsed: true
    },
]);

const change = (index: number) => {
    accordionData.value.forEach(item => {
        item.collapsed = true;
    });
    accordionData.value[index].collapsed = false;
}

</script>
<style scoped>
    
</style>