import React, { Component } from 'react'
import {
  Input,
  Button,
  Checkbox,
  Modal
} from 'antd';
import markdown from './markdown'
import $http from '@/axios'
import debounce from 'lodash/debounce'
/**
 * fix: https://github.com/ant-design/ant-design/issues/14895
 */
require('antd/lib/message/style');
const message = require('antd/lib/message').default;

let editer = null

function code2html (content) {
  return { __html: content }
}

export default class extends Component {
  state = {
    inputTitle: '',
    input: '# hello',
    compiledMarkdown: '',
    type: '',
    tagList: [],
    textareaHeight: 500,
    isShowLeft: true,
    isShowRight: true,
    activeTags: []
  }

  constructor (props) {
    super(props)
    this.emitChangeDebounced = debounce(this.emitChange, 400);
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
        input: content,
        inputTitle: JSON.parse(_c).title,
        activeTags: JSON.parse(_c).tags,
        editId: JSON.parse(_c)._id
      })
    }
    this.md2code()
    this.getTagList()
    editer = document.getElementById('editer')
    this.setState({
      textareaHeight: editer.scrollTop + editer.scrollHeight + 20
    })
  }

  emitChange () {
    this.md2code()
  }

  changeText = (event) => {
    this.setState({
      input: event.target.value,
      textareaHeight: editer.scrollTop + editer.scrollHeight
    })
    this.emitChangeDebounced();
  }

  md2code () {
    this.setState(prevState => ({
      compiledMarkdown: markdown.render(prevState.input)
    }))
  }

  onTagChange = (checkedValues) => {
    this.setState({
      activeTags: checkedValues
    })
  }

  titleChange = (event) => {
    this.setState({
      inputTitle: event.target.value
    })
  }

  getTagList = () => {
    $http.get('/api/tags')
      .then(res => {
        res.forEach(element => {
          element.label = element.value = element.name
        });
        this.setState({
          tagList: res
        })
      })
      .catch((e) => console.log(e))
  }

  publish = () => {
    if (!this.state.inputTitle) return message.warning('请输入文章标题');
    if (!this.state.input) return message.warning('请输入文章内容');

    Modal.confirm({
      title: '系统提示',
      content: this.state.editId ? `确定发布id为：${this.state.editId}的文章吗？` : '确定发布这篇新文章吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        !this.state.editId ? this.addActicle() : this.editActicle()
      }
    });
  }

  addActicle = () => {
    $http.post('/api/addArticle', {
      title: this.state.inputTitle,
      tags: this.state.activeTags,
      content: this.state.input
    })
      .then(res => {
        if (res.success === 100) {
          message.success('发布成功！');
        }
      })
      .catch((e) => console.log(e))
  }

  editActicle = () => {
    $http.post('/api/editArticle', {
      title: this.state.inputTitle,
      tags: this.state.activeTags,
      content: this.state.input,
      id: this.state.editId
    })
      .then(res => {
        if (res.success === 100) {
          message.success('发布成功！');
        }
      })
      .catch((e) => console.log(e))
  }

  toggleShow = (e) => {
    const type = e.target.dataset.type
    this.setState({
      [`isShow${type}`]: !this.state[`isShow${type}`]
    })
  }

  render () {
    return (
      <div id="editor">
        <div className="mgb20">
          <div className="mgb20 sbtn">
            <label>标题：<Input placeholder="请输入标题"
              value={this.state.inputTitle}
              onChange={this.titleChange}
              />
            </label>
            <div style={{display: 'inline-block', textAlign: 'right'}}>
              <Button
                style={{ marginRight: '6px' }}
                size={'small'}
                data-type="Right"
                onClick={this.toggleShow}
              >toggle left</Button>
              <Button
                style={{ marginRight: '6px' }}
                size={'small'}
                data-type="Left"
                onClick={this.toggleShow}
              >toggle right</Button>
              <Button type="primary" icon="plus" onClick={this.publish}>发布</Button>
            </div>
          </div>
          <div>
            标签：<Checkbox.Group
              options={this.state.tagList}
              value={this.state.activeTags}
              onChange={this.onTagChange}/>
          </div>
        </div>
        <textarea
          id="editer"
          style={{
            height: this.state.textareaHeight + 'px',
            width: !this.state.isShowRight ? '100%' : '',
            display: this.state.isShowLeft ? 'inline-block' : 'none'
          }}
          value={this.state.input}
          onChange={this.changeText}
        ></textarea>
        <div
          style={{
            width: !this.state.isShowLeft ? '100%' : '',
            display: this.state.isShowRight ? 'inline-block' : 'none'
          }}
          className="code content"
          dangerouslySetInnerHTML={code2html(this.state.compiledMarkdown)}
        ></div>
      </div>
    )
  }
}
