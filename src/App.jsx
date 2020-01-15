import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import baseLoadable from '@loadable/component'
import '@/assets/styles/App.sass';

function loadable (f) {
  return baseLoadable(f, {
    fallback: (
      <div className="loading-wrap">
        <span className="animated-loading"></span>
      </div>
    )
  })
}


// Containers
const Layout = loadable(() => import(
  /* webpackChunkName: 'layout' */
  '@/Layout'
));

// Pages
const Login = loadable(() => import(
  /* webpackChunkName: 'login' */
  '@/views/Login'
));

// const Register = loadable(() => import(
//   './views/Pages/Register'
// ));

const Page404 = loadable(() => import(
  /* webpackChunkName: 'page-404' */
  '@/views/NotFound'
));

// const Page500 = loadable(() => import(
//   './views/Pages/Page500'
// ));

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
          <Route path="/home" name="Home" component={Layout} />
          <Route path="*" name="not-found" component={Page404} />
        </Switch>
      </HashRouter>
    )
  }
}