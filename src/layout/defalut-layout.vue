<template>
    <div id="website-container">
        <div class="container h-100 p-0">
            <div class="d-flex flex-row h-100">
                <header id="header" class="mx-1 my-2">
                    <div class="header position-fixed">
                        <slot name="header"></slot>
                    </div>
                </header>
                <main id="main" class="flex-fill position-relative mx-1 my-2 h-auto">
                    <slot name="main"></slot>
                </main>
                <aside id="aside" class="mx-1">
                    <div class="aside position-fixed h-100 py-2">
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
#main {
    max-width: calc(100% - 26rem);
}
#header, .header {
    min-width: 10rem;
    max-width: 10rem;
}
#aside, .aside {
    min-width: 16rem;
    max-width: 16rem;
    z-index: 1;
}
</style>