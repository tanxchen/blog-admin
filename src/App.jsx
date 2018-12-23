import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable';
import './App.sass';

const loading = () => <div className="animated-loading">Loading...</div>;

// Containers
const Layout = Loadable({
  loader: () => import('./containers/Layout'),
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
          <Route path="/home" name="Home" component={Layout} />
          <Route path="*" name="not-found" component={Page404} />
        </Switch>
      </HashRouter>
    )
  }
}