const prism = require('prismjs')

function wrap(code, lang) {
  return `<pre class="language-${lang}"><code>${code}</code></pre>`
}

function highlight (str, lang) {
  if (!lang) {
    return wrap(str, 'text')
  }
  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}

export default require('markdown-it')({
  html: true,
  typographer: true,
  highlight
})