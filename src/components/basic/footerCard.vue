<template>
    <div class="bg-dark bg-gradient rounded px-2 py-3 text-light">
        <small class="d-block fw-bold">
            {{ commend }}
        </small>
        <hr>
        <div class="position-relative overflow-hidden">
            <img :src="background" class="footer-card-img rounded img-fluid" style="object-fit: contain; z-index: 0; filter: blur(4px); pointer-events: none;" alt="">
            <figure class="position-absolute top-50 start-50 translate-middle w-75"
            >
                <blockquote class="blockquote">
                    <p>
                        {{ content }}
                    </p>
                </blockquote>
                <figcaption class="blockquote-footer text-end">
                    {{ caption }}
                </figcaption>
            </figure>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    commend: string,
    content: string,
    caption: string,
    background: string
}>();
</script>
<style scoped>

</style>