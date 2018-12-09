import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Divider, Button } from 'antd';

function code2html (code) {
  return {__html: code}
}

export default class extends Component {
  constructor() {
    super()
    this.columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center'
    }, {
      title: '标签',
      dataIndex: 'label',
      key: 'label',
      align: 'center'
    }, {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
      render: code => (
        <div dangerouslySetInnerHTML={code2html(code)}></div>
      )
    }, {
      title: '创建日期',
      key: 'createDate',
      align: 'center',
      dataIndex: 'meta.createDate'
    }, {
      title: '修改日期',
      key: 'updateDate',
      align: 'center',
      dataIndex: 'meta.updateDate'
    }, {
      title: '操作',
      key: 'action',
      align: 'center',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <Button type="dashed" size="small" onClick={() => this.editHandle(record)}>修改</Button>
          <Divider type="vertical" />
          <Button type="danger" size="small">删除</Button>
        </span>
      ),
    }]
  }
  state = {
    data: []
  }

  componentDidMount () {
    window.$http.get('/api/articles')
      .then(res => {
        console.log(res);
        this.setState({
          data: res
        })
      })
      .catch((e) => {
        console.log(e);
      })
  }

  editHandle (record) {
    console.log('editHandle:', record);
    window.sessionStorage.setItem('ADMIN_ARTICLE', JSON.stringify(record))
    this.props.history.push('/editArticle?type=edit');
  }

  render () {
    return (
      <div>
        <p style={{marginBottom: '20px'}}>
          <Link to="/editArticle?type=add">
            <Button type="primary" icon="plus">新增</Button>
          </Link>
        </p>
        <Table columns={this.columns} dataSource={this.state.data} rowKey="_id" bordered/>
      </div>
    )
  }
}
