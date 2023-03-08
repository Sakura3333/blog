# 每日一点 <i class="text-gray-500 text-sm hover:text-red-500">2023.03.06 ~ 2023.04.06</i>
>1天学1点，10天学10点

## 目录
* WebAPI
    + [Background Tasks](#background-tasks)
    + Battery API
    + Beacon
    + Broadcast Channel API
    + CSS Counter Styles
    + CSS Font Loading API
    + CSS Painting API
    + CSSOM
    + Canvas API
    + Channel Messaging API
* PS技巧
* Spine

## WebAPI <i class="text-red-400 text-sm">10个</i>
### [Background Tasks](#background-tasks)
>[**来自MDN的介绍**](https://developer.mozilla.org/zh-CN/docs/Web/API/Background_Tasks_API)：幕后任务协作调度 API (也叫幕后任务 API 或者简单称为 requestIdleCallback() API) 提供了由用户代理决定，在空闲时间自动执行队列任务的能力。

**在看这个api前，先来看下什么是宏任务（macro task/task）和微任务（microtask/jobs）**

js是单线程的，一次只能完成一件任务，如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务如果一个任务耗时过长，那么后面的任务就必须一直等待下去。为解决这个问题，js的任务执行模式分为两种`同步`和`异步`，`异步任务`又分为`宏任务`和`微任务`。

`同步任务`就是指在js引擎主线程上排队执行的任务，只有前一个任务执行完毕，才能继续执行下一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的，若在执行同步任务期间遇到`异步任务`，则会把异步任务放入`任务队列`，等到合适的时机进行执行。js引擎在执行完`同步任务`后才会执行`异步任务`。

任务队列分为`宏任务队列`和`微任务队列`，当同步任务执行完毕后，若存在微任务，则优先执行所有微任务。

微任务是由宏任务产生的，每执行完一个宏任务后，都会执行微任务，只有微任务队列清空后才会再次执行宏任务，从一个宏任务的开始到最后一个微任务执行完毕，称为一次`事件循环`，事件循环总是从宏任务开始。

<p class="bg-blue-50 p-3 rounded">
<strong>为什么同步代码执行完毕后会先执行微任务？</strong><br>
script本身就是一个宏任务，所以执行异步队列的时候，会优先执行它的所有微任务，然后执行宏任务
</p>

**对任务有了基本的了解后，再回头来看下`Background Tasks`**