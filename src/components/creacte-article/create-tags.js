import React, { useState } from 'react'
import { connect } from 'react-redux'
import { v4 } from 'uuid'

import * as actions from '../actions/actions'

import createTags from './create-tags.module.scss'

function CreateTags({ state, setNewTag, removeTag }) {
  const { tags } = state
  const [value, setValue] = useState('')

  const setTag = () => {
    const findElem = tags.filter((item) => item === value)
    if (findElem.length === 0 && value !== undefined && value !== '') {
      setNewTag(value)
      setValue('')
    }
    setValue('')
  }

  const handleClick = (e) => {
    setValue(e.target.value)
  }

  const elements = tags.map((item) => (
    <div className={createTags['tags__box-item']} key={v4()}>
      <input className={createTags.tags__text} type="text" defaultValue={item} />
      <button
        className={`${createTags.tags__btn} ${createTags['tags__btn-del']}`}
        onClick={(e) => removeTag(e, item)}
        type="button"
      >
        Delete
      </button>
    </div>
  ))
  return (
    <div className={createTags.tags}>
      <div className={createTags.tags__title}>Tags</div>
      <div className={createTags.tags__box}>
        {elements}
        <div className={createTags.tags__wrapper}>
          <div className={createTags['tags__box-item']}>
            <input
              className={createTags.tags__text}
              type="text"
              placeholder="Tag"
              value={value}
              onChange={handleClick}
            />
            <button
              className={`${createTags.tags__btn} ${createTags['tags__btn-del']}`}
              type="button"
              onClick={() => setValue('')}
            >
              Delete
            </button>
          </div>
          <div className={`${createTags['tags__box-item']} ${createTags['tags__box-item-last']}`}>
            <button className={`${createTags.tags__btn} ${createTags['tags__btn-add']}`} type="button" onClick={setTag}>
              Add tag
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  state,
})
export default connect(mapStateToProps, actions)(CreateTags)
