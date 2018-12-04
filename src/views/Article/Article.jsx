import React, { Component } from 'react'
import { Table, Divider, Tag, Button } from 'antd';

const columns = [{
  title: 'Title',
  dataIndex: 'name',
  key: 'name',
  render: text => <span >{text}</span>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <span >Invite {record.name}</span>
      <Divider type="vertical" />
      <span >Delete</span>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];

export default class extends Component {
  render () {
    return (
      <div>
        <p style={{marginBottom: '20px'}}>
          <Button type="primary" icon="plus">新增</Button>
        </p>
        <Table columns={columns} dataSource={data} bordered/>
      </div>
    )
  }
}
