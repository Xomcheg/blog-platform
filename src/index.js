import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
// eslint-disable-next-line import/no-extraneous-dependencies
import reduxThunc from 'redux-thunk'

import 'antd/dist/antd.css'
import './index.css'

import App from './components/app'
import reducer from './components/reducer'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunc)))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
