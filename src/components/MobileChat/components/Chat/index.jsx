import { CHAT_TYPES } from '../../../../context/Chat/types'
import { useChat } from '../../../../context/Chat/context'
import { InputChat } from '../../../InputChat'
import { Messages } from '../Messages'

import styles from './styles.module.css'

export function Chat () {
  const { dispatch } = useChat()

  const closeChat = () => {
    dispatch({ type: CHAT_TYPES.TOGGLE_CHAT })
  }

  return (
    <div className={styles.chat}>
      <header className={styles.chat_header}>
        <img src='/assets/complete_logo.svg' />

        <img src='/assets/back.svg' onClick={closeChat} />
      </header>

      <Messages />

      <div className={styles.chat_button_container}>
        <InputChat />
      </div>
    </div>
  )
}
