import styles from './styles.module.css'

export function Messages ({ messages }) {
  console.log(messages)

  return (
    <div className={styles.messages}>
      {messages?.map((message, index) => {
        const time = '08:55'

        let messageType
        if (message.me) messageType = 'me'

        return (
          <div key={index} className={styles.message_container}>
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
