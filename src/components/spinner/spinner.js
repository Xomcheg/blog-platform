import React from 'react'
import { Spin } from 'antd'

import spinner from './spinner.module.scss'
import 'antd/dist/antd.css'

export function Spinner() {
  return (
    <div className={spinner.example}>
      <Spin size="large" />
      <div className={spinner.spinner__text}>Загружаем данные</div>
    </div>
  )
}
