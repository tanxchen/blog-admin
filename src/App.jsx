import React, { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import '@/assets/styles/App.sass';
import Routers from '@/router'

const { Header, Sider, Content } = Layout;

export default class extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <HashRouter basename="/">
        <div className="App">
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Link to={`/article`}>
                    <Icon type="user" />
                    <span>文章列表</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={`/editArticle`}>
                    <Icon type="video-camera" />
                    <span>编辑文章</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to={`/tag`}>
                    <Icon type="upload" />
                    <span>标签</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Header>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                <Routers />
              </Content>
            </Layout>
          </Layout>
        </div>
      </HashRouter>
    );
  }
}
