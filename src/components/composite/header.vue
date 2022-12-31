<template>
    <nav class="position-ssm-fixed h-100 top-0" style="min-width: 5rem; transition: .3s;" :style="{'left': !show ? '-5rem' : '0'}">
        <div class="container-fluid h-100 position-relative p-0 d-flex flex-column align-items-center">
            <glass-vue></glass-vue>
            <img :src="logo" alt="" style="width: 3.5rem; height: 3.5rem;">
            <div class="w-100 p-2 d-md-flex flex-md-column">
                <template v-for="route in routes">
                    <div v-if="route.meta.show" class="w-100">
                        <router-link :to="route.path"
                            class="d-flex justify-content-center align-items-center text-dark p-2 rounded-pill text-decoration-none fw-bold">
                            <i :class="route.meta.icon"></i>
                            <span class="ms-1 d-xl-inline d-none">
                                {{ route.meta.title }}
                            </span>
                        </router-link>
                    </div>
                </template>
            </div>
        </div>
        <div class="d-sm-none d-block position-absolute start-100 top-50 translate-middle-y">
            <button
                class="btn shadow my-1 text-dark overflow-hidden border-0 rounded-0 rounded-pill rounded-start border-none fw-bold fs-5 position-relative"
                @click="show = !show"
                >
                <glass-vue></glass-vue>
                <i class="bi" :class="'bi-arrow-' + (!show ? 'right' : 'left')"></i>
            </button>
        </div>
    </nav>
</template>

<script setup lang="ts">
import logo from '../../assets/logo.png';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import glassVue from '../basic/glass.vue';

const show = ref(false);

const router = useRouter();

const routes = router.getRoutes();

</script>

<style scoped>
.router-link-active {
    background-color: var(--bs-dark) !important;
    color: var(--bs-white) !important;
}
</style>