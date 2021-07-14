import Vue from 'vue'
import App from './App.vue'
import vueEditorMdWrap from '../index.js'

Vue.use(vueEditorMdWrap)

new Vue({
  el: '#app',
  render: h => h(App)
})
