<template>
    <div class="absolute w-full h-full py-7">
        <div class="w-full h-full max-w-xl mx-auto flex flex-col border">
            <div class="flex-grow overflow-hidden relative">
                <div class="h-full overflow-hidden flex flex-col">
                    <ul class="flex-grow overflow-auto space-y-1 p-2">
                        <template v-for="line, i in playState.music?.lrcLines">
                            <li class="text-transparent text-left hover:text-black space-x-3 py-1">
                                <span class="text-black">{{ line }}</span>
                                <button class="text-xs">
                                    {{ playState.music?.lrcTimes[i] }}
                                </button>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="absolute w-full h-full overflow-hidden flex flex-col duration-200 bg-white"
                    :class="showPlayList ? 'top-0' : 'top-full'">
                    <div class="bg-gray-100 px-1">
                        <button class="block w-full text-center">播放列表</button>
                    </div>
                    <ul class="flex-grow overflow-auto space-y-1">
                        <template v-for="music in musicList">
                            <li class="p-1">
                                <button class="p-1 w-full flex items-end text-left hover:bg-gray-100"
                                    @click="playback(music)" :class="{ 'bg-gray-100': music === playState.music }">
                                    <span class="flex-grow whitespace-nowrap overflow-hidden text-ellipsis">{{
                                        music.name
                                    }}</span>
                                    <span
                                        class="text-gray-500 text-xs whitespace-nowrap overflow-hidden text-ellipsis">{{
                                            music.artist
                                        }}</span>
                                </button>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
            <div class="h-16 flex-shrink-0 flex bg-gray-100 p-1">
                <div class="h-full aspect-square flex-shrink-0 relative">
                    <div class="absolute h-full w-full rounded-full overflow-hidden border flex justify-center items-center animate-spin"
                        style="animation-duration: 2.6s;">
                        <img :src="playState.music?.cover">
                        <font-awesome-icon icon="fa-solid fa-music" v-show="!playState.music" />
                    </div>
                </div>
                <div class="flex-grow">
                    <div class="h-2/3 flex justify-between px-1">
                        <div class="flex items-stretch">
                            <button class="px-1" @click="playState.random = !playState.random">
                                <font-awesome-icon
                                    :icon="'fa-solid ' + (playState.random ? 'fa-shuffle' : 'fa-repeat')" />
                            </button>
                            <button class="px-2" @click="switchMusic(-1)">
                                <font-awesome-icon icon="fa-solid fa-backward" />
                            </button>
                            <button class="px-2"
                                @click="playState.music ? playState.playing = !playState.playing : switchMusic(-1)">
                                <font-awesome-icon :icon="'fa-solid ' + (playState.playing ? 'fa-pause' : 'fa-play')" />
                            </button>
                            <button class="px-2" @click="switchMusic(1)">
                                <font-awesome-icon icon="fa-solid fa-forward" />
                            </button>
                            <button class="px-1 relative overflow-hidden hover:overflow-visible w-6">
                                <font-awesome-icon :icon="'fa-solid ' + (playState.volume == 0 ? 'fa-volume-xmark' : (playState.volume <= 0.5 ? 'fa-volume-low':'fa-volume-high'))" />
                                <input class="w-12 h-0.5 absolute top-0 left-1/2 -translate-y-full -rotate-90 origin-left" type="range" max="1" min="0" step="0.05" v-model="playState.volume">
                            </button>
                        </div>
                        <button class="px-1" @click="showPlayList = !showPlayList">
                            <font-awesome-icon icon="fa-solid fa-record-vinyl" />
                        </button>
                    </div>
                    <div class="h-1/3 flex flex-col justify-center p-1">
                        <div ref="progressbar" class="relative">
                            <div class="rounded-full bg-white overflow-hidden">
                                <div class="h-1 bg-black cursor-pointer"
                                    :style="{ width: playState.progress * (progressbar?.offsetWidth || 0) + 'px' }"></div>
                            </div>
                            <button
                                class="h-2 w-2 bg-black rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                                :style="{ 'left': playState.progress * (progressbar?.offsetWidth || 0) + 'px' }">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <teleport to="#app">
                <audio ref="audio" class="hidden" @canplay="onCanplay()" @ended="switchMusic(1)"></audio>
            </teleport>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';

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

const musicList = ref<Music[]>([]);
const showPlayList = ref<boolean>(false);
const audio = ref<HTMLAudioElement>();
const playState = reactive<{
    progress: number,
    volume: number,
    music: Music | null,
    playing: boolean,
    random: boolean
}>({
    progress: 0,
    volume: 0.5,
    music: null,
    playing: false,
    random: false
});

const playListUrl = 'https://y.qq.com/n/ryqq/playlist/8787914590';

const getMusicList = () => {
    fetch(`https://api.gmit.vip/Api/MusicList?format=json&url=${playListUrl}`, {
        method: "GET"
    }).then(res => {
        res.json().then(jres => {
            musicList.value = (jres.data as Music[]);
        });
    });
}

const playback = (music: Music) => {
    if (!music.lrcTimes) {
        fetch(music.lrc, {
            method: "GET"
        }).then(res => {
            console.log(res);
            res.text().then(data => {
                playState.music!.lrcTimes = data.match(/(?<=\[)\d{2}:\d{2}[.]\d{2}(?=])/g) || [];
                playState.music!.lrcLines = data.match(/(?<=\[\d{2}:\d{2}[.]\d{2}]).*/g) || [];
            });
        });
    }
    playState.music = music;
    playState.music.currentTime = 0;
    audio.value!.src = music.url;
    audio.value!.volume = playState.volume;
    audio.value?.play();
    playState.playing = true;
}

const randomInt = (s: number, e: number) => {
    return Math.floor(Math.random() * (e - s) + s);
}

const switchMusic = (i: number) => {
    if (musicList.value.length == 0) return;
    if (!playState.music) {
        playback(musicList.value[0]);
        return;
    }

    let index: number = musicList.value.findIndex(music => music === playState.music);

    if (!playState.random) {
        if (index + i >= musicList.value.length) index = 0;
        else if (index + i <= 0) index = musicList.value.length - 1;
        else index += i;
    } else {
        if (index == 0) index = randomInt(1, musicList.value.length);
        else if (index == musicList.value.length) index = randomInt(0, musicList.value.length - 1);
        else index = randomInt(0, 2) === 0 ? randomInt(0, index) : randomInt(index + 1, musicList.value.length);
    }

    playback(musicList.value[index]);
}

let timer: any = null;
let progressbar = ref<HTMLElement>();
const onCanplay = () => {
    playState.music!.duration = audio.value?.duration || 0.1;
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    timer = setInterval(() => {
        playState.music!.currentTime = audio.value?.currentTime || 0;
        playState.progress = playState.music!.currentTime / playState.music!.duration;
    }, 500);
}

watch(() => playState.playing, val => {
    if (val && audio.value) audio.value.play();
    else if (audio.value) audio.value.pause();
});

watch(() => playState.volume, val => {
    audio.value!.volume = val;
});

getMusicList();

</script>

<style scoped>

</style>