import React, { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import '@/assets/styles/App.sass';
import Routers from '@/router'

const { Header, Sider, Content } = Layout;

const menuList = [
  {
    path: 'article',
    icon: 'user',
    name: '文章列表'
  },
  {
    path: 'editArticle',
    icon: 'video-camera',
    name: '编辑文章'
  },
  {
    path: 'tag',
    icon: 'upload',
    name: '标签'
  }
]

export default class extends Component {
  state = {
    collapsed: false
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
              <div className="menu-logo">R</div>
              <Menu theme="light" mode="inline" defaultSelectedKeys={['article']}
                // selectedKeys={this.state.selectedKeys}
              >
                {
                  menuList.map((menu, index) => (
                    <Menu.Item key={menu.path}>
                      <Link to={menu.path}>
                        <Icon type={menu.icon} />
                        <span>{menu.name}</span>
                      </Link>
                    </Menu.Item>
                  ))
                }
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
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, height: '100%' }}>
                <Routers />
              </Content>
            </Layout>
          </Layout>
        </div>
      </HashRouter>
    );
  }
}
