export const test = () => ({ type: test })
export const setArticlesData = (data) => ({ type: 'setArticlesData', payload: data })
export const setNewPage = (page) => ({ type: 'setNewPage', payload: page })
export const loadingStatus = (status) => ({ type: 'loadingStatus', payload: status })
export const errorStatus = (status, text) => ({ type: 'errorStatus', payload: status, message: text })
export const accountCheckInformationClick = () => ({ type: 'accountCheckInformationClick' })

export const getArticles = (page) => async (dispatch) => {
  dispatch(loadingStatus(true))
  const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${page}`)
  if (response.ok) {
    const json = await response.json()
    dispatch(setArticlesData(json))
  } else {
    dispatch(errorStatus(true, 'Что-то пошло не так'))
  }
}

export const setArticle = (article) => ({ type: 'setArticle', payload: article })
export const getCurrentArticle = (article) => async (dispatch) => {
  dispatch(loadingStatus(true))
  const response = await fetch(`https://blog.kata.academy/api/articles/${article}`)
  if (response.ok) {
    const json = await response.json()
    dispatch(setArticle(json))
  } else {
    dispatch(errorStatus(true, 'Что-то пошло не так'))
  }
}
// --------------user-----------------------------------------------------------------------

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
    }
  } else {
    const res = await response.json()
    localStorage.setItem('blog-token', res.user.token)
    dispatch(setLoginStatus(true))
    dispatch(setStatusSubmitForm())
  }
}

export const loginUser = (data) => async (dispatch) => {
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
    }
  } else {
    const res = await response.json()
    localStorage.setItem('blog-token', res.user.token)
    dispatch(setLoginStatus(true))
    dispatch(setUserData(res.user))
  }
}

export const editUserData = (data, tokenData) => async (dispatch) => {
  console.log('edit', data, tokenData)
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
    }
  } else {
    const res = await response.json()
    localStorage.setItem('blog-token', res.user.token)
    dispatch(setLoginStatus(true))
    dispatch(setUserData(res.user))
  }
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
