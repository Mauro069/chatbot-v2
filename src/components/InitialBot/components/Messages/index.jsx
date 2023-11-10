import styles from './styles.module.css'

export function Messages ({ messages }) {
  return (
    <div className={styles.messages}>
      {messages.map(({ message, me, time }) => {
        let messageType
        if (me) messageType = 'me'

        return (
          <div key={message} className={styles.message_container}>
            <div className={styles.message_container_top}>
              <div
                className={`${styles.message_owner} ${
                  styles[messageType] || ''
                }`}
              >
                <div
                  className={`${styles.circle} ${styles[messageType] || ''}`}
                />
                <span>Valtira</span>
              </div>

              <span className={styles.message_time}>{time}</span>
            </div>

            <div className={`${styles.message} ${styles[messageType] || ''}`}>
              {message}
            </div>
          </div>
        )
      })}
    </div>
  )
}
