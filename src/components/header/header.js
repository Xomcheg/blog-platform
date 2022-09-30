import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import defaultAvatar from '../../images/default-avatar.png'

import header from './header.module.scss'

export function Header({ loginStatus, logOutUser, userData, checkLoginUser }) {
  const { username, image } = userData

  let avatar
  if (!image) {
    avatar = <img className={header.header__avatar} src={defaultAvatar} alt="avatar" />
  } else {
    avatar = <img className={header.header__avatar} src={image} alt="avatar" />
  }

  useEffect(() => {
    checkLoginUser()
  }, [])

  let elements
  if (!loginStatus) {
    elements = (
      <div className={header.header__wrapper}>
        <Link to="/articles" className={header.header__logo}>
          Realworld Blog
        </Link>
        <Link to="/sign-in" className={header.header__btn}>
          Sign In
        </Link>
        <Link to="/sign-up" href className={header.header__btn}>
          Sign Up
        </Link>
      </div>
    )
  } else {
    elements = (
      <div className={header.header__wrapper}>
        <Link to="/articles" className={header.header__logo}>
          Realworld Blog
        </Link>
        <Link to="/my-articles" className={header.header__btn}>
          My articles
        </Link>
        <Link to="/new-article" className={header.header__btn}>
          Create article
        </Link>
        <Link to="/profile" className={header['header__user-name']}>
          {username}
          {avatar}
        </Link>
        <Link to="/articles" href className={header['header__btn-logout']} onClick={logOutUser}>
          Log Out
        </Link>
      </div>
    )
  }
  return <header className={header.header}>{elements}</header>
}
