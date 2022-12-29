<template>
    <div class="p-2 h-100 d-flex flex-column align-items-center justify-content-center">
        <div class="position-relative w-100">
            <input type="text" class="form-control rounded-pill text-center keywords ps-2 pe-5 w-100 shadow-sm"
                :class="state.showTagBox ? 'bg-white' : 'bg-transparent'" v-model="state.keywords"
                :placeholder="placeholder"
                @focus="state.showTagBox = true" @blur="state.showTagBox = false"
                @keydown.enter="submitSearch(state.keywords)">
            <button class="btn text-primary position-absolute rounded-pill end-0 top-0" @click="submitSearch(state.keywords)">
                <i class="bi bi-search text-dark"></i>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue';
const emits = defineEmits(['search'])
const state = reactive<{
    showTagBox: boolean,
    keywords: string,
    result: any[]
}>({
    showTagBox: false,
    keywords: '',
    result: []
});

const props = defineProps<{
    source: any[] | undefined,
    searchFields: string[],
    placeholder: string,
}>();

const submitSearch = (keywords: string) => {
    state.result = [];
    if (keywords && props.source && props.searchFields) {
        props.source.forEach((item: any) => {
            props.searchFields.forEach(field => {
                if (['object', 'function'].includes(typeof item[field]) && JSON.stringify(item[field]).includes(keywords)) {
                    state.result.push(item);
                } else if ((item[field] + '').includes(keywords)) {
                    state.result.push(item);
                }
            })
        })
    }
    emits('search', state.result);
}

</script>
<style scoped>

</style>