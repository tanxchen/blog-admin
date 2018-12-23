// import React, { Component } from 'react';
// import { HashRouter, Link } from 'react-router-dom'
// import { Layout, Menu, Icon } from 'antd';
// import '@/assets/styles/App.sass';
// import Routers from '@/router'
// on: 'file-text',
//     name: '文章列表'
//   },
//   {
//     path: 'editArticle',
//     icon: 'edit',
//     name: '编辑文章'
//   },
//   {
//     path: 'tag',
//     icon: 'tags',
//     name: '标签'
//   }
// ]

// export default class extends Component {
  // state = {
  //   collapsed: false
  // };

  // toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // }

  // render() {
    // return (
      // <HashRouter basename="/">
      //   <div className="App">
      //     <Routers type="login">
      //     <Layout>
      //       <Sider
      //         trigger={null}
      //         collapsible
      //         collapsed={this.state.collapsed}
      //       >
      //         <Link to="/article"><div className="menu-logo">R</div></Link>
      //         <Menu theme="light" mode="inline" defaultSelectedKeys={['article']}
      //           // selectedKeys={this.state.selectedKeys}
      //         >
      //           {
      //             menuList.map((menu, index) => (
      //               <Menu.Item key={menu.path}>
      //                 <Link to={menu.path}>
      //                   <Icon type={menu.icon} />
      //                   <span>{menu.name}</span>
      //                 </Link>
      //               </Menu.Item>
      //             ))
      //           }
      //         </Menu>
      //       </Sider>
      //       <Layout>
      //         <Header style={{ background: '#fff', padding: 0 }}>
      //           <Icon
      //             className="trigger"
      //             type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
      //             onClick={this.toggle}
      //           />
      //         </Header>
      //         <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
      //           <Routers type="main"/>
      //         </Content>
      //       </Layout>
      //     </Layout>
      //     </Routers>
      //   </div>
      // </HashRouter>
// const { Header, Sider, Content } = Layout;

// const menuList = [
//   {
//     path: 'article',
//     ic
//     );
//   }
// }

import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable';
import './App.sass';

const loading = () => <div className="animated-loading">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Login'),
  loading
});

// const Register = Loadable({
//   loader: () => import('./views/Pages/Register'),
//   loading
// });

const Page404 = Loadable({
  loader: () => import('./views/NotFound'),
  loading
});

// const Page500 = Loadable({
//   loader: () => import('./views/Pages/Page500'),
//   loading
// });

export default class extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          {/* <Route exact path="/register" name="Register Page" component={Register} /> */}
          {/* <Route exact path="/404" name="Page 404" component={Page404} /> */}
          {/* <Route exact path="/500" name="Page 500" component={Page500} /> */}
          <Redirect exact from="/" to="/login" />
          <Route path="/home" name="Home" component={DefaultLayout} />
          <Route path="*" name="not-found" component={Page404} />
        </Switch>
      </HashRouter>
    )
  }
}