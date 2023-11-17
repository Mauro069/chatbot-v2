import { useState } from 'react'
import styles from './styles.module.css'
import { Banners } from './components/Banners'
import { Chat } from './components/Chat'
import { Links } from './components/Links'
import { useChat } from '../../context/Chat/context'
import { CHAT_TYPES } from '../../context/Chat/types'

export function InitialChat () {
  const { isOpen, dispatch, links } = useChat()

  const openChat = () => {
    dispatch({ type: CHAT_TYPES.TOGGLE_CHAT })
  }

  return (
    <div className={styles.chatContainer}>
      {!isOpen && (
        <div onClick={openChat} className={styles.initialChat}>
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

      {isOpen && (
        <div className={styles.openChat}>
          <Chat />

          {links?.length > 0 ? <Links /> : <Banners />}
        </div>
      )}
    </div>
  )
}
