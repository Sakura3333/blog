<template>

    <div class="absolute w-full h-full py-7">
        <div class="w-full h-full max-w-xl mx-auto border p-2 space-y-2 flex flex-col">
            <div class="w-full">
                <label>文章<input type="radio" v-model="isArticle" :value="true"></label>
                <span class="mx-2">/</span>
                <label>动态<input type="radio" v-model="isArticle" :value="false"></label>
            </div>
            <div class="flex justify-around flex-wrap" v-show="isArticle">
                <div class="border flex-grow m-1"><span class="bg-gray-200 px-2">文件名</span><input type="text"
                    class="outline-none px-2" v-model="article.articleFileId"></div>
                <div class="border flex-grow m-1"><span class="bg-gray-200 px-2">封面</span><input type="text"
                        class="outline-none px-2" v-model="article.articleCover"></div>
                <div class="border flex-grow m-1"><span class="bg-gray-200 px-2">标题</span><input type="text"
                        class="outline-none px-2" v-model="article.articleTitle"></div>
                <div class="border flex-grow m-1"><span class="bg-gray-200 px-2">描述</span><input type="text"
                        class="outline-none px-2" v-model="article.articleBrief"></div>
                <div class="border flex-grow m-1"><span class="bg-gray-200 px-2">作者</span><input type="text"
                        class="outline-none px-2" v-model="article.articleAuthor"></div>
                <div class="border flex-grow m-1"><span class="bg-gray-200 px-2">标签</span><input class="outline-none px-2"
                        type="text" v-model="article.articleTag"></div>
            </div>
            <div class="flex justify-around flex-wrap" v-show="!isArticle">
                <div class="border flex-grow m-1"><span class="bg-gray-200 px-2">文件名</span><input type="text"
                    class="outline-none px-2" v-model="mood.moodFileId"></div>
                <div class="border flex-grow m-1"><span class="bg-gray-200 px-2">图集</span><input type="text"
                        class="outline-none px-2" v-model="mood.moodImages"></div>
            </div>
            <textarea class="outline-none border w-full flex-grow p-2" name="" id="" cols="30" rows="10" v-model="content"></textarea>
            <button
                class="self-end px-2 py-1 border bg-gray-800 opacity-50 hover:opacity-100 focus:opacity-100 text-white focus:ring-1" @click="createFile">生成文件</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const mood = reactive({
    "moodFileId": "",
    "moodImages": "",
    "moodCreateTime": ""
});
const article = reactive({
    "articleFileId": "",
    "articleCover": "",
    "articleTitle": "",
    "articleBrief": "",
    "articleAuthor": "",
    "articleCreateTime": "",
    "articleTag": ""
});
const isArticle = ref(true);
const content = ref('');

const createFile = () => {
    
}
</script>

<style scoped>

</style>