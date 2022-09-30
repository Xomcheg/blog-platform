/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import * as actions from '../actions/actions'
import { ErrorIndicator } from '../error-indicator'
import { Spinner } from '../spinner'

import account from './accaunt.module.scss'

function login({ state, resetSubmitError, loginUser }) {
  const { loginStatus, loginError, loading, error, errorText } = state
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    resetSubmitError()
    loginUser(data)
  }

  useEffect(() => {
    if (loginError) {
      setError('emailAddress', { type: 'custom', message: 'Email or password is invalid' })
      setError('password', { type: 'custom', message: 'Email or password is invalid' })
    } else {
      clearErrors(['emailAddress', 'password'])
    }
  }, [loginError])

  const element = (
    <div className={`${account.account} ${account['account__sign-in']}`}>
      <div className={account.account__title}>Sign in</div>
      <form className={account.account__form} onSubmit={(e) => e.preventDefault()}>
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
              required: 'Enter email',
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: 'Email must be a valid email address',
              },
              onChange: () => resetSubmitError(),
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
              required: 'Enter password',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: 40,
              onChange: () => resetSubmitError(),
            })}
          />
          <div className={account['account__form-error']}>
            {errors?.password && <p>{errors?.password?.message || 'Error!'} </p>}
          </div>
        </div>
        <button
          className={`${account.account__btn} ${!isValid ? account['account__btn--disabled'] : null}`}
          type="submit"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </button>
        <div className={account.account__subtext}>
          Already have an account?{' '}
          <Link to="/sign-up" className={account['account__subtext-link']}>
            Sign Up
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

export const Login = connect(mapStateToProps, actions)(login)
