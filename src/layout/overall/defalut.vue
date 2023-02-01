<template>
    <div class="fixed w-full h-full overflow-hidden text-sm font-extralight" style="background: url(https://s1.ax1x.com/2022/12/30/pS9FLi4.jpg) center no-repeat; background-size: cover;">
        <div class="absolute flex flex-wrap justify-center items-center w-2rate h-2rate duration-300 backdrop-blur-xs"
            :style="panelState.bottomRight.maximized ? `left: ${customize.minVisiableSize.width};top:${customize.minVisiableSize.height};transform:translate(-50%,-50%);`:
            (panelState.bottomLeft.maximized ? `left:-${customize.minVisiableSize.width}; top:${customize.minVisiableSize.height};transform:translateY(-50%);` :
            (panelState.topRight.maximized ? `left:${customize.minVisiableSize.width};top:-${customize.minVisiableSize.height};transform:translateX(-50%);` :
            (panelState.topLeft.maximized ? `left:-${customize.minVisiableSize.width};top:-${customize.minVisiableSize.height}` : '')))">

            <div class="slide-subpanel border-r border-b"
                :style="`padding:${customize.minVisiableSize.height} 0 0 ${customize.minVisiableSize.width};}`">
                <slot name="topLeft" :="{ panelState, switchPanel }"></slot>

                <button class="maximize-btn bottom-0 right-0 z-50 font-modul" :disabled="panelState.topLeft.maximized"
                    :class="{ 'opacity-30': panelState.topLeft.maximized }"
                    @click="maximizePanel('topLeft')">INKY</button>
            </div>

            <div class="slide-subpanel border-b"
                :style="`padding:${customize.minVisiableSize.height} ${customize.minVisiableSize.width} 0 0;}`">
                <slot name="topRight" :="{ panelState, switchPanel }"></slot>

                <button class="maximize-btn bottom-0 left-0 z-50 font-modul" :disabled="panelState.topRight.maximized"
                    :class="{ 'opacity-30': panelState.topRight.maximized }"
                    @click="maximizePanel('topRight')">FLAME</button>
            </div>

            <div class="slide-subpanel border-r"
                :style="`padding:0 0 ${customize.minVisiableSize.height} ${customize.minVisiableSize.width};}`">
                <slot name="bottomLeft" :="{ panelState, switchPanel }"></slot>

                <button class="maximize-btn top-0 right-0 z-50 font-modul" :disabled="panelState.bottomLeft.maximized"
                    :class="{ 'opacity-30': panelState.bottomLeft.maximized }"
                    @click="maximizePanel('bottomLeft')"><font-awesome-icon
                        icon="fa-solid text-sm fa-fire-flame-simple" /></button>
            </div>

            <div class="slide-subpanel"
                :style="`padding:0 ${customize.minVisiableSize.width} ${customize.minVisiableSize.height} 0;}`">
                <slot name="bottomRight" :="{ panelState, switchPanel }"></slot>

                <button class="maximize-btn top-0 left-0 z-50 font-modul" :disabled="panelState.bottomRight.maximized"
                    :class="{ 'opacity-30': panelState.bottomRight.maximized }"
                    @click="maximizePanel('bottomRight')">EMISSARY</button>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { RouteLocationNormalized, useRouter } from 'vue-router';

interface Panel {
    topLeft: {
        maximized: boolean,
        curRoute: RouteLocationNormalized | null
    };
    topRight: {
        maximized: boolean,
        curRoute: RouteLocationNormalized | null
    };
    bottomLeft: {
        maximized: boolean,
        curRoute: RouteLocationNormalized | null
    };
    bottomRight: {
        maximized: boolean,
        curRoute: RouteLocationNormalized | null
    };
}

const router = useRouter();
const routeState = reactive<{
    to: RouteLocationNormalized | null,
    from: RouteLocationNormalized | null,
}>({
    to: null,
    from: null,
});

/**
 * 自定义配置
 */
const customize = reactive<{
    minVisiableSize: {
        height: string | number,
        width: string | number
    },
}>({
    minVisiableSize: {
        height: '2rem',
        width: '4rem'
    },
});

/**
 * 面板状态
 */
const panelState = reactive<Panel>({
    topLeft: {
        maximized: false,
        curRoute: null
    },
    topRight: {
        maximized: false,
        curRoute: null
    },
    bottomLeft: {
        maximized: false,
        curRoute: null
    },
    bottomRight: {
        maximized: true,
        curRoute: null
    },
});
// 初始化状态
const initPanelState = () => {
    Object.keys(panelState).forEach((key: string) => {
        (panelState as any)[key].maximized = false;
    });
}
// 记录面板的视图
const recordPanelView = () => {
    let keys = Object.keys(panelState);
    for (let i = 0; i < keys.length; i++) {
        let panel = (panelState as any)[keys[i]];
        if (panel.maximized) {
            panel.curRoute = routeState.to;
            break;
        }
    }
}
// 切换状态
const switchPanel = reactive({
    maximizeTopLeft: () => {
        recordPanelView();
        if (!panelState.topLeft.maximized) {
            initPanelState();
            panelState.topLeft.maximized = true;
        }
    },
    maximizeTopRight: () => {
        recordPanelView();
        if (!panelState.topRight.maximized) {
            initPanelState();
            panelState.topRight.maximized = true;
        }
    },
    maximizeBottomLeft: () => {
        recordPanelView();
        if (!panelState.bottomLeft.maximized) {
            initPanelState();
            panelState.bottomLeft.maximized = true;
        }
    },
    maximizeBottomRight: () => {
        recordPanelView();
        if (!panelState.bottomRight.maximized) {
            initPanelState();
            panelState.bottomRight.maximized = true;
        }
    },
});
// 最大化面板
const maximizePanel = (panelName: string) => {
    recordPanelView();
    initPanelState();
    let panel = (panelState as any)[panelName];
    panel.maximized = true;
    if (panel.curRoute) router.replace(panel.curRoute.path);
}

router.beforeEach((to, from, next) => {
    routeState.to = to;
    routeState.from = from;
    next();
});

</script>