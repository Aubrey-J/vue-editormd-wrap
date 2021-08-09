<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- 使用编辑器 -->
    <editorMdWrap></editorMdWrap>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your MD Editor'
    }
  }
}
</script>

<style scoped>
</style>
