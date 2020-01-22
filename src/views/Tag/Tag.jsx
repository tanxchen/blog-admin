import React, { Component } from 'react'
import {
  Table,
  Divider,
  Button,
  Modal,
  Input
} from 'antd';
import $http from '@/axios'
/**
 * fix: https://github.com/ant-design/ant-design/issues/14895
 */
require('antd/lib/message/style');
const message = require('antd/lib/message').default;

export default class extends Component {
  constructor() {
    super()
    this.columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
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
        <>
          <Button
            type="dashed"
            size="small"
            onClick={() => this.editHandle(record)}
          >修改</Button>
          <Divider type="vertical" />
          <Button
            type="danger"
            size="small"
            onClick={() => this.removeHandle(record)}
          >删除</Button>
        </>
      )
    }]

    this.getInitData()
  }

  state = {
    data: [],
    modalVisible: false,
    tagInputName: '',
    editId: '',
    modalState: ''
  }

  getInitData () {
    $http.get('/api/tags')
      .then(res => this.setState({ data: res }))
      .catch((e) => console.log(e))
  }

  editHandle (record) {
    this.setState({
      editId: record._id,
      tagInputName: record.name,
      modalVisible: true,
      modalState: 'EDIT_STATE'
    })
  }

  removeHandle (record) {
    Modal.confirm({
      title: '系统提示',
      content: `确定删除${record.name}标签吗？`,
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $http.post('/api/removeTagById', { id: record._id })
          .then(res => {
            this.setState({ data: res })
            message.success('删除成功！');
          })
          .catch((e) => console.log(e))
      }
    });
  }

  submitTag = () => {
    const isEdit = this.state.modalState === 'EDIT_STATE'

    if (!this.state.tagInputName) return alert('标签名称不能为空！')

    $http.post(isEdit ? '/api/updateTagById' : '/api/addTag', {
      name: this.state.tagInputName,
      ...(isEdit ? { id: this.state.editId } : {})
    })
      .then(res => {
        if (isEdit) {
          this.setState({ data: res,modalVisible: false })
          message.success('修改成功！');
        } else {
          this.setState({ data: res, tagInputName: '' })
          message.success('新增成功！');
          this.setModalVisible(false)
        }
      })
      .catch((e) => console.log(e))
  }

  setModalVisible (visible, isAdd) {
    this.setState({
      modalVisible: visible,
      ...(
        isAdd
          ? { modalState: 'ADD_STATE', tagInputName: '' }
          : { tagInputName: '' }
      )
    })
  }

  iptChange = (event) => {
    this.setState({ tagInputName: event.target.value })
  }

  render () {
    const modalTitle = this.state.modalState === 'ADD_STATE'
      ? '新增标签'
      : '修改标签'

    return (
      <div>
        <p className="mgb20">
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.setModalVisible(true, 'ADD_STATE')}
          >新增</Button>
        </p>
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          rowKey="_id"
          bordered
        />
        <Modal
          title={modalTitle}
          okText="确定"
          cancelText="取消"
          maskClosable={false}
          destroyOnClose
          visible={this.state.modalVisible}
          onOk={this.submitTag}
          onCancel={() => this.setModalVisible(false)}
        >
          <div style={{ textAlign: 'center' }}>
            标签名称：<Input
              placeholder="请输入标签名称"
              value={this.state.tagInputName}
              onChange={this.iptChange}
              style={{ width: 200 }}
            />
          </div>
        </Modal>
      </div>
    )
  }
}
