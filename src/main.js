import Vue from 'vue'
import App from './App.vue'
import vueEditorMd from '../index.js'

Vue.use(vueEditorMd)

new Vue({
  el: '#app',
  render: h => h(App)
})
