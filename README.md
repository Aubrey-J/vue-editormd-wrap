# vue-editormd-wrap

- A Vue EditorMd Wrap project Power By editor.md
- 项目正在build阶段，会有很多问题，深感抱歉，有问题GitHub留言即可
# 安装
npm i vue-editormd-wrap

# 导入静态资源
https://github.com/Aubrey-J/vue-editormd-wrap中static下的editor-md放到项目中的static下
# 使用
main.js
```JavaScript
import vueEditorMdWrap from 'vue-editormd-wrap'

Vue.component('editorMdWrap', VueEditorMdWrap)
```
vue page
```javascript
<editorMdWrap></editorMdWrap>
```