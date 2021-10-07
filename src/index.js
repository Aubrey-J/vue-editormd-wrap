import vueEditorMdWrap from './views/vueEditorMdWrap.vue' // 导入组件
import _Vue from 'vue'

const editorMdWrap = {
  // 提供install方法给vue
  install (Vue, options) {
    if (!Vue) {
      window.Vue = Vue = _Vue
    }
    // 注册组件
    Vue.component('editorMdWrap', vueEditorMdWrap)
  }
}

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(editorMdWrap)
}

export default editorMdWrap
