import Vue from 'vue';
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        marked: any
    }
}