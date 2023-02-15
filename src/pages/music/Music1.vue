<template>
    <div class="h-full p-3 flex flex-col">
        <div class="flex-grow h-0 bg-black">

        </div>
        <div class="w-full h-0 bg-black relative after:absolute after:border-8 after:border-t-transparent after:border-l-transparent after:mix-blend-difference after:z-10 after:rotate-45 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"></div>
        <div ref="accordionRef"
            class="h-full max-h-72 flex flex-row flex-nowrap overflow-auto relative hide-scrollbar bg-black">
            <template v-for="chord, i in accordionChords">
                <a href=""
                    class="block h-full max-w-full duration-200 relative text-transparent font-bold text-xl hover:text-shadow hover:text-white"
                    :class="[!chord.collapsed ? 'aspect-square' : 'aspect-3x7', i == 0 ? 'ml-1/2' : (i == accordionChords.length - 1 ? 'mr-1/2' : ''), { 'text-white text-shadow': !chord.collapsed }]"
                    @click.prevent="change(i, $event.target as HTMLElement)">
                    <img :src="chord.music.cover" class="h-full object-cover object-center bg-white" alt="">
                    <div
                        class="absolute h-full w-full top-0 left-0 flex flex-row flex-wrap justify-center items-center p-4">
                        {{ chord.music.name }} <span class="w-full text-center text-sm">{{ chord.music.artist }}</span>
                    </div>
                </a>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';

interface Music {
    lrcLines: string[];
    lrcTimes: string[];
    name: string;
    artist: string;
    cover: string;
    song_id: string;
    url: string;
    lrc: string;
    currentTime: number;
    duration: number;
}

interface AccordionChord {
    collapsed: boolean;
    music: Music;
}

const accordionRef = ref<HTMLElement>();
const accordionChords = ref<AccordionChord[]>([]);

const change = (index: number, target: HTMLElement) => {
    if (accordionChords.value[index].collapsed) {
        accordionChords.value.forEach(item => {
            item.collapsed = true;
        });
        accordionChords.value[index].collapsed = false;
        let targetWidth = Number.parseFloat(document.defaultView?.getComputedStyle(target).width as string);
        let targetHeight = Number.parseFloat(document.defaultView?.getComputedStyle(target).height as string);
        let accordionWidth = Number.parseFloat(document.defaultView?.getComputedStyle(accordionRef.value as HTMLElement).width as string);
        accordionRef.value?.scrollTo({
            left: targetWidth * index - (accordionWidth - Math.min(targetHeight, accordionWidth)) / 2 + accordionWidth / 2,
            behavior: 'smooth'
        });
    }
}

const playListUrl = 'https://y.qq.com/n/ryqq/playlist/8787914590';

const getMusicList = () => {
    fetch(`https://api.gmit.vip/Api/MusicList?format=json&url=${playListUrl}`, {
        method: "GET"
    }).then(res => {
        res.json().then(jres => {
            (jres.data as Music[]).forEach(music => {
                accordionChords.value.push({
                    collapsed: true,
                    music
                });
            })
        });
    });
}

getMusicList();

</script>
<style scoped>

</style>