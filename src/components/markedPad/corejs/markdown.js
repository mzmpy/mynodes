import marked from 'marked'
import hljs from 'highlight.js'
import katex from 'katex'
import { escape } from 'marked/src/helpers'

export default function markIt(val) {

  const asyncMarker = new Promise((resolve) => {
    marked.setOptions({
      renderer: katexRenderer(),
      highlight: function(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'python'
        return hljs.highlight(code, { language }).value
      },
      langPrefix: 'hljs language-',
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
    resolve(val)
  })

  return asyncMarker.then(val => marked(val))
}

// 重写 renderer.codespan 函数，使其支持 Latex 语法
// 重写 renderer.code 函数，使其 Latex 语法
// 除了处理 Latex 部分的代码，其他情况和 marked 原代码一样
function katexRenderer() {
  const renderer = new marked.Renderer()

  renderer.codespan = function(text) {
    const match = text.match(/^\$(.+)\$$/)
    return match 
      ? '<code>' + katex.renderToString(match[1], {
        throwOnError: false
      }) + '</code>'
      : '<code>' + text + '</code>'
  }

  renderer.code = function(code, infostring, escaped) {
    const lang = (infostring || '').match(/\S*/)[0];

    if(lang === 'latex') {
      // <pre> 元素相对定位：因为 katex 渲染的 html 中有绝对定位的元素，这样子做避
      // 免 markdown 文本较长时绝对定位的元素相对 <body> 元素或者其他定位的布局
      // 元素定位而导致它们的高度超出窗口/父元素的高度而出现多余的滚动条
      return "<pre style=\"position: relative;\">" + katex.renderToString(code.trim(), {
        throwOnError: false
      }) + "</pre>\n"
    }

    if (renderer.options.highlight) {
      const out = renderer.options.highlight(code, lang)
      if (out != null && out !== code) {
        escaped = true
        code = out
      }
    }

    code = code.replace(/\n$/, '') + '\n'

    if (!lang) {
      return '<pre><code>'
        + (escaped ? code : escape(code, true))
        + '</code></pre>\n'
    }

    return '<pre><code class="'
      + renderer.options.langPrefix
      + escape(lang, true)
      + '">'
      + (escaped ? code : escape(code, true))
      + '</code></pre>\n'
  }

  return renderer
}
