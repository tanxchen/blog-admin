import prism from 'prismjs'
import markdownIt from 'markdown-it'

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

export default markdownIt({
  html: true,
  typographer: true,
  highlight
})