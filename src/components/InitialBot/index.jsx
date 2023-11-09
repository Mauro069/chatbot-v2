import { useState } from 'react'
import styles from './styles.module.css'

export function InitialChat () {
  const [expanded, setExpanded] = useState(false)

  const handleInitialChatClick = () => {
    setExpanded(!expanded)
  }

  //   const initialChatClasses = `${styles.initialChat} ${
  //     expanded ? styles.expanded : ''
  //   }`

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
          <div className={styles.chat}>
            <header className={styles.chat_header}>
              <img src='/assets/complete_logo.svg' />
              <img src='/assets/hamburger.svg' />
            </header>

            <div className={styles.chat_messages}>
              <h1>Mensajes</h1>
            </div>

            <div className={styles.chat_button_container}>
              <div className={styles.button}>
                <label>Ask anything...</label>

                <div>
                  <img src='/assets/arrow.svg' />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.banners}>{/* Banners */}</div>
        </div>
      )}
    </div>
  )
}
