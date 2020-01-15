import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Loadable from '@loadable/component'
import './App.sass';

const loading = (<div className="animated-loading">Loading...</div>);

// Containers
const Layout = Loadable(
  () => import(
    /* webpackChunkName: 'layout' */
    '@/Layout'
  ),
  { fallback: loading }
);

// Pages
const Login = Loadable(
  () => import(
    /* webpackChunkName: 'login' */
    '@/views/Login'
  ),
  { fallback: loading }
);

// const Register = Loadable(
//   () => import('./views/Pages/Register'),
//   { fallback: loading }
// );

const Page404 = Loadable(
  () => import(
    /* webpackChunkName: 'page-404' */
    '@/views/NotFound'
  ),
  { fallback: loading }
);

// const Page500 = Loadable({
//   loader: () => import('./views/Pages/Page500'),
//   { fallback: loading }
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
          <Route path="/home" name="Home" component={Layout} />
          <Route path="*" name="not-found" component={Page404} />
        </Switch>
      </HashRouter>
    )
  }
}