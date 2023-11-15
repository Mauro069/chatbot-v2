import { useState } from 'react'
import { Loader } from '../../../Loader'
import styles from './styles.module.css'

export function InputChat ({ handleSubmit }) {
  const [prompt, setPrompt] = useState({ text: '', disabled: false })
  const [loading, setLoading] = useState(false)

  const onSubmit = async e => {
    setPrompt({ text: '', disabled: true })
    setLoading(true)
    await handleSubmit(e)
    setLoading(false)
    setPrompt({ disabled: false })
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onSubmit(e)
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.chat_button}>
      <input
        disabled={prompt.disabled}
        value={prompt.text}
        onChange={e => setPrompt(e.target.value)}
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
