import vueEditorMdWrap from './vueEditorMdWrap.vue' // 导入组件
import _Vue from 'vue'

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueEditorMdWrap)
}

const editorMdWrap = {
  // 提供install方法给vue.use 不使用use方法就可以直接返回组件页面vueEditorMdWrap
  install (Vue, options) {
    if (!Vue) {
      window.Vue = Vue = _Vue
    }
    // 注册组件
    Vue.component('editorMdWrap', vueEditorMdWrap)
  }
}

export default editorMdWrap
