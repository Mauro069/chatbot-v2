import { Messages } from '../Messages'
import styles from './styles.module.css'

export function Chat () {
  const testMessages = [
    {
      message:
        'Hey there! At Valtira, we solve hard technology problems, and we do it with a 😊 on our face. What brings you here today?',
      time: '08:55'
    },
    {
      message: 'Do you do DevOps?',
      time: '08:55',
      me: true
    },
    {
      message:
        'Valtira was an early adopter of the DevOps philosophy and has built an established practice around operational excellence in cloud-based applications.',
      time: '08:55',
    }
  ]

  return (
    <div className={styles.chat}>
      <header className={styles.chat_header}>
        <img src='/assets/complete_logo.svg' />
        <img src='/assets/hamburger.svg' />
      </header>

      <Messages messages={testMessages} />

      <div className={styles.chat_button_container}>
        <div className={styles.chat_button}>
          <label>Ask anything...</label>

          <div>
            <img src='/assets/arrow.svg' />
          </div>
        </div>
      </div>
    </div>
  )
}
