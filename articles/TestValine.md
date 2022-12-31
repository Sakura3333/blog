> 今天接入了valine评论系统，有点没玩明白。
> 猜想：valine通过window.location.pathname来展示对应的评论，一个页面只能有一个valine评论组件，而vue是单页面的，也就是说整个网站只能存在一个，可以将valine组件挂载在根节点，需要展示的路由让它显示即可。
> 这篇文章是用来验证猜想的
valine有个坑：
众所周知，vue是mvvm框架，写的时候习惯性将数据写成响应式的，惯性思维，见到对象就是响应式的，于是就有了下面一段代码
```typescript
import Valine from 'valine';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const valine = ref<Valine>();
onMounted(() => {
    valine.value = new Valine({
        // 挂载的元素，使用css选择器
        el: '#vcomments',
        // 将路由的地址与valine绑定
        path: route.path,
        appId: 'Your appId',
        appKey: 'Your appKey'
    });
});
```
乍一看，逻辑好像没什么问题，路由改变的时候，valine对象也跟着变。
但是valine并不是响应式的，修改属性无法做到更新评论的效果，需要重新创建对象才会生效。

正确写法
```typescript
import Valine from 'valine';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const valine = ref<Valine>();
const initValine = () => {
    valine.value = new Valine({
        // 挂载的元素，使用css选择器
        el: '#vcomments',
        // 将路由的地址与valine绑定
        path: route.path,
        appId: 'Your appId',
        appKey: 'Your appKey'
    });
}
watch(() => route.path, initValine);
onMounted(initValine);
```

只是简单的记录一下接入时遇到的问题😀