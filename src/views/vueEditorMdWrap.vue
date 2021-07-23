<template>
  <div>
    <link rel="stylesheet" href="/static/editor-md/css/editormd.min.css"/>
    <div :id="editorId"></div>
  </div>
</template>

<script>
import scriptjs from 'scriptjs';
import editorMdConfig from '../config/editor-md-config.js';
export default {
  name: 'vueEditorMdWrap',
  props: {
      editorId: {
          'type': String,
          'default': 'markdown-editor',
      },
      onchange: { // 内容改变时回调，返回（html, markdown, text）
          type: Function
      },
      config: { // 编辑器配置
          type: Object
      },
      initData: {
          'type': String
      },
      initDataDelay: {
          'type': Number, // 延迟初始化数据时间，单位毫秒
          'default': 0
      }
  },
  data () {
      return {
          editor: null,
          editorLoaded: false,
      };
  },
  methods: {
      fetchScript: function(url) {
          return new Promise((resolve) => {
              scriptjs(url, () => {
                  resolve();
              });
          });
      },
      getConfig: function () {
          return {...editorMdConfig, ...this.config };
      },
      initEditor: function () {
          (async () => {
              await this.fetchScript('/static/editor-md/jquery-3.6.0.min.js');
              await this.fetchScript('/static/editor-md/editormd.min.js');
              // await this.fetchScript('/static/editor-md/editormd.js');
              this.$nextTick(() => {
                  let editor = window.editormd(this.editorId, this.getConfig());
                  editor.on('load', () => {
                      setTimeout(() => { // hack bug: 一个页面多个编辑器只能初始化其中一个数据问题
                          this.editorLoaded = true;
                          this.initData && editor.setMarkdown(this.initData);
                      }, this.initDataDelay);
                  });
                  this.onchange && editor.on('change', () => {
                      let html = editor.getPreviewedHTML();
                      this.onchange({
                          markdown: editor.getMarkdown(),
                          html: html,
                          text: window.$(html).text()
                      });
                  });
                  this.editor = editor;
              });
          })();
      }
  },
  mounted: function() {
      this.initEditor();
  },
  watch: {
      'initData': function (newVal) {
          if(newVal) {
              this.editorLoaded && this.editor.setMarkdown(newVal);
          }
      }
  }
}
</script>

<style lang="scss">
</style>
