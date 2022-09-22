/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import * as actions from '../actions/actions'

import account from './accaunt.module.scss'

function EditProfile({ state, checkLoginUser, editUserData }) {
  const { userNameError, emailError, userData } = state
  const { username, email, token } = userData
  console.log('state', state)
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    setValue,
  } = useForm({
    mode: 'onChange',
  })

  useEffect(() => {
    checkLoginUser()
    setValue('userName', username)
    setValue('emailAddress', email)
  }, [username, email])

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
    editUserData(data, token)
  }
  useEffect(() => {
    if (userNameError) {
      setError('userName', { type: 'custom', message: userNameError })
    }
    if (emailError) {
      setError('emailAddress', { type: 'custom', message: emailError })
    }
  }, [userNameError, emailError])

  return (
    <div className={`${account.account} ${account.account__edit}`}>
      <div className={account.account__title}>Edit Profile</div>
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
          <label className={account.account__suptitle} htmlFor="newPassword">
            New password
          </label>
          <input
            className={`${account.account__text} ${errors?.password && account.account__error}`}
            id="newPassword"
            type="newPassword"
            placeholder="New password"
            {...register('newPassword', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 1,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: 40,
            })}
          />
          <div className={account['account__form-error']}>
            {errors?.newPassword && <p>{errors?.newPassword?.message || 'Error!'} </p>}
          </div>
        </div>

        <div className={account['account__form-wrapper']}>
          <label className={account.account__suptitle} htmlFor="avatarImage">
            Avatar image (url)
          </label>
          <input
            className={`${account.account__text} ${errors?.repeatPassword && account.account__error}`}
            id="avatarImage"
            type="text"
            placeholder="Avatar image"
            {...register('avatarImage', {
              // required: 'Поле обязательно к заполнению',
            })}
          />
          <div className={account['account__form-error']}>
            {errors?.avatarImage && <p>{errors?.avatarImage?.message || 'Error!'} </p>}
          </div>
        </div>

        <button
          className={`${account.account__btn} ${!isValid ? account['account__btn--disabled'] : null}`}
          type="submit"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  state,
})

export default connect(mapStateToProps, actions)(EditProfile)
