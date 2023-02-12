<template>
    <!-- style="background: url(https://s1.ax1x.com/2022/12/30/pS9FLi4.jpg) center no-repeat; background-size: cover;" -->
    <div class="fixed w-full h-full overflow-hidden text-sm flex flex-row select-none" v-swip>
        <div class="h-full flex-shrink-0 border-r duration-300 bg-h-2rate -translate-x-full absolute md:static md:translate-x-0"
            style="background-image: linear-gradient(black 50%, white 50%);" :style="{
                'width': customize.layout.asideWidth,
                'padding-top': customize.layout.toolBarHeight,
                'background-position-y': panelState[Panel.HEADPANEL].maximized ? '-' + customize.layout.toolBarHeight : `calc(${customize.layout.toolBarHeight} + 100%)`
            }">
            <div class="mix-blend-difference text-white h-full w-full md:w-auto">
                <slot name="asidePanel" :="{ panelState, switchPanel }"></slot>
            </div>
        </div>
        <div class="relative flex-grow w-0 h-2rate duration-300" :style="panelState[Panel.BODYPANEL].maximized ? `top:${customize.layout.toolBarHeight};transform:translateY(-50%)` :
        (panelState[Panel.HEADPANEL].maximized ? `top:-${customize.layout.toolBarHeight};transform:translateY(0)` : '')">
            <div class="absolute h-1/2 top-0 left-0 -translate-x-full border-b pointer-events-none text-xl flex flex-col justify-end items-center text-white"
                :style="{ width: customize.layout.asideWidth }">
                Logo
            </div>
            <div class="h-1/2 overflow-hidden border-b" :style="`padding-top: ${customize.layout.toolBarHeight};`">
                <slot :name="Panel.HEADPANEL" :="{ panelState, switchPanel }"></slot>
            </div>
            <div class="h-1/2 overflow-hidden" :style="`padding-bottom: ${customize.layout.toolBarHeight};`">
                <slot :name="Panel.BODYPANEL" :="{ panelState, switchPanel }"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Panel } from "../../model/panel";
import { reactive } from 'vue';
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
const maximizePanel = (panelName: Panel) => {
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
        panelState[from.meta.panel as Panel].curRoute = to;
    }
    // 切换面板且切换路由
    else if (from.meta.panel) {
        // 记录上一面板的路由
        panelState[from.meta.panel as Panel].curRoute = from;
    }
    return true;
});

/**
 * 手势
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