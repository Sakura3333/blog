<template>
    <div class="container-fluid search-panel">
        <div class="row m-0 align-items-center flex-column">
            <div class="col-xl-6 col-lg-8 col-md-10 col-sm-8 col-12">
                <div class="text-center">
                    <div class="input-group">
                        <input type="text" class="search-panel-input form-control form-control-sm rounded-0"
                            :placeholder="placeholder"
                            v-model="state.keywords">
                        <button class="search-panel-button btn btn-sm btn-dark rounded-0"
                            @click="submitSearch()">搜索</button>
                    </div>
                </div>
                <div class="mt-1">
                    <slot name="classify" :search="submitSearch"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
const emits = defineEmits(['search'])
const props = defineProps<{
    source: any[],
    searchFields: string[],
    placeholder: string,
}>();
const state = reactive<{
    keywords: string,
    results: any[]
}>({
    keywords: '',
    results: []
});

const submitSearch = (keywords?: string, searchFields?: string[]) => {
    state.results = [];
    if (!keywords) keywords = state.keywords;
    if (!searchFields) searchFields = props.searchFields;
    if (keywords && props.source && searchFields) {
        props.source.forEach((item: any) => {
            (searchFields as string[]).forEach(field => {
                if (['object', 'function'].includes(typeof item[field]) && JSON.stringify(item[field]).includes(keywords as string)) {
                    state.results.push(item);
                } else if ((item[field] + '').includes(keywords as string)) {
                    state.results.push(item);
                }
            })
        })
    }
    emits('search', state.results);
}

</script>
<style scoped>

</style>