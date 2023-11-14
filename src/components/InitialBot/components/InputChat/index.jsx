import { useState } from 'react'
import styles from './styles.module.css'

export function InputChat ({ handleSubmit }) {
  const [prompt, setPrompt] = useState({ text: '', disabled: false })

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onSubmit(e)
    }
  }

  const onSubmit = async e => {
    setPrompt({ text: '', disabled: true })
    await handleSubmit(e)
    setPrompt({ disabled: false })
  }

  return (
    <form onSubmit={onSubmit} className={styles.chat_button}>
      <input
        disabled={prompt.disabled}
        value={prompt.text}
        onChange={e => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        placeholder='Ask anything...'
      />

      <button className={styles.send_button}>
        <img src='/assets/arrow.svg' />
      </button>
    </form>
  )
}
