import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Spinner } from '../spinner'
import { ErrorIndicator } from '../error-indicator'
import * as actions from '../actions/actions'

import { ArticlesItem } from './articles-item'
import articles from './articles.module.scss'

function MyArticlesMain({ getMyArticles, getCurrentArticle, state, history }) {
  const { loading, error, errorText, myArticlesData, userData } = state
  const { username } = userData

  useEffect(() => {
    getMyArticles(username)
  }, [username])

  const elements = myArticlesData.map((item) => (
    <ArticlesItem
      key={item.slug}
      articleClick={() => {
        history.push(`/articles/${item.slug}`)
        getCurrentArticle(item.slug)
      }}
      item={item}
      loginUserName={username}
      checkArticlesArr="myArticles"
    />
  ))
  const errorDisplay = error ? <ErrorIndicator message={errorText} /> : null
  const elementsDisplay = loading || error ? null : <div className={articles.articles}>{elements}</div>
  const spinner = loading && !error ? <Spinner /> : null
  const displayMessage =
    myArticlesData.length === 0 ? (
      <h1 style={{ marginTop: '20px', textAlign: 'center' }}>You have no articles</h1>
    ) : null

  return (
    <>
      {spinner}
      {displayMessage}
      {errorDisplay}
      {elementsDisplay}
    </>
  )
}

const mapStateToProps = (state) => ({
  state,
})

export const MyArticles = connect(mapStateToProps, actions)(withRouter(MyArticlesMain))
