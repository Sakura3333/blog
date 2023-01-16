<template>
    <div>
        <span class="badge rounded-0 me-1 text-dark">
            <i class="bi bi-person-fill"></i>
            {{ articleAuthor }}
        </span>
        <span class="me-1">
            <span class="badge rounded-0 position-relative text-dark">
                <i class="bi bi-tag-fill"></i>
                <template v-if="(articleTag instanceof Array)">
                    <span class="me-1" v-for="tag in articleTag">
                        {{ tag }}
                    </span>
                </template>
                <template v-else>
                    <span class="me-1">
                        {{ articleTag }}
                    </span>
                </template>
            </span>
        </span>
        <span class="badge text-muted">
            {{ articleCreateTime }}
        </span>
    </div>
</template>
<script setup lang="ts">

defineProps<{
    articleTitle?: string | null;
    articleAuthor?: string | null;
    articleCreateTime?: string | null;
    articleTag?: string | string[] | null;
}>();

</script>
<style scoped>
</style>