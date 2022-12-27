<template>
    <div class="w-0 h-0">
        <div class="glass position-absolute w-100 h-100 top-0 start-0 overflow-hidden"></div>
    </div>
</template>

<style scoped>
.glass {
    z-index: -2;
}
.glass::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
    filter: blur(5px);
}
</style>