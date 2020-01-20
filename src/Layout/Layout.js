import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';
// sidebar nav config
import navigation from '@/_nav';
// routes config
import routes from '@/router';
import './layout.sass'

const { Header, Sider, Content } = Layout;
// const DefaultAside = React.lazy(() => import('./DefaultAside'));
// const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
// const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

export default class extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut = (e) => {
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <Link to="/home">
              <div className="menu-logo">R</div>
            </Link>
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={['article']}
              selectedKeys={[this.props.history.location.pathname.replace('/home/', '')]}
              >
              {
                navigation.map((menu, index) => (
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
            <Header style={{ background: '#fff', padding: 0 }} className="content-header">
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <Button onClick={this.signOut} className="sign-out">退出</Button>
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
              <Suspense fallback={this.loading()}>
                <Switch>
                  <Redirect exact from="/home" to="/home/article" />
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                </Switch>
              </Suspense>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
