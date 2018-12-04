import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';

const { Header, Content } = Layout;

export default class extends Component {
  render () {
    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <ToDoList />
        </Content>
      </Layout>
    )
  }
}