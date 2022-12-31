<template>
    <div class="overflow-x-hidden position-relative mt-1 shadow-sm" style="min-height: calc(100% - 4.25rem); height: auto;">
        <glass-vue></glass-vue>
        <div class="container p-0">
            <div class="row m-0">
                <jumbotron-vue title="简历" content="失败才是我们活着的证明。" quote="《我的青春恋爱物语果然有问题》" background="https://s1.ax1x.com/2022/12/31/pS9jUMD.jpg"></jumbotron-vue>
                <div class="col-12 d-flex" style="height: 3rem;">
                    <div class="head-portrait bg-dark translate-middle-y"><img class="img" src="" alt=""></div>
                    <div class="ms-2 translate-middle-y d-flex flex-column justify-content-center">
                        <h5 class="base-info">LifeSeagull <span class="fs-7">男 | 2001/08/06</span></h5>
                        <div class="fs-7 text-muted">
                            <i class="bi bi-geo-alt-fill"></i>
                            浙江杭州
                        </div>
                    </div>
                </div>
                <div class="col-12 fs-7 position-relative">
                    <span class="position-absolute bottom-100" style="left: 2rem; width: 1rem; height: 1rem; border: .5rem solid transparent; border-bottom: .5rem solid #fff;"></span>
                    <p class="bg-light p-2 rounded border">
                        地球OL的底层打工人，曾经是一名测试工程师、前端开发工程师，现在是一位抖店客服。
                        虽然人生一直在走下坡路，但是坚信着努力终会带来改变，会永远以梦想为动力闯下去。
                    </p>
                </div>
                <div class="col-12 fs-7">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import glassVue from '../components/basic/glass.vue';
import jumbotronVue from '../components/basic/jumbotron.vue';
    
</script>
<style scoped>
.head-portrait {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
}
.base-info {    
    color: white;
    text-shadow: 0 0 0 blue, 0 0 1rem blue;
}
</style>