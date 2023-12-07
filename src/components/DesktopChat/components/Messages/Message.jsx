import { RenderText } from '../../../RenderText'
import styles from './styles.module.css'

export const Message = ({ message, isLastMessage, lastMessageRef }) => {
  const time = '08:55'

  let messageType
  if (message.me) messageType = 'me'

  return (
    <div ref={lastMessageRef} className={styles.message_container}>
      <div className={styles.message_container_top}>
        <div className={`${styles.message_owner} ${styles[messageType] || ''}`}>
          <div className={`${styles.circle} ${styles[messageType] || ''}`} />
          <span>{message.me ? 'You' : 'Valtira'}</span>
        </div>

        <span className={styles.message_time}>{time}</span>
      </div>

      <div className={`${styles.message} ${styles[messageType] || ''}`}>
        <RenderText message={message} />
      </div>
    </div>
  )
}