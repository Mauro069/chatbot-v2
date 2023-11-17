import { useMessages } from '../../../../context/MessagesContext'
import { useEffect, useRef } from 'react'
import styles from './styles.module.css'

export function Messages () {
  const { messages } = useMessages()
  const messagesContainerRef = useRef(null)
  const lastMessageRef = useRef(null)

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      const lastMessage = lastMessageRef.current
      lastMessage.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className={styles.messages} ref={messagesContainerRef}>
      {messages?.map((message, index) => {
        const time = '08:55'

        let messageType
        if (message.me) messageType = 'me'

        const isLastMessage = index === messages.length - 1

        return (
          <div
            key={index}
            ref={isLastMessage ? lastMessageRef : null}
            className={styles.message_container}
          >
            <div className={styles.message_container_top}>
              <div
                className={`${styles.message_owner} ${
                  styles[messageType] || ''
                }`}
              >
                <div
                  className={`${styles.circle} ${styles[messageType] || ''}`}
                />
                <span>{message.me ? 'You' : 'Valtira'}</span>
              </div>

              <span className={styles.message_time}>{time}</span>
            </div>

            <div className={`${styles.message} ${styles[messageType] || ''}`}>
              {message.text}
            </div>
          </div>
        )
      })}
    </div>
  )
}
