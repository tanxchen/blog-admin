import React from 'react'
// import Layout from '@/Layout';

const Article = React.lazy(() => import(
  /* webpackChunkName: 'article' */
  `@/views/Article`
))
const EditArticle = React.lazy(() => import(
  /* webpackChunkName: 'edit-article' */
  `@/views/EditArticle`
))
const Tag = React.lazy(() => import(
  /* webpackChunkName: 'tag' */
  `@/views/Tag`
))
const NotFound = React.lazy(() => import(
  /* webpackChunkName: 'not-found' */
  `@/views/NotFound`
))

export default [
  // { path: '/', exact: true, name: 'Home', component: Layout },
  { path: '/home/article', component: Article },
  { path: '/home/editArticle', exact: true, component: EditArticle },
  { path: '/home/editArticle/:id', component: EditArticle },
  { path: '/home/tag', component: Tag },
  { path: '*', component: NotFound }
]
