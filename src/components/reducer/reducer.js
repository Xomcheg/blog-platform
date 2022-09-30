/* eslint-disable indent */
const reducer = (state, action) => {
  if (state === undefined) {
    return {
      articles: [],
      articlesCount: '',
      article: null,
      articleSlug: '',
      loading: false,
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
      infoMessage: '',
      myArticlesData: [],
      tags: [],
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
      let newArticle
      if (action.payload === null) {
        newArticle = null
      } else if (action.payload !== 'redirect') {
        newArticle = action.payload.article
      } else {
        newArticle = action.payload
      }
      return {
        ...state,
        article: newArticle,
        error: false,
        errorText: '',
      }
    }
    case 'setNewArticleSlug': {
      let newSlug
      if (action.payload !== '') {
        newSlug = action.payload.article.slug
      } else {
        newSlug = action.payload
      }
      return {
        ...state,
        articleSlug: newSlug,
      }
    }
    case 'setNewPage': {
      return {
        ...state,
        page: action.payload,
      }
    }
    case 'setInfoMessage': {
      return {
        ...state,
        infoMessage: action.payload,
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
    case 'setNewTag': {
      let newArr
      if (action.payload === null) {
        newArr = []
      } else {
        newArr = [...state.tags]
        newArr.push(action.payload)
      }
      return {
        ...state,
        tags: newArr,
      }
    }
    case 'removeTag': {
      const { newTag } = action.payload
      const oldArr = [...state.tags]
      const idx = oldArr.indexOf(newTag)
      const newArr = [...oldArr.slice(0, idx), ...oldArr.slice(idx + 1)]
      return {
        ...state,
        tags: newArr,
      }
    }
    case 'removeTagList': {
      return {
        ...state,
        tags: action.payload,
      }
    }
    case 'responseRegisterServerError': {
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
      return { ...state, userData: action.payload }
    }
    case 'setMyArticlesData': {
      return {
        ...state,
        myArticlesData: action.payload.articles,
        error: false,
        errorText: '',
        loading: false,
      }
    }
    case 'setLikeStatus': {
      const { articles, myArticlesData, article } = state
      const newState = { ...state }
      let checkArticles
      let name
      if (action.arrName === 'articlesCurrent') {
        let newElem
        if (action.operation === 'inc') {
          newElem = { ...article, favorited: !article.favorited, favoritesCount: article.favoritesCount + 1 }
        }
        if (action.operation === 'dec') {
          newElem = { ...article, favorited: !article.favorited, favoritesCount: article.favoritesCount - 1 }
        }
        return {
          ...state,
          article: newElem,
        }
      }
      if (action.arrName === 'myArticles') {
        checkArticles = myArticlesData
        name = 'myArticlesData'
      } else if (action.arrName === 'articles') {
        checkArticles = articles
        name = 'articles'
      }
      const idx = checkArticles.findIndex((item) => item.slug === action.payload)
      let newElem
      if (action.operation === 'inc') {
        newElem = {
          ...checkArticles[idx],
          favorited: !checkArticles[idx].favorited,
          favoritesCount: checkArticles[idx].favoritesCount + 1,
        }
      }
      if (action.operation === 'dec') {
        newElem = {
          ...checkArticles[idx],
          favorited: !checkArticles[idx].favorited,
          favoritesCount: checkArticles[idx].favoritesCount - 1,
        }
      }

      const newArr = [...checkArticles.slice(0, idx), newElem, ...checkArticles.slice(idx + 1)]
      newState[name] = newArr
      return {
        ...newState,
      }
    }
    default:
      return state
  }
}

export { reducer }
