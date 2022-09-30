import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'antd'
import { withRouter } from 'react-router-dom'

import { Spinner } from '../spinner'
import { ErrorIndicator } from '../error-indicator'
import * as actions from '../actions/actions'

import { ArticlesItem } from './articles-item'
import articles from './articles.module.scss'

function ArticlesList({ getArticles, getCurrentArticle, setNewPage, state, history }) {
  const { articlesCount, loading, error, errorText, articles: articlesArr, page: oldPage, favorited } = state

  const newPage = (page) => {
    setNewPage(page)
    getArticles(page)
  }

  useEffect(() => {
    getArticles(oldPage)
  }, [favorited])

  const findArticle = (article) => {
    history.push(`/articles/${article}`)
    getCurrentArticle(article)
  }

  const elements = articlesArr.map((item) => (
    <ArticlesItem
      key={item.slug}
      articleClick={() => {
        findArticle(item.slug)
      }}
      item={item}
      checkArticlesArr="articles"
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

export const Articles = connect(mapStateToProps, actions)(withRouter(ArticlesList))
