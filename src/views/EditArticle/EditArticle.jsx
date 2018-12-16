import React, { Component } from 'react'
// import marked from 'marked'
import { Input, Button, Checkbox } from 'antd';

const prism = require('prismjs')

function wrap(code, lang) {
  return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`
}

const highlightjs = (str, lang) => {
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

const CheckboxGroup = Checkbox.Group;

const markdown = require('markdown-it')({
  html: true,
  typographer: true,
  highlight: highlightjs
})

// import debounce from 'lodash/debounce'
// import _ from 'lodash'
let editer = null

export default class extends Component {
  state = {
    input: '# hello',
    compiledMarkdown: '',
    type: '',
    tagList: [],
    textareaHeight: 500,
    isShowLeft: true,
    isShowRight: true
  }

  componentDidMount () {
    const arr = this.props.location.search.split('=')
    this.setState({
      type: arr.length > 1 ? arr[1] : 'add'
    })
    if (this.props.location.search === '?type=edit') {
      let content = ''
      const _c = window.sessionStorage.getItem('ADMIN_ARTICLE')
      if (_c) {
        content = JSON.parse(_c).content
      }
      this.setState({
        input: content
      })
    }
    this.md2code()
    this.getTagList()
    editer = document.getElementById('editer')
    this.setState({
      textareaHeight: editer.scrollTop + editer.scrollHeight + 20
    })
  }

  changeText = (event) => {
    this.setState({
      input: event.target.value,
      textareaHeight: editer.scrollTop + editer.scrollHeight
    })
    this.md2code()
  }

  md2code () {
    this.setState(prevState => ({
      compiledMarkdown: markdown.render(prevState.input)
      // marked(prevState.input, { sanitize: true })
    }))
  }

  onTagChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  getTagList = () => {
    window.$http.get('/api/tags')
      .then(res => {
        console.log(res);
        res.forEach(element => {
          element.label = element.value = element.name
        });
        this.setState({
          tagList: res
        })
      })
      .catch((e) => {
        console.log(e);
      })
  }

  render () {
    function code2html (content) {
      return { __html: content }
    }
    return (
      <div id="editor">
        <div className="mgb20">
          <div className="mgb20 sbtn">
            <label>标题：<Input placeholder="请输入标题" /></label>
            <div style={{display: 'inline-block', textAlign: 'right'}}>
              <Button style={{marginRight: '6px'}} size={'small'} onClick={() => this.setState({ isShowRight: false })}>只显示markdown</Button>
              <Button style={{ marginRight: '6px' }} size={'small'} onClick={() => this.setState({ isShowLeft: false })}>只显示文章最终内容</Button>
              <Button style={{ marginRight: '6px' }} size={'small'} type="dashed" onClick={() => this.setState({ isShowLeft: true, isShowRight: true })}>显示全部</Button>
              <Button type="primary" icon="plus">发布</Button>
            </div>
          </div>
          <div>
            标签：<CheckboxGroup options={this.state.tagList} defaultValue={[]} onChange={this.onTagChange} />
          </div>
        </div>
        {
          this.state.isShowLeft
            ? <textarea id="editer" style={{ height: this.state.textareaHeight + 'px', width: !this.state.isShowRight ? '100%' : ''}} value={this.state.input} onChange={this.changeText}></textarea>
            : null
        }
        {
          this.state.isShowRight
            ? <div style={{ width: !this.state.isShowLeft ? '100%' : ''}} className="code content" dangerouslySetInnerHTML={code2html(this.state.compiledMarkdown)}></div>
            : null
        }
      </div>
    )
  }
}
