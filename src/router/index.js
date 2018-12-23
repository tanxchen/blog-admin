// import React, { Component } from 'react'
// import { Route, Redirect, Switch } from 'react-router-dom'
// import Loadable from 'react-loadable'

// const LoadableComponent = (component) => {
//   return Loadable({
//     loader: component,
//     loading: () => (<span>加载中...</span>)
//   })
// }

// const loginRoutes = [
//   { path: '/login', component: () => import(`@/views/Login`) },
//   { path: '/article', component: () => import(`@/views/Article`) },
//   { path: '*', component: () => import(`@/views/NotFound`) }
// ]

// const routes = [
//   { path: '/article', component: () => import(`@/views/Article`) },
//   { path: '/editArticle', component: () => import(`@/views/EditArticle`) },
//   { path: '/editArticle/:id', component: () => import(`@/views/EditArticle`) },
//   { path: '/tag', component: () => import(`@/views/Tag`) },
//   { path: '*', component: () => import(`@/views/NotFound`) }
// ]

// function getRouters(routes) {
//   return routes.map((route, index) => {
//     return route.redirect
//       ? (<Redirect
//         key={index}
//         exact={route.exact}
//         from={route.path}
//         to={route.redirect}
//       />)
//       : (<Route
//         key={index}
//         path={route.path}
//         exact={route.exact}
//         component={LoadableComponent(route.component)}
//       />)
//   })
// }

// export default class extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       type: props.type
//     }
//   }

//   componentDidMount () {
//     console.log(this.state);
//   }

//   render() {
//     return (
//       <Switch>{
//         getRouters(this.state.type === 'main' ? routes : loginRoutes)
//       }</Switch>
//     )
//   }
// }

import React from 'react'
// import DefaultLayout from '../containers/DefaultLayout';

const Article = React.lazy(() => import(`@/views/Article`))
const EditArticle = React.lazy(() => import(`@/views/EditArticle`))
const Tag = React.lazy(() => import(`@/views/Tag`))
const NotFound = React.lazy(() => import(`@/views/NotFound`))

export default [
  // { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/home/article', component: Article },
  { path: '/home/editArticle', exact: true, component: EditArticle },
  { path: '/home/editArticle/:id', component: EditArticle },
  { path: '/home/tag', component: Tag },
  { path: '*', component: NotFound }
]
