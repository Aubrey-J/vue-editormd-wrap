import vueEditorMd from './src/views/vueEditorMd.vue' // 导入组件
const editorMd = {
    // 提供install方法给vue 
    install (Vue, options) {
        // 注册组件
        Vue.component('editorMd', vueEditorMd)
    }
}
export default editorMd