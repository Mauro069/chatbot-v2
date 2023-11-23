import { useChat } from '../../context/Chat/context'
import { addMessageToApi } from '../../config/api'
import { Loader } from '../Loader'
import { useState } from 'react'

import styles from './styles.module.css'

export function InputChat () {
  const [text, setText] = useState('')
  const { loading, disabled, dispatch } = useChat()

  const handleSubmit = async e => {
    e.preventDefault()

    const inputText = e.target.value
    addMessageToApi(inputText, dispatch)
    setText('')
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleSubmit(e)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.chat_button}>
      <input
        disabled={disabled}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        placeholder={loading ? 'Loading...' : 'Ask anything...'}
      />

      <button className={styles.send_button}>
        {loading ? <Loader size={15} /> : <img src='/assets/arrow.svg' />}
      </button>
    </form>
  )
}
