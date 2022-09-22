import React from 'react'

import articles from './articles.module.scss'

function ArticlesItemTag({ tag }) {
  const element = <div className={articles.articles__tag}>{tag}</div>
  return element
}

export default ArticlesItemTag
