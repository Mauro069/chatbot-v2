import { useState } from 'react'
import { Loader } from '../../../Loader'
import styles from './styles.module.css'

export function InputChat ({ handleSubmit }) {
  const [text, setText] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async e => {
    setDisabled(true)
    setLoading(true)
    await handleSubmit(e)
    setLoading(false)
    setDisabled(false)
    setText('')
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onSubmit(e)
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.chat_button}>
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
