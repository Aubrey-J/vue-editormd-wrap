import vueEditorMdWrap from './src/views/vueEditorMdWrap.vue' // 导入组件
const editorMdWrap = {
    // 提供install方法给vue 
    install (Vue, options) {
        // 注册组件
        Vue.component('editorMdWrap', vueEditorMdWrap)
    }
}

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(editorMdWrap)
}

export default editorMdWrap