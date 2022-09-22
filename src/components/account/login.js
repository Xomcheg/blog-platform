/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import * as actions from '../actions/actions'

import account from './accaunt.module.scss'

function Login({ state, resetSubmitError, loginUser }) {
  const { loginStatus, loginError } = state
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

  if (!loginStatus) {
    return (
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
                required: 'Поле обязательно к заполнению',
                pattern: {
                  value:
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                  message: 'email должен быть корректным почтовым адресом',
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
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 1,
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
            Create
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
  }
  return <Redirect to="/articles" />
}

const mapStateToProps = (state) => ({
  state,
})

export default connect(mapStateToProps, actions)(Login)
