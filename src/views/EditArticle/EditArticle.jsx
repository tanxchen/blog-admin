import React, { Component } from 'react'
import marked from 'marked'
import { Input, Button, Select } from 'antd';
// import debounce from 'lodash/debounce'
// import _ from 'lodash'
const Option = Select.Option

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

  handleSelectChange = (value) => {
    console.log(value);
    // this.props.form.setFieldsValue({
    //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    // });
  }

  render () {
    function code2html (content) {
      return { __html: content }
    }
    return (
      <div id="editor">
        <div className="mgb20">
          <Button type="primary" icon="plus" className="mgb20">发布</Button>
          <div>
            <label>标题：<Input placeholder="请输入标题" /></label>
            <label>标签：
              <Select
                placeholder="请选择标签"
                onChange={this.handleSelectChange}
                style={{ width: 120 }}
              >
                {
                  this.state.tagList.map((tag, index) => 
                    <Option value={tag}>{tag}</Option>
                  )
                }
              </Select>
            </label>
          </div>
        </div>
        <textarea value={this.state.input} onChange={this.changeText}></textarea>
        <div className="code" dangerouslySetInnerHTML={code2html(this.state.compiledMarkdown)}></div>
      </div>
    )
  }
}
