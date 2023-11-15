import { useState } from 'react'
import styles from './styles.module.css'
import { Banners } from './components/Banners'
import { Chat } from './components/Chat'
import { Links } from './components/Links'

const initialMessage = {
  text: 'Hey there! At Valtira, we solve hard technology problems, and we do it with a 😊 on our face. What brings you here today?'
}

export function InitialChat () {
  const [expanded, setExpanded] = useState(false)
  const [messages, setMessages] = useState([initialMessage])
  const [lastLinks, setLastLinks] = useState(null)

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
          <Chat
            messages={messages}
            setLastLinks={setLastLinks}
            setMessages={setMessages}
          />

          {lastLinks ? (
            <Links links={lastLinks} setLastLinks={setLastLinks} />
          ) : (
            <Banners />
          )}
        </div>
      )}
    </div>
  )
}
