<template>
    <div id="website-container" class="container-xxl p-0" :data-theme="state.theme">
        <!-- 头部 -->
        <div class="header">
            <header ref="header" class="header-fixed-box navbar navbar-expand-md text-dark py-0 top-0 bg-light"
                :class="{ 'position-fixed': state.fixedHeader }">
                <button class="header-aside-toggle btn border-0" @click="state.showAside = !state.showAside">
                    <i class="bi bi-list"></i>
                </button>
                <div class="header-logo navbar-brand p-0 m-0">
                    <div class="header-logo-fixed-box d-flex px-2 align-items-center fw-bold"
                        :class="{ 'position-fixed': state.fixedAside }">
                        Dark🔥Master
                    </div>
                </div>
                <button class="btn d-md-none border-0" data-bs-toggle="collapse"
                    data-bs-target="#navbar-collapse-panel">
                    <i class="bi bi-three-dots"></i>
                </button>
                <div class="header-menu-box collapse navbar-collapse justify-content-end align-self-stretch"
                    id="navbar-collapse-panel">
                    <slot name="header"></slot>
                </div>
            </header>
        </div>
        <!-- 身体 -->
        <div class="subject">
            <!-- 侧边栏 -->
            <div class="subject-aside" :class="state.showAside ? 'show' : 'hide'">
                <aside ref="aside" class="subject-aside-fixed-box" :class="{ 'position-fixed': state.fixedAside }">
                    <slot name="aside"></slot>

                </aside>
            </div>
            <!-- 主要容器 -->
            <div class="subject-content d-flex flex-column">
                <!-- 主要内容 -->
                <div class="subject-content-main flex-fill p-0">
                    <main ref="main">
                        <slot name="mainLeft"></slot>
                    </main>
                </div>
                <!-- 足部 -->
                <div class="subject-content-footer">
                    <footer class="text-center">
                        asdf
                    </footer>
                </div>
            </div>
        </div>
        <div class="position-fixed end-0 top-50 p-0 d-flex align-items-center justify-content-center"
            :class="state.showSettingPanel ? '' : 'translate-end'" style="transition: all .3s;">
            <button @click="state.showSettingPanel = !state.showSettingPanel"
                class=" btn rounded-pill border border-white rounded-end px-2 py-1 d-flex justify-content-center align-items-center position-absolute top-0 translate-start start-0"><i
                    class="bi bi-gear"></i>
            </button>
            <div class="p-2">
                <div class="form-check form-switch">
                    <label>
                        固定头部
                        <input type="checkbox" class="form-check-input" :disabled="state.disableSetting"
                            v-model="state.fixedHeader">
                    </label>
                </div>
                <div class="form-check form-switch">
                    <label>
                        固定侧边导航
                        <input type="checkbox" class="form-check-input" :disabled="state.disableSetting"
                            v-model="state.fixedAside">
                    </label>
                </div>
                <div class="form-check form-switch">
                    <label>
                        黑夜模式
                        <input type="checkbox" class="form-check-input">
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import '../assets/css/layout.css';
import { ref, reactive, onMounted } from 'vue';
const state = reactive<{
    showAside: boolean,
    showSettingPanel: boolean,
    disableSetting: boolean,
    fixedHeader: boolean,
    fixedAside: boolean,
    theme: string
}>({
    showAside: false,
    showSettingPanel: false,
    disableSetting: false,
    fixedHeader: false,
    fixedAside: false,
    theme: 'default'
})
const header = ref<HTMLElement>();
const aside = ref<HTMLElement>();
const main = ref<HTMLElement>();
const setLayout = () => {
    if (header.value!.offsetWidth < 768) {
        state.disableSetting = true;
        state.fixedAside = false;
        state.fixedHeader = false;
    } else {
        state.disableSetting = false;
    }
    header.value!.style.width = header.value!.parentElement!.offsetWidth + 'px';
    aside.value!.style.width = aside.value!.parentElement!.offsetWidth + 'px';
}
onMounted(setLayout);
window.addEventListener('resize', setLayout);

</script>