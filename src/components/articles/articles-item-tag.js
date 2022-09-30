import React from 'react'

import articles from './articles.module.scss'

export function ArticlesItemTag({ tag }) {
  const element = <div className={articles.articles__tag}>{tag}</div>
  return element
}
