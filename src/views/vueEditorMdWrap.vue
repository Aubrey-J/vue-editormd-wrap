<template>
  <div>
    <!-- 编辑器 样式 -->
    <link rel="stylesheet" href="../../static/editor-md/css/editormd.min.css"/>
    <!-- 编辑器 -->
    <div ref="container" :id="editorId" class="editor-container">
      <textarea style="display:none;" v-model="value"></textarea>
    </div>
    <div id="sidebar" v-if="this.previewForHtml && this.previewForHtml.showContext && this.previewForHtml.showExtendToc">
      <h1>Contents</h1>
      <div class="markdown-body editormd-preview-container" id="custom-toc-container"></div>
    </div>
  </div>
</template>

<script>
import $scriptjs from 'scriptjs'
import editorMdConfig from '../config/editor-md-config.js'

export default {
  name: 'vueEditorMdWrap',
  props: {
    editorId: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    config: { // 编辑器配置
      type: Object
    },
    syncRoll: {
      type: Boolean,
      default: true
    },
    watch: {
      type: Boolean,
      default: true
    },
    onlyRead: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'default' // "default | dark"
    },
    previewForHtml: {
      type: Object // { showContext: true, showToc: true, showExtendToc: true }
    }
  },
  data () {
    return {
      editor: null,
      editorLoaded: false
    }
  },
  computed: {
  },
  watch: {
    value: {
      handler: function (newVal) {
        if (this.editorLoaded && newVal) {
          this.editor.setMarkdown(newVal)
        }
      },
      immediate: true
    },
    syncRoll: {
      handler: function (newVal) {
        if (this.editorLoaded && newVal) {
          this.editor.config('syncScrolling', newVal)
        }
      },
      immediate: true
    },
    watch: {
      handler: function (newVal) {
        if (this.editorLoaded && newVal) {
          this.editor.config('watch', newVal)
        }
      },
      immediate: true
    },
    onlyRead: {
      handler: function (newVal) {
        if (this.editorLoaded && newVal) {
          this.editor.config('readOnly', newVal)
        }
      },
      immediate: true
    },
    theme: {
      handler: function (newVal) {
        if (this.editorLoaded && newVal) {
          this.editor.setTheme(newVal)
          // this.editor.setEditorTheme(newVal)
          // this.editor.setPreviewTheme(newVal)
        }
      },
      immediate: true
    }
  },
  methods: {
    // 加载相关js
    fetchScript: async function () {
      return new Promise((resolve) => {
        // 按序加载js
        $scriptjs.path('../../static/editor-md/')
        $scriptjs('jquery-3.6.0.min.js', function () {
          $scriptjs('lib/marked.min.js', function () {
            $scriptjs('lib/prettify.min.js', function () {
              $scriptjs('lib/raphael.min.js', function () {
                $scriptjs('lib/underscore.min.js', function () {
                  $scriptjs('lib/sequence-diagram.min.js', function () {
                    $scriptjs('lib/flowchart.min.js', function () {
                      $scriptjs('lib/jquery.flowchart.min.js', function () {
                        $scriptjs('zepto.min.js', function () {
                          $scriptjs('editormd.min.js', function () {
                            resolve()
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    },
    getConfig: function () {
      return {
        ...editorMdConfig,
        ...this.config
      }
    },
    initEditor: function () {
      this.fetchScript().then((res) => {
        this.$nextTick(() => {
          // 初始默认editorId
          let eId = this.$refs.container.id = this.editorId || 'mdEditor_' + this.randomNum(8)
          let eConfig = this.getConfig()

          // 判断是否为预览
          if (this.previewForHtml && this.previewForHtml.showContext) {
            eConfig = {
              markdown: this.value, // + "\r\n" + $("#append-test").text(),
              // htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
              htmlDecode: 'style,script,iframe', // you can filter tags decode
              // toc             : false,
              tocm: this.previewForHtml.showToc, // Using [TOCM]
              tocContainer: this.previewForHtml.showExtendToc ? '#custom-toc-container' : '', // 自定义 ToC 容器层
              // gfm             : false,
              // tocDropdown     : true,
              // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
              emoji: true,
              taskList: true,
              tex: true, // 默认不解析
              flowChart: true, // 默认不解析
              sequenceDiagram: true // 默认不解析
            }
            // 实例化
            this.editor = window.editormd.markdownToHTML(eId, eConfig)
          } else {
            // 实例化
            this.editor = window.editormd(eId, eConfig)
          }

          if (this.editor) {
            this.$emit('ready', this.editor)
          }
        })
      })
    },
    randomNum (length) {
      let res = ''
      for (var i = 0; i < length; i++) {
        // 生成一个0到25的数字
        var rNum = Math.ceil(Math.random() * 25)
        // 小写a = 97
        res += String.fromCharCode(97 + rNum)
      }
      return res
    }
  },
  mounted: function () {
    this.initEditor()
  },
  created () {
  }
}
</script>

<style scoped>
.editor-container {
  padding-left: 0;
  padding-right: 430px;
  margin: 0;
}
#sidebar {
  width: 400px;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  overflow: hidden;
  background: #fff;
  z-index: 100;
  padding: 18px;
  border: 1px solid #ddd;
  border-top: none;
  border-bottom: none;
}

#sidebar:hover {
  overflow: auto;
}

#sidebar h1 {
  font-size: 16px;
}
#custom-toc-container {
  padding-left: 0;
}
</style>
