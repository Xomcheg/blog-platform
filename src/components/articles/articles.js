import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'antd'
import { withRouter } from 'react-router-dom'

import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import * as actions from '../actions/actions'

import ArticlesItem from './articles-item'
import articles from './articles.module.scss'

function Articles({ getArticles, getCurrentArticle, setNewPage, state, history, checkLoginUser }) {
  const { articlesCount, loading, error, errorText, articles: articlesArr, page: oldPage } = state

  const newPage = (page) => {
    setNewPage(page)
    getArticles(page)
  }

  useEffect(() => {
    checkLoginUser()
    getArticles(oldPage)
  }, [])

  const elements = articlesArr.map((item) => (
    <ArticlesItem
      key={item.slug}
      articleClick={() => {
        history.push(`/articles/${item.slug}`)
        getCurrentArticle(item.slug)
      }}
      item={item}
    />
  ))
  const pagination = (
    <div className={articles.articles__pagination}>
      <Pagination
        size="small"
        total={articlesCount}
        showSizeChanger={false}
        current={oldPage}
        defaultPageSize={5}
        onChange={newPage}
      />
    </div>
  )
  const errorDisplay = error ? <ErrorIndicator message={errorText} /> : null
  const elementsDisplay = loading || error ? null : <div className={articles.articles}>{elements}</div>
  const spinner = loading && !error ? <Spinner /> : null
  const displayPagination = loading || error ? null : pagination

  return (
    <>
      {spinner}
      {errorDisplay}
      {elementsDisplay}
      {displayPagination}
    </>
  )
}

const mapStateToProps = (state) => ({
  state,
})

export default connect(mapStateToProps, actions)(withRouter(Articles))
