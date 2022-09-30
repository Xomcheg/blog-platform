/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { ErrorIndicator } from '../error-indicator'
import { Spinner } from '../spinner'
import * as actions from '../actions/actions'

import account from './accaunt.module.scss'

function CreateNewAccountMain({
  state,
  accountCheckInformationClick,
  registerNewUser,
  resetSubmitError,
  setStatusSubmitForm,
}) {
  const [password, setPassword] = useState()
  const {
    accountCheckInformation,
    userNameError,
    emailError,
    statusSubmitForm,
    loginStatus,
    loading,
    error,
    errorText,
  } = state

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
    setError,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    if (accountCheckInformation) {
      resetSubmitError()
      registerNewUser(data)
    }
  }
  useEffect(() => {
    if (statusSubmitForm) {
      reset()
      setStatusSubmitForm()
    }
  }, [statusSubmitForm])
  useEffect(() => {
    const subscription = watch((data) => {
      setPassword(data.password)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    if (userNameError) {
      setError('userName', { type: 'custom', message: userNameError })
    }
    if (emailError) {
      setError('emailAddress', { type: 'custom', message: emailError })
    }
  }, [userNameError, emailError])

  const element = (
    <div className={account.account}>
      <div className={account.account__title}>Create new account</div>
      <form className={account.account__form} onSubmit={(e) => e.preventDefault()}>
        <div className={account['account__form-wrapper']}>
          <label className={account.account__suptitle} htmlFor="userName">
            Username
          </label>
          <input
            className={`${account.account__text} ${errors?.userName && account.account__error}`}
            id="userName"
            type="text"
            placeholder="Username"
            //
            {...register('userName', {
              required: 'Enter user name',
              minLength: {
                value: 3,
                message: 'From 3 to 20 symbols',
              },
              maxLength: 20,
            })}
          />
          <div className={account['account__form-error']}>
            {errors?.userName && <p>{errors?.userName?.message || 'Error!'} </p>}
          </div>
        </div>
        <div className={account['account__form-wrapper']}>
          <label className={account.account__suptitle} htmlFor="emailAddress">
            Email address
          </label>
          <input
            className={`${account.account__text} ${errors?.emailAddress && account.account__error}`}
            id="emailAddress"
            type="email"
            placeholder="Email address"
            {...register('emailAddress', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: 'email должен быть корректным почтовым адресом',
              },
            })}
          />
          <div className={account['account__form-error']}>
            {errors?.emailAddress && <p>{errors?.emailAddress?.message || 'Error!'} </p>}
          </div>
        </div>
        <div className={account['account__form-wrapper']}>
          <label className={account.account__suptitle} htmlFor="password">
            Password
          </label>
          <input
            className={`${account.account__text} ${errors?.password && account.account__error}`}
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: 40,
            })}
          />
          <div className={account['account__form-error']}>
            {errors?.password && <p>{errors?.password?.message || 'Error!'} </p>}
          </div>
        </div>

        <div className={account['account__form-wrapper']}>
          <label className={account.account__suptitle} htmlFor="repeatPassword">
            Repeat Password
          </label>
          <input
            className={`${account.account__text} ${errors?.repeatPassword && account.account__error}`}
            id="repeatPassword"
            type="password"
            placeholder="Password"
            {...register('repeatPassword', {
              required: 'Поле обязательно к заполнению',
              validate: (value) => value === password || 'Passwords must match',
            })}
          />
          <div className={account['account__form-error']}>
            {errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'Error!'} </p>}
          </div>
        </div>

        <div className={account['account__check-information']}>
          <div className={account.account__box}>
            <input
              className={account['account__check-btn']}
              id="check-information"
              type="checkbox"
              defaultChecked={accountCheckInformation}
              onClick={accountCheckInformationClick}
            />
            <label htmlFor="check-information" className={account['account__check-text']}>
              I agree to the processing of my personal information
            </label>
            <span className={account['account__check-btn--active']} />
          </div>
        </div>
        <button
          className={`${account.account__btn} ${
            !isValid || !accountCheckInformation ? account['account__btn--disabled'] : null
          }`}
          type="submit"
          disabled={!isValid || loading}
          onClick={handleSubmit(onSubmit)}
        >
          Create
        </button>
        <div className={account.account__subtext}>
          Already have an account?{' '}
          <Link to="/sign-in" className={account['account__subtext-link']}>
            Sign In
          </Link>
          .
        </div>
      </form>
    </div>
  )
  const displaySpinner = loading ? <Spinner /> : null
  const errorDisplay = error ? <ErrorIndicator message={errorText} /> : null

  if (!loginStatus) {
    return (
      <>
        {errorDisplay}
        {element}
        {displaySpinner}
      </>
    )
  }
  return <Redirect to="/articles" />
}

const mapStateToProps = (state) => ({
  state,
})

export const CreateNewAccount = connect(mapStateToProps, actions)(CreateNewAccountMain)
