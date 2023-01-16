<template>
    <div class="pb-4 pe-4 position-fixed bottom-0 end-0">
        <a href="" @click.prevent="backTop"
            class="btn rounded-circle border-0 btn-light text-dark justify-content-center align-items-center shadow-sm position-relative fs-4 overflow-hidden"
            :class="showBackTopBtn ? 'd-flex' : 'd-none'" style="width: 3rem; height: 3rem;">
            <slot></slot>
            <i class="bi bi-arrow-up"></i>
        </a>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { debounce } from "../../utils/utils";
const showBackTopBtn = ref(false)
const backTop = () => {
    window.scrollTo({
        top: 0
    })
}

window.addEventListener("scroll", debounce(() => {
    if (window.scrollY > 60) showBackTopBtn.value = true;
    else showBackTopBtn.value = false;
}));



</script>
<style scoped>

</style>