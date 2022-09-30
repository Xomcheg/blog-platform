/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Redirect, withRouter } from 'react-router-dom'

import { Spinner } from '../spinner'
import * as actions from '../actions/actions'
import account from '../account/accaunt.module.scss'
import { ErrorIndicator } from '../error-indicator'

import CreateTags from './create-tags'

function EditArticleMain({
  state,
  setNewTag,
  history,
  id,
  getCurrentArticle,
  removeTagList,
  editArticle,
  setStatusSubmitForm,
}) {
  const {
    accountCheckInformation,
    userNameError,
    emailError,
    tags,
    statusSubmitForm,
    loading,
    articleSlug,
    article,
    error,
    errorText,
  } = state
  const checkLocalStorage = localStorage.getItem('blog-token')

  const { title: oldTitle, description: oldDescription, body: oldBody, tagList: oldTagList, slug } = article || []

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    setValue,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    editArticle(data, tags, slug)
  }

  useEffect(() => {
    if (id !== undefined) {
      getCurrentArticle(id)
    }
  }, [])

  useEffect(() => {
    setValue('title', oldTitle)
    setValue('shortDescription', oldDescription)
    setValue('text', oldBody)
    if (article !== null) {
      removeTagList(oldTagList)
    }
  }, [article])

  useEffect(() => {
    if (userNameError) {
      setError('userName', { type: 'custom', message: userNameError })
    }
    if (emailError) {
      setError('emailAddress', { type: 'custom', message: emailError })
    }
  }, [userNameError, emailError])

  useEffect(() => {
    if (statusSubmitForm) {
      setNewTag(null)
      setStatusSubmitForm()
    }
  }, [statusSubmitForm])

  useEffect(() => {
    if (articleSlug !== '') {
      history.push(`/articles/${articleSlug}`)
    }
  }, [articleSlug])

  const displaySpinner = loading ? <Spinner /> : null
  const errorDisplay = error ? <ErrorIndicator message={errorText} /> : null

  if (checkLocalStorage) {
    return (
      <>
        {errorDisplay}
        <div className={`${account.create__article} ${account.account}`}>
          <div className={account.account__title}>Edit article</div>
          <form className={account.account__form}>
            <div className={account['account__form-wrapper']}>
              <label className={account.account__suptitle} htmlFor="userName">
                Title
              </label>
              <input
                className={`${account.account__text} ${errors?.title && account.account__error}`}
                id="title"
                type="text"
                placeholder="Title"
                {...register('title', {
                  required: 'Enter title',
                })}
              />
              <div className={account['account__form-error']}>
                {errors?.title && <p>{errors?.title?.message || 'Error!'} </p>}
              </div>
            </div>
            <div className={account['account__form-wrapper']}>
              <label className={account.account__suptitle} htmlFor="shortDescription">
                Short description
              </label>
              <input
                className={`${account.account__text} ${errors?.shortDescription && account.account__error}`}
                id="shortDescription"
                type="text"
                placeholder="Short description"
                {...register('shortDescription', {
                  required: 'Enter Short description',
                })}
              />
              <div className={account['account__form-error']}>
                {errors?.shortDescription && <p>{errors?.shortDescription?.message || 'Error!'} </p>}
              </div>
            </div>
            <div className={account['account__form-wrapper']}>
              <label className={account.account__suptitle} htmlFor="text">
                Text
              </label>
              <textarea
                className={`${account.account__text} 
              ${errors?.text && account.account__error} ${account['account__text-main']}`}
                id="text"
                type="text"
                placeholder="Text"
                {...register('text', {
                  required: 'Enter text',
                })}
              />
              <div className={account['account__form-error']}>
                {errors?.text && <p>{errors?.text?.message || 'Error!'} </p>}
              </div>
            </div>
            <div className={account['create__article-tag']}>
              <CreateTags oldTagList={oldTagList} />
            </div>

            <button
              className={`${account.account__btn} ${
                !isValid || !accountCheckInformation ? account['account__btn--disabled'] : null
              }`}
              type="submit"
              disabled={!isValid || loading}
              onClick={handleSubmit(onSubmit)}
            >
              Send
            </button>
          </form>
          {displaySpinner}
        </div>
      </>
    )
  }
  return <Redirect to="/sign-in" />
}

const mapStateToProps = (state) => ({
  state,
})

export const EditArticle = connect(mapStateToProps, actions)(withRouter(EditArticleMain))
