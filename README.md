# vue-editormd-wrap

- `A Vue EditorMd Wrap project Power By editor.md`
# `VUE + editor.MD` v-model数据双向绑定，多编辑器共存

- 因为editor.md没有支持Vue，所以封装了此工具上传到npm使用，便于使用
- 项目处于初期阶段，会有很多问题，深感抱歉，有问题GitHub留言即可

-  editor.md官网：http://editor.md.ipandao.com/
## 安装
````shell
npm i vue-editormd-wrap
````

## 导入静态资源
https://github.com/Aubrey-J/vue-editormd-wrap
中static下的editor-md文件夹放到项目中的static下，如静态资源路径不同，请参考下面配置的修改，以保证使用正常，一定要是用该项目的static，因为katex.min的引入改为了本地静态资源，editor.md官网的static资源和该项目的不一样
## 使用
### 全局组件注册
```javascript
import vueEditorMdWrap from 'vue-editormd-wrap'

// 注册时可以声明全局配置，如图片上传路径，免得后续使用时每个页面引用都需要设置
// VueEditorMdWrap.props.syncRoll.default = false // 非对象类型直接赋值，不用函数
VueEditorMdWrap.props.config.default = () => {
  return {
    // 生产环境有子路径访问不到，需要使用.开头增加项目路径从项目当前路径访问
    path: './static/editor-md/lib/', // Dependents module file directory
    imageUpload: true,
    imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
    imageUploadURL: './upload',
    crossDomainUpload: false
    // uploadCallbackURL: ''
  }
}

Vue.component('editorMdWrap', VueEditorMdWrap)
```
### vue page使用组件
```javascript
<editorMdWrap></editorMdWrap>
```

## 配置说明
|  属性 | 说明  | 默认  |
| ------------ | ------------ | ------------ |
| editorId  | 编辑器标签ID  |  'mdEditor_' + 8位随机字符 |
| v-model  |  编辑器内容（Markdown格式）双向绑定 |   |
|  config | 编辑器配置 |  见下文 |
|  syncRoll | 是否同步滚动 <br>可选：true、false、"single" => editor area sync  | true |
|  watch | 是否实时预览  | true  |
| onlyRead  | 编辑窗口是否只读  | false  |
|  themeConfig |  主题<br>格式：{ theme: "default", editorTheme: 'night', previewTheme: "default" }<br>theme、previewTheme可选：default、dark <br> editorTheme可选：default\ambiance\ambiance-mobile\eclipse\elegant\erlang-dark……更多请参考 http://editor.md.ipandao.com/examples/themes.html | default |
|  previewForHtml | 非编辑状态 HTML格式预览 <br> 格式：{ showContext: true, showToc: true, showExtendToc: true } <br> 使用时会覆盖其他配置，仅为浏览状态 |   |

|  事件 | 说明  | 参数  |
| ------- | ------------ | ------------ |
| ready  |  编辑器实例完成后回调，绑定一个方法，回调参数为编辑器实例 | editor  |

### 常用方法
更多方法及说明，请参考官网 http://editor.md.ipandao.com/examples/index.html
```javascript
// 更新配置的值
editor.config("syncScrolling", true);
// 通过实例获取当前编辑器的值
editor.getMarkdown();       // 获取 Markdown 源码
editor.getHTML();           // 获取 Textarea 保存的 HTML 源码
editor.getPreviewedHTML();  // 获取预览窗口里的 HTML，在开启 watch 且没有开启 saveHTMLToTextarea 时使用
```

### 特殊说明
> 1、如果静态资源不在/static/editor-md下，必须使用path配置覆盖默认配置，配置为：静态资源路径/lib/，如：/static/editor-md/lib/

> 2、图片上传配置，使用的话需要覆盖配置
```javascript
// 可以再注册全局组件时，声明全局配置，见上面使用说明
{
  imageUpload: true, // 是否支持上传图片
  imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'], // 支持类型
  imageUploadURL: './upload', // 上传接口地址
  crossDomainUpload: true, // 是否跨域
  uploadCallbackURL: '' // 跨域的回调地址
}

// 上传接口响应的消息结构要求如下，编辑器会自动接收响应的消息
{
    success : 0 | 1,           // 0 表示上传失败，1 表示上传成功
    message : "提示的信息，上传成功或上传失败及错误信息等。",
    url     : "图片地址"        // 上传成功时才返回
}
```
## Config 参考
```javascript
{
  mode: 'markdown', // gfm or markdown
  name: '', // Form element name
  value: '', // value for CodeMirror, if mode not gfm/markdown
  theme: '', // Editor.md self themes, before v1.5.0 is CodeMirror theme, default empty
  editorTheme: 'default', // Editor area, this is CodeMirror theme at v1.5.0
  previewTheme: '', // Preview area theme, default empty
  markdown: '', // Markdown source code
  appendMarkdown: '', // if in init textarea value not empty, append markdown to textarea
  width: '100%',
  height: '640px',
  path: '/static/editor-md/lib/', // Dependents module file directory
  pluginPath: '', // If this empty, default use settings.path + "../plugins/"
  delay: 300, // Delay parse markdown to html, Uint : ms
  autoLoadModules: true, // Automatic load dependent module files
  watch: true,
  placeholder: 'Enjoy Markdown! coding now...',
  gotoLine: true,
  codeFold: false,
  autoHeight: false,
  autoFocus: true,
  autoCloseTags: true,
  searchReplace: true,
  syncScrolling: true, // true | false | "single", default true
  readOnly: false,
  tabSize: 4,
  indentUnit: 4,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseBrackets: true,
  showTrailingSpace: true,
  matchBrackets: true,
  indentWithTabs: true,
  styleSelectedText: true,
  matchWordHighlight: true, // options: true, false, "onselected"
  styleActiveLine: true, // Highlight the current line
  dialogLockScreen: true,
  dialogShowMask: true,
  dialogDraggable: true,
  dialogMaskBgColor: '#fff',
  dialogMaskOpacity: 0.1,
  fontSize: '13px',
  saveHTMLToTextarea: false,
  disabledKeyMaps: [],

  imageUpload: true,
  imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
  imageUploadURL: '',
  crossDomainUpload: true,
  uploadCallbackURL: '',

  toc: true, // Table of contents
  tocm: true, // Using [TOCM], auto create ToC dropdown menu
  tocTitle: '', // for ToC dropdown menu btn
  tocDropdown: false,
  tocContainer: '',
  tocStartLevel: 1, // Said from H1 to create ToC
  htmlDecode: true, // Open the HTML tag identification
  pageBreak: true, // Enable parse page break [========]
  atLink: true, // for @link
  emailLink: true, // for email address auto link
  taskList: true, // Enable Github Flavored Markdown task lists
  emoji: true, // :emoji: , Support Github emoji, Twitter Emoji (Twemoji);
  // Support FontAwesome icon emoji :fa-xxx: > Using fontAwesome icon web fonts;
  // Support Editor.md logo icon emoji :editormd-logo: :editormd-logo-1x: > 1~8x;
  tex: true, // TeX(LaTeX), based on KaTeX
  flowChart: true, // flowChart.js only support IE9+
  sequenceDiagram: true, // sequenceDiagram.js only support IE9+
  previewCodeHighlight: true,

  toolbar: true, // show/hide toolbar
  toolbarAutoFixed: true, // on window scroll auto fixed position
  toolbarIcons: 'full'
}
```