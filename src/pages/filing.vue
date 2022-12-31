<template>
    <div class="overflow-x-hidden position-relative mt-1 shadow-sm" style="min-height: calc(100% - 4.25rem); height: auto;">
        <glass-vue></glass-vue>
        <div class="container px-2">
            <div class="row">
                <jumbotron-vue class="mb-3" title="归档" content="失败才是我们活着的证明。" quote="《我的青春恋爱物语果然有问题》" background="https://s1.ax1x.com/2022/12/30/pS9FLi4.jpg"></jumbotron-vue>
                <template v-for="filing, i in state.filings">
                    <div class="col-12 px-4 d-flex align-items-start">
                        <div class="pe-2 h-100 position-relative d-flex flex-column">
                            <span class="badge fw-bold text-dark">
                                {{ filing.time }}
                            </span>
                            <span class="badge fw-bold text-secondary position-absolute top-50 ms-3 translate-middle-x">
                                {{ filing.data.length }}
                            </span>
                            <div class="flex-fill d-flex justify-content-center">
                                <div class="h-100 bg-dark border-start border-secondary"></div>
                            </div>
                            <div class="text-center fs-4" v-if="i === state.filings.length - 1">
                                <i class="bi bi-clock-history"></i>
                            </div>
                        </div>
                        <div class="flex-fill mt-4 mb-5 position-relative">
                            <template v-for="articleInfo in filing.data">
                                <article-link-vue :="{articleTitle: articleInfo.articleTitle, articleFileId: articleInfo.articleFileId}" class="mt-3 btn btn-outline-light border-0" custom-class="text-start">
                                    <template #prepend>
                                        <span class="float-end">{{ articleInfo.articleCreateTime.split(" ")[1] }}</span>
                                    </template>
                                    <template #append>
                                        <div class="d-flex w-100 justify-content-between align-items-center">
                                            <div class="rounded-pill">
                                                <small class="text-dark">
                                                    <i class="bi bi-tag-fill me-1"></i>
                                                    <span class="mx-1" v-for="tag in articleInfo.articleTag">{{ tag }}</span>
                                                </small>
                                            </div>
                                        </div>
                                    </template>
                                </article-link-vue>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import glassVue from '../components/basic/glass.vue';
import jumbotronVue from '../components/basic/jumbotron.vue';
import articleLinkVue from '../components/basic/articleLink.vue';
import { inject, reactive, watch } from 'vue';
import { GlobalState, ArticleInfo } from '../model/model';

const globalState: GlobalState = (inject("globalState") as GlobalState);
const state = reactive<{
    filings: {
        time: string,
        data: ArticleInfo[]
    }[]
}>({
    filings: []
})

const init = () => {
    globalState.articleInfoList.forEach((articleInfo: ArticleInfo) => {
        let filingList = state.filings.filter(filing => filing.time === articleInfo.articleCreateTime.split(" ")[0]);
        if (filingList.length > 0) {
            filingList[0].data.push(articleInfo);
        } else {
            state.filings.push({
                time: articleInfo.articleCreateTime.split(" ")[0],
                data: [articleInfo]
            });
        }
    })
}

watch(() => globalState.articleInfoList, init);

init();

</script>
<style scoped>
    
</style>