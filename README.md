# mynodes

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## 项目简介

我们希望写一个即时渲染的 `markdown(katex)` 写作板，能够完成渲染通用的 `markdown` 语法并且可导出 `pdf` 格式的文件（现在只初步实现了渲染的功能），同时它应该具有本地后台服务的功能，可以在界面左侧打开文件夹（通过文件树的形式实现），点击其中的文件可以在编辑器中打开该文件。这是目前 `TO DO` 的内容，未来还有更多的功能加入。

![avatar](devResource\pictures\Snipaste_2022-03-19_10-55-01.png)

## 技术栈
* [vue](https://v3.cn.vuejs.org/): 版本3.0.0
* [ant-design-vue](https://2x.antdv.com/docs/vue/introduce-cn): 版本2.2.8 link
* [monaco-editor](https://microsoft.github.io/monaco-editor/): 版本0.29.1
* [marked](https://marked.js.org/): 版本3.0.8
* [katex](https://katex.org/docs/options.html): 版本0.15.1
* [highlight.js](https://highlightjs.readthedocs.io/en/latest/index.html): 版本11.3.1
