import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

const LoadableComponent = (component) => {
  return Loadable({
    loader: component,
    loading: () => (<span>加载中...</span>)
  })
}

const routes = [
  { path: '/', exact: true, redirect: '/article' },
  { path: '/article', component: () => import(`@/views/Article`) },
  { path: '/editArticle', component: () => import(`@/views/EditArticle`) },
  { path: '/editArticle/:id', component: () => import(`@/views/EditArticle`) },
  { path: '/tag', component: () => import(`@/views/Tag`) },
  // { path: '/rydemo', component: () => import(`@/views/Rydemo`) },
  // { path: '/detail/:id', component: () => import(`@/views/Detail`) },
  { path: '*', component: () => import(`@/views/NotFound`) }
]

export default class extends Component {
  render() {
    return (
      <Switch>
        {
          routes.map((route, index) => {
            return route.redirect
              ? (<Redirect
                key={index}
                exact={route.exact}
                from={route.path}
                to={route.redirect}
              />)
              : (<Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={LoadableComponent(route.component)}
              />)
          })
        }
      </Switch>
    )
  }
}
