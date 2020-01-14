import React, { Component } from 'react'
import { Table, Divider, Button, Modal, Input, message } from 'antd';
import $http from '@/axios'

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
        <span>
          <Button type="dashed" size="small" onClick={() => this.editHandle(record)}>修改</Button>
          <Divider type="vertical" />
          <Button type="danger" size="small" onClick={() => this.removeHandle(record)}>删除</Button>
        </span>
      ),
    }]
  }

  state = {
    data: [],
    modalVisible: false,
    modalVisibleOfEdit: false,
    tagInputName: '',
    tagInputNameOfEdit: '',
    editId: ''
  }

  componentDidMount () {
    $http.get('/api/tags')
      .then(res => {
        this.setState({ data: res })
      })
      .catch((e) => {
        console.log(e);
      })
  }

  editHandle (record) {
    this.setState({
      editId: record._id,
      tagInputNameOfEdit: record.name,
      modalVisibleOfEdit: true
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
          .catch((e) => {
            console.log(e);
          })
      }
    });
  }

  submitAddTag = () => {
    if (!this.state.tagInputName) return alert('标签名称不能为空！')

    $http.post('/api/addTag', {
      name: this.state.tagInputName
    })
      .then(res => {
        this.setState({ data: res, tagInputName: '' })
        message.success('新增成功！');
        this.setModalVisible(false)
      })
      .catch((e) => {
        console.log(e);
      })
  }

  submitEditTag = () => {
    if (!this.state.tagInputNameOfEdit) return alert('标签名称不能为空！')

    $http.post('/api/updateTagById', {
      id: this.state.editId,
      name: this.state.tagInputNameOfEdit
    })
      .then(res => {
        this.setState({ data: res })
        message.success('修改成功！');
      })
      .catch((e) => {
        console.log(e);
      })
  }

  setModalVisible (visible, isEdit) {
    this.setState(
      isEdit
        ? { modalVisibleOfEdit: visible }
        : ( visible
            ? { tagInputName: '', modalVisible: visible }
            : { modalVisible: visible } )
    )
  }

  iptChange = (event, isEdit) => {
    this.setState(
      isEdit
        ? { tagInputNameOfEdit: event.target.value }
        : { tagInputName: event.target.value }
    )
  }

  render () {
    return (
      <div>
        <p className="mgb20">
          <Button type="primary" icon="plus" onClick={() => this.setModalVisible(true)}>新增</Button>
        </p>
        <Table columns={this.columns} dataSource={this.state.data} rowKey="_id" bordered />
        <Modal
          title="新增标签"
          okText="确定"
          cancelText="取消"
          maskClosable={false}
          destroyOnClose
          visible={this.state.modalVisible}
          onOk={this.submitAddTag}
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
        <Modal
          title="修改标签"
          okText="确定"
          cancelText="取消"
          maskClosable={false}
          destroyOnClose
          visible={this.state.modalVisibleOfEdit}
          onOk={this.submitEditTag}
          onCancel={() => this.setModalVisible(false, 'isEdit')}
        >
          <div style={{ textAlign: 'center' }}>
            标签名称：<Input
              placeholder="请输入标签名称"
              value={this.state.tagInputNameOfEdit}
              onChange={(event) => this.iptChange(event, 'isEdit')}
              style={{ width: 200 }}
            />
          </div>
        </Modal>
      </div>
    )
  }
}
