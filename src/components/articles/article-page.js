import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import { withRouter, Redirect } from 'react-router-dom'

import * as actions from '../actions/actions'
import { ErrorIndicator } from '../error-indicator'
import { Spinner } from '../spinner'

import articles from './articles.module.scss'
import { ArticlesItemTag } from './articles-item-tag'

function ArticlePageMain({
  id,
  state,
  getCurrentArticle,
  deleteArticle,
  setArticle,
  setNewArticleSlug,
  history,
  setLikeArticle,
  delLikeArticle,
}) {
  const { article: newArticle, articleSlug, loading, error, errorText } = state
  const [confirm, setConfirm] = useState(false)
  const [editStatus, setEditStatus] = useState(false)

  const abortConRef = useRef()

  useEffect(() => {
    if (id !== undefined) {
      getCurrentArticle(id)
    }
    if (articleSlug !== '') {
      setNewArticleSlug('')
    }
  }, [])

  if (newArticle === 'redirect') {
    setArticle(null)
    return <Redirect to="/articles" />
  }

  let element
  if (editStatus) {
    return <Redirect to="/articles/edit" />
  }

  if (state.article) {
    const { article, userData } = state
    const { username: loginUserName } = userData
    const { title, description, body, favoritesCount, author, createdAt, tagList, favorited, slug } = article
    const { username, image } = author
    const createDate = format(new Date(createdAt), 'PPP')
    const tags = tagList.map((tag) => <ArticlesItemTag tag={tag} />)
    const delArticle = () => {
      deleteArticle(slug)
      setConfirm(false)
      setArticle('redirect')
    }
    const clickEdit = () => {
      setEditStatus(true)
      history.push(`/articles/${newArticle.slug}/edit`)
    }
    const clickLikeBtn = () => {
      if (favorited) {
        delLikeArticle(slug, abortConRef, 'articlesCurrent')
      } else {
        setLikeArticle(slug, abortConRef, 'articlesCurrent')
      }
    }

    let icon
    if (favorited) {
      icon = (
        <path
          d="M8 2.56911C7.26154 1.33835 6.03077 0.476807 4.55385 0.476807C2.46154 0.476807 0.861542 2.07681 0.861542 4.16911C0.861542 8.23065 3.07693 8.84604 8 13.523C12.9231 8.84604 15.1385 8.23065 15.1385 4.16911C15.1385 2.07681 13.5385 0.476807 11.4462 0.476807C9.96923 0.476807 8.73846 1.33835 8 2.56911Z"
          fill="#FF0707"
        />
      )
    } else {
      icon = (
        <path
          d="M7.99998 15.1099C7.7722 15.1099 7.5526 15.0273 7.38146 14.8774C6.73509 14.3123 6.11193 13.7811 5.56212 13.3126L5.55932 13.3102C3.94738 11.9365 2.55542 10.7502 1.58691 9.58167C0.504271 8.27527 0 7.03662 0 5.68347C0 4.36877 0.450805 3.15588 1.26928 2.26807C2.09753 1.36975 3.234 0.875 4.46972 0.875C5.3933 0.875 6.23912 1.16699 6.98363 1.7428C7.35936 2.03345 7.69994 2.38916 7.99998 2.80408C8.30016 2.38916 8.64061 2.03345 9.01646 1.7428C9.76097 1.16699 10.6068 0.875 11.5304 0.875C12.766 0.875 13.9026 1.36975 14.7308 2.26807C15.5493 3.15588 16 4.36877 16 5.68347C16 7.03662 15.4958 8.27527 14.4132 9.58154C13.4447 10.7502 12.0528 11.9364 10.4411 13.3099C9.89036 13.7792 9.26622 14.3112 8.61839 14.8777C8.44737 15.0273 8.22765 15.1099 7.99998 15.1099V15.1099ZM4.46972 1.81226C3.49889 1.81226 2.60705 2.19971 1.95825 2.90332C1.2998 3.61755 0.937132 4.60486 0.937132 5.68347C0.937132 6.82153 1.3601 7.83936 2.30847 8.98364C3.22509 10.0897 4.58849 11.2516 6.1671 12.5969L6.17003 12.5994C6.72191 13.0697 7.34752 13.6029 7.99864 14.1722C8.65367 13.6018 9.28026 13.0677 9.83323 12.5967C11.4117 11.2513 12.775 10.0897 13.6916 8.98364C14.6399 7.83936 15.0628 6.82153 15.0628 5.68347C15.0628 4.60486 14.7002 3.61755 14.0417 2.90332C13.393 2.19971 12.5011 1.81226 11.5304 1.81226C10.8192 1.81226 10.1662 2.03833 9.5897 2.48413C9.07591 2.88159 8.718 3.38403 8.50816 3.7356C8.40025 3.91638 8.21031 4.02429 7.99998 4.02429C7.78966 4.02429 7.59972 3.91638 7.49181 3.7356C7.28209 3.38403 6.92418 2.88159 6.41027 2.48413C5.83373 2.03833 5.18078 1.81226 4.46972 1.81226V1.81226Z"
          fillOpacity="0.75"
        />
      )
    }
    const buttons = (
      <div className={`${articles.articles__buttons} ${confirm ? articles['articles__buttons--active'] : null}`}>
        <button
          type="button"
          className={articles['articles__button-del']}
          onClick={() => {
            setConfirm(true)
          }}
        >
          Delete
        </button>
        <button type="button" className={articles['articles__button-edit']} onClick={clickEdit}>
          Edit
        </button>
        <div className={articles['articles__confirm-message']}>
          <div className={articles['articles__confirm-title']}>
            <svg
              className={articles['articles__confirm-icon']}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              onClick={() => {
                setLikeArticle(slug)
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM6.5 3.625C6.5 3.55625 6.55625 3.5 6.625 3.5H7.375C7.44375 3.5 7.5 3.55625 7.5 3.625V7.875C7.5 7.94375 7.44375 8 7.375 8H6.625C6.55625 8 6.5 7.94375 6.5 7.875V3.625ZM7 10.5C6.80374 10.496 6.61687 10.4152 6.47948 10.275C6.3421 10.1348 6.26515 9.9463 6.26515 9.75C6.26515 9.5537 6.3421 9.36522 6.47948 9.225C6.61687 9.08478 6.80374 9.00401 7 9C7.19626 9.00401 7.38313 9.08478 7.52052 9.225C7.6579 9.36522 7.73485 9.5537 7.73485 9.75C7.73485 9.9463 7.6579 10.1348 7.52052 10.275C7.38313 10.4152 7.19626 10.496 7 10.5Z"
                fill="#FAAD14"
              />
            </svg>
            <div className={articles['articles__confirm-text']}>Are you sure to delete this article?</div>
          </div>
          <div className={articles['articles__confirm-buttons']}>
            <button type="button" className={articles['articles__confirm-btn']} onClick={() => setConfirm(false)}>
              No
            </button>
            <button type="button" className={articles['articles__confirm-btn']} onClick={delArticle}>
              Yes
            </button>
          </div>
        </div>
      </div>
    )
    const displayButtons = username === loginUserName ? buttons : null
    element = (
      <div className={`${articles.article} ${articles.articles__page}`}>
        <div className={articles.articles__item}>
          <div className={articles.articles__header}>
            <h2 className={articles.articles__title}>{title}</h2>
            <div className={articles.articles__like}>
              <svg
                className={articles['articles__like-img']}
                onClick={clickLikeBtn}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                {icon}
              </svg>
            </div>
            <div className={articles['articles__like-counter']}>{favoritesCount}</div>
          </div>
          <div className={articles['articles__tag-wrapper']}>{tags}</div>
          <div className={articles.articles__text}>{description}</div>
          <div className={articles.articles__persone}>
            <div className={articles['articles__persone-wrapper']}>
              <div className={articles['articles__persone-data']}>
                <div className={articles['articles__persone-name']}>{username}</div>
                <div className={articles['aricles__persone-date']}>{createDate}</div>
              </div>
              <img className={articles['articles__persone-logo']} src={image} alt="avatar" />
            </div>
            {displayButtons}
          </div>
          <Markdown>{body}</Markdown>
        </div>
      </div>
    )
  }
  const displaySpinner = loading ? <Spinner /> : null
  const errorDisplay = error ? <ErrorIndicator message={errorText} /> : null

  return (
    <>
      {errorDisplay}
      {element}
      {displaySpinner}
    </>
  )
}

const mapStateToProps = (state) => ({
  state,
})

export const ArticlePage = connect(mapStateToProps, actions)(withRouter(ArticlePageMain))
