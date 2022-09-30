export const setArticlesData = (data) => ({ type: 'setArticlesData', payload: data })

export const setMyArticlesData = (data) => ({ type: 'setMyArticlesData', payload: data })

export const setNewPage = (page) => ({ type: 'setNewPage', payload: page })

export const loadingStatus = (status) => ({ type: 'loadingStatus', payload: status })

export const errorStatus = (status, text) => ({ type: 'errorStatus', payload: status, message: text })

export const accountCheckInformationClick = () => ({ type: 'accountCheckInformationClick' })

export const setInfoMessage = (message = '') => ({ type: 'setInfoMessage', payload: message })

export const getArticles = (page) => async (dispatch) => {
  dispatch(loadingStatus(true))
  const newHeaders = new Headers({
    'Content-Type': 'application/json;charset=utf-8',
  })
  if (localStorage.getItem('blog-token')) {
    newHeaders.append('Authorization', `Token ${localStorage.getItem('blog-token')}`)
  }
  const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${page}`, {
    method: 'GET',
    headers: newHeaders,
  })
  if (response.ok) {
    const json = await response.json()
    dispatch(setArticlesData(json))
    dispatch(loadingStatus(false))
    dispatch(errorStatus(false, ''))
  } else {
    dispatch(errorStatus(true, 'Что-то пошло не так'))
  }
}

export const setArticle = (article) => ({ type: 'setArticle', payload: article })

export const getCurrentArticle = (article) => async (dispatch) => {
  dispatch(loadingStatus(true))
  const newHeaders = new Headers({
    'Content-Type': 'application/json;charset=utf-8',
  })
  if (localStorage.getItem('blog-token')) {
    newHeaders.append('Authorization', `Token ${localStorage.getItem('blog-token')}`)
  }
  const response = await fetch(`https://blog.kata.academy/api/articles/${article}`, {
    method: 'GET',
    headers: newHeaders,
  })
  if (response.ok) {
    const json = await response.json()
    dispatch(setArticle(json))
    dispatch(errorStatus(false, ''))
    dispatch(loadingStatus(false))
  } else {
    dispatch(errorStatus(true, 'Что-то пошло не так'))
  }
}

export const setLoginStatus = (status) => ({ type: 'setLoginStatus', payload: status })

export const responseRegisterServerError = (errors) => ({ type: 'responseRegisterServerError', payload: errors })

export const responseLoginServerError = (error) => ({ type: 'responseLoginServerError', payload: error })

export const resetSubmitError = () => ({ type: 'resetSubmitError' })

export const setStatusSubmitForm = () => ({ type: 'setStatusSubmitForm' })

export const logOutUser = () => (dispatch) => {
  localStorage.clear('blog-token')
  dispatch(setLoginStatus(false))
}

export const setUserData = (user) => ({ type: 'setUserData', payload: user })

export const registerNewUser = (data) => async (dispatch) => {
  dispatch(loadingStatus(true))
  const { userName, emailAddress: newEmailAddress, password: newPassword } = data
  const newUser = {
    user: {
      username: userName,
      email: newEmailAddress,
      password: newPassword,
    },
  }
  const response = await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(newUser),
  })
  if (!response.ok) {
    if (response.status === 422) {
      const res = await response.json()
      dispatch(responseRegisterServerError(res))
    } else {
      dispatch(errorStatus(true, 'Что-то пошло не так'))
    }
    dispatch(loadingStatus(false))
  } else {
    const res = await response.json()
    localStorage.setItem('blog-token', res.user.token)
    dispatch(loadingStatus(false))
    dispatch(setLoginStatus(true))
    dispatch(setStatusSubmitForm())
    dispatch(setUserData(res.user))
    dispatch(errorStatus(false, ''))
  }
}

export const loginUser = (data) => async (dispatch) => {
  dispatch(loadingStatus(true))
  const { emailAddress, password: newPassword } = data
  const userData = {
    user: {
      email: emailAddress,
      password: newPassword,
    },
  }
  const response = await fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    if (response.status === 422) {
      const res = await response.json()
      dispatch(responseLoginServerError(res))
    } else {
      dispatch(errorStatus(true, 'Что-то пошло не так'))
    }
    dispatch(loadingStatus(false))
  } else {
    const res = await response.json()
    localStorage.setItem('blog-token', res.user.token)
    dispatch(setLoginStatus(true))
    dispatch(setUserData(res.user))
    dispatch(loadingStatus(false))
    dispatch(errorStatus(false, ''))
  }
}

export const editUserData = (data, tokenData) => async (dispatch) => {
  dispatch(loadingStatus(true))
  const { userName, emailAddress, newPassword, avatarImage } = data
  const userData = {
    user: {
      username: userName,
      token: tokenData,
      email: emailAddress,
      bio: '',
      password: newPassword,
      image: avatarImage,
    },
  }
  const response = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${tokenData}`,
    },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    if (response.status === 422) {
      const res = await response.json()
      dispatch(responseRegisterServerError(res))
    } else {
      dispatch(errorStatus(true, 'Что-то пошло не так'))
    }
    dispatch(loadingStatus(false))
  } else {
    const res = await response.json()
    localStorage.setItem('blog-token', res.user.token)
    dispatch(setLoginStatus(true))
    dispatch(setUserData(res.user))
    dispatch(setInfoMessage('Profile edit!'))
    dispatch(loadingStatus(false))
    dispatch(errorStatus(false, ''))
  }
}

export const setNewArticleSlug = (slug) => ({ type: 'setNewArticleSlug', payload: slug })

export const setNewArticle = (data, tags) => async (dispatch) => {
  dispatch(loadingStatus(true))
  const { title: newTitle, shortDescription, text } = data
  const articleData = {
    article: {
      title: newTitle,
      description: shortDescription,
      body: text,
      tagList: tags,
    },
  }
  const response = await fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${localStorage.getItem('blog-token')}`,
    },
    body: JSON.stringify(articleData),
  })
  if (!response.ok) {
    if (response.status === 422) {
      const res = await response.json()
      dispatch(responseRegisterServerError(res))
      dispatch(loadingStatus(false))
    } else {
      dispatch(errorStatus(true, 'Что-то пошло не так'))
    }
    dispatch(loadingStatus(false))
  } else {
    const res = await response.json()
    dispatch(loadingStatus(false))
    dispatch(setNewArticleSlug(res))
    dispatch(setStatusSubmitForm())
    dispatch(errorStatus(false, ''))
  }
}

export const deleteArticle = (article) => async (dispatch) => {
  const response = await fetch(`https://blog.kata.academy/api/articles/${article}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${localStorage.getItem('blog-token')}`,
    },
  })
  if (response.ok) {
    dispatch(getArticles(1))
  }
}

export const editArticle = (data, tags, slug) => async (dispatch) => {
  dispatch(loadingStatus(true))
  const { title: newTitle, shortDescription, text } = data
  const userData = {
    article: {
      title: newTitle,
      description: shortDescription,
      body: text,
      tagList: tags,
    },
  }
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${localStorage.getItem('blog-token')}`,
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    if (response.status === 422) {
      const res = await response.json()
      dispatch(responseRegisterServerError(res))
    } else {
      dispatch(errorStatus(true, 'Что-то пошло не так'))
    }
    dispatch(loadingStatus(false))
  } else {
    const res = await response.json()
    dispatch(loadingStatus(false))
    dispatch(setStatusSubmitForm())
    dispatch(setNewArticleSlug(res))
  }
}

export const getMyArticles = (user) => async (dispatch) => {
  dispatch(loadingStatus(true))
  const response = await fetch(`https://blog.kata.academy/api/articles?author=${user}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${localStorage.getItem('blog-token')}`,
    },
  })
  if (response.ok) {
    const json = await response.json()
    dispatch(setMyArticlesData(json))
    dispatch(loadingStatus(false))
  } else {
    dispatch(errorStatus(true, 'Что-то пошло не так'))
    dispatch(loadingStatus(false))
  }
}

export const setLikeStatus = (slug, event, checkArr) => ({
  type: 'setLikeStatus',
  payload: slug,
  operation: event,
  arrName: checkArr,
})

export const setLikeArticle = (slug, abortConRef, checkArr) => async (dispatch) => {
  if (abortConRef.current) abortConRef.current.abort()
  const ref = abortConRef
  dispatch(setLikeStatus(slug, 'inc', checkArr))

  const currentController = new AbortController()
  ref.current = currentController

  await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    signal: ref.current.signal,
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('blog-token')}`,
    },
  }).catch(() => {
    if (!currentController.signal.aborted) {
      dispatch(setLikeStatus(slug, 'dec', checkArr))
    }
  })
}

export const delLikeArticle = (slug, abortConRef, checkArr) => async (dispatch) => {
  if (abortConRef.current) abortConRef.current.abort()
  const ref = abortConRef
  dispatch(setLikeStatus(slug, 'dec', checkArr))

  const currentController = new AbortController()
  ref.current = currentController

  await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    signal: ref.current.signal,
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem('blog-token')}`,
    },
  }).catch(() => {
    if (!currentController.signal.aborted) {
      dispatch(setLikeStatus(slug, 'inc', checkArr))
    }
  })
}

export const checkLoginUser = () => async (dispatch) => {
  const token = localStorage.getItem('blog-token')
  if (token) {
    dispatch(setLoginStatus(true))
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const res = await response.json()
    dispatch(setUserData(res.user))
  }
}

export const setNewTag = (tag) => ({ type: 'setNewTag', payload: tag })
export const removeTag = (e, tag) => ({ type: 'removeTag', payload: { newE: e, newTag: tag } })
export const removeTagList = (tags) => ({ type: 'removeTagList', payload: tags })
