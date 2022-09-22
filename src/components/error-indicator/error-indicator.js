import React from 'react'
import { Alert } from 'antd'

import errorIndicator from './error-indicator.module.scss'

function ErrorIndicator(props) {
  const { message } = props

  return (
    <div className={errorIndicator.alert__wrapper}>
      <Alert message="Error" description={message} type="error" showIcon />
    </div>
  )
}

export default ErrorIndicator
