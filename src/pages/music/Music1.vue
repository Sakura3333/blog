<template>
    <div class="h-full flex flex-col ">
        <div class="flex-grow h-0 bg-black text-white">
            {{ musicInPlaying?.lrc }}
        </div>
        <div class="w-full h-0 bg-black relative after:absolute after:border-8 after:border-t-transparent after:border-l-transparent after:mix-blend-difference after:z-10 after:rotate-45 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"></div>
        <div ref="accordionRef"
            class="flex-grow h-0 max-h-72 flex flex-row flex-nowrap overflow-auto relative hide-scrollbar bg-black"
            @wheel="wheelHandle($event)">
            <template v-for="chord, i in accordionChords">
                <a href=""
                    class="h-full max-w-full duration-200 relative text-transparent font-bold text-xl hover:text-shadow hover:text-white"
                    :class="[!chord.collapsed ? 'aspect-square' : 'aspect-3x7', i == 0 ? 'ml-1/2' : (i == accordionChords.length - 1 ? 'mr-1/2' : ''), { 'text-white text-shadow': !chord.collapsed }]"
                    @click.prevent="change(i, $event.target as HTMLElement)">
                    <img :src="chord.music.cover" class="h-full object-cover object-center bg-white" alt="">
                    <div
                        class="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div class="w-full self-end text-center items-end">{{ chord.music.name }}</div>
                        <div class="w-full self-start text-center text-xs ">{{ chord.music.artist }}</div>
                    </div>
                </a>
            </template>
        </div>
    </div>
    <teleport :to="'body'"><audio ref="audio" :src="musicInPlaying?.url" @canplay="audio?.play()"></audio></teleport>
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
const audio = ref<HTMLMediaElement>();
const musicInPlaying = ref<Music>();
const accordionRef = ref<HTMLElement>();
const accordionChords = ref<AccordionChord[]>([]);
const change = (index: number, target: HTMLElement) => {
    if (accordionChords.value[index].collapsed) {
        accordionChords.value.forEach(item => {
            item.collapsed = true;
        });
        accordionChords.value[index].collapsed = false;
        musicInPlaying.value = accordionChords.value[index].music;
        let targetWidth = Number.parseFloat(document.defaultView?.getComputedStyle(target).width as string);
        let targetHeight = Number.parseFloat(document.defaultView?.getComputedStyle(target).height as string);
        let accordionWidth = Number.parseFloat(document.defaultView?.getComputedStyle(accordionRef.value as HTMLElement).width as string);
        accordionRef.value?.scrollTo({
            left: targetWidth * index - (accordionWidth - Math.min(targetHeight, accordionWidth)) / 2 + accordionWidth / 2,
            behavior: 'smooth'
        });
    }
}
const wheelHandle = (e: WheelEvent) => {
    console.log(e)
    e.preventDefault();
    accordionRef.value!.scrollLeft += e.deltaY / 2;
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