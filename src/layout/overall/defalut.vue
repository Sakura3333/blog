<template>
    <!-- style="background: url(https://s1.ax1x.com/2022/12/30/pS9FLi4.jpg) center no-repeat; background-size: cover;" -->
    <div class="fixed w-full h-full overflow-hidden flex flex-row select-none text-sm" v-swip>
        <!-- 页面导航 -->
        <div class="h-full flex-shrink-0 border-r duration-300 bg-h-2rate -translate-x-full absolute z-50 md:static md:translate-x-0"
            :class="{'-translate-x-0': showBodyPanelNav}"
            style="background-image: linear-gradient(black 50%, white 50%);" :style="{
                'width': customize.layout.asideWidth,
                'padding-top': customize.layout.toolBarHeight,
                'background-position-y': panelState[Panel.HEADPANEL].maximized ? '-' + customize.layout.toolBarHeight : `calc(${customize.layout.toolBarHeight} + 100%)`
            }">
            <div class="mix-blend-difference text-white h-full w-full md:w-auto">
                <slot :name="Panel.BODYPANEL_NAV" :="{ panelState, switchPanel }"></slot>
            </div>
        </div>
        <!-- 小屏下的遮罩，点击隐藏侧边栏 -->
        <button class="absolute h-2rate w-full top-0 left-0 bg-black bg-opacity-50 z-40 md:hidden" @click="showBodyPanelNav = false" v-show="showBodyPanelNav"></button>
        <!-- 面板容器 -->
        <div class="relative flex-grow w-0 h-2rate duration-300"
            :style="panelState[Panel.BODYPANEL].maximized ? `top:${customize.layout.toolBarHeight};transform:translateY(-50%)` :
            (panelState[Panel.HEADPANEL].maximized ? `top:-${customize.layout.toolBarHeight};transform:translateY(0)` : '')">
            <!-- Logo -->
            <div class="absolute h-1/2 top-0 left-0 -translate-x-full border-b pointer-events-none text-xl flex flex-col justify-end items-center text-white"
                :style="{ width: customize.layout.asideWidth }">
                Logo
            </div>
            <!-- 工具 -->
            <div class="h-1/2 overflow-hidden border-b" :style="`padding-top: ${customize.layout.toolBarHeight};`">
                <div class="h-full flex flex-col justify-between">
                    <!-- 工具详情 -->
                    <div class="flex-grow h-0">
                        <slot :name="Panel.HEADPANEL" :="{ panelState, switchPanel }"></slot>
                    </div>
                    <!-- 工具条 -->
                    <div class="flex flex-shrink-0" :style="`height: ${customize.layout.toolBarHeight}`">
                        <button class="aspect-square px-3 md:hidden" @click="showBodyPanelNav = !showBodyPanelNav">
                            <font-awesome-icon icon="fa-solid fa-bars" />
                        </button>
                        <button class="aspect-square px-3 md:hidden" @click="switchPanelByBtn()">
                            <font-awesome-icon class="animate-bounce" :icon="`fa-solid ${ (panelState[Panel.BODYPANEL].maximized && 'fa-arrow-down') || (panelState[Panel.HEADPANEL].maximized && 'fa-arrow-up') }`" />
                        </button>
                        <div class="flex-grow w-0">
                            <slot :name="Panel.HEADPANEL_NAV" :="{ panelState, switchPanel }"></slot>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 主体 -->
            <div class="h-1/2 overflow-hidden" :style="`padding-bottom: ${customize.layout.toolBarHeight};`">
                <!-- 内容 -->
                <slot :name="Panel.BODYPANEL" :="{ panelState, switchPanel }"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Panel } from "../../model/panel";
import { ref, reactive } from 'vue';
import { RouteLocationNormalized, useRouter } from 'vue-router';
/**
 * 布局配置
 */
const customize = reactive<{
    layout: {
        toolBarHeight: string | number,
        asideWidth: string | number
    },
}>({
    layout: {
        toolBarHeight: '3rem',
        asideWidth: '12rem'
    },
});

/**
 * 
 */
const showBodyPanelNav = ref<boolean>(false);

/**
 * 面板控制
 */
interface PanelState {
    maximized: boolean,
    curRoute: RouteLocationNormalized | null
}
// 面板状态
const panelState = reactive<{
    [Panel.HEADPANEL]: PanelState;
    [Panel.BODYPANEL]: PanelState;
}>({
    [Panel.HEADPANEL]: {
        maximized: false,
        curRoute: null
    },
    [Panel.BODYPANEL]: {
        maximized: true,
        curRoute: null
    },
});
// 面板最大化
const maximizePanel = (panelName: Panel.HEADPANEL | Panel.BODYPANEL) => {
    Object.keys(panelState).forEach((key: string) => {
        (panelState as any)[key].maximized = false;
    });
    panelState[panelName].maximized = true;
}
// 切换面板
const switchPanel = {
    maximizeHeadPanel: () => {
        maximizePanel(Panel.HEADPANEL);
    },
    maximizeBodyPanel: () => {
        maximizePanel(Panel.BODYPANEL);
    }
}
// 记录route
const router = useRouter();
router.beforeEach((to, from) => {
    // 同一面板中切换路由
    if (to.meta.panel == from.meta.panel) {
        // 更新路由记录
        panelState[from.meta.panel as Panel.HEADPANEL | Panel.BODYPANEL].curRoute = to;
    }
    // 切换面板且切换路由
    else if (from.meta.panel) {
        // 记录上一面板的路由
        panelState[from.meta.panel as Panel.HEADPANEL | Panel.BODYPANEL].curRoute = from;
    }
    return true;
});


/**
 * 通过按钮切换面板
 */
function switchPanelByBtn() {
    if (!panelState[Panel.BODYPANEL].maximized) {
        switchPanel.maximizeBodyPanel();
        if (panelState[Panel.BODYPANEL].curRoute) {
            router.replace(panelState[Panel.BODYPANEL].curRoute);
        } else {

        }
    } else if (!panelState[Panel.HEADPANEL].maximized) {
        switchPanel.maximizeHeadPanel();
        if (panelState[Panel.HEADPANEL].curRoute) {
            router.replace(panelState[Panel.HEADPANEL].curRoute);
        } else {

        }
    }
}
/**
 * 通过手势切换面板
 */
let mousedownY = 0
function swipHandler(e: MouseEvent) {
    if (e.pageY - mousedownY > 60 && !panelState[Panel.HEADPANEL].maximized) {
        switchPanel.maximizeHeadPanel();
        if (panelState[Panel.HEADPANEL].curRoute) {
            router.replace(panelState[Panel.HEADPANEL].curRoute);
        }
    }
    if (e.pageY - mousedownY < -60 && !panelState[Panel.BODYPANEL].maximized) {
        switchPanel.maximizeBodyPanel();
        if (panelState[Panel.BODYPANEL].curRoute) {
            router.replace(panelState[Panel.BODYPANEL].curRoute);
        }
    }
}
const vSwip = {
    mounted: (el: HTMLElement) => {
        el.addEventListener('mousedown', (e: MouseEvent) => {
            mousedownY = e.clientY;
            el.addEventListener('mousemove', swipHandler);
        });
        el.addEventListener('mouseup', () => {
            el.removeEventListener('mousemove', swipHandler);
        });
    }
}

</script>