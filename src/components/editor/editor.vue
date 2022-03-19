<template>
  <div>
    <div ref="monacoEditor" :style="[innerStyle, { textAlign: 'left', overflow: 'hidden' }]"></div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import * as monaco from 'monaco-editor'

  export default defineComponent({
    name: 'MonacoEditor',

    emits: ['codeChanged'],

    data() {
      return {
        changed: false,
        innerStyle: {
          width: '100%',
          height: '100%'
        },
        code: ''
      }
    },

    methods: {
      getCode() {
        return this.editor.getValue()
      }
    },

    // 监听编辑器code的内容并抛出事件
    watch: {
      code(val, oldVal) {
        if(val !== oldVal) {
          this.$emit('codeChanged', val)
        }
      }
    },

    mounted() {
      // 创建一个monaco editor并将它挂载到this.$refs.monacoEditor上
      this.editor = monaco.editor.create(this.$refs.monacoEditor, {
        value: '# There are some demos.\n\nThis is a paragraph.\n\nThere are some Greek letter `$\\alpha$`, `$\\beta$` and `$\\lambda$`.\n\n```latex\nE = mc^2\n```\n\nHere defines a Python function `add(x, y)`:\n```python\ndef add(x, y):\n\treturn x + y\n```\n这是一行中文。',
        theme: 'vs-dark',
        automaticLayout: true,
        language: 'markdown'
      })

      // 监听编辑器的内容并将code赋给this.code
      this.editor.onDidChangeModelContent(() => {
        this.code = this.getCode()
      })
    }
  })
</script>

<style>

</style>