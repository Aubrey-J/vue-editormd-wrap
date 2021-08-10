<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- 使用编辑器 -->
    <button @click="getContext">Get Markdown</button>
    <editorMdWrap v-model="context" :onlyRead="onlyRead" :syncRoll="syncRoll" :themeConfig="themeConfig" :watch="watch" @ready="ready1"></editorMdWrap>
    <editorMdWrap editorId="two" v-model="context2" @ready="ready2" :previewForHtml="previewForHtml"></editorMdWrap>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      editorOne: null,
      editorTwo: null,
      syncRoll: false,
      watch: false,
      onlyRead: false,
      themeConfig: { theme: 'dark', editorTheme: 'night', previewTheme: 'dark' },
      msg: 'Welcome to Your MD Editor',
      context: 'Welcome to Your MD Editor111111111111111111111111111111',
      context2: '###科学公式 TeX(KaTeX) Welcome to Your MD Editor2222222222222222222222222222222222222222',
      previewForHtml: { showContext: true, showToc: true, showExtendToc: true }
    }
  },
  methods: {
    getContext () {
      console.log('getContext', this.editorOne.getMarkdown(), this.editorTwo.getMarkdown())
      this.syncRoll = !this.syncRoll
      this.watch = !this.watch
      this.onlyRead = !this.onlyRead
    },
    ready1 (instance) {
      console.log('ready1', instance)
      this.editorOne = instance
    },
    ready2 (instance) {
      console.log('ready2', instance)
      this.editorTwo = instance
    },
    onchange ({html, markdown, text}) {
      console.log('1111111111111111', html, markdown, text)
    },
    onchange2 ({html, markdown, text}) {
      console.log('22222222222222222', html, markdown, text)
    }
  }
}
</script>

<style scoped>
</style>
