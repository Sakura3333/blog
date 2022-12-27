<template>
    <div v-if="weather" class="fw-bold">
        <span class="mx-1">
            <i class="bi bi-cursor"></i>
            <span>
                {{weather.lives[0].province}}
                {{weather.lives[0].city}}
            </span>
        </span>
        <span class="mx-1">
            <i class="bi bi-clouds"></i>
            <span>{{weather.lives[0].weather}}</span>
        </span>
        <span class="mx-1">
            <i class="bi bi-thermometer-half"></i>
            <span>{{weather.lives[0].temperature}}℃</span>
        </span>
        <span class="mx-1">
            <i class="bi bi-wind"></i>
            <span>
                {{weather.lives[0].winddirection}}
                {{weather.lives[0].windpower}}级
            </span>
        </span>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { getWeather } from '../../api/api';

navigator.geolocation.getCurrentPosition(d => {
    console.log(d);
})

interface Weather {
    lives: any[];
}

const weather = ref<Weather>();

getWeather('', (data: Weather) => {
    weather.value = data;
});
</script>
<style scoped>
    
</style>