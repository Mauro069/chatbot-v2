import { useState } from 'react'
import styles from './styles.module.css'
import { Banners } from './components/Banners'
import { Chat } from './components/Chat'

export function InitialChat () {
  const [expanded, setExpanded] = useState(false)

  const handleInitialChatClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={styles.chatContainer}>
      {!expanded && (
        <div onClick={handleInitialChatClick} className={styles.initialChat}>
          <div>
            <img src='/assets/logo.svg' />
          </div>

          <div className={styles.button}>
            <label>Ask anything...</label>

            <div>
              <img src='/assets/arrow.svg' />
            </div>
          </div>
        </div>
      )}

      {expanded && (
        <div className={styles.openChat}>
          <Chat />
          <Banners />
        </div>
      )}
    </div>
  )
}
