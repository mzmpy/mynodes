<template>
  <div
   class="markdown-body"
   v-html="markedContent"
  />
</template>

<script>
  import { defineComponent } from 'vue'
  import 'highlight.js/styles/github-dark.css'
  import 'github-markdown-css/mynotes-markdown-dark.css'
  import markIt from './corejs/markdown'
  import 'katex/dist/katex.css'
  
  export default defineComponent({
    name: 'markedPad',
    props: {
      content: {
        type: String,
      }
    },

    data() {
      return {
        markedContent: ''
      }
    },

    mounted() {
      this.marking(this.content)
    },

    watch: {
      content(val, oldValue) {
        val === oldValue ? null : this.marking(val)
      }
    },

    methods: {
      async marking(val) {
        this.markedContent = await markIt(val)
      }
    }
  })
</script>

<style>

</style>