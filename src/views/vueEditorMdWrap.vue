<template>
  <div>
    <!-- 编辑器 样式 -->
    <link rel="stylesheet" :href="editorRootDir + 'css/editormd.min.css'"/>
    <!-- 编辑器 -->
    <div ref="container" :id="editorId" :class="editorContainerClass">
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
    themeConfig: {
      type: Object // { theme: "default\dark", editorTheme: 'night', previewTheme: "default\dark" }
    },
    previewForHtml: {
      type: Object // { showContext: true, showToc: true, showExtendToc: true }
    }
  },
  data () {
    return {
      editor: null,
      editorLoaded: false,
      editorRootDir: '/editor-md/'
    }
  },
  computed: {
    editorContainerClass () {
      if (this.previewForHtml && this.previewForHtml.showContext && this.previewForHtml.showExtendToc) {
        return 'editor-container'
      } else {
        return ''
      }
    }
  },
  watch: {
    // v-model回调子组件赋值，相同值不赋值防止输入抖动
    value: {
      handler: function (newVal) {
        if (this.editorLoaded && newVal) {
          newVal === this.editor.getMarkdown() || this.editor.setMarkdown(newVal || '')
        }
      },
      immediate: true
    },
    syncRoll: {
      handler: function (newVal) {
        if (this.editorLoaded) {
          this.editor.config('syncScrolling', newVal)
        }
      },
      immediate: true
    },
    watch: {
      handler: function (newVal) {
        if (this.editorLoaded) {
          this.editor.config('watch', newVal)
        }
      },
      immediate: true
    },
    onlyRead: {
      handler: function (newVal) {
        if (this.editorLoaded) {
          this.editor.config('readOnly', newVal)
        }
      },
      immediate: true
    },
    themeConfig: {
      handler: function (newVal) {
        if (this.editorLoaded && newVal) {
          this.editor.setTheme(newVal.theme)
          this.editor.setEditorTheme(newVal.editorTheme)
          this.editor.setPreviewTheme(newVal.previewTheme)
        }
      },
      immediate: true
    }
  },
  methods: {
    // 加载相关js
    fetchScript: async function () {
      this.editorRootDir = this.config
        ? this.config.path.substring(0, this.config.path.indexOf('lib/'))
        : this.editorRootDir
      window.EDITORMD_ROOT_CONFIG = this.editorRootDir
      return new Promise((resolve) => {
        // 按序加载js
        $scriptjs.path(this.editorRootDir)
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
      // 合并传入配置
      let allConfig = {
        ...editorMdConfig,
        ...this.config
      }
      // 首次初始化加载传入属性的配置
      if (this.syncRoll) {
        allConfig.syncScrolling = this.syncRoll
      }
      if (this.watch) {
        allConfig.watch = this.watch
      }
      if (this.onlyRead) {
        allConfig.readOnly = this.onlyRead
      }
      if (this.themeConfig && this.themeConfig.theme) {
        allConfig.theme = this.themeConfig.theme
      }
      if (this.themeConfig && this.themeConfig.editorTheme) {
        allConfig.editorTheme = this.themeConfig.editorTheme
      }
      if (this.themeConfig && this.themeConfig.previewTheme) {
        allConfig.previewTheme = this.themeConfig.previewTheme
      }
      return allConfig
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
            this.editorLoaded = true
            // 初始赋值
            if (!this.previewForHtml || !this.previewForHtml.showContext) {
              setTimeout(() => {
                this.editor.setMarkdown(this.value || '')
              }, 1000)
            }
            // 监听input时间 绑定model
            this.$refs.container.addEventListener('input', (a) => {
              this.$emit('input', this.editor.getMarkdown())
            })
            // 实例化完成事件
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
