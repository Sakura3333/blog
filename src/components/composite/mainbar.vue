<template>
    <div class="mainbar shadow-sm px-2 d-flex align-items-center position-relative">
        <glass-vue></glass-vue>
        <button v-show="showBackBtn" class="back-btn btn btn-sm fw-bolder border-0 rounded-circle text-center" @click="back">
            <i class="bi bi-arrow-left fs-3"></i>
        </button>
        <div class="flex-fill ms-2 text-dark">
            <div class="fw-bolder text-truncate mt-auto fs-5 d-flex justify-content-between">
                <span>{{title}}</span>
            </div>
            <small class="d-flex align-items-center text-muted">
                <slot></slot>
            </small>
        </div>
    </div>
</template>
<script setup lang="ts">
import glassVue from '../basic/glass.vue';

withDefaults(defineProps<{
    showBackBtn: boolean,
    title: string,
}>(), {
    showBackBtn: false,
    title: '',
});

const back = () => {
    history.back()
}

</script>
<style scoped>
.back-btn {
    width: 3rem;
    height: 3rem;
}
.mainbar {
    min-height: 4rem;
    max-height: 4rem;
}
small {
    font-size: 0.8rem;
}
</style>