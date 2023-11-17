import { Messages } from '../Messages'
import styles from './styles.module.css'
import { InputChat } from '../InputChat'
import { useMessages } from '../../../../context/MessagesContext'



export function Chat ({ setMessages, setLastLinks, closeChat }) {
  const { addMessage } = useMessages()

  const handleSubmit = async e => {
    e.preventDefault()

    const inputText = e.target.value
    addMessage(inputText)
  }

  return (
    <div className={styles.chat}>
      <header className={styles.chat_header}>
        <img src='/assets/complete_logo.svg' />
        <img src='/assets/back.svg' onClick={closeChat} />
      </header>

      <Messages />

      <div className={styles.chat_button_container}>
        <InputChat handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}
