<template>
  <div class="editor-container" ref="editor"></div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
export default {
  props: {
    language: {
      type: String,
      default: 'html'
    },
    codes: {
      type: String,
      default: ''
    },
    editorOptions: {
      type: Object,
      default: () => ({
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false, // 只读
        cursorStyle: 'line', // 光标样式
        automaticLayout: false, // 自动布局
        glyphMargin: true, // 字形边缘
        useTabStops: false,
        fontSize: 28, // 字体大小
        autoIndent: true, // 自动布局
        quickSuggestionsDelay: 500 // 代码提示延时
      })
    }
  },
  data () {
    return {
      monacoEditor: null
    }
  },
  methods: {
    initEditor () {
      this.monacoEditor = monaco.editor.create(this.$refs.editor, {
        language: this.language,
        theme: 'vs',
        value: this.codes,
        editorOptions: this.editorOptions
      })
      this.$emit('onMounted', this.monacoEditor)
      this.monacoEditor.onDidChangeModelContent(evt => {
        this.$emit('onCodeChange', this.monacoEditor.getValue())
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initEditor()
    })
  },
  beforeDestroy () {
    this.monacoEditor = null
  }
}
</script>

<style lang="scss" scoped>
.editor-container {
  height: 100%;
}
</style>
