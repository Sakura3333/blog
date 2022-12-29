<template>
    <div id="website-container">
        <div class="container h-100 py-1 px-0">
            <div class="row m-0 align-items-start h-100 w-100">
                <header style="z-index: 10000;" class="px-0 col-lg-2 col-md-2 col-sm-2 col-2">
                    <slot name="header"></slot>
                </header>
                <main class="px-1 col-lg-7 col-md-10 col-sm-10 col-12 h-100">
                    <div class="h-100">
                        <slot name="main"></slot>
                    </div>
                </main>
                <aside class="px-0 col-lg-3 d-none d-lg-block">
                    <div class="h-100">
                        <slot name="aside"></slot>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    
</script>
<style scoped>
#website-container {
    height: 100vh;
}
</style>