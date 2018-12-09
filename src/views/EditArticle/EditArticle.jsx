import React, { Component } from 'react'
import marked from 'marked'
import { Input, Button, Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

// import debounce from 'lodash/debounce'
// import _ from 'lodash'

export default class extends Component {
  state = {
    input: '# hello',
    compiledMarkdown: '',
    type: '',
    tagList: []
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
  }

  changeText = (event) => {
    this.setState({
      input: event.target.value
    })
    this.md2code()
  }

  md2code () {
    this.setState(prevState => ({
      compiledMarkdown: marked(prevState.input, { sanitize: true })
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
            <Button type="primary" icon="plus">发布</Button>
          </div>
          <div>
            标签：<CheckboxGroup options={this.state.tagList} defaultValue={[]} onChange={this.onTagChange} />
          </div>
        </div>
        <textarea value={this.state.input} onChange={this.changeText}></textarea>
        <div className="code" dangerouslySetInnerHTML={code2html(this.state.compiledMarkdown)}></div>
      </div>
    )
  }
}
