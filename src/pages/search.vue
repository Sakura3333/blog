<template>
    <div class="absolute w-full h-full p-2 pb-7 flex flex-col justify-center">
        <div class="w-full max-h-full max-w-xl mx-auto flex flex-col">
            <div class="flex">
                <input type="text" class="w-full border px-2 py-1 outline-none focus:border-black border-r-0"
                    placeholder="输入关键字..." v-model="keywords" @keydown.enter="$router.replace('/search'),search(keywords)">
                <button class="flex-shrink-0 border px-2 hover:bg-gray-200 border-l-0 focus:border-black"
                    @click="$router.replace('/search'),search(keywords)">搜索</button>
            </div>
            <div class="py-2">
                <template v-for="tag in globalData.tagList">
                    <button class="m-1" @click="$router.replace('/search'),search(tag.name, ['tags'])">{{ tag.name }}</button>
                </template>
                <button class="px-2 hover:text-red-500 float-right" @click="searchResult = [], $router.replace('/search')" v-show="searchResult.length > 0">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </button>
            </div>
            <div class=" flex-grow overflow-auto">
                <div class="space-y-1">
                    <template v-for="article in searchResult">
                        <router-link class=" p-2 block overflow-hidden
                            hover:bg-gray-100 " :to="`/article/${article.fid}`"
                            @click="switchPanel.maximizeBottomRight()">
                            <div class="flex flex-nowrap justify-between items-end">
                                <span class="whitespace-nowrap text-ellipsis overflow-hidden">
                                    {{ article.title }}
                                </span>
                                <span class="flex-shrink-0 text-xs">
                                    {{ article.time }}
                                </span>
                            </div>
                            <div class="text-xs mt-1 flex">
                                <div class="flex-grow whitespace-nowrap overflow-hidden text-ellipsis space-x-2">
                                    <template v-for="tag in article.tags">
                                        <span>{{ tag }}</span>
                                    </template>
                                </div>
                            </div>
                        </router-link>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'Search'
}
</script>
<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ContentMapperRecord, DataSet } from '../model/conf';

defineProps<{
    switchPanel: any
}>();

const route = useRoute();

const globalData: DataSet = inject("globalData") as DataSet;

const keywords = ref<string>('');
const searchResult = ref<ContentMapperRecord[]>([])
const search = (keywords: string, fields: string[] = ['title', 'brief', 'tags']) => {
    searchResult.value = [];
    !keywords || globalData.articles.forEach((article) => {
        fields.forEach(field => {
            if ((article as any)[field].includes(keywords) && !searchResult.value.includes(article)) {
                searchResult.value.push(article);
            }
        });
    });
}

watch(() => route.params, (val) => {
    val.keywords && search(val.keywords as string, ['tags']);
});

</script>