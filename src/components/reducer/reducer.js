/* eslint-disable indent */
const reducer = (state, action) => {
  if (state === undefined) {
    return {
      articles: [],
      articlesCount: '',
      article: null,
      loading: true,
      error: false,
      errorText: '',
      page: 1,
      accountCheckInformation: true,
      userNameError: '',
      emailError: '',
      loginError: '',
      statusSubmitForm: false,
      loginStatus: false,
      userData: {},
    }
  }

  switch (action.type) {
    case 'setArticlesData': {
      return {
        ...state,
        loading: false,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        error: false,
        errorText: '',
      }
    }
    case 'setArticle': {
      return {
        ...state,
        article: action.payload.article,
        error: false,
        errorText: '',
      }
    }
    case 'setNewPage': {
      return {
        ...state,
        page: action.payload,
      }
    }
    case 'accountCheckInformationClick':
      return { ...state, accountCheckInformation: !state.accountCheckInformation }
    case 'loadingStatus':
      return { ...state, loading: action.payload }
    case 'errorStatus':
      return { ...state, error: action.payload, errorText: action.message }
    case 'resetSubmitError': {
      return { ...state, userNameError: '', emailError: '', loginError: '' }
    }
    case 'setStatusSubmitForm': {
      return {
        ...state,
        statusSubmitForm: !state.statusSubmitForm,
      }
    }
    case 'responseRegisterServerError': {
      console.log('payload', action.payload.errors)
      const { errors } = action.payload
      return {
        ...state,
        userNameError: errors.username ? errors.username : '',
        emailError: errors.email ? errors.email : '',
      }
    }
    case 'responseLoginServerError': {
      const { errors } = action.payload
      return { ...state, loginError: errors }
    }
    case 'setLoginStatus': {
      return { ...state, loginStatus: action.payload }
    }
    case 'setUserData': {
      console.log('setUserData', action.payload)
      return { ...state, userData: action.payload }
    }
    default:
      return state
  }
}

export default reducer
